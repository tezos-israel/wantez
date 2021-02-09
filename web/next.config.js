const withPlugins = require('next-compose-plugins');
const transpileModulesPluginFactory = require('next-transpile-modules');
const imagesPlugin = require('next-images');

const transpileModulesPlugins = transpileModulesPluginFactory([
  '@tezos-il/tezos-react-hooks',
]);

module.exports = withPlugins([[transpileModulesPlugins], [imagesPlugin]], {
  // webpack/next config here
});
