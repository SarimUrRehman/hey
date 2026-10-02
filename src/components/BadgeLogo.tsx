import React from 'react';

interface BadgeLogoProps {
  size?: number | string;
  animate?: boolean;
  className?: string;
  showRays?: boolean;
  variant?: 'full' | 'compact' | 'iconOnly';
}

/**
 * HeyDay Auto Detail signature circular red badge logo with
 * arched text, stylized H/D monogram, and 4-point sparkle stars.
 */
export const BadgeLogo: React.FC<BadgeLogoProps> = ({
  size = 120,
  animate = true,
  className = '',
  showRays = false,
  variant = 'full',
}) => {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {/* Optional ambient red glow behind badge */}
      {showRays && (
        <div className="absolute inset-0 rounded-full bg-[#E11D2E]/25 blur-xl pointer-events-none scale-125 animate-pulse-subtle" />
      )}

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Circular path for arched text: HEYDAY on top */}
          <path
            id="heyday-arc-top"
            d="M 30,100 A 70,70 0 0,1 170,100"
            fill="none"
          />
          {/* Circular path for arched text: AUTO DETAIL on bottom */}
          <path
            id="heyday-arc-bottom"
            d="M 170,100 A 70,70 0 0,1 30,100"
            fill="none"
          />

          {/* Full circle path for rotating ring variant */}
          <path
            id="heyday-circle-ring"
            d="M 100,100 m -68,0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0"
            fill="none"
          />

          {/* Red radial gradient for high-gloss badge body */}
          <radialGradient
            id="badge-red-gradient"
            cx="35%"
            cy="28%"
            r="75%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#FF4A57" />
            <stop offset="45%" stopColor="#E11D2E" />
            <stop offset="85%" stopColor="#B31221" />
            <stop offset="100%" stopColor="#7D0A14" />
          </radialGradient>

          {/* Inner metallic silver/white bevel border */}
          <linearGradient id="badge-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
          </linearGradient>

          {/* Gloss overlay highlight */}
          <linearGradient id="badge-gloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0.08" />
            <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Outer serrated or dotted precision ring */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="#E11D2E"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          opacity="0.6"
        />

        {/* Outer Red Badge Disc */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="url(#badge-red-gradient)"
          stroke="url(#badge-bevel)"
          strokeWidth="3.5"
        />

        {/* Inner concentric ring */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Rotating Text Ring (if animated or static) */}
        <g className={animate ? 'origin-center animate-spin-slow' : ''}>
          <text
            fill="#FFFFFF"
            fontFamily="'Fredoka', 'Outfit', sans-serif"
            fontWeight="900"
            fontSize="18.5"
            letterSpacing="2.5"
          >
            <textPath
              href="#heyday-arc-top"
              startOffset="50%"
              textAnchor="middle"
            >
              HEYDAY
            </textPath>
          </text>

          {/* Left and Right Sparkles between texts */}
          {/* Left Sparkle ✦ */}
          <path
            d="M 28 100 Q 34 100 34 94 Q 34 100 40 100 Q 34 100 34 106 Q 34 100 28 100 Z"
            fill="#FFFFFF"
          />
          {/* Right Sparkle ✦ */}
          <path
            d="M 160 100 Q 166 100 166 94 Q 166 100 172 100 Q 166 100 166 106 Q 166 100 160 100 Z"
            fill="#FFFFFF"
          />

          <text
            fill="#FFFFFF"
            fontFamily="'Outfit', sans-serif"
            fontWeight="800"
            fontSize="12.5"
            letterSpacing="5"
          >
            <textPath
              href="#heyday-arc-bottom"
              startOffset="50%"
              textAnchor="middle"
            >
              AUTO DETAIL
            </textPath>
          </text>
        </g>

        {/* Inner Center Circle with Darker Contrast Backing */}
        <circle
          cx="100"
          cy="100"
          r="48"
          fill="#8A0C17"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeOpacity="0.8"
        />

        {/* Center Stylized "H" and "D" Monogram */}
        <g transform="translate(100, 102)">
          {/* Stylized interconnected H and D */}
          {/* Letter H */}
          <path
            d="M -26 -22 L -18 -22 L -18 -5 L -8 -5 L -8 -22 L 0 -22 L 0 20 L -8 20 L -8 3 L -18 3 L -18 20 L -26 20 Z"
            fill="#FFFFFF"
          />
          {/* Letter D entwined */}
          <path
            d="M 2 -22 L 14 -22 C 27 -22 34 -13 34 -1 C 34 11 27 20 14 20 L 2 20 Z M 10 -14 L 10 12 L 14 12 C 21 12 25 7 25 -1 C 25 -9 21 -14 14 -14 Z"
            fill="#FFFFFF"
          />

          {/* Golden/White Shine Sparkles over monogram */}
          {/* Sparkle 1 */}
          <path
            d="M -3 -16 Q 0 -16 0 -19 Q 0 -16 3 -16 Q 0 -16 0 -13 Q 0 -16 -3 -16 Z"
            fill="#FFDE59"
            className="animate-twinkle"
          />
          {/* Sparkle 2 */}
          <path
            d="M 22 13 Q 25 13 25 10 Q 25 13 28 13 Q 25 13 25 16 Q 25 13 22 13 Z"
            fill="#FFFFFF"
            className="animate-twinkle-delay-1"
          />
        </g>

        {/* Top curved gloss sheen reflection */}
        <path
          d="M 22 85 C 35 40, 165 40, 178 85 C 150 68, 50 68, 22 85 Z"
          fill="#FFFFFF"
          opacity="0.25"
        />
      </svg>
    </div>
  );
};

/**
 * Standalone Sparkle component (4-point star ✦)
 */
export const SparkleIcon: React.FC<{
  size?: number;
  className?: string;
  fill?: string;
}> = ({ size = 16, className = '', fill = 'currentColor' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`inline-block ${className}`}
    >
      <path
        d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z"
        fill={fill}
      />
    </svg>
  );
};
