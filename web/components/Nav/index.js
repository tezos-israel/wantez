import React from "react";
import PropTypes from "prop-types";

import Link from "next/link";


import UserButtons from "./UserButtons";

export default function Nav({
  loading,
  user,
  balance,
  address,
  onLogout,
}) {
  const shortAddress = `${address.substr(0, 5)}...${address.substr(-5)}`;
  return (
      <div>
        <div className="title">
          Wantez
        </div>

        <button type="submit" color="primary">
          <Link href="/">Bounties</Link>
        </button >
        {!loading && user && (
          <>
            <button type="submit">
              <Link href="/bounty/create">Create Bounty</Link>
            </button>
          </>
        )}
        <div>
          <div>{!loading && shortAddress}</div>
          <div>{!loading && balance}</div>
          <UserButtons user={user} loading={loading} onLogout={onLogout} />
        </div>
      </div>
  );
}

Nav.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.any,
  className: PropTypes.string,
  address: PropTypes.string,
  balance: PropTypes.number,
  onLogout: PropTypes.func.isRequired,
};
