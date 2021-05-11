const { mnemonic, secret, password, email } = require('./faucet.json');
const { alice } = require('./scripts/sandbox/accounts');

module.exports = {
  networks: {
    development: {
      host: 'http://localhost',
      port: 20000,
      network_id: '*',
      secretKey: alice.sk,
      type: 'tezos',
    },
    testnet: {
      host: 'http://florencenet.tezos.co.il',
      port: 8732,
      network_id: '*',
      secret,
      mnemonic,
      password,
      email,
      type: 'tezos',
    },
  },
};
