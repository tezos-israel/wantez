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

let issueBounty = (bountyId: bountyId, deadline: date, issuer: address, store: storage) : returnType => {
  if (Tezos.amount <= 0tez) {
    (failwith ("Amount needs to be positive") : returnType)
  } else {
    switch (Map.find_opt (bountyId, store) : option(bounty)) {
      | Some(bounty) => failwith ("Bounty exists") : returnType
      | None => {
        let bounty : bounty = {
          bountyId: bountyId,
          deadline: deadline,
          balance: Tezos.amount,
          issuer: issuer
        };
        ([] : list(operation), Map.update ((bountyId), Some(bounty), store))
      }
    }
  }
}

let getBountyIssuer = (bounty: bounty) : contract(unit) => {
  switch (Tezos.get_contract_opt (bounty.issuer) : option(contract(unit))) {
    | Some (contract) => contract
    | None => (failwith ("Not a contract") : (contract(unit)))
  }
}

let getBounty = (bountyId: bountyId, owner: address, store: storage) : bounty => {
  switch (Map.find_opt (bountyId, store)) {
    | Some(bounty) => {
        if (bounty.issuer != owner) {
          failwith("Wrong issuer") : bounty
        } else {
          bounty
        }
    }
    | None => failwith ("Can't find bounty") : bounty
  }
}

let refundBounty = (bountyId: bountyId, store: storage) : returnType => {
  let bounty = getBounty(bountyId, Tezos.source, store);
  let store : storage = Map.update (bountyId, None : option(bounty), store);
  let issuerContract = getBountyIssuer(bounty);
  let payment : operation = Tezos.transaction(unit, bounty.balance, issuerContract);
  ([payment] : list(operation), store)
}

let acceptBounty = (bountyId: bountyId, approved: address, store: storage) : returnType =>
  ([] : list(operation), store)

let main = ((action, store) : (action, storage)) : returnType => 
  switch(action) {
    | IssueBounty(parameter) => issueBounty(parameter.bountyId, parameter.deadline, Tezos.source, store)
    | RefundBounty(bountyId) => refundBounty(bountyId, store)
    | AcceptBounty(parameter) => acceptBounty(parameter.bountyId, parameter.approved, store)
  }