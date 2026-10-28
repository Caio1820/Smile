import React, { useState } from 'react';
import { Header } from './components/Header';
import { ServiceCards } from './components/ServiceCards';
import { LocationAndContact } from './components/LocationAndContact';
import { ClinicHighlights } from './components/ClinicHighlights';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  const handleOpenScheduler = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsSchedulerOpen(true);
  };

  const handleCloseScheduler = () => {
    setIsSchedulerOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] text-[#2B2627] font-sans relative selection:bg-[#E6A3B2]/30 selection:text-[#C87A8B] flex flex-col items-center overflow-x-hidden">
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

      {/* Main Container: 100% edge-to-edge mobile-first with maximum comfortable reading width on desktop */}
      <main className="w-full max-w-lg mx-auto flex flex-col items-center">
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
