const Contract = artifacts.require('WantezGigs');

const { MichelsonMap } = require('@taquito/taquito');

module.exports = (deployer, _, accounts) => {
  deployer.deploy(Contract, { gigs: new MichelsonMap(), owner: accounts[0] });
};
