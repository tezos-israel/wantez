import React from 'react';
import PropTypes from 'prop-types';

export function ActionsMenu({ onLogout, actionsMenuRef }) {
  return (
    <div
      className="top-12 absolute left-0 flex flex-col min-w-full bg-white border rounded-md shadow-md"
      ref={actionsMenuRef}
    >
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
  actionsMenuRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};
