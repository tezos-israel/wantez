import { useScreenSize } from 'hooks/useScreenSize';
import BottomBorder from './bottom-border.svg';

export default function Section({ children }) {
  const { width } = useScreenSize();

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-500 relative w-full pb-20 overflow-hidden text-white">
      {children}
      <div className="-bottom-1 absolute flex">
        {Array.from({ length: Math.ceil(width / 1740) }).map((_, i) => (
          <BottomBorder key={i} />
        ))}
      </div>
    </div>
  );
}
