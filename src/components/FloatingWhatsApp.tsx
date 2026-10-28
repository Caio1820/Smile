import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/calendar';

interface FloatingWhatsAppProps {
  onOpenScheduler: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenScheduler }) => {
  const directWhatsAppUrl = buildWhatsAppLink(
    'Olá, Dra. Sabrina! Gostaria de tirar dúvidas e agendar minha avaliação na Smille Odonto.'
  );

  return (
    <aside 
      aria-label="Atendimento rápido"
      className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/95 to-transparent backdrop-blur-xs flex justify-center pointer-events-none"
    >
      <div className="w-full max-w-md flex items-center gap-2 pointer-events-auto">
        {/* Quick Triage / Google Calendar button */}
        <button
          type="button"
          onClick={onOpenScheduler}
          className="flex-1 py-3 px-3 rounded-2xl bg-white border border-[#C87A8B]/35 hover:border-[#C87A8B] text-[#8C4656] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-[#C87A8B]/10 active:scale-95 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="truncate">Agendamento & Agenda</span>
        </button>

        {/* WhatsApp Button with pulse animation */}
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp com a recepção"
          className="flex-1 py-3 px-3.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all animate-pulse-gentle"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">WhatsApp Dra. Sabrina</span>
        </a>
      </div>
    </aside>
  );
};
