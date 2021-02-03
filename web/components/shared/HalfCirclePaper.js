import { useScreenSize } from 'hooks/useScreenSize';
export function HalfCirclePaper() {
  const { width } = useScreenSize();
  const circleWidth = 10;
  const padding = 15;
  const totalCircles = (width * (10 / 12)) / (circleWidth + padding) + 1;

  return (
    <div className="h-5 transform -translate-y-1/2">
      <svg className="w-full h-full">
        <g fill="#1D2129" fillRule="evenodd">
          {Array.from({ length: totalCircles }).map((_, i) => (
            <circle
              key={i}
              cx={(10 + padding) * i + circleWidth}
              cy={circleWidth}
              r={circleWidth}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
