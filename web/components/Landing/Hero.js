import PropTypes from 'prop-types';
import Particles from 'react-particles-js';

import Section from './Section';
import Logo from '../../images/site-logo.svg';
import PrimaryImage from './primary.svg';

export function Hero({ title, about }) {
  return (
    <Section>
      <div className="pt-30 pb-40">
        <div className="top-5 left-5 absolute">
          <Logo />
        </div>
        <div className=" flex items-center justify-center w-1/2 mx-auto">
          <div className={'text-6xl font-museo'}>{title}</div>
          <PrimaryImage />
        </div>
        <div className="flex items-center justify-center w-1/3 mx-auto mt-10 text-lg text-center">
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
