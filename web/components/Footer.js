import React from 'react';
// import PropTypes from 'prop-types';
import Logo from '../images/site-logo.svg';

export default function Footer() {
  return (
    <div className="bg-gradient-to-l from-nava to-navb sm:flex-row sm:items-end sm:justify-between sm:space-y-0 flex flex-col items-center p-10 space-y-10">
      <Logo className="mb-1" />
      <div className="text-sm text-gray-600">
        © All rights reserved to Tezos Israel {new Date().getFullYear()}
      </div>
      <div className="flex space-x-3">
        {[1, 2, 3, 4, 5].map((e) => (
          <div
            key={e}
            className="w-5 h-5 bg-white rounded-full opacity-25"
          ></div>
        ))}
      </div>
    </div>
  );
}
