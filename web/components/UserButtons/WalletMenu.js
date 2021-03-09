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
        <button className="relative" onClick={onClick}>
          {!address && (
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-red-500 rounded-full"></div>
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
