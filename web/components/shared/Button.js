import PropTypes from 'prop-types';
import classnames from 'classnames';

export function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={classnames(
        'p-2 bg-blue-500 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}

/* 
color: primary, secondary, 
*/

Button.propTypes = {
  className: PropTypes.string,
};
