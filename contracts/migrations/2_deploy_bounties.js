const Bounties = artifacts.require("Bounties");

const { MichelsonMap } = require("@taquito/taquito");

module.exports = deployer => {
  deployer.deploy(Bounties, new MichelsonMap());
};
