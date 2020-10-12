import React from 'react';
import { Checkbox } from './Checkbox';

export function FilterOption() {
  return (
    <div>
      <h3 className="mb-3 font-bold text-teal-400">Status</h3>
      <ul className="space-y-3 text-white">
        <li>
          <Checkbox label="3 work submitted" />
        </li>
        <li>
          <Checkbox label="3 work submitted" />
        </li>
        <li>
          <Checkbox label="3 work submitted" />
        </li>
        <li>
          <Checkbox label="3 work submitted" />
        </li>
      </ul>
    </div>
  );
}
