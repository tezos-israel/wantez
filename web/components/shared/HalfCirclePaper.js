import { useRef } from 'react';
import { useRect } from '@reach/rect';

export function HalfCirclePaper() {
  const ref = useRef();
  const rect = useRect(ref);

  const radius = 10;
  const circleWidth = 2 * radius;
  const maxPadding = 20;

  const width = rect ? rect.width : 0;

  const totalCircles = Math.floor((width - radius) / (radius + maxPadding)) + 1;
  const totalCirclesWidth = totalCircles * circleWidth;

  // pad circles till the end of the element
  const padding = (width - totalCirclesWidth) / (totalCircles - 1);

  return (
    <div className="h-5 transform -translate-y-1/2" ref={ref}>
      <svg className="w-full h-full">
        <g fill="#1D2129" fillRule="evenodd">
          {Array.from({ length: totalCircles }).map((_, i) => (
            <circle
              key={i}
              cx={(circleWidth + padding) * i + radius}
              cy={radius}
              r={radius}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
