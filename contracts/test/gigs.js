const Contract = artifacts.require('WantezGigs');

contract('WantezGigs', (addresses) => {
  let contractInstance;

  before(async () => {
    contractInstance = await Contract.deployed();
    console.log('Test Contract deployed at:', contractInstance.address);
  });

  it('should have initial empty storage', async () => {
    const storage = await contractInstance.storage();
    assert.equal(storage.gigs.size, 0, 'Storage was not set as 0.');
  });

  it('should insert gig', async () => {
    const timestamp = Date.now();
    const amount = Math.floor(Math.random() * 100);
    const fundParameter = { gigId: '1', deadline: timestamp };
    await contractInstance.fund(fundParameter.gigId, fundParameter.deadline, {
      amount,
    });
    const storage = await contractInstance.storage();
    assert.equal(storage.gigs.size, 1, 'Storage was not set as 1.');
    const gig = storage.gigs.get(fundParameter.gigId);
    assert.equal(gig.gigId, fundParameter.gigId, 'Gig id was not saved');
    assert.equal(
      gig.deadline,
      fundParameter.deadline,
      'Deadline was not saved'
    );
    assert.equal(gig.issuer, addresses[0], 'Issuer address is not correct');
  });

  it('should fail when trying to insert same gig id', async () => {
    const timestamp = Date.now();
    const amount = Math.floor(Math.random() * 100);
    const fundParameter = { gigId: '2', deadline: timestamp };
    await contractInstance.fund(fundParameter.gigId, fundParameter.deadline, {
      amount,
    });
    let failwith = '';
    try {
      await contractInstance.fund(fundParameter.gigId, fundParameter.deadline, {
        amount,
      });
    } catch (e) {
      failwith = e.message;
    }
    assert.equal(failwith, 'Gig exists');
  });

  it('should refund an existing gig', async () => {
    const timestamp = Date.now();
    const amount = Math.floor(Math.random() * 100);
    const fundParameter = { gigId: '3', deadline: timestamp };
    await contractInstance.fund(fundParameter.gigId, fundParameter.deadline, {
      amount,
    });
    await contractInstance.refund(fundParameter.gigId);
    // todo check that there's a transaction to account[0]
    const storage = await contractInstance.storage();
    const gig = storage.gigs.get(fundParameter.gigId);
    assert.equal(gig, null, 'Gig still exists');
  });

  it('should fail if trying to refund a non existent gig', async () => {
    let failwith = '';
    try {
      await contractInstance.refund(`doesnt exist`);
    } catch (e) {
      failwith = e.message;
    }
    assert.equal(failwith, "Can't find gig");
  });

  it.skip('should fail when refunder is not the issuer', async () => {});

  it('should fail if trying to approve a non existent gig', async () => {
    let failwith = '';
    try {
      await contractInstance.approveApplication(addresses[0], 'dosnt exist');
    } catch (e) {
      failwith = e.message;
    }
    assert.equal(failwith, "Can't find gig");
  });

  it.skip('should fail if trying to approve by non owner', async () => {});
  it('when gig is approved, funds should transfer to approved account, and gig should be deleted', async () => {
    const timestamp = Date.now();
    const amount = Math.floor(Math.random() * 100);
    const fundParameter = { gigId: '3', deadline: timestamp };
    await contractInstance.fund(fundParameter.gigId, fundParameter.deadline, {
      amount,
    });
    await contractInstance.refund(fundParameter.gigId);
    // todo check that there's a transaction to approved
    const storage = await contractInstance.storage();
    const gig = storage.gigs.get(fundParameter.gigId);
    assert.equal(gig, null, 'Gig still exists');
  });
});
