import PropTypes from 'prop-types';
import classnames from 'classnames';
import Image from 'next/image';

export default function Features({ features }) {
  return (
    <div className="sm:w-1/2 sm:mx-auto sm:px-0 px-10">
      <div className="space-y-30 sm:space-y-10">
        {features.map((section, index) => (
          <div
            className={classnames(
              'sm:flex sm:items-center space-y-10 sm:space-y-0',
              index % 2 ? 'sm:flex-row-reverse' : 'sm:flex-row'
            )}
            key={index}
          >
            <div className="sm:w-80 sm:h-80 w-40 h-40 mx-10">
              <Image
                src={section.imageUrl}
                alt={section.title}
                aria-hidden="true"
                className="w-full h-full"
                width="320"
                height="320"
              />
            </div>
            <div className="sm:p-10 sm:flex-1">
              <h2 className="font-museo mb-8 text-5xl font-bold text-blue-500">
                {section.title}
              </h2>
              <div className="text-lg font-light">{section.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
Features.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};