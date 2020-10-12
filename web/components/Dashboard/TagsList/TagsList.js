import React from 'react';

import { Tag } from './Tag';
import { SearchBox } from './SearchBox';

export function TagsList() {
  return (
    <div className="flex items-center h-full px-8 space-x-3">
      <Tag value="Tag 1" />
      <Tag value="Tag 2" />
      <SearchBox />
    </div>
  );
}
