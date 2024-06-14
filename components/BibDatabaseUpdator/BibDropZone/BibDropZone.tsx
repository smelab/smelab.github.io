'use client';

import { databases } from 'actions/bibStorageConfig';
import { SyntheticEvent, useMemo, useRef } from 'react';
import { readFile } from 'utils/readFile';

interface IProps {
  target: keyof typeof databases;
}

export function BibDropZone({ target }: IProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const inputId = useMemo(() => `bibfile_${target}`, [target]);

  const nullifyEvent = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const fileDrop = (e: SyntheticEvent) => {
    e.preventDefault();

    const files: FileList =
      (e.target as HTMLInputElement)?.files ?? (e as any).dataTransfer?.files;

    const bibFile = files[0];

    if (!bibFile) return;

    readFile(bibFile).then((bib) => {
      if (inputRef.current) {
        inputRef.current.value = bib;

        if (textRef.current)
          textRef.current.innerText = 'New bib file has been uploaded!';
      }
    });
  };

  return (
    <div className="flex-1">
      <label
        htmlFor={inputId}
        className="w-full h-full rounded-lg border-2 border-dashed border-neutral-700 flex flex-col items-center justify-center cursor-pointer"
        onDrop={fileDrop}
        onDragOver={nullifyEvent}
        onDragEnter={nullifyEvent}
      >
        <p className="mt-4 text-neutral-800 dark:text-neutral-400 select-none">
          Drop bibtex file here
        </p>

        <p
          ref={textRef}
          className="text-center my-4 text-xs dark:text-neutral-500 text-neutral-700"
        ></p>
      </label>

      <input type="file" id={inputId} hidden onChange={fileDrop}></input>
      <textarea
        name="bib"
        data-target-file={target}
        ref={inputRef}
        hidden
      ></textarea>
    </div>
  );
}
