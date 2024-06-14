import { getBib } from 'actions/bibStorage';

const Index = ({ children }) => (
  <div className="w-7 h-7 mr-2 text-center rounded-full border border-slate-400">
    {children}
  </div>
);

const Field = ({ children }) => (
  <li className="cursor-default hover:text-neutral-800 dark:hover:text-neutral-300 [&_.field-content]:max-h-0 [&_.field-content]:hover:!max-h-32">
    {children}
  </li>
);

const Header = ({ children }) => (
  <div className="flex flex-row items-center mb-2 transition-all duration-300">
    {children}
  </div>
);

const Content = ({ children }) => (
  <p className="field-content mb-4 ml-9 transition-all ease-in-out duration-400 overflow-hidden text-neutral-600 dark:text-neutral-400">
    {children}
  </p>
);

export async function ResearchInterestList() {
  const introBib = await getBib('Intro');
  const researchInterests = introBib.entries.filter(
    (entry) => entry.type === 'researchinterest',
  );

  return (
    <>
      <h2 className="mb-8 text-xl font-semibold tracking-tighter">
        Research interests:
      </h2>

      <div className="flex flex-row">
        <ul>
          {researchInterests.map((interest, i) => (
            <Field key={`intfld.${interest.key}`}>
              <Header>
                <Index>{i + 1}</Index> <span>{interest.fields?.title}</span>
              </Header>

              <Content>{interest.fields?.description}</Content>
            </Field>
          ))}
        </ul>
      </div>
    </>
  );
}
