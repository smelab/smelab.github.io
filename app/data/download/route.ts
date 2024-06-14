import { bucket, getObjStore } from 'actions/objStorage';
import { NextRequest } from 'next/server';
import internal from 'stream';

export const dynamic = 'force-dynamic';

async function* streamToIterator(rawBib: internal.Readable) {
  for await (const chunk of rawBib) {
    yield new Uint8Array(chunk);
  }
}

export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get('file');

  if (!file)
    return Response.json(
      { success: false },
      { status: 400, statusText: 'Missing file name' },
    );

  const objStore = await getObjStore();

  try {
    await objStore.statObject(bucket, file);
  } catch {
    return Response.json(
      {
        success: false,
      },
      { status: 404, statusText: 'File not found' },
    );
  }

  const rawBib = await objStore.getObject(bucket, file);

  const iterator = streamToIterator(rawBib);

  return new Response(
    new ReadableStream({
      async pull(controller) {
        const { value, done } = await iterator.next();

        if (done) return controller.close();

        controller.enqueue(value);
      },
    }),
    { status: 200 },
  );
}
