import PropTypes from 'prop-types';

export const gigProps = PropTypes.shape({
  id: PropTypes.string,
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      paymentAddress: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      applicant: PropTypes.shape({
        username: PropTypes.string,
      }),
    })
  ),
  categories: PropTypes.array,
  createdAt: PropTypes.string,
  description: PropTypes.string,
  experienceLevel: PropTypes.string,
  fee: PropTypes.number,
  funder: PropTypes.shape({
    username: PropTypes.string,
  }),
  imageUrl: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
  gig_tags: PropTypes.array,
});
