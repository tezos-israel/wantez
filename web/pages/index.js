import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import Logo from 'images/site-logo.svg';

import { UserButtons } from 'components/UserButtons';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Wantez</title>
      </Head>

      <div className="w-full h-screen bg-gradient-to-l from-nava to-navb text-white">
        <div className="absolute right-0 top-0 mt-4 mr-4">
          <UserButtons />
        </div>
        <div className="flex justify-center items-start h-screen flex-col w-7/12 mx-auto">
          <Logo className="w-1/2" />
          <div className="mt-10 text-6xl">Join the Community</div>
          <div className="mt-40 flex w-full space-x-4 justify-center">
            <Link href="/explore">
              <a
                className="block w-1/3 py-5 uppercase text-center bg-black rounded-md"
                style={{
                  backgroundImage: 'linear-gradient(264deg, #2a77ec, #0c326d)',
                }}
              >
                Explore
              </a>
            </Link>
            <Link href="/fund">
              <a className="block w-1/3 py-5 uppercase text-center border-2 rounded-md border-white">
                Fund
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
