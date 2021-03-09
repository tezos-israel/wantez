import PropTypes from 'prop-types';
import classnames from 'classnames';
import { HalfCirclePaper } from './HalfCirclePaper';

export default function Card({ className, children }) {
  return (
    <div
      className={classnames('relative bg-white overflow-y-hidden', className)}
    >
      <div className="px-4">
        <HalfCirclePaper />
      </div>

      <div className="px-4">{children}</div>
    </div>
  );
}
Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
