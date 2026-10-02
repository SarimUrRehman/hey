/**
 * HeyDay Auto Detail - Official Single-Page Web Experience
 *
 * Specialising in Automotive Detailing, PPF (XPEL), Window Film, and Ceramic Coating.
 * Built with React, Tailwind CSS, Motion & Inline SVGs.
 *
 * All business details, contact placeholders, translations, and services
 * can be edited in src/config.ts
 */

import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG, isConfigPlaceholder, getWhatsAppUrl } from './config';
import { BadgeLogo, SparkleIcon } from './components/BadgeLogo';
import { Navbar } from './components/Navbar';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { BookingForm } from './components/BookingForm';
import { ServiceIcon } from './components/ServiceIcons';

export default function App() {
  const [currentLang, setCurrentLang] = useState<'es' | 'en'>('es');
  const [activeSection, setActiveSection] = useState('inicio');
  const [preSelectedService, setPreSelectedService] = useState<string>('');
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const isEs = currentLang === 'es';

  // Desktop subtle cursor glow tracker
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        setIsPointerDevice(true);
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Active section scroll spy
  useEffect(() => {
    const sections = ['inicio', 'servicios', 'certificaciones', 'nosotros', 'reservar', 'contacto'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectServiceForQuote = (serviceId: string) => {
    setPreSelectedService(serviceId);
    const bookingEl = document.getElementById('reservar');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickWhatsApp = () => {
    const defaultMsg = isEs
      ? '¡Hola HeyDay Auto Detail! Me gustaría solicitar información y cotización para mi auto.'
      : 'Hello HeyDay Auto Detail! I would like to request information and a quote for my car.';
    const url = getWhatsAppUrl(SITE_CONFIG.contact.whatsappNumber, defaultMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F6F6F6] selection:bg-[#E11D2E] selection:text-white">
      {/* Desktop Red Cursor Glow */}
      {isPointerDevice && (
        <div
          className="fixed w-96 h-96 rounded-full bg-[#E11D2E]/8 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-75 ease-out"
          style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
        />
      )}

      {/* 1. NAVBAR */}
      <Navbar
        currentLang={currentLang}
        onToggleLang={setCurrentLang}
        activeSection={activeSection}
      />

      <main>
        {/* 2. HERO SECTION */}
        <section
          id="inicio"
          className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 flex items-center justify-center overflow-hidden"
        >
          {/* Background Ambient Glows & Diagonal Gloss Streaks */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Top-Right Red Nebula */}
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#E11D2E]/20 to-transparent blur-3xl animate-pulse-subtle" />
            {/* Bottom-Left Red Nebula */}
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#A30F1C]/25 to-transparent blur-3xl" />

            {/* Diagonal Gloss Light Streaks */}
            <div className="absolute -top-1/2 left-1/4 w-32 h-[200%] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent rotate-12 pointer-events-none" />
            <div className="absolute -top-1/2 left-2/3 w-64 h-[200%] bg-gradient-to-r from-transparent via-[#E11D2E]/[0.05] to-transparent rotate-12 pointer-events-none" />

            {/* Subtle Grid Sheen */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 flex flex-col items-center">
            {/* Animated Circular Red Badge (Logo recreation) */}
            <div className="relative mb-6 transform hover:scale-105 transition-transform duration-300">
              <BadgeLogo size={170} animate={true} showRays={true} />
              {/* Twinkling sparkle accents around badge */}
              <SparkleIcon size={24} className="absolute -top-2 -right-4 text-[#FFDE59] animate-twinkle" />
              <SparkleIcon size={18} className="absolute bottom-2 -left-3 text-[#FF3B47] animate-twinkle-delay-1" />
              <SparkleIcon size={14} className="absolute top-1/2 -left-6 text-white animate-twinkle-delay-2" />
            </div>

            {/* Main Headline */}
            <div className="inline-block relative">
              <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase drop-shadow-2xl">
                HEYDAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B47] via-[#E11D2E] to-[#FF4A57]">AUTO DETAIL</span>
              </h1>
            </div>

            {/* Subheading */}
            <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-gray-200 tracking-wide flex items-center justify-center gap-2">
              <SparkleIcon size={18} className="text-[#FF3B47]" />
              <span>{SITE_CONFIG.tagline[currentLang]}</span>
              <SparkleIcon size={18} className="text-[#FF3B47]" />
            </h2>

            {/* Supporting Line */}
            <p className="mt-3 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl font-light">
              {SITE_CONFIG.heroSubtitle[currentLang]}
            </p>

            {/* Certification Hashtag Chips (Sticker-Style with subtle rotations) */}
            <div className="mt-6 flex flex-wrap justify-center items-center gap-2 sm:gap-3 max-w-3xl">
              {SITE_CONFIG.certificationChips.map((chip, idx) => {
                const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];
                const rot = rotations[idx % rotations.length];
                return (
                  <span
                    key={chip}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wider bg-[#141416] text-white border border-[#E11D2E]/40 shadow-[0_4px_15px_rgba(225,29,46,0.25)] hover:border-[#FF3B47] hover:scale-105 hover:bg-[#E11D2E]/10 transition-all ${rot}`}
                  >
                    <SparkleIcon size={12} className="text-[#FF3B47]" />
                    {chip}
                  </span>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              {/* Primary WhatsApp Cotizar Button */}
              <button
                onClick={handleQuickWhatsApp}
                className="group relative w-full sm:w-auto px-8 py-4 rounded-full font-display font-extrabold text-base tracking-wider uppercase bg-gradient-to-r from-[#E11D2E] via-[#FF3B47] to-[#A30F1C] text-white shadow-[0_0_30px_rgba(225,29,46,0.6)] hover:shadow-[0_0_40px_rgba(255,59,71,0.9)] transition-all transform hover:-translate-y-1 active:translate-y-0 overflow-hidden flex items-center justify-center gap-2.5"
              >
                <SparkleIcon size={18} className="text-white animate-twinkle" />
                <span>{isEs ? 'Cotiza por WhatsApp' : 'Quote via WhatsApp'}</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
              </button>

              {/* Secondary Ver Servicios Button */}
              <button
                onClick={() => {
                  const s = document.getElementById('servicios');
                  if (s) s.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base tracking-wider text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isEs ? 'Ver Servicios' : 'Explore Services'}
              </button>
            </div>

            {/* Scroll-Down Indicator */}
            <div className="mt-12 sm:mt-16 flex flex-col items-center text-gray-500 hover:text-white transition-colors cursor-pointer"
              onClick={() => {
                const s = document.getElementById('servicios');
                if (s) s.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="text-xs uppercase tracking-widest font-semibold mb-2">
                {isEs ? 'Descubre más' : 'Scroll to explore'}
              </span>
              <svg className="w-5 h-5 animate-bounce text-[#FF3B47]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          {/* Trust Strip */}
          <div className="absolute bottom-0 left-0 right-0 py-3 bg-[#141416]/80 backdrop-blur-md border-y border-white/5 overflow-hidden">
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-bold tracking-wider text-gray-300 uppercase px-4 text-center">
              <span className="flex items-center gap-1.5 text-white">
                <SparkleIcon size={12} className="text-[#FF3B47]" />
                {isEs ? 'Instaladores Certificados' : 'Certified Installers'}
              </span>
              <span className="text-white/20">•</span>
              <span className="hidden sm:inline">PPF XPEL</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span>Window Film</span>
              <span className="text-white/20">•</span>
              <span>Ceramic Coating</span>
              <span className="text-white/20 hidden md:inline">•</span>
              <span className="hidden md:inline">{isEs ? 'Corrección de Pintura' : 'Paint Correction'}</span>
            </div>
          </div>
        </section>

        {/* 2b. SERVICES SECTION */}
        <section id="servicios" className="py-24 relative bg-[#0A0A0A] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF3B47] mb-3 bg-[#E11D2E]/10 px-4 py-1.5 rounded-full border border-[#E11D2E]/30">
                <SparkleIcon size={14} className="animate-twinkle" />
                <span>{isEs ? 'Excelencia & Detalle' : 'Precision & Craftsmanship'}</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                {isEs ? 'Nuestros Servicios' : 'Our Detailing Services'}
              </h2>
              {/* Sparkle Divider */}
              <div className="flex items-center justify-center gap-3 my-4">
                <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-[#E11D2E]" />
                <SparkleIcon size={18} className="text-[#E11D2E]" />
                <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-[#E11D2E]" />
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                {isEs
                  ? 'Procedimientos especializados con tecnología de punta y productos certificados para garantizar protección real y estética inigualable.'
                  : 'Specialized procedures with certified materials and state-of-the-art tooling for lasting vehicle protection.'}
              </p>
            </div>

            {/* 5 Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {SITE_CONFIG.services.map((service, index) => {
                const isWide = index === 0 || index === 3;
                return (
                  <div
                    key={service.id}
                    className={`group relative bg-[#141416] rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-[#FF3B47]/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(225,29,46,0.25)] flex flex-col justify-between overflow-hidden ${
                      index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                    }`}
                  >
                    {/* Diagonal shine sweep layer on card hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent skew-x-[-20deg] pointer-events-none" />

                    <div>
                      {/* Top Row: Icon inside badge frame & Category Badge */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="relative">
                          <ServiceIcon type={service.iconType} className="w-14 h-14 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#E11D2E]/20 text-[#FF4A57] border border-[#E11D2E]/40">
                          {service.badgeText}
                        </span>
                      </div>

                      {/* Service Title */}
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-3 group-hover:text-[#FF4A57] transition-colors">
                        {service.name[currentLang]}
                      </h3>

                      {/* Honest, premium description */}
                      <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                        {service.shortDesc[currentLang]}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="space-y-2 mb-6">
                        {service.features[currentLang].map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                            <SparkleIcon size={12} className="text-[#FF3B47] flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Action Button: scrolls to booking & pre-selects */}
                    <button
                      onClick={() => handleSelectServiceForQuote(service.id)}
                      className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider bg-white/5 hover:bg-[#E11D2E] text-white border border-white/10 hover:border-[#FF3B47] transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(225,29,46,0.4)]"
                    >
                      <span>{isEs ? 'Cotizar este servicio' : 'Quote this service'}</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2c. CERTIFICATIONS ("Instaladores Certificados") */}
        {/* Bold Full-Bleed Red Section */}
        <section
          id="certificaciones"
          className="relative py-24 bg-gradient-to-br from-[#A30F1C] via-[#E11D2E] to-[#800C16] text-white overflow-hidden shadow-2xl"
        >
          {/* Background Graphic Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_70%)]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#A30F1C] mb-3 bg-white px-4 py-1.5 rounded-full shadow-lg">
                <SparkleIcon size={14} fill="#A30F1C" />
                <span>{isEs ? 'Respaldo & Calidad' : 'Certified Expertise'}</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight drop-shadow">
                {isEs ? 'Instaladores Certificados' : 'Certified Professional Installers'}
              </h2>

              <p className="mt-4 text-base sm:text-lg text-white/90 font-medium">
                {isEs
                  ? 'La diferencia entre un trabajo promedio y un acabado perfecto radica en la certificación de instalación: técnica milimétrica, cabina limpia y materiales genuinos.'
                  : 'True protection requires certified installation precision, clean-room standards, and genuine high-performance films.'}
              </p>
            </div>

            {/* 3 Large Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SITE_CONFIG.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-[#0A0A0A]/90 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300"
                >
                  <div>
                    {/* Rotating circular seal graphic */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 rounded-full bg-[#E11D2E] p-1 border-2 border-white flex items-center justify-center relative shadow-lg">
                        <BadgeLogo size={56} animate={true} />
                      </div>
                      <span className="px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-[#FF3B47] text-white">
                        {cert.tag}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white mb-3">
                      {cert.title[currentLang]}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-6 font-light">
                      {cert.description[currentLang]}
                    </p>

                    <div className="space-y-2 border-t border-white/10 pt-4">
                      {cert.highlights[currentLang].map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                          <SparkleIcon size={12} className="text-[#FFDE59]" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Styled Placeholder Panel for Owner Certificate Images */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="bg-[#141416] border border-dashed border-white/30 rounded-2xl p-4 text-center">
                      <svg className="w-6 h-6 mx-auto text-white/50 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-[11px] font-semibold text-white/70">
                        {isEs ? 'Agrega aquí tu foto o sello de certificado' : 'Add your certificate photo / badge here'}
                      </p>
                      <p className="text-[9px] text-gray-400 font-mono mt-0.5">
                        src/config.ts: certifications
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2d. BEFORE & AFTER COMPARISON */}
        <section className="py-24 bg-[#0A0A0A] relative border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF3B47] mb-3 bg-[#E11D2E]/10 px-4 py-1.5 rounded-full border border-[#E11D2E]/30">
                <SparkleIcon size={14} className="animate-twinkle" />
                <span>{isEs ? 'Resultados Comprobados' : 'Transformations'}</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                {isEs ? 'Antes y Después' : 'Before & After Transformation'}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mt-2">
                {isEs
                  ? 'Descubre la recuperación del brillo espejo, la eliminación de micro-rayas y el sellado hidrofóbico.'
                  : 'See the restoration of depth, clarity, and reflection after paint correction and protection.'}
              </p>
            </div>

            {/* Draggable Slider */}
            <BeforeAfterSlider currentLang={currentLang} />
          </div>
        </section>

        {/* 3. ABOUT SECTION & PROCESS TIMELINE */}
        <section id="nosotros" className="py-24 bg-[#0f0f12] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Split Layout: Story & Stylized Visual Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
              {/* Left Column: Brand Story */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF3B47] bg-[#E11D2E]/10 px-4 py-1.5 rounded-full border border-[#E11D2E]/30">
                  <SparkleIcon size={14} className="animate-twinkle" />
                  <span>{isEs ? 'Nuestra Filosofía' : 'About HeyDay'}</span>
                </div>

                <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
                  {isEs ? 'Tu Auto, En Su Mejor Momento' : 'Your Car In Its Golden Era'}
                </h2>

                <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed font-light">
                  <p>
                    {isEs
                      ? 'En HeyDay Auto Detail creemos que cada vehículo merece lucir con el esplendor, profundidad y elegancia de su época dorada. No nos conformamos con una limpieza superficial: somos apasionados del arte del detallado y la protección automotriz de alto nivel.'
                      : 'At HeyDay Auto Detail, we believe every automobile deserves to look its absolute best, with the depth, luster, and protection of its prime. We do not do quick surface washes; we practice the meticulous art of high-end detailing.'}
                  </p>
                  <p>
                    {isEs
                      ? 'Como instaladores certificados en PPF XPEL, Window Film y Recubrimientos Cerámicos, aplicamos cada película y sellador bajo estrictos protocolos técnicos en un ambiente controlado. Cuidamos cada curva, filo y textura con herramientas dedicadas para preservar el valor de tu inversión.'
                      : 'As certified installers in XPEL PPF, automotive window film, and professional ceramic coatings, we execute every application under rigorous clean-room standards with millimeter precision.'}
                  </p>
                  <p>
                    {isEs
                      ? 'Ya sea un deportivo de fin de semana, una SUV familiar o tu vehículo de uso diario, te entregamos un acabado que supera las expectativas de agencia.'
                      : 'Whether it is a weekend sports car, an exotic, or a daily driver, we deliver an experience and shine that turns heads at every stoplight.'}
                  </p>
                </div>

                {/* 4 Feature Highlights */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { title: isEs ? 'Especialistas en detallado' : 'Detailing Specialists', icon: '✨' },
                    { title: isEs ? 'Instaladores certificados' : 'Certified Installers', icon: '🏅' },
                    { title: isEs ? 'PPF, Window Film y Cerámico' : 'PPF, Tint & Ceramic', icon: '🛡️' },
                    { title: isEs ? 'Acabado de calidad' : 'Showroom Finish', icon: '⭐' },
                  ].map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="bg-[#141416] p-3.5 rounded-2xl border border-white/5 flex items-center gap-3"
                    >
                      <span className="text-xl">{feat.icon}</span>
                      <span className="text-xs sm:text-sm font-bold text-white">{feat.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Stylized Visual Panel / Photo Placeholder */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-tr from-[#141416] via-[#1a080a] to-[#2b080d] p-8 border border-[#E11D2E]/40 shadow-[0_0_50px_rgba(225,29,46,0.3)] flex flex-col items-center justify-center text-center overflow-hidden group">
                  {/* Subtle gloss sweep */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,59,71,0.2),transparent_60%)]" />

                  {/* Big Spinning Badge Motif */}
                  <BadgeLogo size={180} animate={true} showRays={true} />

                  <h3 className="font-display font-extrabold text-2xl text-white mt-6 tracking-wide">
                    HEYDAY AUTO DETAIL
                  </h3>
                  <p className="text-xs text-[#FF4A57] font-bold tracking-widest uppercase mt-1">
                    {isEs ? 'Taller Especializado' : 'Certified Studio'}
                  </p>

                  {/* Owner photo placeholder note */}
                  <div className="mt-4 px-4 py-2 rounded-xl bg-black/40 border border-white/10 text-[11px] text-gray-400">
                    📷 {isEs ? 'Agrega aquí tu foto de trabajo' : 'Add your workshop photo here'}
                  </div>
                </div>
              </div>
            </div>

            {/* "CÓMO FUNCIONA" ANIMATED TIMELINE */}
            <div className="mt-16 pt-16 border-t border-white/10">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                  {isEs ? '¿Cómo Funciona el Proceso?' : 'How It Works'}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {isEs
                    ? '4 sencillos pasos para consentir y proteger tu auto con nosotros.'
                    : '4 simple steps to protect and elevate your car.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SITE_CONFIG.processSteps.map((stepItem) => (
                  <div
                    key={stepItem.step}
                    className="relative bg-[#141416] p-6 rounded-3xl border border-white/10 hover:border-[#FF3B47]/50 transition-all group"
                  >
                    {/* Step number badge */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E11D2E] to-[#FF3B47] text-white font-display font-black text-xl flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(225,29,46,0.6)]">
                      {stepItem.step}
                    </div>

                    <h4 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#FF3B47] transition-colors">
                      {stepItem.title[currentLang]}
                    </h4>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {stepItem.desc[currentLang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. BOOKING SECTION */}
        <section id="reservar" className="py-24 bg-[#0A0A0A] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BookingForm
              currentLang={currentLang}
              preSelectedServiceId={preSelectedService}
            />
          </div>
        </section>

        {/* 5. CONTACT SECTION & LOCATION */}
        <section id="contacto" className="py-24 bg-[#0f0f12] relative border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF3B47] mb-3 bg-[#E11D2E]/10 px-4 py-1.5 rounded-full border border-[#E11D2E]/30">
                <SparkleIcon size={14} className="animate-twinkle" />
                <span>{isEs ? 'Atención Personalizada' : 'Direct Contact'}</span>
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
                {isEs ? 'Contáctanos' : 'Get In Touch'}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mt-2">
                {isEs
                  ? 'Estamos listos para resolver cualquier consulta y agendar la fecha ideal para tu vehículo.'
                  : 'We are ready to answer your questions and arrange the ideal time for your car.'}
              </p>
            </div>

            {/* Glass Contact Cards & Stylized Location Pin Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
              {/* Left: Contact Cards (Only rendered if configured and not placeholder) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Location card */}
                {!isConfigPlaceholder(SITE_CONFIG.contact.location) ? (
                  <div className="bg-[#141416] p-5 rounded-2xl border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#E11D2E]/20 text-[#FF3B47] flex items-center justify-center text-xl flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {isEs ? 'Ubicación' : 'Studio Location'}
                      </h4>
                      <p className="text-sm sm:text-base font-semibold text-white mt-0.5">
                        {SITE_CONFIG.contact.location}
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* WhatsApp Direct Card */}
                <div
                  onClick={handleQuickWhatsApp}
                  className="bg-[#141416] hover:bg-[#1a1a1e] p-5 rounded-2xl border border-[#E11D2E]/30 hover:border-[#FF3B47] transition-all cursor-pointer flex items-center justify-between group shadow-[0_4px_20px_rgba(225,29,46,0.15)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {isEs ? 'WhatsApp Oficial' : 'Official WhatsApp'}
                      </h4>
                      <p className="text-sm sm:text-base font-bold text-white mt-0.5 group-hover:text-[#25D366] transition-colors">
                        {isConfigPlaceholder(SITE_CONFIG.contact.whatsappNumber)
                          ? (isEs ? 'Iniciar chat directo de cotización' : 'Open instant quote chat')
                          : SITE_CONFIG.contact.whatsappNumber}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                    {isEs ? 'Escribir →' : 'Chat →'}
                  </span>
                </div>

                {/* Phone Card (if not placeholder) */}
                {!isConfigPlaceholder(SITE_CONFIG.contact.phone) && (
                  <a
                    href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                    className="bg-[#141416] hover:bg-[#1a1a1e] p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group block"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center text-xl flex-shrink-0">
                        📞
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {isEs ? 'Llamadas' : 'Phone'}
                        </h4>
                        <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                          {SITE_CONFIG.contact.phone}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                      {isEs ? 'Llamar →' : 'Call →'}
                    </span>
                  </a>
                )}

                {/* Email Card (if not placeholder) */}
                {!isConfigPlaceholder(SITE_CONFIG.contact.email) && (
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="bg-[#141416] hover:bg-[#1a1a1e] p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group block"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center text-xl flex-shrink-0">
                        ✉️
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Email
                        </h4>
                        <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                          {SITE_CONFIG.contact.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                      {isEs ? 'Enviar →' : 'Send →'}
                    </span>
                  </a>
                )}

                {/* Instagram Card (if not placeholder) */}
                {!isConfigPlaceholder(SITE_CONFIG.contact.instagram) && (
                  <a
                    href={`https://instagram.com/${SITE_CONFIG.contact.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#141416] hover:bg-[#1a1a1e] p-5 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all flex items-center justify-between group block"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#833ab4] to-[#fd1d1d] text-white flex items-center justify-center text-xl flex-shrink-0">
                        📸
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Instagram
                        </h4>
                        <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                          {SITE_CONFIG.contact.instagram}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                      {isEs ? 'Ver perfil →' : 'Visit →'}
                    </span>
                  </a>
                )}

                {/* Notice for configurable contact placeholders */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E11D2E]" />
                  <span>
                    {isEs
                      ? 'Los canales de contacto se activan de forma automática una vez definidos en '
                      : 'Contact cards automatically activate once defined in '}
                    <code className="text-[#FF3B47] font-mono">src/config.ts</code>.
                  </span>
                </div>
              </div>

              {/* Right: Stylized Location Panel with Red Pin & Pulsing Rings */}
              <div className="lg:col-span-5 bg-[#141416] p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                {/* Pulsing Target Rings */}
                <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                  <div className="absolute inset-0 rounded-full border border-[#E11D2E]/20 animate-ping" />
                  <div className="absolute inset-4 rounded-full border border-[#E11D2E]/40 animate-pulse-subtle" />
                  <div className="absolute inset-8 rounded-full border border-[#E11D2E]/60" />
                  {/* Center Location Pin */}
                  <div className="w-14 h-14 rounded-full bg-[#E11D2E] text-white flex items-center justify-center shadow-[0_0_25px_#FF3B47] text-2xl z-10">
                    📍
                  </div>
                </div>

                <h3 className="font-display font-black text-2xl text-white mb-2">
                  {isConfigPlaceholder(SITE_CONFIG.contact.location)
                    ? (isEs ? 'Estudio de Detallado' : 'Detailing Studio')
                    : SITE_CONFIG.contact.location}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 max-w-xs mb-4">
                  {isEs
                    ? 'Espacio cerrado con iluminación especializada, filtrado de aire y cabina para instalación de PPF y Ceramic Coating.'
                    : 'Climate and dust controlled studio tailored for precision PPF, window film, and coating application.'}
                </p>

                {/* Horario */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 border border-white/10 text-xs text-gray-300 font-semibold">
                  <span>🕒</span>
                  <span>{isEs ? SITE_CONFIG.contact.hours : 'Mon to Sat: 9:00 AM - 6:00 PM'}</span>
                </div>
              </div>
            </div>

            {/* FINAL CALL TO ACTION BANNER (SOLID RED) */}
            <div className="relative bg-gradient-to-r from-[#A30F1C] via-[#E11D2E] to-[#A30F1C] rounded-3xl p-8 sm:p-12 text-center text-white shadow-[0_20px_50px_rgba(225,29,46,0.5)] overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto">
                <SparkleIcon size={32} className="mx-auto mb-3 text-white animate-twinkle" />
                <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                  {isEs
                    ? '¿Listo Para Proteger Tu Auto? Cotiza Por WhatsApp.'
                    : 'Ready To Protect Your Vehicle? Quote Via WhatsApp.'}
                </h3>
                <p className="text-white/90 text-sm sm:text-base mt-3 max-w-xl mx-auto font-light">
                  {isEs
                    ? 'Respondemos de inmediato con asesoría técnica honesta para recomendarte el mejor tratamiento.'
                    : 'We respond promptly with honest technical advice to tailor the best protection plan.'}
                </p>

                <button
                  onClick={handleQuickWhatsApp}
                  className="mt-8 px-9 py-4 rounded-full bg-white text-[#A30F1C] hover:bg-gray-100 font-display font-black text-base sm:text-lg tracking-wider uppercase shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto"
                >
                  <SparkleIcon size={18} fill="#A30F1C" />
                  <span>{isEs ? 'Cotizar Por WhatsApp Ahora' : 'Chat On WhatsApp Now'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. FOOTER */}
      <footer className="bg-[#070709] border-t border-white/10 py-16 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Column 1: Brand & Logo */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <BadgeLogo size={48} animate={false} />
                <div>
                  <h4 className="font-display font-extrabold text-xl text-white">
                    {SITE_CONFIG.brandName}
                  </h4>
                  <p className="text-xs text-[#E11D2E] font-bold tracking-widest uppercase">
                    AUTO DETAIL
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-400 max-w-md font-light">
                {isEs
                  ? 'Estudio especializado en Detallado Automotriz, PPF XPEL, Window Film y Ceramic Coating. Protección y acabado de agencia.'
                  : 'Specialized studio in Automotive Detailing, XPEL PPF, Window Film, and Ceramic Coating.'}
              </p>

              {/* Hashtag Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {SITE_CONFIG.certificationChips.map((chip) => (
                  <span
                    key={chip}
                    className="text-[11px] font-mono text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h5 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
                {isEs ? 'Navegación' : 'Navigation'}
              </h5>
              <ul className="space-y-2 text-sm">
                {['inicio', 'servicios', 'certificaciones', 'nosotros', 'reservar', 'contacto'].map((sec) => (
                  <li key={sec}>
                    <button
                      onClick={() => {
                        const el = document.getElementById(sec);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-white transition-colors capitalize text-left"
                    >
                      {sec === 'inicio' ? (isEs ? 'Inicio' : 'Home') : sec}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Certificaciones */}
            <div>
              <h5 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">
                {isEs ? 'Certificaciones' : 'Certifications'}
              </h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-[#FF3B47]">✓</span>
                  <span>PPF XPEL Certified</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF3B47]">✓</span>
                  <span>Window Film Certified</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF3B47]">✓</span>
                  <span>Ceramic Coating Certified</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#FF3B47]">✓</span>
                  <span>Detallado Automotriz</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>
              © {new Date().getFullYear()} {SITE_CONFIG.brandName}. {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
            </p>
            <p className="flex items-center gap-1.5">
              <span>{isEs ? 'Hecho para entusiastas del motor' : 'Crafted for car enthusiasts'}</span>
              <SparkleIcon size={12} className="text-[#FF3B47]" />
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION: DESKTOP BOTTOM-RIGHT BUTTON */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <button
          onClick={handleQuickWhatsApp}
          className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3.5 rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.5)] transition-all transform hover:-translate-y-1 active:translate-y-0"
          aria-label="Abrir WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
          <span className="font-bold text-sm tracking-wide">
            {isEs ? 'Cotizar por WhatsApp' : 'Chat via WhatsApp'}
          </span>
        </button>
      </div>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-[#E11D2E]/40 p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <button
          onClick={handleQuickWhatsApp}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-display font-extrabold text-base tracking-wider shadow-lg flex items-center justify-center gap-2.5 active:scale-98 transition-transform"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
          <span>{isEs ? 'Cotiza por WhatsApp' : 'Quote via WhatsApp'}</span>
        </button>
      </div>
    </div>
  );
}
