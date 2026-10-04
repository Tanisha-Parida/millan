import React from 'react';

interface KanthaStitchProps {
  color?: string;
  strokeWidth?: number;
  className?: string;
  dashArray?: string;
}

/**
 * Running-stitch (kantha) line divider between same-tone or related sections.
 * Echoes traditional hand-stitched quilts and embroidery.
 */
export const KanthaStitch: React.FC<KanthaStitchProps> = ({
  color = 'var(--color-madder)',
  strokeWidth = 1.5,
  dashArray = '8 6',
  className = '',
}) => {
  return (
    <div
      className={`w-full overflow-hidden select-none pointer-events-none py-1 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-1 block"
        height="4"
        preserveAspectRatio="none"
        viewBox="0 0 100 4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="2"
          x2="100"
          y2="2"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default KanthaStitch;
