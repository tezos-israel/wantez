const Bounties = artifacts.require('Bounties');

contract('Bounties', (addresses) => {
  let bountiesInstance;

  before(async () => {
    bountiesInstance = await Bounties.deployed();
    console.log('Contract deployed at:', bountiesInstance.address);
  });

  it('...should have initial empty storage', async () => {
    const storage = await bountiesInstance.storage();
    assert.equal(storage.size, 0, 'Storage was not set as 0.');
  });

  it('...should insert bounty', async () => {
    const timestamp = Date.now();
    const amount = Math.floor(Math.random() * 100);
    const issueBountyParameter = { bountyId: '1', deadline: timestamp };
    await bountiesInstance.issueBounty(issueBountyParameter.bountyId, issueBountyParameter.deadline, { amount });
    const storage = await bountiesInstance.storage();
    assert.equal(storage.size, 1, 'Storage was not set as 1.');
    const bounty = storage.get(issueBountyParameter.bountyId);
    assert.equal(bounty.bountyId, issueBountyParameter.bountyId, 'Bounty id was not saved');
    assert.equal(bounty.deadline, issueBountyParameter.deadline, 'Deadline was not saved');
    assert.equal(bounty.issuer, addresses[0], 'Issuer address is not correct');
  });

  it('...should fail when trying to insert same bounty id', async () => {
    const timestamp = Date.now();
    const amount = Math.floor(Math.random() * 100);
    const issueBountyParameter = { bountyId: '2', deadline: timestamp };
    await bountiesInstance.issueBounty(issueBountyParameter.bountyId, issueBountyParameter.deadline, { amount });
    let failwith = '';
    try {
      await bountiesInstance.issueBounty(issueBountyParameter.bountyId, issueBountyParameter.deadline, { amount });
    } catch (e) {
      failwith = e.message;
    }
    assert.equal(failwith, 'Bounty exists');
  });

  it('...should refund an existing bounty', async () => {
    const timestamp = Date.now();
    const amount = Math.floor(Math.random() * 100);
    const issueBountyParameter = { bountyId: '3', deadline: timestamp };
    await bountiesInstance.issueBounty(issueBountyParameter.bountyId, issueBountyParameter.deadline, { amount });
    const op = await bountiesInstance.refundBounty(issueBountyParameter.bountyId);
    // todo check that there's a transaction to account[0]
    const storage = await bountiesInstance.storage();
    const bounty = storage.get(issueBountyParameter.bountyId);
    assert.equal(bounty, null, 'Bounty still exists');
  });

  it('...should fail when refunder is not the issuer', async () => {});
});
