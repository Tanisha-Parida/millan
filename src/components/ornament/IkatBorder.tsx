import React, { useId } from 'react';

interface IkatBorderProps {
  color?: string;
  height?: number;
  className?: string;
}

/**
 * Traditional stepped Ikat diamond border divider SVG component.
 * Inspired by Sambalpuri and Patola geometric weave borders.
 */
export const IkatBorder: React.FC<IkatBorderProps> = ({
  color = 'var(--color-clay)',
  height = 12,
  className = '',
}) => {
  const patternId = useId();

  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        preserveAspectRatio="none"
        viewBox={`0 0 1200 ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            width="24"
            height={height}
            patternUnits="userSpaceOnUse"
          >
            {/* Centered stepped ikat diamond */}
            <path
              d={`M 12,1 L 18,${height / 2} L 12,${height - 1} L 6,${height / 2} Z`}
              fill="none"
              stroke={color}
              strokeWidth="1.2"
            />
            <circle cx="12" cy={height / 2} r="1.5" fill={color} />
          </pattern>
        </defs>
        <rect width="100%" height={height} fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

export default IkatBorder;
