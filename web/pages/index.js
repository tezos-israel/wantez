import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

import Logo from '../images/site-logo.svg';

import { UserButtons } from 'components/UserButtons';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Wantez</title>
      </Head>

      <div className="bg-gradient-to-l from-nava to-navb w-full h-screen text-white">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <UserButtons />
        </div>
        <div className="flex flex-col items-start justify-center w-1/2 h-screen mx-auto">
          <Logo />
          <div className="mt-10 text-6xl">Join the Community</div>
          <div className="flex w-full mt-40 space-x-4">
            <Link href="/explore">
              <a
                className="block w-1/3 py-5 text-center uppercase bg-black rounded-md"
                style={{
                  backgroundImage: 'linear-gradient(264deg, #2a77ec, #0c326d)',
                }}
              >
                Explore
              </a>
            </Link>
            <Link href="/fund">
              <a className="block w-1/3 py-5 text-center uppercase border-2 border-white rounded-md">
                Fund
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
