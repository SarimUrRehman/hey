/**
 * HeyDay Auto Detail - Central Configuration
 * All business details, contact information, translations, and services
 * can be edited directly here.
 */

export interface ServiceItem {
  id: string;
  name: { es: string; en: string };
  badgeText: string;
  shortDesc: { es: string; en: string };
  features: { es: string[]; en: string[] };
  iconType: 'detailing' | 'ppf' | 'windowFilm' | 'ceramic' | 'correction';
}

export interface CertItem {
  id: string;
  tag: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  highlights: { es: string[]; en: string[] };
}

export const SITE_CONFIG = {
  // Business Identification
  brandName: 'HeyDay Auto Detail',
  tagline: {
    es: 'Especialistas en Detallado Automotriz',
    en: 'Automotive Detailing Specialists'
  },
  heroSubtitle: {
    es: 'Protección, brillo y acabado de agencia para tu auto.',
    en: 'Protection, mirror shine, and showroom finish for your vehicle.'
  },

  // Contact Information & Socials
  // Placeholder markers: values matching "[...]" or empty strings will be safely hidden in UI
  contact: {
    location: '[TU CIUDAD]', // e.g. "Av. Insurgentes Sur 1450, Col. Del Valle, CDMX"
    hours: 'Lunes a Sábado: 9:00 AM - 6:00 PM',
    phone: '[TELÉFONO]', // e.g. "+52 55 1234 5678"
    whatsappNumber: '[WHATSAPP]', // e.g. "5215512345678" (digits only with country code)
    email: '[EMAIL]', // e.g. "contacto@heydayautodetail.com"
    instagram: '[@instagram]', // e.g. "heydayautodetail"
    facebook: '[FACEBOOK]', // e.g. "heydayautodetail"
    tiktok: '[TIKTOK]', // e.g. "@heydayautodetail"
  },

  // Certification Hashtags
  certificationChips: [
    '#PPFXPEL',
    '#WINDOWFILM',
    '#CERAMICCOATING',
    '#DetalladoAutomotriz'
  ],

  // Certification Highlights
  certifications: [
    {
      id: 'ppf-xpel',
      tag: '#PPFXPEL',
      title: {
        es: 'Instaladores Certificados PPF XPEL',
        en: 'Certified XPEL PPF Installers'
      },
      description: {
        es: 'Película de protección de pintura con tecnología autorregenerativa contra piedras, rayones y contaminantes viales, instalada con patrones de corte milimétricos.',
        en: 'Self-healing paint protection film defending against rock chips, scratches, and highway debris, precision-fitted with specialized patterns.'
      },
      highlights: {
        es: ['Corte computarizado de precisión', 'Acabado invisible de alto brillo', 'Protección contra impactos reales'],
        en: ['Precision digital plotting', 'Invisible high-gloss finish', 'True road-impact defense']
      }
    },
    {
      id: 'window-film',
      tag: '#WINDOWFILM',
      title: {
        es: 'Instaladores Certificados Window Film',
        en: 'Certified Window Film Installers'
      },
      description: {
        es: 'Polarizado de alta tecnología con rechazo superior de calor infrarrojo y protección 99% contra rayos UV, cuidando el interior y tu confort.',
        en: 'High-performance automotive window film delivering maximum infrared heat rejection and 99% UV defense to preserve interiors.'
      },
      highlights: {
        es: ['Rechazo térmico infrarrojo', 'Protección UV 99%', 'Claridad óptica sin interferencia'],
        en: ['Infrared heat rejection', '99% UV radiation block', 'Crystal-clear optical visibility']
      }
    },
    {
      id: 'ceramic-coating',
      tag: '#CERAMICCOATING',
      title: {
        es: 'Instaladores Certificados Ceramic Coating',
        en: 'Certified Ceramic Coating Installers'
      },
      description: {
        es: 'Recubrimiento cerámico de grado profesional que sella la pintura, otorgando extrema hidrofobicidad, repelencia a la suciedad y un brillo espejo inigualable.',
        en: 'Professional-grade ceramic coating that seals clear coat, generating extreme hydrophobicity, water beading, and deep mirror gloss.'
      },
      highlights: {
        es: ['Efecto hidrofóbico extremo', 'Fácil lavado y mantenimiento', 'Profundidad de color y brillo espejo'],
        en: ['Extreme water-beading effect', 'Effortless maintenance washing', 'Deep color depth & mirror gloss']
      }
    }
  ] as CertItem[],

  // Primary Services
  services: [
    {
      id: 'detallado-automotriz',
      name: {
        es: 'Detallado Automotriz',
        en: 'Auto Detailing'
      },
      badgeText: 'Interior & Exterior',
      shortDesc: {
        es: 'Limpieza profunda, descontaminación exhaustiva y reacondicionamiento milimétrico de interiores y exteriores para devolver la sensación de auto nuevo.',
        en: 'Comprehensive deep cleaning, decontamination, and meticulous reconditioning inside and out to restore that new-car sensation.'
      },
      features: {
        es: ['Descontaminación con barra de arcilla', 'Limpieza y nutrición de piel y plásticos', 'Detallado de rines y tolvas'],
        en: ['Clay bar paint decontamination', 'Leather & trim conditioning', 'Deep wheel & caliper detailing']
      },
      iconType: 'detailing'
    },
    {
      id: 'ppf-xpel',
      name: {
        es: 'Instalación de PPF XPEL',
        en: 'XPEL PPF Installation'
      },
      badgeText: 'Protección Total',
      shortDesc: {
        es: 'Película de poliuretano autorregenerativa transparente para proteger la pintura original contra impactos de piedras, rasguños y micro-rayas.',
        en: 'Self-healing clear polyurethane film guarding pristine paint against rock chips, gravel, and surface scratches.'
      },
      features: {
        es: ['Material original XPEL', 'Propiedad auto-curativa con calor', 'Garantía de instalación certificada'],
        en: ['Genuine XPEL film', 'Heat-activated self-healing', 'Certified precision fitment']
      },
      iconType: 'ppf'
    },
    {
      id: 'window-film',
      name: {
        es: 'Window Film (Polarizado)',
        en: 'Automotive Window Film'
      },
      badgeText: 'Confort & Privacidad',
      shortDesc: {
        es: 'Películas nanocerámicas para cristales que reducen significativamente la temperatura en cabina, filtran rayos UV y brindan elegancia y privacidad.',
        en: 'Nanoceramic window tinting drastically lowering cabin heat, blocking harmful UV rays, and providing privacy and elegance.'
      },
      features: {
        es: ['Alto rechazo de calor IR', '99% bloqueo UV dañino', 'Tonalidades legales y personalizadas'],
        en: ['Superior IR heat rejection', '99% UV radiation block', 'Tailored shade levels']
      },
      iconType: 'windowFilm'
    },
    {
      id: 'ceramic-coating',
      name: {
        es: 'Recubrimiento Cerámico',
        en: 'Ceramic Coating'
      },
      badgeText: 'Brillo Espejo & Repelencia',
      shortDesc: {
        es: 'Capa protectora basada en SiO2 que se ancla a nivel molecular con el barniz, creando una barrera hidrofóbica ultra brillante y resistente a químicos.',
        en: 'Advanced SiO2 protective shield bonding at a molecular level to clear coat for deep reflections, chemical resistance, and self-cleaning water beading.'
      },
      features: {
        es: ['Acabado efecto mojado profundo', 'Repelencia de agua y contaminantes', 'Facilidad de lavado superior'],
        en: ['Deep wet-look reflection', 'Severe water beading', 'Effortless maintenance washes']
      },
      iconType: 'ceramic'
    },
    {
      id: 'pulido-correccion',
      name: {
        es: 'Pulido y Corrección de Pintura',
        en: 'Paint Correction & Polishing'
      },
      badgeText: 'Eliminación de Micro-Rayones',
      shortDesc: {
        es: 'Proceso artesanal de corte y abrillantado con pulidoras orbitales para eliminar marcas de lavado (swirls), oxidación y opacidad antes de proteger.',
        en: 'Artisanal multi-stage machine polishing removing swirl marks, light oxidation, and haze to reveal true optical clarity.'
      },
      features: {
        es: ['Medición con medidor de espesores', 'Eliminación de swirls y marcas', 'Máxima reflectividad antes de cerámico'],
        en: ['Clear coat depth gauge inspection', 'Swirl and hologram removal', 'Maximum optical mirror clarity']
      },
      iconType: 'correction'
    }
  ] as ServiceItem[],

  // Before & After comparison visual settings
  beforeAfter: {
    labelBefore: { es: 'Antes (Pintura Opaca & Swirls)', en: 'Before (Dull Paint & Swirls)' },
    labelAfter: { es: 'Después (HeyDay Ceramic Gloss)', en: 'After (HeyDay Ceramic Gloss)' },
    note: {
      es: 'Reemplaza con tus fotos reales de antes y después.',
      en: 'Replace with your real before and after workshop photos.'
    },
    // If you have real image URLs, replace these empty strings with image paths:
    beforeImage: '',
    afterImage: ''
  },

  // Process Steps
  processSteps: [
    {
      step: 1,
      title: { es: 'Escríbenos por WhatsApp', en: 'Message us on WhatsApp' },
      desc: {
        es: 'Cuéntanos qué auto tienes y los servicios que te interesan.',
        en: 'Tell us your vehicle model and the services you want.'
      }
    },
    {
      step: 2,
      title: { es: 'Revisamos tu auto y te cotizamos', en: 'We inspect and quote' },
      desc: {
        es: 'Evaluamos el estado de tu pintura y necesidades específicas.',
        en: 'We evaluate your paint condition and recommend the best plan.'
      }
    },
    {
      step: 3,
      title: { es: 'Realizamos el servicio', en: 'Certified craftsmanship' },
      desc: {
        es: 'Trabajo meticuloso en nuestro estudio con técnicas y productos certificados.',
        en: 'Precision work in our studio using certified techniques and products.'
      }
    },
    {
      step: 4,
      title: { es: 'Disfruta tu auto protegido', en: 'Drive your protected car' },
      desc: {
        es: 'Entrega con acabado de agencia, brillo reluciente y protección duradera.',
        en: 'Handover with showroom shine, slick paint, and durable defense.'
      }
    }
  ]
};

/**
 * Checks whether a given string is empty or still contains a bracketed placeholder like "[WHATSAPP]".
 */
export function isConfigPlaceholder(val?: string | null): boolean {
  if (!val) return true;
  const trimmed = val.trim();
  if (!trimmed) return true;
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) return true;
  return false;
}

/**
 * Returns formatted WhatsApp wa.me link with message or returns fallback string if placeholder.
 */
export function getWhatsAppUrl(phoneOrConfig: string, message: string): string {
  const isPlaceholder = isConfigPlaceholder(phoneOrConfig);
  // If still a placeholder, use a sensible Mexican dummy number so the user can test the UI link or test sharing
  const targetNumber = isPlaceholder ? '5215500000000' : phoneOrConfig.replace(/\D/g, '');
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
}
