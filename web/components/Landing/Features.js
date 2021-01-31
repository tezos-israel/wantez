import PropTypes from 'prop-types';
import classnames from 'classnames';
import Image from 'next/image';

export function Features({ features }) {
  return (
    <div className="w-1/2 m-auto">
      <div className="space-y-10">
        {features.map((section, index) => (
          <div
            className={classnames(
              'flex items-center',
              index % 2 ? 'flex-row-reverse' : 'flex-row'
            )}
            key={index}
          >
            <div className="w-80 h-80 mx-10">
              <Image
                src={section.imageUrl}
                alt={section.title}
                aria-hidden="true"
                className="w-full h-full"
                width="320"
                height="320"
              />
            </div>
            <div className="flex-1 p-10">
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
