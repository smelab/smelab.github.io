import { Library } from '@retorquere/bibtex-parser';

export const FILE_NAME = 0;
export const BIB_OBJ = 1;

type Database = [string, Library];

export const databases = {
  Intro: ['intro.bib', null as unknown as Library] as Database,
  Teaching: ['teaching.bib', null as unknown as Library] as Database,
  Publications: ['publications.bib', null as unknown as Library] as Database,
};

export const targets = Object.values(databases).map(([bib]) =>
  bib.replace(/\.bib$/, ''),
);
