import React from 'react';
import { Heart, Instagram } from 'lucide-react';
import { 
  CLINIC_ADDRESS, 
  CLINIC_PHONE_DISPLAY, 
  INSTAGRAM_LINK, 
  INSTAGRAM_HANDLE 
} from '../utils/calendar';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-md mx-auto px-3.5 sm:px-4 pt-4 pb-28 sm:pb-24 text-center text-xs text-[#6B6264] space-y-3">
      <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[#C87A8B]/30 to-transparent" />

      <div>
        <p className="font-serif text-sm font-bold text-[#2B2627]">
          Smille | Consultório Odontológico
        </p>
        <p className="text-[11px] text-[#C87A8B] font-medium mt-0.5">
          Responsável Técnica: Dra. Sabrina Oliveira • CRO: 1156-AP
        </p>
        <p className="text-[11px] text-[#6B6264] mt-1">
          {CLINIC_ADDRESS}
        </p>
        <p className="text-[11px] text-[#6B6264]">
          Telefone/WhatsApp: {CLINIC_PHONE_DISPLAY}
        </p>
      </div>

      <div className="flex items-center justify-center gap-1 text-[11px] text-[#2B2627]/60">
        <span>Feito com</span>
        <Heart className="w-3 h-3 text-[#C87A8B] fill-[#C87A8B]" />
        <span>para transformar sorrisos em Macapá</span>
      </div>

      <div className="text-[10px] text-[#6B6264]/60 space-y-0.5">
        <p>© {new Date().getFullYear()} Smille Odontologia. Todos os direitos reservados.</p>
        <p>Em conformidade com as diretrizes do Conselho Regional de Odontologia (CRO-AP).</p>
      </div>
    </footer>
  );
};
