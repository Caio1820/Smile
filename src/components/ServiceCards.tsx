import React, { useState } from 'react';
import { Sparkles, Calendar, ChevronDown, ChevronUp, Check, ArrowRight } from 'lucide-react';
import { CLINIC_SERVICES } from '../data/services';
import { buildWhatsAppLink } from '../utils/calendar';

interface ServiceCardsProps {
  onOpenScheduler: (serviceId: string) => void;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ onOpenScheduler }) => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full max-w-md mx-auto px-3.5 sm:px-4 py-3 space-y-3.5">
      {/* Section Header */}
      <div className="text-center space-y-1 mb-3 px-2">
        <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#C87A8B] bg-[#FDF7F8] px-2.5 py-1 rounded-full border border-[#D98C9D]/30">
          <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0" />
          <span>Atendimento Personalizado</span>
        </div>
        <h2 className="font-serif text-lg sm:text-2xl font-bold text-[#2B2627] tracking-tight leading-snug">
          Como podemos transformar o seu sorriso hoje?
        </h2>
        <p className="text-xs sm:text-sm text-[#6B6264] max-w-sm mx-auto">
          Selecione o tratamento desejado para agendar sua avaliação:
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {CLINIC_SERVICES.map((service, index) => {
          const directWhatsAppUrl = buildWhatsAppLink(service.whatsappMessage);
          const isExpanded = expandedCardId === service.id;
          const isHighlight = index === 0;

          return (
            <article
              key={service.id}
              className="glass-card rounded-2xl p-3.5 sm:p-4 relative overflow-hidden group text-left transition-all duration-300"
            >
              {/* Subtle luxury corner gradient accent */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none opacity-20 -mr-8 -mt-8"
                style={{
                  background: 'radial-gradient(circle, #D4AF37 0%, #C87A8B 70%, transparent 100%)',
                }}
                aria-hidden="true"
              />

              {/* Service Header Row */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FDF7F8] to-[#F5E6E8] border border-[#C87A8B]/20 flex items-center justify-center text-xl shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <span role="img" aria-label={service.title}>{service.emoji}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#2B2627] leading-snug group-hover:text-[#8C4656] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#2B2627]/85 mt-0.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Expandable features toggle */}
              <div className="mt-2.5 pt-2 border-t border-[#2B2627]/5">
                <button
                  type="button"
                  onClick={() => toggleExpand(service.id)}
                  className="text-[11px] font-medium text-[#C87A8B] hover:text-[#8C4656] flex items-center justify-between w-full py-1 transition-colors min-h-[32px]"
                >
                  <span className="flex items-center gap-1">
                    {isExpanded ? 'Ocultar detalhes do procedimento' : 'Ver o que inclui este tratamento'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3.5 h-3.5 text-[#C87A8B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-[#C87A8B] shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-2 pt-1.5 space-y-1.5 animate-in fade-in duration-200">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-[#6B6264]">
                        <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    <div className="pt-1 text-[11px] text-[#2B2627]/60">
                      <span>Duração estimada da sessão: </span>
                      <strong className="text-[#C87A8B]">{service.estimatedDuration}</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: WhatsApp Direct & Google Calendar Pre-booking */}
              <div className="mt-3 pt-1 flex flex-col gap-2">
                {/* Primary WhatsApp Direct Button */}
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full min-h-[44px] py-2.5 px-3 rounded-xl text-center text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all ${
                    isHighlight
                      ? 'bg-gradient-to-r from-[#C87A8B] via-[#D98C9D] to-[#C87A8B] text-white shadow-md shadow-[#C87A8B]/25 animate-pulse-gentle hover:opacity-95'
                      : 'bg-gradient-to-r from-[#C87A8B] to-[#D98C9D] text-white shadow-xs hover:shadow-md hover:shadow-[#C87A8B]/20 hover:opacity-95'
                  } active:scale-[0.99]`}
                >
                  <span className="truncate">{service.buttonLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </a>

                {/* Secondary: Interactive Date Selection & Google Calendar Sync */}
                <button
                  type="button"
                  onClick={() => onOpenScheduler(service.id)}
                  className="w-full min-h-[40px] py-2 px-3 rounded-xl border border-[#C87A8B]/30 hover:border-[#C87A8B] bg-white/80 hover:bg-[#FDF7F8] text-[#8C4656] text-xs font-medium flex items-center justify-center gap-1.5 transition-all shadow-2xs active:scale-[0.99]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C87A8B] shrink-0" />
                  <span className="truncate">Escolher Data & Salvar no Google Agenda</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
