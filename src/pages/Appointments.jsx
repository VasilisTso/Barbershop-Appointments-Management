/*
Fetches appointments depending on role (backend returns the user's own, or all for admin).
Users book through the slot picker; admins confirm or cancel.
*/
import React, { useEffect, useMemo, useState, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import toast from 'react-hot-toast';
import { FiArrowDown, FiArrowUp, FiCheck, FiX, FiLock } from 'react-icons/fi';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';
import Reveal from '../components/ui/Reveal';
import Skeleton from '../components/ui/Skeleton';
import StatusBadge from '../components/ui/StatusBadge';
import SlotPicker from '../components/SlotPicker';
import { formatDuration, formatPrice } from '../lib/shop';
import { apiErrorMessage } from '../lib/apiError';

const ease = [0.16, 1, 0.3, 1];
const summaryDateFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const timeFmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });
const monthFmt = new Intl.DateTimeFormat('en-GB', { month: 'short' });
const weekdayFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short' });

function Restricted() {
  return (
    <Reveal className="py-16 md:py-24 max-w-xl">
      <FiLock aria-hidden="true" className="text-3xl text-accent mb-6" />
      <h1 className="font-display text-5xl md:text-6xl leading-[0.95] tracking-[-0.02em]">Log in to book a chair.</h1>
      <p className="text-muted text-lg mt-5 mb-10 leading-relaxed">
        Your appointments live in your account. Log in to see them or book a new one.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button as={Link} to="/login?redirect=/appointments" size="lg">Log in</Button>
        <Button as={Link} to="/register" size="lg" variant="secondary">Create account</Button>
      </div>
    </Reveal>
  );
}

