import React from 'react';
import { MessageCircle, Calendar } from 'lucide-react';
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
      className="fixed bottom-0 left-0 right-0 z-40 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/95 to-transparent backdrop-blur-xs flex justify-center pointer-events-none"
    >
      <div className="w-full max-w-md flex items-center gap-2 pointer-events-auto">
        {/* Quick Triage / Google Calendar button */}
        <button
          type="button"
          onClick={onOpenScheduler}
          className="flex-1 min-h-[46px] py-2 px-3 rounded-xl bg-white border border-[#C87A8B]/35 hover:border-[#C87A8B] text-[#8C4656] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-[#C87A8B]/10 active:scale-95 transition-all"
        >
          <Calendar className="w-4 h-4 text-[#C87A8B] shrink-0" />
          <span className="truncate">Agendar Consulta</span>
        </button>

        {/* WhatsApp Button with pulse animation */}
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp com a recepção"
          className="flex-1 min-h-[46px] py-2 px-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/25 active:scale-95 transition-all animate-pulse-gentle"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">WhatsApp Smille</span>
        </a>
      </div>
    </aside>
  );
};
