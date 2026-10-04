import React, { useId } from 'react';

interface JharokhaArchesProps {
  /** 'down' = arches point downward from top surface into bottom; 'up' = arches crown upward */
  direction?: 'down' | 'up';
  /** Fill color of the arches / source surface (defaults to vat or khadi) */
  fillColor?: string;
  /** Background behind the arches / target surface */
  bgColor?: string;
  /** Height of the arch row in pixels */
  height?: number;
  className?: string;
}

/**
 * Reusable cusped jharokha arch row SVG pattern echoing traditional Rajasthani stonework.
 * Used as a natural architectural seam between contrasting sections (e.g. hero to khadi, khadi to footer).
 */
export const JharokhaArches: React.FC<JharokhaArchesProps> = ({
  direction = 'down',
  fillColor = 'var(--color-vat)',
  bgColor = 'transparent',
  height = 24,
  className = '',
}) => {
  const patternId = useId();

  // Each repeating arch unit is 48px wide and 24px tall with a 3-cusp foil silhouette
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className}`}
      style={{ height, backgroundColor: bgColor }}
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
            width="48"
            height={height}
            patternUnits="userSpaceOnUse"
          >
            {direction === 'down' ? (
              // Downward cusped arch valance
              <path
                d="M 0,0 L 48,0 L 48,6 C 44,6 41,11 36,11 C 32,11 29,17 24,24 C 19,17 16,11 12,11 C 7,11 4,6 0,6 Z"
                fill={fillColor}
              />
            ) : (
              // Upward crowning cusped arch
              <path
                d={`M 0,${height} L 48,${height} L 48,${height - 6} C 44,${height - 6} 41,${height - 11} 36,${height - 11} C 32,${height - 11} 29,${height - 17} 24,0 C 19,${height - 17} 16,${height - 11} 12,${height - 11} C 7,${height - 11} 4,${height - 6} 0,${height - 6} Z`}
                fill={fillColor}
              />
            )}
          </pattern>
        </defs>
        <rect width="100%" height={height} fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
};

export default JharokhaArches;
