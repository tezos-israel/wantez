import PropTypes from 'prop-types';
import Button from '@shared/Button';

import OhNoLogo from './oh-no.svg';

export default function NotLoggedIn({ onDismiss }) {
  return (
    <div className="font-museo flex flex-col items-center">
      <div className="font-museo space-y-5 text-center text-gray-500">
        <header className="flex items-center justify-center">
          <OhNoLogo className="mr-4" />
          <h1 className="text-3xl font-bold">On No</h1>
        </header>
        <div className="text-center">
          <p className="font-bold">please connect your mail & wallet..</p>
          <p className="font-thin">(on the top right of this page)</p>
        </div>
      </div>

      <Button size="small" color="primary" onClick={onDismiss} className="mt-5">
        Got it
      </Button>
    </div>
  );
}
NotLoggedIn.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};
