import Head from 'next/head';
import Home from 'components/Home';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>Wantez</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Creating cooperation between developer teams, freelancers, and entrepreneurs, Wantez incentivizes freelancers around the world to contribute code and fix bugs. Wantez allows open source maintainers to develop faster, more cost-efficiently operate and patch bugs, and avoid the hassle of hiring more developers."
        />
        <meta
          name="keywords"
          content="bugs, freelancers, github, gitlab, issue, gig, wantez, issues, fix, freelancer"
        />
      </Head>

      <Home />
    </>
  );
}
