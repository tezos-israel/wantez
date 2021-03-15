import React, { useState } from 'react';
import PropTypes from 'prop-types';
import WalletIcon from './wallet-icon.svg';
import ArrowDown from './arrow-down.svg';
import { ActionsMenu } from './ActionsMenu.js';
// import Caret from './caret.svg';

export function WalletMenu({ address = '', onClick, onLogout }) {
  const shortAddress = `${address.substr(0, 5)}...${address.substr(-5)}`;
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  return (
    <div
      className={`flex items-center space-x-3${
        address ? 'logged-in' : 'logged-out'
      }`}
    >
      {/* <Caret /> */}
      {address && (
        <div className="relative">
          <button className="focus:outline-none" onClick={toggleActionsMenu}>
            <ArrowDown />
          </button>
          <span className="inline-block mx-3 text-xs text-white">
            {shortAddress}
          </span>
          {showActionsMenu && <ActionsMenu onLogout={onLogout} />}
        </div>
      )}
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

  function toggleActionsMenu() {
    setShowActionsMenu(!showActionsMenu);
  }
}

WalletMenu.propTypes = {
  address: PropTypes.string,
  balance: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
