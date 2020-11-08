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

type approveApplicationParameter = {
  bountyId: bountyId,
  applicant: address
};

type action = 
  | IssueBounty(issueBountyParameter)
  | RefundBounty(bountyId)
  | ApproveApplication(approveApplicationParameter);

type issuesList = map (bountyId, bounty);

type storage = {
  owner: address,
  issues: issuesList
};

type returnType = (list (operation), storage);

let issueBounty = (bountyId: bountyId, deadline: date, issuer: address, store: storage) : returnType => {
  if (Tezos.amount <= 0tez) {
    (failwith ("Amount needs to be positive") : returnType)
  } else {
    switch (Map.find_opt (bountyId, store.issues) : option(bounty)) {
      | Some(bounty) => failwith ("Bounty exists") : returnType
      | None => {
        let bounty : bounty = {
          bountyId: bountyId,
          deadline: deadline,
          balance: Tezos.amount,
          issuer: issuer
        };
        ([] : list(operation), {...store, issues: Map.update (bountyId, Some(bounty), store.issues)})
      }
    }
  }
}

let getContract = (ad: address) : contract(unit) => {
  switch (Tezos.get_contract_opt (ad) : option(contract(unit))) {
    | Some (contract) => contract
    | None => (failwith ("Not a contract") : (contract(unit)))
  }
}

let getBounty = (bountyId: bountyId, owner: address, store: storage) : bounty => {
  switch (Map.find_opt (bountyId, store.issues)) {
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
  let store : storage = {...store, issues: Map.update (bountyId, None : option(bounty), store.issues)};
  let issuerContract = getContract(bounty.issuer);
  let payment : operation = Tezos.transaction(unit, bounty.balance, issuerContract);
  ([payment] : list(operation), store)
}

let approveApplication = (bountyId: bountyId, applicant: address, store: storage) : returnType =>{
  let bounty = getBounty(bountyId, Tezos.source, store);
  let store : storage = {...store, issues: Map.update (bountyId, None : option(bounty), store.issues)};
  let applicantContract = getContract(applicant);
  let payment : operation = Tezos.transaction(unit, bounty.balance, applicantContract);
  ([payment] : list(operation), store)
}

let main = ((action, store) : (action, storage)) : returnType => 
  switch(action) {
    | IssueBounty(parameter) => issueBounty(parameter.bountyId, parameter.deadline, Tezos.source, store)
    | RefundBounty(bountyId) => refundBounty(bountyId, store)
    | ApproveApplication(parameter) => approveApplication(parameter.bountyId, parameter.applicant, store)
  }