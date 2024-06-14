import { Entry } from '@retorquere/bibtex-parser';

interface IProps {
  publication: Entry;
}

export function Publication({ publication }: IProps) {
  return (
    <div className="block mb-6">
      <h3 className="font-light mb-1">
        {publication.fields.author
          ?.map((author) => `${author.firstName} ${author.lastName}`)
          .join(', ')}
        :
      </h3>

      <p>
        <b>{publication.fields.title}.</b>
      </p>
    </div>
  );
}
