const withTM = require('next-transpile-modules')([
  '@tezos-il/tezos-react-hooks',
]);

module.exports = withTM({
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
  jsconfigPaths: true,
  trailingSlash: true,
});
