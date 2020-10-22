import React from 'react';
import Link from 'next/link';

export default function IndexPage() {
  return (
    <>
      <Link href="/explore">Explore</Link>
      <Link href="/fund">Fund</Link>
    </>
  );
}
