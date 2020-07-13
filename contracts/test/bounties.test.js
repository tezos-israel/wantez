const Bounties = artifacts.require('Bounties');

contract('Bounties', () => {
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
    const issueBountyParameter = { bountyId: '1', deadline: timestamp };
    await bountiesInstance.issueBounty(issueBountyParameter.bountyId, issueBountyParameter.deadline);
    const storage = await bountiesInstance.storage();
    assert.equal(storage.size, 1, 'Storage was not set as 1.');
    const bounty = storage.get(issueBountyParameter.bountyId);
    assert.equal(bounty.bountyId, issueBountyParameter.bountyId, 'Bounty id was not saved');
    assert.equal(bounty.deadline, issueBountyParameter.deadline, 'Deadline was not saved');
  });

  // it('...should increment storage by 5.', async () => {
  //   await bountiesInstance.increment(5);
  //   storage = await bountiesInstance.storage();
  //   assert.equal(storage, 5, 'Storage was not incremented by 5.');
  // });

  // it('...should decrement storage by 2.', async () => {
  //   await bountiesInstance.decrement(2);
  //   storage = await bountiesInstance.storage();
  //   assert.equal(storage, 3, 'Storage was not decremented by 2.');
  // });

  // const SimpleStorage = artifacts.require('SimpleStorage');

  // contract('SimpleStorage', () => {
  //   it('...should store the integer 89.', async () => {
  //     const simpleStorageInstance = await SimpleStorage.deployed();
  //     await simpleStorageInstance.main(89);
  //     const storedInt = await simpleStorageInstance.storage();

  //     assert.equal(storedInt, 89, 'The integer 89 was not stored.');
  //   });
  // });
});
