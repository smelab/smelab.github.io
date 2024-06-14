'use client';

import { databases, FILE_NAME } from 'actions/bibStorageConfig';
import { SyntheticEvent } from 'react';
import { bufferToBase64, importKey } from 'utils/crypto';
import { BibDropZone } from '../BibDropZone';
import { KeyFiller } from '../KeyFiller';

interface IProps {
  target: keyof typeof databases;
}

export function UpdateForm({ target }: IProps) {
  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!confirm('Update bib file?')) return;

    const form: HTMLFormElement = e.target as HTMLFormElement;

    const encoder = new TextEncoder();
    const textualData = form['bib'].value?.trim();
    const data = encoder.encode(textualData);

    const hash = await crypto.subtle.digest('SHA-256', data);

    let cryptoKey: CryptoKey;

    try {
      const privateKey = sessionStorage.getItem('privatekey');
      cryptoKey = await importKey(privateKey ?? '');
    } catch {
      return alert('Unable to load private key');
    }

    const signedHash = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      hash,
    );

    const base64SignedHash = await bufferToBase64(signedHash);

    await fetch('/data/upload', {
      method: 'POST',
      headers: {
        'x-signature': base64SignedHash,
        'x-file': databases[target][FILE_NAME].replace(/\.bib$/, ''),
        'content-type': 'text/plain',
      },
      body: textualData,
    }).then((res) => alert(res.statusText));
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="flex flex-row gap-4 w-full items-stretch mb-12"
    >
      <div className="w-48 flex flex-col gap-2">
        <KeyFiller />
        <h5 className="font-semibold">File: {databases[target][FILE_NAME]}</h5>

        <button
          type="submit"
          className="w-full bg-[#e69b00] hover:bg-[#e9bd15] py-2 rounded-md text-white transition-all shadow-none hover:shadow-md"
        >
          Upload
        </button>

        <a
          type="button"
          className="w-full cursor-pointer text-center bg-neutral-200 hover:bg-neutral-300 py-2 rounded-md text-black transition-all shadow-none hover:shadow-md"
          href={`/data/download?file=${databases[target][FILE_NAME]}`}
          download={`${target}.backup.bib`}
        >
          Backup
        </a>
      </div>

      <BibDropZone target={target} />
    </form>
  );
}
