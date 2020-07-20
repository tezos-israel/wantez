import React from "react";
import { useTezosContext } from "hooks/TezosContext";

export default function Home() {
  const {
    address,
    balance,
    bounties,
    connected,
    error,
    loading,
  } = useTezosContext();
  return (
    <div>
      {/* <div>Counter: {storage}</div> */}
      {connected && (
        <>
          <div>Address: {address}</div>
          <div>Balance: {balance}</div>
        </>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
