import { getBib } from 'actions/bibStorage';
import { ResearchInterestList } from 'components/ResearchInterestList';
import Image from 'next/image';

export default async function Page() {
  const introBib = await getBib('Intro');
  const personalInfo = introBib.entries.find(
    (entry) => entry.type === 'professor',
  )?.fields;

  return (
    <section>
      <h1 className="mb-8 text-2xl max-sm:text-center text-left font-semibold tracking-tighter">
        Duc-Hanh Dang
      </h1>

      <div className="flex max-sm:flex-col flex-row max-sm:gap-8 gap-16 max-sm:items-center items-start mb-8">
        <div className="sm:w-36 sm:h-36 w-56 h-56 rounded-full">
          <div className="w-full h-full rounded-full overflow-hidden">
            <Image
              width="320"
              height="320"
              src="/images/avatar.jpg"
              alt="Avatar"
            />
          </div>
        </div>

        <div className="block flex-1 bg-transparent">
          <p className="mb-2 bg-transparent">
            {personalInfo?.rank} {personalInfo?.degree} Duc-Hanh Dang
          </p>
          <p className="mb-2 bg-transparent">
            Department of {personalInfo?.department}
          </p>
          <p className="mb-2 bg-transparent">
            Faculty of {personalInfo?.faculty}
          </p>
          <p className="mb-2 bg-transparent">{personalInfo?.school}</p>
          <p className="mb-2 bg-transparent">{personalInfo?.university}</p>
        </div>
      </div>

      <ResearchInterestList />
    </section>
  );
}
