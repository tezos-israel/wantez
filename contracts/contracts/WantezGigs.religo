type gigId = string;
type date = int;
type gig = {
  issuer: address,
  deadline: date,
  balance: tez,
  gigId: gigId
};

type action = 
  | Fund((gigId, date))
  | Refund(gigId)
  | ApproveApplication((gigId, address));

type gigsList = map (gigId, gig);

type storage = {
  owner: address,
  gigs: gigsList
};

type returnType = (list (operation), storage);

let fund = (gigId: gigId, deadline: date, issuer: address, store: storage) : returnType => {
  if (Tezos.amount <= 0tez) {
    (failwith ("Amount needs to be positive") : returnType)
  } else {
    switch (Map.find_opt (gigId, store.gigs) : option(gig)) {
      | Some(gig) => (failwith ("Gig exists") : returnType)
      | None => {
        let gig : gig = {
          gigId: gigId,
          deadline: deadline,
          balance: Tezos.amount,
          issuer: issuer
        };
        ([] : list(operation), {...store, gigs: Map.update (gigId, Some(gig), store.gigs)})
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

let getGig = (gigId: gigId, owner: address, store: storage) : gig => {
  switch (Map.find_opt (gigId, store.gigs)) {
    | Some(gig) => {
        if (gig.issuer != owner && store.owner != owner) {
          (failwith("Wrong sender") : gig)
        } else {
          gig
        }
    }
    | None => (failwith ("Can't find gig") : gig)
  }
}

let refund = (gigId: gigId, store: storage) : returnType => {
  let gig = getGig(gigId, Tezos.sender, store);
  let store : storage = {...store, gigs: Map.update (gigId, None : option(gig), store.gigs)};
  let issuerContract = getContract(gig.issuer);
  let payment : operation = Tezos.transaction(unit, gig.balance, issuerContract);
  ([payment] : list(operation), store)
}

let approveApplication = (gigId: gigId, applicant: address, store: storage) : returnType =>{
  let gig = getGig(gigId, Tezos.sender, store);
  let store : storage = {...store, gigs: Map.update (gigId, None : option(gig), store.gigs)};
  let applicantContract = getContract(applicant);
  let payment : operation = Tezos.transaction(unit, gig.balance, applicantContract);
  ([payment] : list(operation), store)
}

let main = ((action, store) : (action, storage)) : returnType => 
  switch(action) {
    | Fund(parameter) => fund(parameter[0], parameter[1], Tezos.source, store)
    | Refund(gigId) => refund(gigId, store)
    | ApproveApplication(parameter) => approveApplication(parameter[0], parameter[1], store)
  }