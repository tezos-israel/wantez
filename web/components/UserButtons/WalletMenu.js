import React from 'react';
import PropTypes from 'prop-types';
import WalletIcon from './wallet-icon.svg';
// import Caret from './caret.svg';

export function WalletMenu({ address = '', onClick }) {
  const shortAddress = `${address.substr(0, 5)}...${address.substr(-5)}`;

  return (
    <div
      className={`flex items-center space-x-3 ${
        address ? 'logged-in' : 'logged-out'
      }`}
    >
      {/* <Caret /> */}
      {address && <span className="text-xs text-white">{shortAddress}</span>}
      <button className="relative flex" onClick={onClick}>
        {!address && (
          <div className="mr-3 text-sm font-bold text-green-400">
            Connect wallet
          </div>
        )}
        <WalletIcon />
      </button>
    </div>
  );
}

WalletMenu.propTypes = {
  address: PropTypes.string,
  balance: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};
