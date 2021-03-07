import PropTypes from 'prop-types';

import Dialog from '@shared/CardDialog';
import Button from '@shared/Button';

import OhNoLogo from './oh-no.svg';

export default function NotLoggedInDialog({ onDismiss }) {
  return (
    <Dialog onDismiss={onDismiss} aria-label="Not logged-in Dialog">
      <Content onDismiss={onDismiss} />
    </Dialog>
  );
}

NotLoggedInDialog.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};

function Content({ onDismiss }) {
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

Content.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};
