import PropTypes from 'prop-types';
import Particles from 'react-particles-js';

import Section from './Section';
import Logo from '../../images/site-logo.svg';
import PrimaryImage from './primary.svg';

export default function Hero({ title, about }) {
  return (
    <Section>
      <div className="pt-30 sm:px-0 px-10 pb-40">
        <div className="top-5 left-5 absolute">
          <Logo />
        </div>
        <div className="sm:w-1/2 flex items-center justify-center mx-auto">
          <div className={'text-6xl font-museo'}>{title}</div>
          <PrimaryImage className="sm:block hidden" />
        </div>
        <div className="sm:w-1/3 sm:text-center flex items-center justify-center mx-auto mt-10 text-lg">
          {about}
        </div>

        <Particles className="absolute inset-0" />
      </div>
    </Section>
  );
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};
