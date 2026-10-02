import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SparkleIcon } from './BadgeLogo';
import { SITE_CONFIG } from '../config';

interface BeforeAfterSliderProps {
  currentLang: 'es' | 'en';
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ currentLang }) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Allow live demo image replacement if desired
  const [customBefore, setCustomBefore] = useState<string | null>(SITE_CONFIG.beforeAfter.beforeImage || null);
  const [customAfter, setCustomAfter] = useState<string | null>(SITE_CONFIG.beforeAfter.afterImage || null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMouseMove, handleEnd, handleTouchMove]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'before') setCustomBefore(url);
      else setCustomAfter(url);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Informative Owner Note */}
      <div className="flex items-center justify-between mb-3 text-xs sm:text-sm text-gray-400 bg-[#141416] p-3 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#FF3B47] animate-ping" />
          <span className="font-semibold text-gray-300">
            {SITE_CONFIG.beforeAfter.note[currentLang]}
          </span>
        </div>
        <span className="text-[11px] font-mono text-[#FF3B47] bg-[#E11D2E]/10 px-2 py-0.5 rounded border border-[#E11D2E]/30 hidden sm:inline-block">
          config.ts: SITE_CONFIG.beforeAfter
        </span>
      </div>

      {/* Main Comparison Canvas */}
      <div
        ref={containerRef}
        className="relative w-full h-[360px] sm:h-[460px] rounded-2xl overflow-hidden select-none cursor-ew-resize border-2 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* AFTER (GLOSSY & CERAMIC PROTECTED) - FULL BASE */}
        <div className="absolute inset-0 w-full h-full bg-[#0d0d0f] flex items-center justify-center overflow-hidden">
          {customAfter ? (
            <img src={customAfter} alt="After Detailing" className="w-full h-full object-cover" />
          ) : (
            // High-fidelity generated SVG paint finish: Deep mirror gloss ceramic coating
            <div className="relative w-full h-full bg-gradient-to-br from-[#1a0507] via-[#0f0f12] to-[#26070a] flex items-center justify-center">
              {/* Gloss reflections & light bars */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,59,71,0.25),transparent_60%)]" />
              <div className="absolute top-0 right-1/4 w-32 h-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-30deg]" />
              <div className="absolute top-0 right-1/3 w-12 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg]" />

              {/* Ceramic Beading & Deep Reflection Graphic */}
              <div className="relative z-10 text-center px-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E11D2E]/20 border border-[#E11D2E]/60 text-white font-extrabold text-sm mb-3 shadow-[0_0_15px_rgba(225,29,46,0.5)]">
                  <SparkleIcon size={16} className="text-[#FFDE59] animate-twinkle" />
                  <span>{currentLang === 'es' ? 'ACABADO HEYDAY' : 'HEYDAY FINISH'}</span>
                </div>
                <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-wide">
                  {currentLang === 'es' ? 'Corrección & Recubrimiento Cerámico' : 'Paint Correction & Ceramic Shield'}
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                  {currentLang === 'es'
                    ? 'Pintura 100% libre de swirls, brillo espejo profundo y repelencia hidrofóbica total.'
                    : '100% swirl-free clear coat, deep mirror reflections, and high hydrophobic beading.'}
                </p>

                {/* Hydrophobic water bead droplets graphic */}
                <div className="flex justify-center items-center gap-3 mt-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full bg-gradient-to-t from-white/80 to-white/20 shadow-[0_2px_8px_rgba(255,255,255,0.4)] border border-white/90 animate-pulse-subtle"
                    />
                  ))}
                </div>
              </div>

              {/* Sparkle cluster on the glossy surface */}
              <SparkleIcon size={24} className="absolute top-16 right-20 text-white animate-twinkle" />
              <SparkleIcon size={18} className="absolute bottom-20 right-36 text-[#FFDE59] animate-twinkle-delay-1" />
            </div>
          )}

          {/* After Badge Label */}
          <div className="absolute top-4 right-4 z-20 pointer-events-none">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-[#E11D2E] text-white shadow-lg border border-white/20 flex items-center gap-1.5">
              <SparkleIcon size={12} className="text-white" />
              {SITE_CONFIG.beforeAfter.labelAfter[currentLang]}
            </span>
          </div>
        </div>

        {/* BEFORE (DULL & SWIRLED) - CLIPPED LAYER */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div
            className="absolute inset-0 w-full h-full bg-[#1e1e22]"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          >
            {customBefore ? (
              <img src={customBefore} alt="Before Detailing" className="w-full h-full object-cover" />
            ) : (
              // High-fidelity dull, scratched, oxidized paint finish representation
              <div className="relative w-full h-full bg-[#18181b] flex items-center justify-center opacity-95">
                {/* Hazy dull overlay */}
                <div className="absolute inset-0 bg-[#2a2a30]/50 backdrop-contrast-75" />

                {/* Swirl marks spiderweb SVG pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                  <filter id="swirlNoise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#swirlNoise)" />
                  {/* Concentric micro-scratches from improper car washes */}
                  <circle cx="40%" cy="50%" r="80" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="6 14" opacity="0.3" />
                  <circle cx="40%" cy="50%" r="130" fill="none" stroke="#ffffff" strokeWidth="0.7" strokeDasharray="8 20" opacity="0.25" />
                  <circle cx="40%" cy="50%" r="190" fill="none" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="10 30" opacity="0.2" />
                  <circle cx="75%" cy="30%" r="90" fill="none" stroke="#ffffff" strokeWidth="0.8" strokeDasharray="5 15" opacity="0.3" />
                </svg>

                <div className="relative z-10 text-center px-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-gray-400 font-bold text-xs mb-3">
                    <span>{currentLang === 'es' ? 'ESTADO INICIAL' : 'INITIAL CONDITION'}</span>
                  </div>
                  <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-gray-300 tracking-wide">
                    {currentLang === 'es' ? 'Pintura Opaca & Micro-Rayones' : 'Dull Paint & Swirl Marks'}
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                    {currentLang === 'es'
                      ? 'Marcas circulares de lavado común, lluvia ácida y pérdida del barniz protector.'
                      : 'Holograms, improper sponge scratch swirls, and environmental oxidation.'}
                  </p>
                </div>
              </div>
            )}

            {/* Before Badge Label */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-black/80 text-gray-300 shadow-lg border border-white/10">
                {SITE_CONFIG.beforeAfter.labelBefore[currentLang]}
              </span>
            </div>
          </div>
        </div>

        {/* DIVIDER LINE & DRAG HANDLE */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none flex flex-col items-center"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Vertical Glowing Line */}
          <div className="w-[3px] h-full bg-[#FF3B47] shadow-[0_0_12px_#FF3B47]" />

          {/* Central Handle Button */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#E11D2E] border-2 border-white shadow-[0_0_20px_rgba(225,29,46,0.9)] flex items-center justify-center text-white cursor-ew-resize group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Helper controls to test real photos */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4 text-[#FF3B47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
          {currentLang === 'es' ? 'Arrastra hacia los lados para comparar' : 'Drag sideways to compare results'}
        </span>

        {/* Quick image swap test buttons for workshop owner */}
        <div className="flex items-center gap-3">
          <label className="cursor-pointer text-[11px] hover:text-[#FF3B47] transition-colors underline decoration-dotted">
            {currentLang === 'es' ? 'Probar foto "Antes"' : 'Test "Before" photo'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileInput(e, 'before')}
            />
          </label>
          <span className="text-gray-600">|</span>
          <label className="cursor-pointer text-[11px] hover:text-[#FF3B47] transition-colors underline decoration-dotted">
            {currentLang === 'es' ? 'Probar foto "Después"' : 'Test "After" photo'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileInput(e, 'after')}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
