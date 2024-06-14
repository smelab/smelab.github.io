import { Entry } from '@retorquere/bibtex-parser';
import { getBib } from 'actions/bibStorage';
import { CountUp } from 'components/CountUp';
import { YearlyPublication } from 'components/YearlyPublication';

export const metadata = {
  title: 'Publications',
  description: 'Published publications.',
};

export default async function Page() {
  const bib = await getBib('Publications');

  const byYear = bib.entries.reduce((acc: Record<string, Entry[]>, entry) => {
    acc[entry.fields.year] = [...(acc[entry.fields.year] ?? []), entry];
    return acc;
  }, {});

  return (
    <section>
      <h1 className="mb-8 text-2xl max-sm:text-center text-left font-semibold tracking-tighter">
        Publications
      </h1>

      <p className="mb-12">
        <span className="text-xl">
          <CountUp count={bib.entries.length} />
        </span>{' '}
        is the number of my scientific publications have been published since
        2007.
      </p>

      <div className="w-full flex flex-col">
        {Object.keys(byYear)
          .sort((y1, y2) => (+y1 > +y2 ? -1 : 1))
          .map((year) => (
            <YearlyPublication
              key={`pubpa.${year}`}
              year={+year}
              publications={byYear[year]}
            />
          ))}
      </div>
    </section>
  );
}
