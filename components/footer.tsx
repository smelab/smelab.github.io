import { getBib } from 'actions/bibStorage';
import { UpdateBibDatabaseHint } from './UpdateBibDatabaseHint';

export default async function Footer() {
  const introBib = await getBib('Intro');
  const personalInfo = introBib.entries.find(
    (entry) => entry.type === 'professor',
  )?.fields;

  return (
    <footer className="mb-16">
      <ul className="font-sm my-8 flex flex-row flex-wrap gap-3 space-y-0 text-neutral-600 dark:text-neutral-300">
        <li>
          <div className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100">
            <p className="h-7 whitespace-nowrap">{personalInfo?.address}</p>
          </div>
        </li>

        <li>
          <div className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100">
            <p className="h-7 whitespace-nowrap">
              <span className="font-semibold">Phone</span>:{' '}
              <a
                href={`tel:${personalInfo?.tel?.replace(/[\s\(\)]/g, '') ?? ''}`}
                className="hover:underline"
              >
                {personalInfo?.tel}
              </a>
            </p>
          </div>
        </li>

        <li>
          <div className="transition-all hover:text-neutral-800 dark:hover:text-neutral-100">
            <p className="h-7 whitespace-nowrap">
              <span className="font-semibold">Email</span>:{' '}
              <a
                href={`mailto:${personalInfo?.email}`}
                className="hover:underline"
              >
                {personalInfo?.email}
              </a>
            </p>
          </div>
        </li>
      </ul>

      <p className="flex items-center text-xs">
        Designed & made by my students with&nbsp;
        <UpdateBibDatabaseHint />
      </p>
    </footer>
  );
}
