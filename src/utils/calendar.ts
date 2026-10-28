import { AppointmentData, ServiceItem } from '../types';

export const CLINIC_PHONE = '5596991700440';
export const CLINIC_PHONE_DISPLAY = '(96) 99170-0440';
export const CLINIC_ADDRESS = 'Rua Guanabara, N.° 200, Pacoval - Macapá/AP';
export const GOOGLE_MAPS_LINK = 'https://share.google/oV8uR07u4qrkVJUL8';
export const INSTAGRAM_LINK = 'https://www.instagram.com/smille_odonto/';
export const INSTAGRAM_HANDLE = '@smille_odonto';

/**
 * Builds standard WhatsApp direct link
 */
export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CLINIC_PHONE}?text=${encoded}`;
}

/**
 * Formats appointment request message for WhatsApp
 */
export function formatAppointmentWhatsAppMessage(
  data: AppointmentData,
  service: ServiceItem
): string {
  const formattedDate = formatDateDisplay(data.date);
  const timeText = data.timeSlot
    ? `${data.timeSlot} (${data.period === 'morning' ? 'Manhã' : 'Tarde'})`
    : data.period === 'morning'
    ? 'Turno da Manhã (08h às 12h)'
    : 'Turno da Tarde (14h às 18h)';

  return (
    `✨ *Solicitação de Agendamento — Smille Odonto* ✨\n\n` +
    `Olá, Dra. Sabrina e equipe Smille!\n` +
    `Gostaria de agendar uma consulta:\n\n` +
    `👤 *Paciente:* ${data.patientName || 'A informar'}\n` +
    `📱 *Contato:* ${data.patientPhone || 'Este número'}\n` +
    `🦷 *Tratamento:* ${service.title}\n` +
    `🗓️ *Data de preferência:* ${formattedDate}\n` +
    `⏰ *Horário/Turno:* ${timeText}\n` +
    (data.notes.trim() ? `💬 *Observação:* ${data.notes.trim()}\n` : '') +
    `📍 *Unidade:* ${CLINIC_ADDRESS}\n\n` +
    `Poderiam confirmar a disponibilidade deste horário, por favor? Muito obrigado(a)!`
  );
}

/**
 * Formats YYYY-MM-DD to DD/MM/YYYY
 */
export function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return 'A combinar';
  try {
    const [year, month, day] = dateStr.split('-');
    if (day && month && year) {
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

/**
 * Generates direct Google Calendar URL with event parameters
 */
export function generateGoogleCalendarUrl(
  data: AppointmentData,
  service: ServiceItem
): string {
  const title = `Consulta Odontológica — ${service.title} | Dra. Sabrina Oliveira (Smille)`;
  
  // Parse date and time
  let startHour = 9;
  let startMinute = 0;
  if (data.timeSlot && data.timeSlot.includes(':')) {
    const parts = data.timeSlot.split(':');
    startHour = parseInt(parts[0], 10) || 9;
    startMinute = parseInt(parts[1], 10) || 0;
  } else if (data.period === 'afternoon') {
    startHour = 14;
    startMinute = 30;
  }

  // Construct start date (in Brazil timezone UTC-3)
  const [yearStr, monthStr, dayStr] = (data.date || new Date().toISOString().slice(0, 10)).split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  const startDate = new Date(year, month, day, startHour, startMinute);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

  const formatIsoForGCal = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const datesParam = `${formatIsoForGCal(startDate)}/${formatIsoForGCal(endDate)}`;

  const details =
    `Consulta agendada no Smille - Consultório Odontológico\n\n` +
    `Profissional: Dra. Sabrina Oliveira (CRO: 1156-AP)\n` +
    `Tratamento: ${service.title}\n` +
    `Paciente: ${data.patientName || 'Paciente'}\n` +
    `Telefone/WhatsApp da Clínica: ${CLINIC_PHONE_DISPLAY}\n` +
    `Localização: ${CLINIC_ADDRESS}\n\n` +
    `*Recomendação: Chegar com 10 minutos de antecedência.*`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: datesParam,
    details: details,
    location: CLINIC_ADDRESS,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates and triggers download of .ics calendar file for Apple Calendar / Outlook
 */
export function downloadIcsFile(data: AppointmentData, service: ServiceItem) {
  let startHour = 9;
  let startMinute = 0;
  if (data.timeSlot && data.timeSlot.includes(':')) {
    const parts = data.timeSlot.split(':');
    startHour = parseInt(parts[0], 10) || 9;
    startMinute = parseInt(parts[1], 10) || 0;
  } else if (data.period === 'afternoon') {
    startHour = 14;
    startMinute = 30;
  }

  const [yearStr, monthStr, dayStr] = (data.date || new Date().toISOString().slice(0, 10)).split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  const startDate = new Date(year, month, day, startHour, startMinute);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const formatIcsDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Smille Consultorio Odontologico//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:smille-${Date.now()}@smilleodonto.com`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(startDate)}`,
    `DTEND:${formatIcsDate(endDate)}`,
    `SUMMARY:Consulta Odontológica - Dra. Sabrina Oliveira (${service.title})`,
    `DESCRIPTION:Consulta no Smille Consultório Odontológico com Dra. Sabrina Oliveira (CRO: 1156-AP). Telefone: ${CLINIC_PHONE_DISPLAY}`,
    `LOCATION:${CLINIC_ADDRESS}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Lembrete de Consulta Odontológica na Smille',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `agendamento-smille-${data.date || 'consulta'}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
