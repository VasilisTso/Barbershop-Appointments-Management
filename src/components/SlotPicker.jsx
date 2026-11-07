import React, { useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { OPENING_HOURS, SLOT_STEP_MIN } from '../lib/shop';

const DAYS_AHEAD = 14;

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function atTime(day, hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const x = new Date(day);
  x.setHours(h, m, 0, 0);
  return x;
}

function sameDay(a, b) {
  return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const timeFmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });
const weekdayFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short' });
const monthFmt = new Intl.DateTimeFormat('en-GB', { month: 'short' });
const longDayFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

/** Build slots for one day. A slot is open when it is in the future, the service ends by closing, and it doesn't overlap a held booking. */
function buildSlots(day, durationMin, taken, now) {
  const hours = OPENING_HOURS[day.getDay()];
  if (!hours) return [];
  const open = atTime(day, hours.open);
  const close = atTime(day, hours.close);
  const slots = [];
  for (let t = new Date(open); t < close; t = new Date(t.getTime() + SLOT_STEP_MIN * 60000)) {
    const end = new Date(t.getTime() + durationMin * 60000);
    let reason = null;
    if (t <= now) reason = 'past';
    else if (end > close) reason = 'closing';
    else if (taken.some((r) => t < r.end && end > r.start)) reason = 'yours';
    slots.push({ start: t, reason });
  }
  return slots;
}

/** Arrow-key navigation across enabled buttons inside a container (roving focus). */
function useArrowNav() {
  const ref = useRef(null);
  const onKeyDown = (e) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (!keys.includes(e.key) || !ref.current) return;
    const items = [...ref.current.querySelectorAll('button:not([disabled])')];
    const i = items.indexOf(document.activeElement);
    if (i === -1) return;
    e.preventDefault();
    let next = i;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = Math.max(0, i - 1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = Math.min(items.length - 1, i + 1);
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = items.length - 1;
    items[next].focus();
    items[next].scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };
  return { ref, onKeyDown };
}

/**
 * Date strip + time grid.
 * @param {number} durationMin  length of the selected service
 * @param {{start: Date, end: Date}[]} taken  the user's own active bookings
 * @param {Date|null} value  selected start
 * @param {(d: Date|null) => void} onChange
 */
function SlotPicker({ durationMin = SLOT_STEP_MIN, taken = [], value, onChange }) {
  const reduce = useReducedMotion();
  // `now` is fixed per mount so slots don't flicker between renders.
  const [now] = useState(() => new Date());

  const days = useMemo(() => {
    const today = startOfDay(now);
    return Array.from({ length: DAYS_AHEAD }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const slots = buildSlots(d, durationMin, taken, now);
      return { date: d, closed: !OPENING_HOURS[d.getDay()], openCount: slots.filter((s) => !s.reason).length, slots };
    });
  }, [now, durationMin, taken]);

  const firstOpen = days.find((d) => d.openCount > 0) || days[0];
  const [selectedDay, setSelectedDay] = useState(() => (value ? startOfDay(value) : firstOpen.date));
  const day = days.find((d) => sameDay(d.date, selectedDay)) || firstOpen;

  const dayNav = useArrowNav();
  const slotNav = useArrowNav();

  const pickDay = (d) => {
    setSelectedDay(d.date);
    if (value && !sameDay(value, d.date)) onChange(null);
  };

  return (
    <div className="space-y-6">
      <fieldset className="min-w-0">
        <legend className="text-sm font-medium mb-3">Day</legend>
        <div
          ref={dayNav.ref}
          onKeyDown={dayNav.onKeyDown}
          className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x [scrollbar-width:thin]"
        >
          {days.map((d) => {
            const selected = sameDay(d.date, day.date);
            const disabled = d.closed || d.openCount === 0;
            return (
              <button
                key={d.date.toISOString()}
                type="button"
                disabled={disabled}
                aria-pressed={selected}
                aria-label={`${longDayFmt.format(d.date)}${d.closed ? ', closed' : d.openCount === 0 ? ', fully booked' : `, ${d.openCount} open slots`}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => pickDay(d)}
                className={`relative snap-start shrink-0 w-16 h-20 rounded-[4px] border flex flex-col items-center justify-center gap-0.5 transition-colors duration-200 cursor-pointer
                  disabled:cursor-not-allowed disabled:border-transparent disabled:text-muted/60
                  ${selected ? 'border-ink text-paper' : 'border-hairline hover:border-ink'}`}
              >
                {selected && (
                  <motion.span
                    layoutId={reduce ? undefined : 'day-pill'}
                    className="absolute inset-0 bg-ink rounded-[3px]"
                    transition={{ type: 'spring', stiffness: 520, damping: 42 }}
                  />
                )}
                <span className="relative text-xs uppercase tracking-[0.08em]">{weekdayFmt.format(d.date)}</span>
                <span className="relative font-display text-3xl leading-none">{d.date.getDate()}</span>
                <span className="relative text-[11px]">{d.closed ? 'Closed' : monthFmt.format(d.date)}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="min-w-0">
        <legend className="text-sm font-medium mb-3">
          Time <span className="font-normal text-muted">· {longDayFmt.format(day.date)}</span>
        </legend>
        {day.slots.length === 0 ? (
          <p className="text-muted text-sm py-4">The shop is closed on this day.</p>
        ) : (
          <div
            ref={slotNav.ref}
            onKeyDown={slotNav.onKeyDown}
            className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2"
          >
            {day.slots.map((s, i) => {
              const selected = value && value.getTime() === s.start.getTime();
              const firstEnabled = day.slots.findIndex((x) => !x.reason);
              const focusable = selected || (!value && i === firstEnabled);
              const label = timeFmt.format(s.start);
              return (
                <button
                  key={s.start.toISOString()}
                  type="button"
                  disabled={Boolean(s.reason)}
                  aria-pressed={Boolean(selected)}
                  aria-label={`${label}${s.reason === 'yours' ? ', you already have a booking' : s.reason === 'past' ? ', already passed' : s.reason === 'closing' ? ', too close to closing' : ''}`}
                  tabIndex={focusable ? 0 : -1}
                  onClick={() => onChange(s.start)}
                  className={`h-11 rounded-[4px] border text-[15px] tabular-nums transition-colors duration-200 cursor-pointer
                    disabled:cursor-not-allowed disabled:border-transparent disabled:text-muted/50
                    ${s.reason === 'yours' ? 'disabled:bg-paper-deep disabled:text-muted disabled:line-through' : ''}
                    ${selected ? 'bg-accent border-accent text-paper' : 'border-hairline hover:border-ink'}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
        {taken.length > 0 && (
          <p className="mt-3 text-xs text-muted flex items-center gap-2">
            <span aria-hidden="true" className="inline-block w-6 h-3 rounded-[2px] bg-paper-deep" /> Struck-through times overlap a booking you already hold.
          </p>
        )}
      </fieldset>
    </div>
  );
}

export default SlotPicker;
