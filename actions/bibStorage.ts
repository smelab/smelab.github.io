import { parse, parseAsync } from '@retorquere/bibtex-parser';
import { BIB_OBJ, FILE_NAME, databases } from './bibStorageConfig';
import { bucket, getObjStore } from './objStorage';

export async function getBib(target: keyof typeof databases) {
  'use server';

  const database = databases[target];

  if (database[BIB_OBJ]) return database[BIB_OBJ];

  const objStore = await getObjStore();

  try {
    const rawBib = await objStore.getObject(bucket, database[FILE_NAME]);

    const file: any[] = [];

    for await (const chunk of rawBib) {
      file.push(chunk);
    }

    const bibtex = Buffer.concat(file).toString('utf8');

    const bibdata = await parseAsync(bibtex);

    return (database[BIB_OBJ] = bibdata);
  } catch {
    return (database[BIB_OBJ] = parse(''));
  }
}
