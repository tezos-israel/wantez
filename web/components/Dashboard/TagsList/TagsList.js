import PropTypes from 'prop-types';

import { Tag } from './Tag';
import { SearchBox } from './SearchBox';

export function TagsList({ tags, onChange }) {
  return (
    <div className="flex items-center h-full px-8 space-x-3">
      {tags.map((tag, index) => (
        <Tag key={tag} value={tag} onRemoveClick={() => handleRemove(index)} />
      ))}
      <SearchBox onChange={handleSearchChange} />
    </div>
  );

  function handleSearchChange(value) {
    if (tags.includes(value)) {
      return;
    }
    onChange([...tags, value]);
  }

  function handleRemove(index) {
    onChange([...tags.slice(0, index), ...tags.slice(index + 1)]);
  }
}

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
