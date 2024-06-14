import { Entry } from '@retorquere/bibtex-parser';
import { Publication } from './Publication';

interface IProps {
  year: number;
  publications: Entry[];
}

export function YearlyPublication({ year, publications }: IProps) {
  return (
    <div className="flex flex-row mb-8 gap-8">
      <h2 className="flex flex-col w-16">{year}</h2>

      <div className="flex flex-col flex-1">
        {publications.map((publication) => (
          <Publication
            key={`pubsg.${publication.key}`}
            publication={publication}
          />
        ))}
      </div>
    </div>
  );
}
