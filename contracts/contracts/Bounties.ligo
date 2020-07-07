type bountyId = string;
type date = int;
type bounty = {
  issuer: address,
  deadline: date,
  balance: tez,
  bountyId: bountyId
};

type issueBountyParameter = {
  bountyId: bountyId,
  deadline: date,
};

type accpetBountyParameter = {
  bountyId: bountyId,
  approved: address
};

type action = 
  | IssueBounty(issueBountyParameter)
  | RefundBounty(bountyId)
  | AcceptBounty(accpetBountyParameter);

type storage = map (bountyId, bounty);
type returnType = (list (operation), storage);

let issueBounty = (bountyId: bountyId, deadline: date, store: storage) : returnType => 
  ([] : list(operation), store)

let refundBounty = (bountyId: bountyId, store: storage) : returnType =>
  ([] : list(operation), store)

let acceptBounty = (bountyId: bountyId, approved: address, store: storage) : returnType =>
  ([] : list(operation), store)

let main = ((action, store) : (action, storage)) : returnType => 
  switch(action) {
    | IssueBounty(parameter) => issueBounty(parameter.bountyId, parameter.deadline, store)
    | RefundBounty(bountyId) => refundBounty(bountyId, store)
    | AcceptBounty(parameter) => acceptBounty(parameter.bountyId, parameter.approved, store)
  }