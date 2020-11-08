const Bounties = artifacts.require('Bounties');

const { MichelsonMap } = require('@taquito/taquito');

module.exports = (deployer, _, accounts) => {
  deployer.deploy(Bounties, { issues: new MichelsonMap(), owner: accounts[0] });
};
