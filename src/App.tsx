import React, { useState } from 'react';
import { Header } from './components/Header';
import { ServiceCards } from './components/ServiceCards';
import { LocationAndContact } from './components/LocationAndContact';
import { ClinicHighlights } from './components/ClinicHighlights';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [isMobileFrameView, setIsMobileFrameView] = useState(false);

  const handleOpenScheduler = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsSchedulerOpen(true);
  };

  const handleCloseScheduler = () => {
    setIsSchedulerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#2B2627] font-sans relative selection:bg-[#E6A3B2]/30 selection:text-[#C87A8B] flex flex-col items-center">
      {/* Delicate background ambient gradients */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(230, 163, 178, 0.22) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(212, 175, 55, 0.12) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(200, 122, 139, 0.08) 0px, transparent 50%)
          `,
        }}
      />

      {/* Desktop View Switcher (Subtle floating toggle visible only on larger screens) */}
      <aside 
        aria-label="Controle de visualização em telas grandes"
        className="hidden md:flex fixed top-4 right-4 z-40 bg-white/90 backdrop-blur-md border border-[#C87A8B]/20 rounded-full p-1 shadow-md text-xs items-center gap-1"
      >
        <button
          onClick={() => setIsMobileFrameView(false)}
          className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
            !isMobileFrameView
              ? 'bg-[#C87A8B] text-white font-medium shadow-xs'
              : 'text-[#6B6264] hover:text-[#2B2627]'
          }`}
          title="Visualização fluida"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Fluido</span>
        </button>
        <button
          onClick={() => setIsMobileFrameView(true)}
          className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
            isMobileFrameView
              ? 'bg-[#C87A8B] text-white font-medium shadow-xs'
              : 'text-[#6B6264] hover:text-[#2B2627]'
          }`}
          title="Simulação de Smartphone"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Smartphone</span>
        </button>
      </aside>

      {/* Main Container: Handles both direct mobile screen and optional phone frame on desktop */}
      <main 
        className={`w-full transition-all duration-300 flex flex-col items-center ${
          isMobileFrameView
            ? 'max-w-[430px] my-6 rounded-[44px] border-[8px] border-[#2B2627] shadow-2xl bg-[#FAFAFA] overflow-hidden'
            : 'max-w-xl'
        }`}
      >
        {/* Header section with Circular Logo & Doctor credentials */}
        <Header />

        {/* Section B: Triagem & Pré-Agendamento Interativo (Service Cards) */}
        <ServiceCards onOpenScheduler={handleOpenScheduler} />

        {/* Clinic Highlights */}
        <ClinicHighlights />

        {/* Section C: Localização & Contato Rápido */}
        <LocationAndContact />

        {/* FAQ */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </main>

      {/* Floating Bottom WhatsApp & Booking bar */}
      <FloatingWhatsApp onOpenScheduler={() => handleOpenScheduler()} />

      {/* Interactive Appointment & Google Calendar Modal */}
      <AppointmentModal
        isOpen={isSchedulerOpen}
        onClose={handleCloseScheduler}
        initialServiceId={selectedServiceId}
      />
    </div>
  );
}
