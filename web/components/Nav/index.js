import PropTypes from 'prop-types';
import Link from 'next/link';

import Logo from '../../images/site-logo.svg';

import { UserButtons } from 'components/UserButtons';
import { isMainnet } from 'lib/networks';
export default function Nav({ network }) {
  return (
    <nav className="bg-gradient-to-l from-nava to-navb fixed flex items-center w-full h-20 px-6">
      <Link href="/">
        <a>
          <Logo className="mb-1" />
        </a>
      </Link>

      <div className="ml-20 space-x-6 text-white">
        <Link href="/explore">Explore</Link>
        <Link href="/fund">Fund</Link>
      </div>
      {!isMainnet(network) && (
        <div className="p-2 mx-auto bg-red-300 rounded-sm">{network.id}</div>
      )}

      <UserButtons />
    </nav>
  );
}

Nav.propTypes = {
  network: PropTypes.object.isRequired,
};