function ServiceChoice({ services, value, onChange }) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-sm font-medium mb-3">Service</legend>
      <div role="radiogroup" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const checked = String(s.id) === String(value);
          return (
            <label
              key={s.id}
              className={`flex items-center justify-between gap-4 min-h-14 px-4 py-3 rounded-[4px] border cursor-pointer transition-colors duration-200
                has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent
                ${checked ? 'border-ink bg-ink text-paper' : 'border-hairline hover:border-ink'}`}
            >
              <input
                type="radio"
                name="service"
                value={s.id}
                checked={checked}
                onChange={() => onChange(String(s.id))}
                className="sr-only"
              />
              <span className="font-medium">{s.name}</span>
              <span className={`text-sm tabular-nums shrink-0 ${checked ? 'text-paper/75' : 'text-muted'}`}>
                {formatDuration(s.durationMin)} · {formatPrice(s.priceCents)}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function BookingPanel({ services, appointments, initialServiceId, onBooked }) {
  const [serviceId, setServiceId] = useState(initialServiceId || '');
  const [startAt, setStartAt] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const service = services.find((s) => String(s.id) === String(serviceId));

  // The user's own active bookings block overlapping slots.
  const taken = useMemo(
    () =>
      appointments
        .filter((a) => a.status !== 'CANCELLED')
        .map((a) => {
          const start = new Date(a.startAt);
          return { start, end: new Date(start.getTime() + (a.service?.durationMin || 30) * 60000) };
        }),
    [appointments]
  );

  const chooseService = (id) => {
    setServiceId(id);
    setStartAt(null); // a different duration may invalidate the chosen time
  };

  const book = async () => {
    if (!service || !startAt) return;
    setSubmitting(true);
    try {
      await api.post('/appointments', { serviceId: Number(service.id), startAt: startAt.toISOString() });
      toast.success(`${service.name} booked for ${summaryDateFmt.format(startAt)}, ${timeFmt.format(startAt)}`);
      setStartAt(null);
      await onBooked();
    } catch (err) {
      console.error(err);
      toast.error(apiErrorMessage(err, 'Couldn’t book that slot. Pick another time.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="book-title" className="mb-20">
      <h2 id="book-title" className="font-display text-4xl mb-8">Book a chair</h2>
      <div className="space-y-10">
        <ServiceChoice services={services} value={serviceId} onChange={chooseService} />
        <SlotPicker
          key={service?.durationMin || 'none'}
          durationMin={service?.durationMin || 30}
          taken={taken}
          value={startAt}
          onChange={setStartAt}
        />
      </div>

      <div className="sticky bottom-0 z-10 -mx-4 sm:mx-0 mt-10 bg-paper border-t-2 border-ink px-4 sm:px-0 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="text-lg">
          {service && startAt ? (
            <>
              <span className="font-display text-2xl">{service.name}</span>
              <span className="text-muted"> · {summaryDateFmt.format(startAt)} · {timeFmt.format(startAt)} · </span>
              <span className="font-medium tabular-nums">{formatPrice(service.priceCents)}</span>
            </>
          ) : (
            <span className="text-muted">{service ? 'Now pick a day and time.' : 'Pick a service, then a day and time.'}</span>
          )}
        </p>
        <Button size="lg" onClick={book} disabled={!service || !startAt || submitting} className="shrink-0">
          {submitting ? 'Booking…' : 'Book appointment'}
        </Button>
      </div>
    </section>
  );
}

function AppointmentRow({ a, admin, onStatus, busy }) {
  const d = new Date(a.startAt);
  const isPast = d < new Date();
  return (
    <div className={`grid grid-cols-[4.5rem_1fr] gap-x-5 gap-y-4 py-6 border-b border-hairline md:grid-cols-[5rem_1fr_auto] md:items-center`}>
      <div className={`text-center border-r border-hairline pr-5 row-span-2 md:row-span-1 ${isPast ? 'text-muted' : ''}`}>
        <p className="text-xs uppercase tracking-[0.08em] text-muted">{weekdayFmt.format(d)}</p>
        <p className="font-display text-5xl leading-none my-0.5">{d.getDate()}</p>
        <p className="text-xs uppercase tracking-[0.08em] text-muted">{monthFmt.format(d)} {d.getFullYear() !== new Date().getFullYear() ? d.getFullYear() : ''}</p>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-display text-2xl md:text-3xl leading-tight">{a.service?.name || 'Service removed'}</h3>
          <StatusBadge status={a.status} />
        </div>
        <p className="text-muted mt-1 tabular-nums">
          {isPast && <span className="text-ink">Past · </span>}
          {timeFmt.format(d)}
          {a.service && ` · ${formatDuration(a.service.durationMin)} · ${formatPrice(a.service.priceCents)}`}
          {admin && a.user && <span className="text-ink"> · {a.user.name || a.user.email}</span>}
        </p>
      </div>
      {admin && (a.status === 'PENDING' || a.status === 'CONFIRMED') && (
        <div className="col-start-2 md:col-start-auto flex gap-2">
          {a.status !== 'CONFIRMED' && (
            <Button size="sm" variant="secondary" disabled={busy} onClick={() => onStatus(a, 'CONFIRMED')}>
              <FiCheck aria-hidden="true" /> Confirm
            </Button>
          )}
          <Button size="sm" variant="danger" disabled={busy} onClick={() => onStatus(a, 'CANCELLED')}>
            <FiX aria-hidden="true" /> Cancel
          </Button>
        </div>
      )}
      {admin && a.status === 'CANCELLED' && (
        <div className="col-start-2 md:col-start-auto">
          <Button size="sm" variant="ghost" disabled={busy} onClick={() => onStatus(a, 'CONFIRMED')}>
            Restore &amp; confirm
          </Button>
        </div>
      )}
    </div>
  );
}

function Appointments() {
  const { user, isAdmin } = useContext(AuthContext);
  const admin = isAdmin();
  const reduce = useReducedMotion();
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const [params] = useSearchParams();
  const initialServiceId = params.get('serviceId');

  const refreshAppointments = async () => {
    const res = await api.get('/appointments');
    setAppointments(res.data);
  };

  useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const [a, s] = await Promise.all([api.get('/appointments'), api.get('/services')]);
        if (!active) return;
        setAppointments(a.data);
        setServices(s.data);
      } catch (err) {
        console.error(err);
        if (active) setLoadError(apiErrorMessage(err, 'Couldn’t load your appointments.'));
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const changeStatus = async (a, status) => {
    setBusyId(a.id);
    try {
      await api.put(`/appointments/${a.id}/status`, { status });
      await refreshAppointments();
      toast.success(status === 'CONFIRMED' ? 'Appointment confirmed' : 'Appointment cancelled');
    } catch (err) {
      console.error(err);
      toast.error(apiErrorMessage(err, 'Couldn’t update the appointment.'));
    } finally {
      setBusyId(null);
    }
  };

  const sorted = useMemo(
    () =>
      [...appointments].sort((x, y) => {
        const diff = new Date(x.startAt) - new Date(y.startAt);
        return sortOrder === 'desc' ? -diff : diff;
      }),
    [appointments, sortOrder]
  );

  if (!user) return <Restricted />;

  const validInitial = services.some((s) => String(s.id) === String(initialServiceId)) ? initialServiceId : '';

  return (
    <>
      <PageHeader
        title={admin ? 'Appointments' : 'Your chair'}
        lede={admin ? 'Every booking in the shop. Confirm new ones, cancel what won’t happen.' : 'Book a new appointment or check on the ones you have.'}
      />

      {loadError ? (
        <div className="py-12">
          <p className="text-lg">{loadError}</p>
          <p className="text-muted mt-1">Check that the API is running, then refresh the page.</p>
        </div>
      ) : (
        <>
          {!admin && !isLoading && services.length > 0 && (
            <BookingPanel
              key={validInitial}
              services={services}
              appointments={appointments}
              initialServiceId={validInitial}
              onBooked={refreshAppointments}
            />
          )}

          <section aria-labelledby="list-title">
            <div className="flex items-end justify-between gap-4 border-b border-ink pb-4">
              <h2 id="list-title" className="font-display text-4xl">
                {admin ? 'All bookings' : 'Your appointments'}
                {!isLoading && <span className="text-muted text-2xl tabular-nums"> ({appointments.length})</span>}
              </h2>
              {appointments.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSortOrder((o) => (o === 'desc' ? 'asc' : 'desc'))}
                  aria-label={`Sort by date, currently ${sortOrder === 'desc' ? 'latest first' : 'earliest first'}`}
                >
                  {sortOrder === 'desc' ? <FiArrowDown aria-hidden="true" /> : <FiArrowUp aria-hidden="true" />}
                  {sortOrder === 'desc' ? 'Latest first' : 'Earliest first'}
                </Button>
              )}
            </div>

            {isLoading ? (
              <div aria-busy="true" aria-label="Loading appointments">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex gap-5 py-6 border-b border-hairline">
                    <Skeleton className="h-16 w-16" />
                    <div className="flex-1 space-y-3 pt-1">
                      <Skeleton className="h-7 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            ) : appointments.length === 0 ? (
              <p className="py-10 text-muted text-lg">
                {admin ? 'No bookings yet.' : 'Nothing booked yet. Pick a service above to get started.'}
              </p>
            ) : (
              <ul>
                <AnimatePresence initial={false}>
                  {sorted.map((a) => (
                    <motion.li
                      key={a.id}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.45, ease }}
                    >
                      <AppointmentRow a={a} admin={admin} onStatus={changeStatus} busy={busyId === a.id} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </section>
        </>
      )}
    </>
  );
}

export default Appointments
