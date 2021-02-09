import Particles from 'react-particles-js';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { SiteLogo } from 'images';

import Section from './Section';
import PrimaryImage from './primary.svg';

export default function Hero({ title, about }) {
  const showNavigationButtons =
    process.env.NEXT_PUBLIC_SHOW_ONLY_LANDING_PAGE === 'false';

  return (
    <Section
      renderBackground={({ backgroundClass }) => (
        <Particles className={backgroundClass} />
      )}
    >
      <div className="pt-30 sm:px-0 px-10 pb-40">
        <div className="top-5 left-5 absolute">
          <Link href="/">
            <a>
              <SiteLogo />
            </a>
          </Link>
        </div>
        <div className="xl:w-3/4 px-0 mx-auto">
          <div className="lg:flex-row-reverse lg:space-y-0 flex flex-col items-center justify-center mx-auto space-y-10">
            <PrimaryImage className="lg:w-3/4 w-11/12" />
            <div>
              <div className="sm:text-6xl font-museo text-5xl">{title}</div>
              {showNavigationButtons && (
                <div className="sm:space-x-5 sm:flex sm:space-y-0 mt-10 space-y-5 text-xl">
                  <LinkButton href="/fund">Fund</LinkButton>
                  <LinkButton href="/explore">Explore</LinkButton>
                </div>
              )}
            </div>
          </div>
          <div className="xl:w-3/4 sm:text-center sm:mt-20 flex items-center justify-center mx-auto mt-10 text-lg">
            {about}
          </div>
        </div>
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
      <a className="hover:bg-green-400 sm:w-40 block py-1 text-center border-2 border-green-400 rounded">
        {children}
      </a>
    </Link>
  );
}

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
};
