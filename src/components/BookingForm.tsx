import React, { useState, useEffect } from 'react';
import { SparkleIcon } from './BadgeLogo';
import { SITE_CONFIG, isConfigPlaceholder, getWhatsAppUrl } from '../config';

interface BookingFormProps {
  currentLang: 'es' | 'en';
  preSelectedServiceId?: string;
  onClearPreSelected?: () => void;
}

interface FormState {
  fullName: string;
  phone: string;
  carModel: string;
  carYear: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: 'Mañana' | 'Tarde' | 'Morning' | 'Afternoon';
  comments: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  currentLang,
  preSelectedServiceId,
}) => {
  const isEs = currentLang === 'es';

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    carModel: '',
    carYear: '',
    serviceId: preSelectedServiceId || '',
    preferredDate: '',
    preferredTime: isEs ? 'Mañana' : 'Morning',
    comments: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preSelectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preSelectedServiceId }));
    }
  }, [preSelectedServiceId]);

  const serviceOptions = [
    ...SITE_CONFIG.services.map((s) => ({
      id: s.id,
      label: s.name[currentLang],
    })),
    {
      id: 'multiple-or-unsure',
      label: isEs
        ? 'Varios servicios / No estoy seguro (requiero asesoría)'
        : 'Multiple services / Not sure (need advice)',
    },
  ];

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = isEs
        ? 'Por favor ingresa tu nombre completo.'
        : 'Please enter your full name.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = isEs
        ? 'Por favor ingresa tu número telefónico o WhatsApp.'
        : 'Please enter your phone or WhatsApp number.';
    }
    if (!formData.carModel.trim()) {
      newErrors.carModel = isEs
        ? 'Indica la marca y modelo de tu vehículo.'
        : 'Please specify your car make and model.';
    }
    if (!formData.serviceId) {
      newErrors.serviceId = isEs
        ? 'Selecciona el servicio que te interesa.'
        : 'Please select a service.';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = isEs
        ? 'Elige una fecha tentativa para agendar.'
        : 'Please select a preferred date.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate neatly formatted booking message for WhatsApp / Clipboard
  const generateFormattedMessage = () => {
    const selectedServiceObj = serviceOptions.find(
      (s) => s.id === formData.serviceId
    );
    const serviceName = selectedServiceObj ? selectedServiceObj.label : formData.serviceId;

    return isEs
      ? `✨ *SOLICITUD DE COTIZACIÓN - HEYDAY AUTO DETAIL* ✨
━━━━━━━━━━━━━━━━━━━━
👤 *Cliente:* ${formData.fullName}
📱 *Teléfono:* ${formData.phone}
🚗 *Vehículo:* ${formData.carModel} ${formData.carYear ? `(${formData.carYear})` : ''}
🛠️ *Servicio de interés:* ${serviceName}
📅 *Fecha preferida:* ${formData.preferredDate}
⏰ *Horario:* ${formData.preferredTime}
${formData.comments.trim() ? `📝 *Detalles o dudas:* ${formData.comments}` : ''}
━━━━━━━━━━━━━━━━━━━━
_Hola HeyDay Auto Detail, me gustaría recibir una cotización y confirmar disponibilidad para mi auto. ¡Gracias!_`
      : `✨ *QUOTE & BOOKING REQUEST - HEYDAY AUTO DETAIL* ✨
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${formData.fullName}
📱 *Phone:* ${formData.phone}
🚗 *Vehicle:* ${formData.carModel} ${formData.carYear ? `(${formData.carYear})` : ''}
🛠️ *Service:* ${serviceName}
📅 *Preferred Date:* ${formData.preferredDate}
⏰ *Time:* ${formData.preferredTime}
${formData.comments.trim() ? `📝 *Notes:* ${formData.comments}` : ''}
━━━━━━━━━━━━━━━━━━━━
_Hello HeyDay Auto Detail, I would like to get a quote and schedule an appointment for my car. Thank you!_`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const handleCopy = () => {
    const message = generateFormattedMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenWhatsApp = () => {
    const message = generateFormattedMessage();
    const url = getWhatsAppUrl(SITE_CONFIG.contact.whatsappNumber, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleInstagramClick = () => {
    const message = generateFormattedMessage();
    navigator.clipboard.writeText(message);
    setCopied(true);
    const cleanIg = SITE_CONFIG.contact.instagram.replace('@', '').trim();
    window.open(`https://instagram.com/${cleanIg}`, '_blank', 'noopener,noreferrer');
  };

  const hasInstagram = !isConfigPlaceholder(SITE_CONFIG.contact.instagram);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!isSubmitted ? (
        <form
          onSubmit={handleSubmit}
          className="relative bg-[#141416]/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Decorative red accent top line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A30F1C] via-[#FF3B47] to-[#A30F1C]" />

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#FF3B47] mb-2 bg-[#E11D2E]/10 px-3 py-1 rounded-full border border-[#E11D2E]/30">
              <SparkleIcon size={12} className="animate-twinkle" />
              {isEs ? 'Agenda Tu Cita' : 'Book Your Session'}
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {isEs ? 'Solicita Tu Cotización' : 'Request Your Quote'}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              {isEs
                ? 'Completa los datos y te responderemos por WhatsApp con disponibilidad y detalles.'
                : 'Fill in your details and we will reply via WhatsApp with scheduling and options.'}
            </p>
          </div>

          <div className="space-y-4">
            {/* Nombre Completo */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                {isEs ? 'Nombre completo *' : 'Full Name *'}
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={isEs ? 'Ej. Carlos Martínez' : 'e.g. John Smith'}
                className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF3B47] transition-all text-sm ${
                  errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                }`}
              />
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
            </div>

            {/* Teléfono / WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                {isEs ? 'Teléfono / WhatsApp *' : 'Phone / WhatsApp *'}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={isEs ? 'Ej. 55 1234 5678' : 'e.g. +1 555 123 4567'}
                className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF3B47] transition-all text-sm ${
                  errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                }`}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Vehículo: Modelo y Año */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  {isEs ? 'Marca y modelo del auto *' : 'Car Make & Model *'}
                </label>
                <input
                  type="text"
                  value={formData.carModel}
                  onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                  placeholder={isEs ? 'Ej. BMW M3, Porsche 911, Audi S3' : 'e.g. BMW M3, Porsche 911'}
                  className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF3B47] transition-all text-sm ${
                    errors.carModel ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                  }`}
                />
                {errors.carModel && <p className="text-red-400 text-xs mt-1">{errors.carModel}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  {isEs ? 'Año (opcional)' : 'Year (optional)'}
                </label>
                <input
                  type="text"
                  value={formData.carYear}
                  onChange={(e) => setFormData({ ...formData, carYear: e.target.value })}
                  placeholder="2024"
                  maxLength={4}
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF3B47] transition-all text-sm"
                />
              </div>
            </div>

            {/* Servicio Dropdown */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                {isEs ? 'Servicio principal de interés *' : 'Service of interest *'}
              </label>
              <select
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF3B47] transition-all text-sm ${
                  errors.serviceId ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                }`}
              >
                <option value="">
                  {isEs ? '-- Selecciona un servicio --' : '-- Choose a service --'}
                </option>
                {serviceOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.serviceId && <p className="text-red-400 text-xs mt-1">{errors.serviceId}</p>}
            </div>

            {/* Fecha y Horario */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  {isEs ? 'Fecha tentativa *' : 'Preferred Date *'}
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#0A0A0A] border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#FF3B47] transition-all text-sm ${
                    errors.preferredDate ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10'
                  }`}
                />
                {errors.preferredDate && (
                  <p className="text-red-400 text-xs mt-1">{errors.preferredDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  {isEs ? 'Horario preferido' : 'Preferred Time'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(isEs ? (['Mañana', 'Tarde'] as const) : (['Morning', 'Afternoon'] as const)).map(
                    (slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setFormData({ ...formData, preferredTime: slot })}
                        className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                          formData.preferredTime === slot
                            ? 'bg-[#E11D2E] text-white border-[#FF3B47] shadow-[0_0_12px_rgba(225,29,46,0.5)]'
                            : 'bg-[#0A0A0A] text-gray-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {slot}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Comentarios Adicionales */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                {isEs ? 'Comentarios o preguntas adicionales' : 'Additional comments or questions'}
              </label>
              <textarea
                rows={2}
                value={formData.comments}
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                placeholder={
                  isEs
                    ? '¿Tu auto tiene detalles de pintura, golpes previos o buscas algún paquete especial?'
                    : 'Any paint concerns, existing conditions or custom requests?'
                }
                className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF3B47] transition-all text-sm resize-none"
              />
            </div>
          </div>

          <p className="text-[11px] text-gray-400 text-center mt-4">
            💬 {isEs ? 'Confirmamos todas las citas por WhatsApp.' : 'All appointments are confirmed via WhatsApp.'}
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-[#E11D2E] via-[#FF3B47] to-[#A30F1C] text-white font-display font-extrabold text-base tracking-wider uppercase shadow-[0_0_25px_rgba(225,29,46,0.5)] hover:shadow-[0_0_35px_rgba(255,59,71,0.8)] transition-all overflow-hidden flex items-center justify-center gap-2"
          >
            <SparkleIcon size={18} className="text-white animate-twinkle" />
            <span>{isEs ? 'Generar Solicitud de Cotización' : 'Generate Quote Request'}</span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
          </button>
        </form>
      ) : (
        /* Animated Success State */
        <div className="relative bg-[#141416] border-2 border-[#FF3B47] p-6 sm:p-8 rounded-3xl shadow-[0_0_50px_rgba(225,29,46,0.3)] text-center animate-in zoom-in-95 duration-300 overflow-hidden">
          {/* Top red glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#E11D2E]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Sparkle burst icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#E11D2E] to-[#FF3B47] flex items-center justify-center text-white shadow-[0_0_20px_#FF3B47]">
            <SparkleIcon size={32} className="animate-twinkle" />
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {isEs ? '¡Solicitud Lista Para Enviar!' : 'Ready to Send!'}
          </h3>
          <p className="text-gray-300 text-sm mt-1 mb-6 max-w-md mx-auto">
            {isEs
              ? 'Tu información ha sido estructurada de forma impecable. Elige tu canal preferido para enviarla de inmediato:'
              : 'Your booking request is nicely formatted. Choose your preferred channel to send it now:'}
          </p>

          {/* Summary Preview Box */}
          <div className="bg-[#0A0A0A] p-4 rounded-2xl border border-white/10 text-left font-mono text-xs text-gray-300 mb-6 max-h-48 overflow-y-auto whitespace-pre-wrap select-all leading-relaxed">
            {generateFormattedMessage()}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Enviar por WhatsApp */}
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,211,102,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span>{isEs ? 'Enviar por WhatsApp' : 'Send via WhatsApp'}</span>
            </button>

            {/* Copiar Mensaje */}
            <button
              onClick={handleCopy}
              className={`w-full py-3 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
                copied
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-white/10 hover:bg-white/15 text-white border-white/10'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {copied ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                )}
              </svg>
              <span>
                {copied
                  ? isEs
                    ? '¡Mensaje Copiado al Portapapeles!'
                    : 'Message Copied to Clipboard!'
                  : isEs
                  ? 'Copiar mensaje'
                  : 'Copy message text'}
              </span>
            </button>

            {/* Instagram (shown only if configured) */}
            {hasInstagram && (
              <button
                onClick={handleInstagramClick}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow"
              >
                <span>{isEs ? 'Copiar y escribir por Instagram' : 'Copy and open Instagram'}</span>
              </button>
            )}

            {/* Edit / New Request Button */}
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs text-gray-400 hover:text-white pt-2 underline decoration-dotted transition-colors"
            >
              {isEs ? '← Modificar datos de la solicitud' : '← Edit request information'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
