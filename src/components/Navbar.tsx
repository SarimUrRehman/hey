import React, { useState, useEffect } from 'react';
import { BadgeLogo, SparkleIcon } from './BadgeLogo';
import { SITE_CONFIG } from '../config';

interface NavbarProps {
  currentLang: 'es' | 'en';
  onToggleLang: (lang: 'es' | 'en') => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onToggleLang,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: currentLang === 'es' ? 'Inicio' : 'Home' },
    { id: 'servicios', label: currentLang === 'es' ? 'Servicios' : 'Services' },
    { id: 'certificaciones', label: currentLang === 'es' ? 'Certificaciones' : 'Certifications' },
    { id: 'nosotros', label: currentLang === 'es' ? 'Nosotros' : 'About' },
    { id: 'reservar', label: currentLang === 'es' ? 'Reservar' : 'Book' },
    { id: 'contacto', label: currentLang === 'es' ? 'Contacto' : 'Contact' },
  ];

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#E11D2E]/30 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <button
            onClick={() => handleScrollTo('inicio')}
            className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B47] rounded-lg p-1"
          >
            <BadgeLogo size={42} animate={false} className="group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-wider text-white flex items-center gap-1 leading-none">
                HEYDAY
                <SparkleIcon size={12} className="text-[#FF3B47] group-hover:rotate-45 transition-transform" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#E11D2E] uppercase">
                AUTO DETAIL
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 relative ${
                    isActive
                      ? 'text-white bg-[#E11D2E]/20 border border-[#E11D2E]/50'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#FF3B47] rounded-full shadow-[0_0_8px_#FF3B47]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: ES|EN Toggle & Cotizar Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle Pill */}
            <div className="flex items-center bg-[#141416] p-1 rounded-full border border-white/10 text-xs font-bold">
              <button
                onClick={() => onToggleLang('es')}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  currentLang === 'es'
                    ? 'bg-[#E11D2E] text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="Cambiar idioma a Español"
              >
                ES
              </button>
              <button
                onClick={() => onToggleLang('en')}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  currentLang === 'en'
                    ? 'bg-[#E11D2E] text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
                aria-label="Switch language to English"
              >
                EN
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => handleScrollTo('reservar')}
              className="group relative overflow-hidden px-5 py-2 rounded-full font-bold text-sm tracking-wide text-white bg-gradient-to-r from-[#E11D2E] via-[#FF3B47] to-[#A30F1C] shadow-[0_0_20px_rgba(225,29,46,0.4)] hover:shadow-[0_0_28px_rgba(255,59,71,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <SparkleIcon size={14} className="text-white animate-twinkle" />
                {currentLang === 'es' ? 'Cotizar' : 'Get Quote'}
              </span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            {/* Quick ES|EN Toggle on mobile */}
            <div className="flex items-center bg-[#141416] p-0.5 rounded-full border border-white/10 text-[11px] font-bold">
              <button
                onClick={() => onToggleLang(currentLang === 'es' ? 'en' : 'es')}
                className="px-2 py-0.5 rounded-full bg-[#E11D2E] text-white font-mono"
              >
                {currentLang.toUpperCase()}
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF3B47] bg-white/5"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Red Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-gradient-to-b from-[#A30F1C] via-[#E11D2E] to-[#0A0A0A] flex flex-col justify-between p-6 pt-24 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col items-center text-center space-y-5">
            <BadgeLogo size={80} animate={true} className="mb-2" />
            <h2 className="font-display font-extrabold text-2xl text-white tracking-wider">
              {SITE_CONFIG.brandName}
            </h2>
            <div className="w-16 h-1 bg-white/40 rounded-full my-2" />

            <nav className="flex flex-col space-y-3 w-full max-w-xs">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className="py-3 px-4 text-lg font-bold text-white rounded-xl bg-black/20 hover:bg-black/40 border border-white/10 active:scale-98 transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <SparkleIcon size={14} className="text-white/60" />
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6 pb-4">
            <button
              onClick={() => handleScrollTo('reservar')}
              className="w-full py-4 rounded-2xl bg-white text-[#A30F1C] font-display font-black text-lg shadow-2xl flex items-center justify-center gap-2"
            >
              <SparkleIcon size={18} fill="#A30F1C" />
              {currentLang === 'es' ? 'Cotizar por WhatsApp' : 'Quote via WhatsApp'}
            </button>

            <div className="flex justify-center items-center gap-3 text-xs text-white/80 font-bold">
              <span>{currentLang === 'es' ? 'Idioma:' : 'Language:'}</span>
              <button
                onClick={() => onToggleLang('es')}
                className={`px-3 py-1 rounded-full ${
                  currentLang === 'es' ? 'bg-black text-white' : 'bg-black/20 text-white/70'
                }`}
              >
                Español
              </button>
              <button
                onClick={() => onToggleLang('en')}
                className={`px-3 py-1 rounded-full ${
                  currentLang === 'en' ? 'bg-black text-white' : 'bg-black/20 text-white/70'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
