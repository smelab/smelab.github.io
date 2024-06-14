import { databases } from 'actions/bibStorageConfig';
import { KeyDropZone } from 'components/BibDatabaseUpdator/KeyDropZone';
import { UpdateForm } from 'components/BibDatabaseUpdator/UpdateForm';

export const metadata = {
  title: 'Update Bibx Database',
  description: 'Update Bibx Database.',
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Update Bibx Database
      </h1>

      <KeyDropZone />

      <p className="mb-8">
        You need pre-generated private key to sign Bibx update requests. You can
        click or drop the key file into the highlighted region above to upload
        your private key. If it says private key <u>exists</u>, you <b>don't</b>{' '}
        have to re-upload your key.
      </p>

      {Object.keys(databases).map((target) => (
        <UpdateForm
          key={`upfrm.${target}`}
          target={target as keyof typeof databases}
        />
      ))}
    </section>
  );
}
