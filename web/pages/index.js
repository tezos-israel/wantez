import React from "react";

import { Tezos } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";

const CONTRACT_ADDRESS = "KT1Pr95RqvHiPUA7q9X6d464YXe2oZADznYJ";

export default function Home() {
  const {
    initialized,
    address,
    error: walletError,
    connect: connectToWallet,
  } = useWallet();
  const {
    contract,
    connect: connectToContract,
    error: contractError,
    storage,
    increaseOps,
    opsCounter,
  } = useContract();
  const { balance, balanceError } = useBalanceState(address, opsCounter);

  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function activateMethod(cb) {
    if (!contract) {
      return;
    }
    setLoading(true);
    try {
      const op = await cb(contract.methods);
      await op.confirmation();
      increaseOps();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  function increment() {
    activateMethod((c) => c.increment(1).send());
  }

  function decrement() {
    activateMethod((c) => c.decrement(1).send());
  }

  React.useEffect(() => {
    connect();

    async function connect() {
      setLoading(true);
      await connectToWallet();
      await connectToContract();
      increaseOps();
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <div>Counter: {storage}</div>
      {initialized && (
        <>
          <div>Address: {address}</div>
          <div>Balance: {balance}</div>
        </>
      )}
      {walletError && <div>Wallet Error: {walletError}</div>}
      {balanceError && <div>Balance Error: {balanceError}</div>}
      {contractError && <div>Contract Error: {contractError}</div>}
      {error && <div>Operation Error: {error}</div>}

      {initialized && (
        <>
          <button onClick={increment} disabled={loading}>
            Increase
          </button>
          <button onClick={decrement} disabled={loading}>
            Decrease
          </button>
        </>
      )}
    </div>
  );
}

function useWallet() {
  const [initialized, setInit] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [error, setError] = React.useState("");

  return { initialized, address, error, connect };

  async function connect() {
    try {
      const { address } = await initWallet();
      setInit(true);
      setAddress(address);
      return { address };
    } catch (error) {
      setError(error.message);
    }
  }

  async function initWallet() {
    Tezos.setProvider({ rpc: "https://carthagenet.SmartPy.io" });
    const options = {
      name: "TzGit counter test",
    };
    const wallet = new BeaconWallet(options);
    const network = { type: "carthagenet" };
    await wallet.requestPermissions({ network });
    Tezos.setWalletProvider(wallet);

    const address = wallet.permissions.address;
    return { address };
  }
}

function useContract() {
  const [contract, setContract] = React.useState();
  const [error, setError] = React.useState("");
  const [opsCounter, setOpsCounter] = React.useState(0);
  const [storage, setStorage] = React.useState(0);

  React.useEffect(() => {
    loadStorage();

    async function loadStorage() {
      if (!contract) {
        return;
      }
      try {
        const storage = await contract.storage();
        setStorage(Number(storage));
      } catch (e) {
        setError(e.message);
      }
    }
  }, [opsCounter]);

  return { contract, error, opsCounter, storage, connect, increaseOps };

  async function connect() {
    try {
      const contractInstance = await Tezos.wallet.at(CONTRACT_ADDRESS);
      setContract(contractInstance);
    } catch (err) {
      setError(err.message);
    }
  }

  function increaseOps() {
    setOpsCounter(opsCounter + 1);
  }
}

function useBalanceState(address, opsCounter) {
  const [balance, setBalance] = React.useState(0);
  const [balanceError, setBalanceError] = React.useState("");

  React.useEffect(() => {
    loadBalance(address);
  }, [address, opsCounter]);

  return { balance, balanceError };

  async function loadBalance(address) {
    if (!address) {
      return;
    }
    try {
      const balance = await Tezos.tz.getBalance(address);
      setBalance(balance / 10 ** 6);
    } catch (e) {
      setBalanceError(e.message);
    }
  }
}
