import React from 'react';

interface ServiceIconProps {
  type: 'detailing' | 'ppf' | 'windowFilm' | 'ceramic' | 'correction';
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ type, className = 'w-12 h-12' }) => {
  switch (type) {
    case 'detailing':
      // Detailed foam cannon & sparkling vehicle finish
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#E11D2E" fillOpacity="0.15" stroke="#E11D2E" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="32" cy="32" r="24" fill="#A30F1C" />
          {/* Car profile with foam bubbles & sparkle */}
          <path d="M18 36L22 28H42L46 36H48C49.1 36 50 36.9 50 38V41C50 41.6 49.6 42 49 42H47C47 44.2 45.2 46 43 46C40.8 46 39 44.2 39 42H25C25 44.2 23.2 46 21 46C18.8 46 17 44.2 17 42H15C14.4 42 14 41.6 14 41V38C14 36.9 14.9 36 16 36H18Z" fill="#FFFFFF" />
          {/* Wheels */}
          <circle cx="21" cy="42" r="2.5" fill="#E11D2E" />
          <circle cx="43" cy="42" r="2.5" fill="#E11D2E" />
          {/* Sparkles */}
          <path d="M32 15L33.5 19L37.5 20.5L33.5 22L32 26L30.5 22L26.5 20.5L30.5 19Z" fill="#FFDE59" />
          <path d="M44 22L45 24.5L47.5 25.5L45 26.5L44 29L43 26.5L40.5 25.5L43 24.5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'ppf':
      // Armored clear shield with XPEL hex lattice and self-healing shield
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#E11D2E" fillOpacity="0.15" stroke="#E11D2E" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="32" cy="32" r="24" fill="#A30F1C" />
          {/* Shield outline */}
          <path d="M32 16L45 22V32C45 40 39.5 46.5 32 49C24.5 46.5 19 40 19 32V22L32 16Z" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="2.5" strokeLinejoin="round" />
          {/* XPEL Cut line crosshair */}
          <path d="M26 31L31 36L39 27" stroke="#FFDE59" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Micro sparkle */}
          <path d="M43 17L44 19.5L46.5 20.5L44 21.5L43 24L42 21.5L39.5 20.5L42 19.5Z" fill="#FFFFFF" />
        </svg>
      );

    case 'windowFilm':
      // Automotive tinted window with solar heat UV reflection rays
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#E11D2E" fillOpacity="0.15" stroke="#E11D2E" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="32" cy="32" r="24" fill="#A30F1C" />
          {/* Car curved window pane */}
          <path d="M19 37L25 21H43L47 37H19Z" fill="#141416" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
          {/* Tint gradient slice */}
          <path d="M22 34L26 23H37L33 34H22Z" fill="#E11D2E" fillOpacity="0.5" />
          {/* Deflection arrows for UV & IR heat */}
          <path d="M44 19L49 14" stroke="#FFDE59" strokeWidth="2" strokeLinecap="round" />
          <path d="M47 14L49 14L49 16" stroke="#FFDE59" strokeWidth="2" strokeLinecap="round" />
          <path d="M37 16L42 11" stroke="#FFDE59" strokeWidth="2" strokeLinecap="round" />
          <path d="M40 11L42 11L42 13" stroke="#FFDE59" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'ceramic':
      // SiO2 Molecular structure + hydrophobic water drop
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#E11D2E" fillOpacity="0.15" stroke="#E11D2E" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="32" cy="32" r="24" fill="#A30F1C" />
          {/* Hydrophobic Droplet */}
          <path d="M32 17C32 17 22 29 22 36C22 41.5 26.5 46 32 46C37.5 46 42 41.5 42 36C42 29 32 17 32 17Z" fill="#FFFFFF" fillOpacity="0.9" />
          {/* Water highlight reflection */}
          <path d="M27 34C27 31 29 28 31 26" stroke="#E11D2E" strokeWidth="2" strokeLinecap="round" />
          {/* Sparkles */}
          <path d="M41 21L42.5 24L45.5 25.5L42.5 27L41 30L39.5 27L36.5 25.5L39.5 24Z" fill="#FFDE59" />
        </svg>
      );

    case 'correction':
      // Rotary / Dual action polisher with reflection light beam
      return (
        <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="30" fill="#E11D2E" fillOpacity="0.15" stroke="#E11D2E" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="32" cy="32" r="24" fill="#A30F1C" />
          {/* Polisher pad ellipse */}
          <ellipse cx="32" cy="39" rx="14" ry="5" fill="#FFFFFF" />
          {/* Polisher body & head */}
          <path d="M26 36L28 26L36 26L38 36H26Z" fill="#FFFFFF" fillOpacity="0.8" />
          <path d="M32 26V18M32 18H44" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          {/* High gloss rays */}
          <path d="M19 44L14 47M45 44L50 47M32 45V50" stroke="#FFDE59" strokeWidth="2" strokeLinecap="round" />
          {/* Sparkle ✦ */}
          <path d="M20 22L21 24.5L23.5 25.5L21 26.5L20 29L19 26.5L16.5 25.5L19 24.5Z" fill="#FFDE59" />
        </svg>
      );
  }
};
