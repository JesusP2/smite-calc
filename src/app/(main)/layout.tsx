'use client';
import '../globals.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/400.css';
import clsx from 'clsx';
import { Calculator, Equalizer, List } from 'phosphor-react';
import { useState } from 'react';
import { Notepad } from 'phosphor-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { rippleEffect } from '@/utils/misc';
import { openStdin } from 'process';

const SectionItem = ({
  icon,
  title,
  path,
  currentPath,
}: { icon: JSX.Element; title: string; path: string; currentPath: string }) => (
  <li>
    <Link
      href={path}
      className={clsx({
        'w-full h-[2.6rem] rounded-md px-4 py-[10px] flex items-center text-[#cfd0d4] gap-x-4 hover:bg-[#2c3344] hover:text-white': true,
        'bg-[#2c3344] text-white': currentPath === path,
      })}
    >
      {icon}
      <p className="text-[12px] font-semibold">{title}</p>
    </Link>
  </li>
);

function Section({ currentPath }: { currentPath: string }) {
  return (
    <div className="mx-3 font-inter w-[16rem]">
      <ul className="flex flex-col gap-y-[5px]">
        <SectionItem
          icon={<Notepad size={23} />}
          title="God builder"
          path="/god-builder"
          currentPath={currentPath}
        />
        <SectionItem
          icon={<Equalizer size={23} />}
          title="Items"
          path="/items"
          currentPath={currentPath}
        />
        <SectionItem
          icon={<Calculator size={23} />}
          title="Calculator"
          path="/calculator"
          currentPath={currentPath}
        />
      </ul>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpened, openSidebar] = useState(false);
  const pathname = usePathname();

  return (
    <html lang="en">
      <head />
      <body>
        <div className="h-screen bg-white flex">
          <div
            onClick={() => openSidebar(false)}
            className={clsx({
              'h-screen bg-black bg-opacity-50 absolute top-0': true,
              'max-sm:w-full z-20': sidebarOpened,
            })}
          ></div>
          <div
            className={clsx({
              'max-sm:left-0': sidebarOpened,
              'max-sm:left-[-17.5rem] sm:w-0': !sidebarOpened,
              'h-screen max-sm:absolute w-[17.5rem] bg-[#0f172a] duration-300 max-sm:z-20': true,
            })}
          >
            <div className="w-full h-16 px-4"></div>
            <Section currentPath={pathname || '/'} />
          </div>
          <div className="flex-1 h-screen flex flex-col bg-[#f1f5f9] overflow-y-scroll">
            <div className="w-full h-16 shadow-lg px-4 bg-white flex-none fixed z-10">
              <button
                className={clsx({
                  'rounded-full w-12 h-12 mt-[8px] grid place-items-center relative overflow-hidden hover:bg-neutral-100': true,
                })}
                onClick={(e) => {
                  openSidebar((prev) => !prev);
                  rippleEffect(e);
                }}
              >
                <List size={25} className="cursor-pointer" />
              </button>
            </div>
            <main className="flex-1 w-full px-8 shadow-inner-top max-w-7xl mx-auto mt-16">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
