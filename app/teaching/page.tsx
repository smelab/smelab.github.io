import { Entry } from '@retorquere/bibtex-parser';
import { getBib } from 'actions/bibStorage';
import { CountUp } from 'components/CountUp';

export const metadata = {
  title: 'Teaching',
  description: 'Teaching experience.',
};

const startYear = 2002;

export default async function Page() {
  const years = new Date().getFullYear() - startYear;
  const teachingBib = await getBib('Teaching');

  const books = teachingBib.entries.filter((entry) => entry.type === 'book');
  const courses = teachingBib.entries.filter(
    (entry) => entry.type === 'course',
  );
  const groupedCourses = courses.reduce(
    (acc, course) => {
      acc[course.fields?.for] = [...(acc[course.fields?.for] ?? []), course];

      return acc;
    },
    {} as Record<string, Entry[]>,
  );
  const graduateTheses = teachingBib.entries.filter(
    (entry) => entry.type === 'gradthesis',
  );
  const masterTheses = teachingBib.entries.filter(
    (entry) => entry.type === 'masterthesis',
  );

  return (
    <section>
      <h1 className="mb-8 text-2xl max-sm:text-center text-left font-semibold tracking-tighter">
        Teaching
      </h1>

      <p className="mb-8">
        Over{' '}
        <span className="text-xl">
          <CountUp count={years} />
        </span>{' '}
        years in higher education teaching, specialized in advanced software
        engineering techniques.
      </p>

      <h2 className="mb-4 text-lg font-semibold">Books</h2>

      <p className="mb-4">
        Advance academic performance with my invaluable passionately written
        book{books.length > 1 ? 's' : ''}:
      </p>

      <ul className="mb-8">
        {books.map((book) => (
          <li key={`bk.${book.key}`}>
            <h3 className="mb-2 font-light">
              ({book.fields.year}){' '}
              {book.fields.author
                ?.map((author) => `${author.firstName} ${author.lastName}`)
                .join(', ')}
              :
            </h3>

            <p>
              <span className="font-semibold">{book.fields.title}.</span>{' '}
              {book.fields.publisher}.
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mb-4 text-lg font-semibold">Courses</h2>

      <p className="mb-4">
        Have been and still lecturing {courses.length} courses, including:
      </p>

      <div className="flex flex-row flex-wrap">
        {Object.entries(groupedCourses).map(([group, courses]) => (
          <div key={`csgrp.${group}`} className="w-full lg:w-6/12 pr-2">
            <h3 className="mb2 text-sm font-semibold">{group}</h3>

            <ul className="mb-4">
              {courses.map((course) => (
                <li key={`cs.${course.key}`}>{course.fields.title}.</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="my-4 text-lg font-semibold">Advised graduate thesis</h2>

      <ul className="mb-10">
        {graduateTheses.map((thesis) => (
          <li key={`gt.${thesis.key}`} className="mb-4">
            <h3 className="mb-0 font-light">
              ({thesis.fields.year}){' '}
              {thesis.fields.author
                ?.map((author) => `${author.firstName} ${author.lastName}`)
                .join(', ')}{' '}
              [{thesis.fields.class}] :
            </h3>

            <p>{thesis.fields.title}.</p>
          </li>
        ))}
      </ul>

      <h2 className="my-4 text-lg font-semibold">Advised Master thesis</h2>

      <ul className="mb-4">
        {masterTheses.map((thesis) => (
          <li key={`gt.${thesis.key}`} className="mb-4">
            <h3 className="mb-0 font-light">
              ({thesis.fields.year}){' '}
              {thesis.fields.author
                ?.map((author) => `${author.firstName} ${author.lastName}`)
                .join(', ')}{' '}
              [{thesis.fields.session}] :
            </h3>

            <p>{thesis.fields.title}.</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
