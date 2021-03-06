import PropTypes from 'prop-types';
import clsx from 'classnames';

import Section from './Section';

export default function Vision({ title, text }) {
  return (
    <Section
      renderBackground={({ backgroundClass }) => (
        <>
          <img
            src={require('./vision-bg.png')}
            className={clsx(backgroundClass, 'w-full hidden sm:block h-full')}
          />
          <div className={clsx('sm:hidden block', backgroundClass)} />
        </>
      )}
    >
      <div className="lg:px-0 lg:w-3/4 sm:flex sm:space-y-0 justify-between px-10 py-32 mx-auto space-y-10">
        <h2 className="font-museo sm:w-1/3 text-5xl font-bold">{title}</h2>
        <div className="sm:w-1/2 text-xl font-light">{text}</div>
      </div>
    </Section>
  );
}

Vision.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
