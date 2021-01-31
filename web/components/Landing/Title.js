import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import classnames from 'classnames';

import { useScreenSize } from 'hooks/useScreenSize';
import Logo from '../../images/site-logo.svg';
import PrimaryImage from './primary.svg';
import BottomBorder from './bottom-border.svg';
import styles from './Title.module.css';

export function Title({ title, about }) {
  const { width } = useScreenSize();
  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-500 pt-30 pb-52 relative w-full overflow-x-hidden text-white">
      <div className="top-5 left-5 absolute">
        <Logo />
      </div>
      <div className=" flex items-center justify-center w-1/2 mx-auto">
        <div className={classnames('text-6xl', styles.title)}>{title}</div>
        <PrimaryImage />
      </div>
      <div className="flex items-center justify-center w-1/3 mx-auto mt-10 text-lg text-center">
        {about}
      </div>
      <div className="absolute bottom-0 flex">
        {Array.from({ length: Math.ceil(width / 1740) }).map((_, i) => (
          <BottomBorder key={i} />
        ))}
      </div>
      <Particles className="absolute inset-0" />
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};
