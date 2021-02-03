import PropTypes from 'prop-types';
// import Particles from 'react-particles-js';
import Link from 'next/link';

import Section from './Section';
import Logo from '../../images/site-logo.svg';
import PrimaryImage from './primary.svg';

export default function Hero({ title, about }) {
  const showNavigationButtons =
    process.env.NEXT_PUBLIC_SHOW_ONLY_LANDING_PAGE === 'false';

  return (
    <Section>
      <div className="pt-30 sm:px-0 px-10 pb-40">
        <div className="top-5 left-5 absolute">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
        </div>
        <div className="sm:w-1/2 flex items-center justify-center mx-auto">
          <div>
            <div className={'text-6xl font-museo'}>{title}</div>
            {showNavigationButtons && (
              <div className="flex mt-10 space-x-5 text-xl">
                <LinkButton href="/fund">Fund</LinkButton>
                <LinkButton href="/explore">Explore</LinkButton>
              </div>
            )}
          </div>
          <PrimaryImage className="sm:block hidden" />
        </div>
        <div className="sm:w-1/3 sm:text-center flex items-center justify-center mx-auto mt-10 text-lg">
          {about}
        </div>

        {/* <Particles className="absolute inset-0" /> */}
      </div>
    </Section>
  );
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

function LinkButton({ children, href }) {
  return (
    <Link href={href}>
      <a className="hover:bg-green-400 block w-40 py-1 text-center border-2 border-green-400 rounded">
        {children}
      </a>
    </Link>
  );
}

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
};
