import { targets } from 'actions/bibStorageConfig';
import { bucket, getObjStore } from 'actions/objStorage';
import { createHash, createVerify } from 'crypto';
import { NextRequest } from 'next/server';
import { PublicKey } from 'utils/consts';

export async function POST(request: NextRequest) {
  const body = request.body;
  const signature = request.headers.get('x-signature');
  const target = request.headers.get('x-file');

  if (!body)
    return Response.json(
      { success: false },
      { status: 400, statusText: 'Missing body' },
    );

  if (!target)
    return Response.json(
      { success: false },
      { status: 400, statusText: 'Missing target file' },
    );

  if (!targets.includes(target))
    return Response.json(
      { success: false },
      { status: 400, statusText: 'Invalid target file' },
    );

  if (!signature)
    return Response.json(
      {
        success: false,
      },
      { status: 401, statusText: 'Unauthorized' },
    );

  const rawBody = await request.text();
  const rawBodyBuffer = Buffer.from(rawBody, 'utf8');

  const ok = createVerify('RSA-SHA256')
    .update(
      createHash('sha256', { decodeStrings: false, encoding: 'binary' })
        .update(rawBodyBuffer)
        .digest(),
    )
    .verify(Buffer.from(PublicKey, 'ascii'), Buffer.from(signature, 'base64'));

  if (!ok)
    return Response.json(
      {
        sucess: false,
      },
      { status: 403, statusText: 'Wrong signature' },
    );

  const objStore = await getObjStore();

  await objStore.putObject(bucket, `${target}.bib`, rawBodyBuffer);

  return Response.json(
    {
      success: true,
    },
    { status: 201, statusText: 'Success' },
  );
}
