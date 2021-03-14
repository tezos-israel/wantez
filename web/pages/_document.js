import Document, { Html, Head, Main, NextScript } from 'next/document';
import GTMScript from 'components/GTMScript';
import GTMNoScript from 'components/GTMNoScript';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <GTMScript gtmId={process.env.GTM_ID} />
          <title>Wantez - Where Tezos Builds</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Creating cooperation between developer teams, freelancers, and entrepreneurs, Wantez incentivizes freelancers around the world to contribute code and fix bugs. Wantez allows open source maintainers to develop faster, more cost-efficiently operate and patch bugs, and avoid the hassle of hiring more developers."
          />
          <meta
            name="keywords"
            content="bugs, freelancers, github, gitlab, issue, gig, wantez, issues, fix, freelancer"
          />
        </Head>
        <body>
          <GTMNoScript gtmId={process.env.GTM_ID} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
