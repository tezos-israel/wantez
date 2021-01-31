import Head from 'next/head';
import { LandingPage } from 'components/Landing';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Wantez</title>
      </Head>

      <LandingPage />
    </>
  );
}
