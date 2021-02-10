import React from 'react';
import PropTypes from 'prop-types';

function GigTags({ tags }) {
  return (
    <div className="lg:px-10 mb-7 px-5">
      <ul className="block">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="inline-block px-3 py-1 text-sm bg-gray-200"
          >
            {tag.tag_id}
          </li>
        ))}
      </ul>
    </div>
  );
}

GigTags.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      tag_id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default GigTags;
