export interface ServiceItem {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  buttonLabel: string;
  whatsappMessage: string;
  estimatedDuration: string;
  features: string[];
  tag: string;
}

export interface AppointmentData {
  serviceId: string;
  patientName: string;
  patientPhone: string;
  date: string;
  timeSlot: string;
  period: 'morning' | 'afternoon';
  notes: string;
}
