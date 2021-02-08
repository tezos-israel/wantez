import PropTypes from 'prop-types';
import { useScreenSize } from 'hooks/useScreenSize';
import BottomBorder from './bottom-border.svg';

export default function Section({ children, renderBackground }) {
  const { width } = useScreenSize();
  const backgroundClass =
    'bg-gradient-to-br from-blue-900 to-blue-500 -z-1 absolute inset-0';
  return (
    <div className="relative w-full pb-20 overflow-hidden text-white">
      {children}
      <div className="-bottom-1 absolute flex">
        {Array.from({ length: Math.ceil(width / 1740) }).map((_, i) => (
          <BottomBorder key={i} />
        ))}
      </div>
      {renderBackground ? (
        renderBackground({ backgroundClass })
      ) : (
        <div className={backgroundClass} />
      )}
    </div>
  );
}

Section.propTypes = {
  children: PropTypes.node,
  renderBackground: PropTypes.func,
};
