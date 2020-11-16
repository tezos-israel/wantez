import React from 'react';

import Caret from './caret.svg';

export function Sort() {
  return (
    <div>
      <span className="mr-3 text-sm text-gray-500">Sort by:</span>
      <span className="text-sm text-blue-500">Created recent</span>
      <Caret />
    </div>
  );
}
