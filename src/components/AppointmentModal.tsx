import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock, CheckCircle2, MessageCircle, ExternalLink, Download, Sparkles, User, Phone, FileText } from 'lucide-react';
import { ServiceItem, AppointmentData } from '../types';
import { CLINIC_SERVICES } from '../data/services';
import { 
  buildWhatsAppLink, 
  formatAppointmentWhatsAppMessage, 
  generateGoogleCalendarUrl, 
  downloadIcsFile,
  formatDateDisplay,
  CLINIC_ADDRESS
} from '../utils/calendar';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
}) => {
  // Set default date to tomorrow
  const getTomorrowString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // If tomorrow is Sunday, skip to Monday
    if (d.getDay() === 0) {
      d.setDate(d.getDate() + 1);
    }
    return d.toISOString().split('T')[0];
  };

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || CLINIC_SERVICES[0].id
  );
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [date, setDate] = useState<string>(getTomorrowString());
  const [period, setPeriod] = useState<'morning' | 'afternoon'>('morning');
  const [timeSlot, setTimeSlot] = useState<string>('09:30');
  const [notes, setNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync if initialServiceId changes
  React.useEffect(() => {
    if (initialServiceId) {
      setSelectedServiceId(initialServiceId);
    }
  }, [initialServiceId]);

  if (!isOpen) return null;

  const currentService =
    CLINIC_SERVICES.find((s) => s.id === selectedServiceId) || CLINIC_SERVICES[0];

  const appointmentData: AppointmentData = {
    serviceId: currentService.id,
    patientName,
    patientPhone,
    date,
    timeSlot,
    period,
    notes,
  };

  const morningSlots = ['08:30', '09:30', '10:30', '11:15'];
  const afternoonSlots = ['14:30', '15:30', '16:30', '17:15'];
  const activeSlots = period === 'morning' ? morningSlots : afternoonSlots;

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = formatAppointmentWhatsAppMessage(appointmentData, currentService);
    const url = buildWhatsAppLink(message);
    window.open(url, '_blank', 'noopener,noreferrer');
    setSavedSuccess(true);
  };

  const handleGoogleCalendar = () => {
    const gCalUrl = generateGoogleCalendarUrl(appointmentData, currentService);
    window.open(gCalUrl, '_blank', 'noopener,noreferrer');
    setSavedSuccess(true);
  };

  const handleDownloadIcs = () => {
    downloadIcsFile(appointmentData, currentService);
    setSavedSuccess(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="w-full max-w-lg bg-[#FAFAFA] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#C87A8B]/30 max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
      >
        {/* Modal Header */}
        <div className="relative px-5 pt-5 pb-4 bg-gradient-to-r from-[#FDF7F8] to-[#FFF] border-b border-[#C87A8B]/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#C87A8B] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-title" className="font-serif text-lg font-bold text-[#2B2627]">
                Agendamento Inteligente & Triagem
              </h2>
              <p className="text-xs text-[#C87A8B] font-medium">
                Dra. Sabrina Oliveira • Pacoval, Macapá
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-white border border-[#C87A8B]/20 text-[#2B2627]/60 hover:text-[#2B2627] flex items-center justify-center transition-colors hover:bg-[#FDF7F8]"
            aria-label="Fechar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-5 space-y-5 text-left text-sm text-[#2B2627]">
          {/* Step 1: Select Service */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6264] mb-2">
              1. Selecione o Tratamento Desejado
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CLINIC_SERVICES.map((s) => {
                const isSelected = s.id === selectedServiceId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#C87A8B] bg-gradient-to-br from-[#FDF7F8] to-[#FFF] shadow-xs ring-1 ring-[#C87A8B]'
                        : 'border-[#2B2627]/10 bg-white hover:border-[#C87A8B]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xl">{s.emoji}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#C87A8B]" />
                      )}
                    </div>
                    <div>
                      <p className={`text-xs font-semibold leading-snug ${isSelected ? 'text-[#C87A8B]' : 'text-[#2B2627]'}`}>
                        {s.title}
                      </p>
                      <p className="text-[10px] text-[#6B6264] mt-0.5 line-clamp-1">
                        {s.tag}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Date & Shift Selection */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#C87A8B]/20 shadow-2xs space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6264]">
              2. Preferência de Data e Turno
            </label>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Date Input */}
              <div className="flex-1">
                <span className="text-[11px] font-medium text-[#2B2627]/80 block mb-1">
                  Data sugerida
                </span>
                <div className="relative">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-[#2B2627]/15 rounded-xl px-3 py-2 text-xs font-medium text-[#2B2627] focus:outline-none focus:ring-1 focus:ring-[#C87A8B] focus:border-[#C87A8B]"
                  />
                  <CalendarIcon className="w-3.5 h-3.5 text-[#C87A8B] absolute right-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* Period selection */}
              <div className="flex-1">
                <span className="text-[11px] font-medium text-[#2B2627]/80 block mb-1">
                  Turno
                </span>
                <div className="flex p-0.5 bg-[#FAFAFA] border border-[#2B2627]/15 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setPeriod('morning');
                      setTimeSlot('09:30');
                    }}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      period === 'morning'
                        ? 'bg-white text-[#C87A8B] shadow-2xs font-semibold'
                        : 'text-[#6B6264] hover:text-[#2B2627]'
                    }`}
                  >
                    Manhã (08h-12h)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPeriod('afternoon');
                      setTimeSlot('15:30');
                    }}
                    className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      period === 'afternoon'
                        ? 'bg-white text-[#C87A8B] shadow-2xs font-semibold'
                        : 'text-[#6B6264] hover:text-[#2B2627]'
                    }`}
                  >
                    Tarde (14h-18h)
                  </button>
                </div>
              </div>
            </div>

            {/* Time Slot buttons */}
            <div>
              <span className="text-[11px] font-medium text-[#2B2627]/80 block mb-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C87A8B]" />
                Horário aproximado desejado:
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {activeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-1.5 text-xs rounded-lg border text-center transition-all ${
                      timeSlot === slot
                        ? 'border-[#C87A8B] bg-[#C87A8B] text-white font-semibold shadow-2xs'
                        : 'border-[#2B2627]/10 bg-white text-[#2B2627] hover:border-[#C87A8B]/30'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Patient info */}
          <div className="space-y-2.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6264]">
              3. Dados para Confirmação
            </label>

            <div className="relative">
              <User className="w-3.5 h-3.5 text-[#C87A8B] absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Seu nome completo"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-white border border-[#2B2627]/15 rounded-xl pl-9 pr-3 py-2 text-xs text-[#2B2627] placeholder:text-[#6B6264]/60 focus:outline-none focus:ring-1 focus:ring-[#C87A8B] focus:border-[#C87A8B]"
              />
            </div>

            <div className="relative">
              <Phone className="w-3.5 h-3.5 text-[#C87A8B] absolute left-3 top-3 pointer-events-none" />
              <input
                type="tel"
                placeholder="Seu WhatsApp (ex: 96 99999-9999)"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="w-full bg-white border border-[#2B2627]/15 rounded-xl pl-9 pr-3 py-2 text-xs text-[#2B2627] placeholder:text-[#6B6264]/60 focus:outline-none focus:ring-1 focus:ring-[#C87A8B] focus:border-[#C87A8B]"
              />
            </div>

            <div className="relative">
              <FileText className="w-3.5 h-3.5 text-[#C87A8B] absolute left-3 top-3 pointer-events-none" />
              <textarea
                rows={2}
                placeholder="Observações ou queixa principal (opcional: sensibilidade, primeira consulta, urgência...)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border border-[#2B2627]/15 rounded-xl pl-9 pr-3 py-2 text-xs text-[#2B2627] placeholder:text-[#6B6264]/60 focus:outline-none focus:ring-1 focus:ring-[#C87A8B] focus:border-[#C87A8B] resize-none"
              />
            </div>
          </div>

          {/* Appointment Preview Box */}
          <div className="bg-[#FDF7F8] border border-[#D98C9D]/30 rounded-2xl p-3 text-xs text-[#2B2627]">
            <div className="flex items-center gap-1.5 font-semibold text-[#8C4656] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Resumo do Agendamento:</span>
            </div>
            <p className="text-xs text-[#2B2627]">
              <strong>{currentService.title}</strong> com a Dra. Sabrina Oliveira
            </p>
            <p className="text-[11px] text-[#6B6264] mt-0.5">
              📅 {formatDateDisplay(date)} às {timeSlot} • 📍 {CLINIC_ADDRESS}
            </p>
          </div>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Excelente! Os dados foram processados. A equipe da Smille confirmará seu horário.
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 bg-white border-t border-[#C87A8B]/15 space-y-2 shrink-0">
          {/* Main Action: WhatsApp */}
          <button
            onClick={handleWhatsAppSubmit}
            type="button"
            className="w-full py-3 px-4 rounded-xl text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-95 shadow-md shadow-emerald-500/20 active:scale-[0.99] transition-transform"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirmar e Enviar via WhatsApp</span>
          </button>

          {/* Secondary Actions: Google Calendar & ICS */}
          <div className="flex gap-2">
            <button
              onClick={handleGoogleCalendar}
              type="button"
              className="flex-1 py-2 px-3 rounded-xl border border-[#C87A8B]/40 bg-[#FDF7F8] hover:bg-[#F5E6E8] text-[#8C4656] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C87A8B]" />
              <span>Salvar no Google Agenda</span>
            </button>

            <button
              onClick={handleDownloadIcs}
              type="button"
              title="Baixar arquivo de calendário .ics (Apple/Outlook)"
              className="px-3 py-2 rounded-xl border border-[#2B2627]/15 bg-white hover:bg-slate-50 text-[#6B6264] hover:text-[#2B2627] text-xs font-medium flex items-center justify-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">.ICS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
