'use client';

import { SyntheticEvent, useEffect } from 'react';
import { useBetween } from 'use-between';
import { readFile } from 'utils/readFile';
import { useKey } from '../useKey';

export function KeyDropZone() {
  const [key, setKey] = useBetween(useKey);

  const nullifyEvent = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const fileDrop = (e: SyntheticEvent) => {
    e.preventDefault();

    const files: FileList =
      (e.target as HTMLInputElement)?.files ?? (e as any).dataTransfer?.files;

    const privateKeyFile = files[0];

    if (!privateKeyFile) return;

    readFile(privateKeyFile).then((key) => {
      setKey(key);
      sessionStorage.setItem('privatekey', key);
    });
  };

  useEffect(() => {
    const storedPrivateKey = sessionStorage.getItem('privatekey');

    if (storedPrivateKey) setKey(storedPrivateKey);
  }, []);

  return (
    <>
      <label
        htmlFor="privatekey"
        className="w-full h-28 rounded-lg border-2 border-dashed border-neutral-700 flex flex-row items-center justify-center cursor-pointer"
        onDrop={fileDrop}
        onDragOver={nullifyEvent}
        onDragEnter={nullifyEvent}
      >
        <p className="text-neutral-800 dark:text-neutral-400 select-none">
          Drop private key here
        </p>
      </label>

      <input type="file" id="privatekey" hidden onChange={fileDrop}></input>

      <p className="text-center my-4 text-xs dark:text-neutral-500 text-neutral-700">
        {key.length !== 0 ? 'Private key exists, ready to sign request.' : ''}
      </p>
    </>
  );
}
