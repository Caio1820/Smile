import React, { useState } from 'react';
import { MapPin, Clock, Share2, Check, Sparkles, Instagram, Heart } from 'lucide-react';
import { INSTAGRAM_LINK, INSTAGRAM_HANDLE, GOOGLE_MAPS_LINK } from '../utils/calendar';

export const Header: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Smille | Consultório Odontológico — Dra. Sabrina Oliveira',
          text: 'Agendamento e tratamentos odontológicos com a Dra. Sabrina Oliveira (CRO: 1156-AP) em Macapá.',
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="relative w-full pt-6 pb-4 px-4 flex flex-col items-center text-center overflow-hidden">
      {/* Decorative ambient rose gold lights */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-35"
        style={{
          background: 'radial-gradient(circle, #E6A3B2 0%, #D98C9D 40%, rgba(250,250,250,0) 70%)',
        }}
        aria-hidden="true"
      />

      {/* Top utility row: Share button & Instagram badge */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 z-10 px-0.5">
        <a
          href={INSTAGRAM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C87A8B] hover:text-[#9A4B5D] transition-colors bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#C87A8B]/20 shadow-2xs active:scale-95"
        >
          <Instagram className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate max-w-[110px] sm:max-w-none">{INSTAGRAM_HANDLE}</span>
          <span className="text-[10px] text-[#2B2627]/50 font-normal shrink-0">· 454 seg.</span>
        </a>

        <button
          onClick={handleShare}
          type="button"
          aria-label="Compartilhar BioSite"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2B2627]/75 hover:text-[#2B2627] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#C87A8B]/20 shadow-2xs transition-transform active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-emerald-700 font-semibold text-[11px] sm:text-xs">Copiado!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-[#C87A8B] shrink-0" />
              <span className="text-[11px] sm:text-xs">Compartilhar</span>
            </>
          )}
        </button>
      </div>

      {/* Profile / Circular Logo Container with delicate rose & gold frame */}
      <div className="relative z-10 mb-4 group">
        {/* Exterior gold-rose ring */}
        <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#D98C9D] to-[#E6A3B2] shadow-md shadow-[#C87A8B]/20">
          <div className="p-[2px] bg-[#FAFAFA] rounded-full">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white flex items-center justify-center relative shadow-inner">
              {!imageError ? (
                <img
                  src="https://i.postimg.cc/TY5nDYT1/smille-odonto.jpg"
                  alt="Smille Consultório Odontológico — Dra. Sabrina Oliveira"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FDF7F8] to-[#F5E6E8] text-[#C87A8B] p-2">
                  <Sparkles className="w-7 h-7 text-[#D4AF37] mb-1" />
                  <span className="font-serif text-base font-bold tracking-tight text-[#C87A8B]">Smille</span>
                  <span className="text-[9px] tracking-wider uppercase font-semibold text-[#6B6264]">Odonto</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Small floating badge: verified tooth/heart icon */}
        <div 
          className="absolute -bottom-1 right-1 bg-gradient-to-r from-[#D4AF37] to-[#C87A8B] p-1.5 rounded-full text-white shadow-md border-2 border-white flex items-center justify-center"
          title="Profissional Habilitada CRO: 1156-AP"
        >
          <Heart className="w-3 h-3 fill-white text-white" />
        </div>
      </div>

      {/* Main Title & Professional credentials */}
      <div className="relative z-10 max-w-md w-full px-2">
        <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2B2627] leading-tight">
          <span>Smille</span>
          <span className="text-[#C87A8B] font-light font-sans mx-1">|</span>
          <span className="font-normal text-[#4A4042]">Consultório Odontológico</span>
          <span className="text-sm ml-1 inline-block align-middle">💫</span>
        </h1>

        <p className="mt-1 text-xs sm:text-sm font-medium text-[#C87A8B] flex items-center justify-center gap-1.5 flex-wrap">
          <span>Dra. Sabrina Oliveira</span>
          <span className="text-[#D4AF37] text-[10px]">◆</span>
          <span className="text-[#6B6264] font-semibold tracking-wide">CRO: 1156-AP</span>
        </p>

        {/* Slogan */}
        <div className="mt-2 px-3 py-1 inline-block">
          <p className="font-serif italic text-sm sm:text-base text-[#2B2627]/90 tracking-wide leading-snug">
            “Acolher com amor e executar com excelência ✨”
          </p>
        </div>

        {/* Informational badges (Location & Appointment only) */}
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[#2B2627]/80">
          <a
            href={GOOGLE_MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 rounded-full border border-[#C87A8B]/25 hover:border-[#C87A8B] transition-colors shadow-2xs active:scale-95"
          >
            <MapPin className="w-3 h-3 text-[#C87A8B] shrink-0" />
            <span className="font-medium">Pacoval - Macapá/AP</span>
          </a>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FDF7F8] rounded-full border border-[#D98C9D]/30 shadow-2xs">
            <Clock className="w-3 h-3 text-[#C87A8B] shrink-0" />
            <span className="font-medium text-[#8C4656]">Atendimento com Hora Marcada</span>
          </div>
        </div>
      </div>
    </header>
  );
};
