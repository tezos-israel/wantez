import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Button({
  children,
  className = '',
  color = 'default',
  size = 'medium',
  ...props
}) {
  return (
    <button
      {...props}
      className={classnames(
        'disabled:cursor-not-allowed disabled:opacity-50 px-4 text-white rounded-md',
        className,
        {
          'bg-blue-500 hover:bg-blue-300': color === 'primary',
          'bg-gray-400 hover:bg-gray-300': color === 'default',
          'h-10': size === 'medium',
          'text-sm': size === 'small',
        }
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
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'inherit']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
