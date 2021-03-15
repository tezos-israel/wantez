import React from 'react';
import PropTypes from 'prop-types';

export function ActionsMenu({ onLogout }) {
  return (
    <div className="top-12 absolute left-0 flex flex-col min-w-full bg-white border rounded-md shadow-md">
      <ul>
        <li className="px-4 py-3 text-sm">
          <button className="font-semibold text-gray-700" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

ActionsMenu.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
