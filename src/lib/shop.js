// Shop facts used across the UI. Demo values — this is a portfolio project, not a real shop.

// Opening hours by JS weekday (0 = Sunday). `null` = closed. Times are "HH:MM", local time.
export const OPENING_HOURS = {
  0: null,
  1: { open: '09:00', close: '20:00' },
  2: { open: '09:00', close: '20:00' },
  3: { open: '09:00', close: '20:00' },
  4: { open: '09:00', close: '20:00' },
  5: { open: '09:00', close: '20:00' },
  6: { open: '09:00', close: '16:00' },
};

export const HOURS_SUMMARY = [
  { days: 'Monday – Friday', hours: '09:00 – 20:00' },
  { days: 'Saturday', hours: '09:00 – 16:00' },
  { days: 'Sunday', hours: 'Closed' },
];

export const DEMO_ADDRESS = ['14 Example Street', 'Thessaloniki, Greece'];

export const SLOT_STEP_MIN = 30;

export function formatPrice(cents) {
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format((Number(cents) || 0) / 100);
}

export function formatDuration(min) {
  const m = Number(min) || 0;
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest ? `${h} h ${rest} min` : `${h} h`;
}
