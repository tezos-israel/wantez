import PropTypes from 'prop-types';
import classnames from 'classnames';
import Image from 'next/image';

export default function Features({ features }) {
  return (
    <div className="lg:w-1/2 lg:mx-auto lg:px-0 lg:mt-0 px-10 mt-20">
      <div className="space-y-30 sm:space-y-10">
        {features.map((section, index) => (
          <div
            className={classnames(
              'lg:flex lg:items-center space-y-10 lg:space-y-0',
              index % 2 ? 'lg:flex-row-reverse' : 'lg:flex-row'
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
