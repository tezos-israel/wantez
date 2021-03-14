import PropTypes from 'prop-types';
import Dialog from '@reach/dialog';
import classnames from 'classnames';

import Card from '@shared/Card';

export default function CardDialog({ className, children, ...props }) {
  return (
    <Dialog
      className={classnames('w-content px-0 pt-0', className)}
      {...props}
    >
      <Card>{children}</Card>
    </Dialog>
  );
}

CardDialog.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
