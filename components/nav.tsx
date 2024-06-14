'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface IProps {
  preferedScheme: 'light' | 'dark';
}

const navItems = {
  '/': {
    name: 'Home',
  },
  '/teaching': {
    name: 'Teaching',
  },
  '/publications': {
    name: 'Publications',
  },
};

const cookieArg = '; max-age=31536000000';

export function Navbar({ preferedScheme }: IProps) {
  const [scheme, setScheme] = useState(preferedScheme);

  const pathname = usePathname();
  const isActive = (path) => {
    if (path === '/') return pathname === '/';

    return pathname.startsWith(path);
  };

  const switchTheme = () => {
    const htmlTag = document.body.parentElement as HTMLHtmlElement;

    if (!htmlTag) return;

    const currentTheme = htmlTag.classList.contains('dark') ? 'dark' : 'light';

    if (currentTheme === 'dark') {
      htmlTag.classList.remove('dark');
      htmlTag.classList.add('light');
      setScheme('light');
      document.cookie = `scheme=light${cookieArg}`;

      return;
    }

    htmlTag.classList.remove('light');
    htmlTag.classList.add('dark');
    document.cookie = `scheme=dark${cookieArg}`;
    setScheme('dark');
  };

  return (
    <aside className="-ml-[8px] mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center relative px-0 pb-0 fade scroll-pr-6 overflow-visible"
          id="nav"
        >
          <div className="flex flex-row flex-1 gap-2">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className={
                    (isActive(path) ? 'active ' : '') +
                    'transition-all hover:bg-[#e69b00] hover:text-white [&.active]:bg-[#e69b00] [&.active]:text-white dark:hover:bg-[#2e2614] dark:hover:text-[#e69b00] dark:[&.active]:bg-[#2e2614] dark:[&.active]:text-[#e69b00] bg-opacity-5 rounded-md flex align-middle relative py-1 px-2 m-1'
                  }
                >
                  {name}
                </Link>
              );
            })}
          </div>

          <div className="relative">
            <button
              className="relative bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:bg-neutral-300 dark:hover:text-slate-500 hover:text-[#e9bd15] transition-all duration-150 w-[34px] h-[34px] rounded-full cursor-pointer overflow-hidden"
              onClick={switchTheme}
              title={
                scheme === 'light'
                  ? 'Switch to dark mode'
                  : 'Switch to light mode'
              }
            >
              <div
                className="top-0 left-0 ml-[-34px] absolute w-[102px] h-[102px] flex flex-col items-center transition-transform duration-500"
                style={{
                  transform: `rotate(${scheme === 'light' ? '180' : '0'}deg)`,
                }}
              >
                <div className="p-2">
                  <Image
                    width="18"
                    height="18"
                    src="/svg/sun.svg"
                    alt="Light mode icon"
                  />
                </div>

                <div className="h-[34px] w-1"></div>

                <div className="p-2" style={{ transform: 'rotate(180deg)' }}>
                  <Image
                    width="18"
                    height="18"
                    src="/svg/moon.svg"
                    alt="Dark mode icon"
                  />
                </div>
              </div>
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
}
