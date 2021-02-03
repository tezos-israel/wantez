import { useEffect } from 'react';

import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { useQuery } from '@apollo/client';

import Dialog from '@reach/dialog';

import { FETCH_DETAILS } from 'queries/users';

export default function WelcomeModal({ onDismiss, userId }) {
  const { data, loading, error } = useQuery(FETCH_DETAILS, {
    variables: { userId },
  });

  useEffect(() => {
    setTimeout(() => onDismiss(), 5000);
  }, []);

  return (
    <Dialog
      onDismiss={() => onDismiss()}
      aria-label="Welcome Dialog"
      className="w-content"
    >
      {loading ? (
        <Loader type="TailSpin" color="#cacaca" height={50} width={50} />
      ) : error ? (
        'Failed fetching user details'
      ) : (
        `Welcome ${data.userDetails.first_name} ${data.userDetails.last_name}`
      )}
    </Dialog>
  );
}

WelcomeModal.propTypes = {
  onDismiss: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
