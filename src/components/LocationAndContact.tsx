import React, { useState } from 'react';
import { 
  MapPin, 
  ExternalLink, 
  MessageCircle, 
  Instagram, 
  Clock, 
  Copy, 
  Check, 
  PhoneCall, 
  Navigation,
  ShieldCheck
} from 'lucide-react';
import { 
  CLINIC_ADDRESS, 
  GOOGLE_MAPS_LINK, 
  INSTAGRAM_LINK, 
  INSTAGRAM_HANDLE, 
  CLINIC_PHONE, 
  CLINIC_PHONE_DISPLAY, 
  buildWhatsAppLink 
} from '../utils/calendar';

export const LocationAndContact: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Rua Guanabara, N.° 200, Pacoval - Macapá/AP, CEP 68908-280');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const generalWhatsAppUrl = buildWhatsAppLink(
    'Olá! Gostaria de falar com a recepção do Smille - Consultório Odontológico.'
  );

  return (
    <section className="w-full max-w-md mx-auto px-3.5 sm:px-4 py-4 space-y-3.5">
      {/* Section Title */}
      <div className="text-center space-y-1 px-2">
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#C87A8B]">
          Fácil Acesso no Pacoval
        </span>
        <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#2B2627]">
          Localização & Contato Direto
        </h2>
      </div>

      {/* Main Address Card */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 text-left relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FDF7F8] border border-[#C87A8B]/30 flex items-center justify-center text-[#C87A8B] shrink-0 shadow-2xs">
            <MapPin className="w-5 h-5 text-[#C87A8B]" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-base font-bold text-[#2B2627]">
              Smille • Consultório Odontológico
            </h3>
            <p className="text-xs text-[#2B2627]/90 mt-0.5 leading-relaxed font-medium">
              📍 {CLINIC_ADDRESS}
            </p>
            <p className="text-[11px] text-[#6B6264] mt-0.5">
              Bairro Pacoval • Estacionamento de fácil acesso
            </p>
          </div>
        </div>

        {/* Copy Address Button */}
        <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#2B2627]/5 text-xs">
          <button
            type="button"
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1.5 text-xs text-[#6B6264] hover:text-[#C87A8B] transition-colors py-1"
          >
            {copiedAddress ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="text-emerald-700 font-medium">Endereço copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 shrink-0" />
                <span>Copiar endereço completo</span>
              </>
            )}
          </button>

          <span className="text-[11px] text-[#6B6264]/70">Macapá - AP</span>
        </div>

        {/* Primary Map & Route Buttons */}
        <div className="mt-3.5 grid grid-cols-1 gap-2">
          {/* Ver no Google Maps (Requested link) */}
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-white border border-[#C87A8B]/30 hover:border-[#C87A8B] text-[#2B2627] hover:text-[#C87A8B] text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-[0.99]"
          >
            <Navigation className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Ver no Google Maps 🗺️</span>
            <ExternalLink className="w-3 h-3 text-[#6B6264] shrink-0" />
          </a>

          {/* Falar com a Recepção no WhatsApp (Requested button) */}
          <a
            href={generalWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1DA851] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 hover:opacity-95 active:scale-[0.99] transition-all"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Falar com a Recepção no WhatsApp 📲</span>
          </a>
        </div>
      </div>

      {/* Office Hours & Instagram Info Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {/* Working Hours */}
        <div className="bg-white/90 backdrop-blur-xs border border-[#C87A8B]/15 rounded-2xl p-3.5 text-left shadow-2xs space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C4656]">
            <Clock className="w-3.5 h-3.5 text-[#C87A8B] shrink-0" />
            <span>Horário de Atendimento</span>
          </div>
          <p className="text-xs text-[#2B2627] font-medium pt-0.5">
            Segunda a Sexta: <span className="font-semibold text-[#8C4656]">08h às 18h</span>
          </p>
          <p className="text-[11px] text-[#6B6264]">
            Sábados: <span className="font-medium text-[#2B2627]">Com hora marcada</span>
          </p>
          <div className="pt-1 flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block shrink-0" />
            <span>Atendimento pontual e acolhedor</span>
          </div>
        </div>

        {/* Instagram Profile Card */}
        <a
          href={INSTAGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/90 backdrop-blur-xs border border-[#C87A8B]/15 hover:border-[#C87A8B]/40 rounded-2xl p-3.5 text-left shadow-2xs space-y-1 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C87A8B]">
                <Instagram className="w-3.5 h-3.5 shrink-0" />
                <span>Instagram Oficial</span>
              </div>
              <ExternalLink className="w-3 h-3 text-[#6B6264] group-hover:text-[#C87A8B] shrink-0" />
            </div>
            <p className="text-xs font-bold text-[#2B2627] mt-1 group-hover:text-[#8C4656] transition-colors">
              {INSTAGRAM_HANDLE}
            </p>
            <p className="text-[11px] text-[#6B6264] mt-0.5 leading-snug">
              454 seguidores • Dicas e resultados de sorrisos
            </p>
          </div>
          <span className="text-[11px] text-[#C87A8B] font-semibold pt-1">
            Seguir no Instagram →
          </span>
        </a>
      </div>

      {/* Telefone direto / Chamada */}
      <div className="bg-[#FDF7F8] border border-[#D98C9D]/25 rounded-2xl p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-[#2B2627] min-w-0">
          <PhoneCall className="w-4 h-4 text-[#C87A8B] shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] text-[#6B6264] block">Central Telefônica</span>
            <span className="font-semibold text-xs truncate block">{CLINIC_PHONE_DISPLAY}</span>
          </div>
        </div>

        <a
          href={`tel:${CLINIC_PHONE}`}
          className="px-3 py-1.5 rounded-xl bg-white border border-[#C87A8B]/30 hover:border-[#C87A8B] text-[#8C4656] text-xs font-semibold transition-colors shrink-0 ml-2"
        >
          Ligar Agora
        </a>
      </div>

      {/* Trust & Biosafety footnote */}
      <div className="pt-1 text-center text-[10px] sm:text-[11px] text-[#6B6264] flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
        <span>Consultório com esterilização e biossegurança rigorosa.</span>
      </div>
    </section>
  );
};
