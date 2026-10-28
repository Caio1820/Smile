import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Como funciona o atendimento com hora marcada?',
    answer:
      'Nosso atendimento é planejado para que você não enfrente filas ou salas de espera cheias. Reservamos o tempo exclusivo da Dra. Sabrina para ouvir você com calma, realizar exames detalhados e propor o plano de tratamento ideal com máximo conforto.',
  },
  {
    question: 'Vocês atendem convênios ou planos?',
    answer:
      'Trabalhamos na modalidade particular com emissão de recibo e laudo descritivo para que você possa solicitar reembolso integral ou parcial junto ao seu plano de saúde/odontológico, garantindo a liberdade e a qualidade dos melhores materiais.',
  },
  {
    question: 'Quais são as formas de pagamento facilitadas?',
    answer:
      'Aceitamos PIX, cartões de crédito em até 12x (consulte condições especiais para procedimentos completos) e débito. Condições facilitadas para planos de tratamento em harmonização, ortodontia e facetas.',
  },
  {
    question: 'Como agendar se eu tiver urgência ou dor de dente?',
    answer:
      'Caso sinta dor aguda ou incômodo urgente, envie uma mensagem direta no WhatsApp clicando no botão verde abaixo avisando sobre a urgência. A recepção da Smille fará o encaixe prioritário no mesmo dia conforme a agenda.',
  },
  {
    question: 'Onde fica exatamente o consultório no Pacoval?',
    answer:
      'Estamos situados na Rua Guanabara, N.° 200, no bairro Pacoval em Macapá/AP. Um local tranquilo, de fácil localização e com facilidade para estacionamento na frente e redondezas.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="w-full max-w-md mx-auto px-4 py-4 space-y-3">
      <div className="text-center space-y-1 mb-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C87A8B] bg-[#FDF7F8] px-3 py-1 rounded-full border border-[#D98C9D]/30">
          <HelpCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Dúvidas Frequentes</span>
        </div>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2B2627]">
          Perguntas Rápidas sobre sua Consulta
        </h3>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-card rounded-xl overflow-hidden transition-all duration-200 text-left"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-[#FDF7F8]/60 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-xs sm:text-sm font-semibold text-[#2B2627] leading-snug">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#C87A8B] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-1 text-xs text-[#6B6264] leading-relaxed border-t border-[#C87A8B]/10 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
