export function HalfCirclePaper() {
  return (
    <div className="h-5 transform -translate-y-1/2">
      <svg className="w-full h-full">
        <g fill="#1D2129" fillRule="evenodd">
          {Array.from({ length: 86 }).map((_, i) => (
            <circle key={i} cx={25 * i + 10} cy="10" r="10" />
          ))}
        </g>
      </svg>
    </div>
  );
}
