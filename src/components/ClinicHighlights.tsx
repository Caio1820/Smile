import React from 'react';
import { Heart, Sparkles, Award, ShieldCheck } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Heart,
    title: 'Acolhimento Humanizado',
    description: 'Atendimento calmo, atencioso e empático para quem tem medo ou receio de dentista.',
  },
  {
    icon: Sparkles,
    title: 'Estética & Precisão',
    description: 'Materiais odontológicos de ponta com foco na naturalidade e harmonia do seu sorriso.',
  },
  {
    icon: Award,
    title: 'Pontualidade Rigorosa',
    description: 'Consultas programadas individualmente com tempo exclusivo para seu cuidado.',
  },
  {
    icon: ShieldCheck,
    title: 'Biossegurança 100%',
    description: 'Esterilização e controle sanitário hospitalar para a segurança total do paciente.',
  },
];

export const ClinicHighlights: React.FC = () => {
  return (
    <section className="w-full max-w-md mx-auto px-3.5 sm:px-4 py-3 space-y-3">
      <div className="grid grid-cols-2 gap-2.5">
        {HIGHLIGHTS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-xs border border-[#C87A8B]/15 rounded-2xl p-3 text-left shadow-2xs hover:border-[#C87A8B]/35 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-[#FDF7F8] border border-[#D98C9D]/30 flex items-center justify-center text-[#C87A8B] mb-2 shadow-xs">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <h4 className="font-serif text-xs font-bold text-[#2B2627] leading-tight">
                {item.title}
              </h4>
              <p className="text-[10px] text-[#6B6264] mt-1 leading-snug">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
