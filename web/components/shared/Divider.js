import classnames from 'classnames';
import PropTypes from 'prop-types';
export default function Divider({ className }) {
  return (
    <div
      className={classnames(
        'my-4 border-t-2 border-gray-300 border-solid',
        className
      )}
    ></div>
  );
}

Divider.propTypes = {
  className: PropTypes.string,
};
