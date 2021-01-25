import React from 'react';
import classnames from 'classnames';

function Divider({ className }) {
  return (
    <div
      className={classnames(
        `my-4 border-t-2 border-gray-300 border-solid`,
        className
      )}
    ></div>
  );
}

export default Divider;
