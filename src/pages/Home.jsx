import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FiArrowRight } from 'react-icons/fi';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import Skeleton from '../components/ui/Skeleton';
import ServiceRow from '../components/ServiceRow';
import { DEMO_ADDRESS, HOURS_SUMMARY } from '../lib/shop';

const steps = [
  { title: 'Pick a service', body: 'Cut, beard, or both. Every service shows its time in the chair and its price up front.' },
  { title: 'Choose a slot', body: 'Tap a day, then an open time. Slots you already hold are greyed out.' },
  { title: 'We confirm it', body: 'Your booking shows as pending until the shop confirms. Track it under Appointments.' },
];

const ease = [0.16, 1, 0.3, 1];

function Hero({ user }) {
  const reduce = useReducedMotion();
  const line = (i) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: '0.4em' },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: 0.08 + i * 0.12, ease },
        };

  const bookHref = user ? '/appointments' : '/login?redirect=/appointments';

  return (
    <section aria-labelledby="hero-title" className="grid gap-12 lg:grid-cols-12 lg:gap-10 pt-6 md:pt-14 pb-20 md:pb-28">
      <div className="lg:col-span-8">
        <h1 id="hero-title" className="font-display text-[3.4rem] leading-[0.92] sm:text-7xl md:text-8xl tracking-[-0.03em]">
          <motion.span className="block" {...line(0)}>A sharp cut,</motion.span>
          <motion.span className="block italic text-accent" {...line(1)}>booked in a minute.</motion.span>
        </h1>
        <motion.p className="mt-8 max-w-xl text-lg md:text-xl text-muted leading-relaxed" {...line(2)}>
          Barbershop VT keeps the chair simple: a short list of services, honest prices, and a booking that
          takes three taps.
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap gap-3" {...line(3)}>
          <Button as={Link} to={bookHref} size="lg">
            Book an appointment <FiArrowRight aria-hidden="true" />
          </Button>
          <Button as={Link} to="/services" variant="secondary" size="lg">
            See the price list
          </Button>
        </motion.div>
      </div>

      <motion.aside
        aria-label="Opening hours and address"
        className="lg:col-span-4 lg:mt-3 self-start bg-paper-deep rounded-[6px] p-6 md:p-7"
        {...line(3)}
      >
        <h2 className="font-display text-3xl">Opening hours</h2>
        <dl className="mt-5 divide-y divide-hairline border-y border-hairline">
          {HOURS_SUMMARY.map((h) => (
            <div key={h.days} className="flex justify-between gap-4 py-3 text-[15px]">
              <dt className="text-muted">{h.days}</dt>
              <dd className="tabular-nums font-medium">{h.hours}</dd>
            </div>
          ))}
        </dl>
        <address className="not-italic mt-6 text-[15px] leading-relaxed">
          {DEMO_ADDRESS.map((l) => (
            <span key={l} className="block">{l}</span>
          ))}
        </address>
        <p className="mt-4 text-xs text-muted">Demo shop — hours and address are placeholders.</p>
      </motion.aside>
    </section>
  );
}

function ServicesPreview() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    api
      .get('/services')
      .then((res) => {
        if (!active) return;
        setServices(res.data);
        setStatus('ready');
      })
      .catch((err) => {
        console.error('Failed to fetch services', err);
        if (active) setStatus('error');
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section aria-labelledby="menu-title" className="py-16 md:py-20 border-t border-ink">
      <Reveal className="flex items-end justify-between gap-6 mb-6">
        <h2 id="menu-title" className="font-display text-4xl md:text-6xl tracking-[-0.02em]">The price list</h2>
        <Link to="/services" className="shrink-0 inline-flex items-center gap-1.5 py-2 text-[15px] underline hover:text-accent">
          All services <FiArrowRight aria-hidden="true" />
        </Link>
      </Reveal>

      {status === 'loading' ? (
        <ul aria-busy="true" aria-label="Loading services">
          {[0, 1, 2].map((i) => (
            <li key={i} className="flex items-center justify-between py-6 border-b border-hairline">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-5 w-28" />
            </li>
          ))}
        </ul>
      ) : status === 'error' ? (
        <p className="py-8 text-muted">The price list couldn't load. Check that the API is running, then refresh.</p>
      ) : services.length === 0 ? (
        <p className="py-8 text-muted">No services listed yet.</p>
      ) : (
        <Reveal as="ul" delay={0.05}>
          {services.slice(0, 5).map((s) => (
            <ServiceRow key={s.id} service={s} />
          ))}
        </Reveal>
      )}
    </section>
  );
}

function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="py-16 md:py-20 border-t border-ink">
      <Reveal>
        <h2 id="how-title" className="font-display text-4xl md:text-6xl tracking-[-0.02em] mb-12">How booking works</h2>
      </Reveal>
      <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.08} className="md:border-l md:border-hairline md:pl-6">
            <span aria-hidden="true" className="font-display italic text-5xl text-accent leading-none">{i + 1}.</span>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-muted leading-relaxed max-w-sm">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Hero user={user} />
      <ServicesPreview />
      <HowItWorks />
    </>
  );
}

export default Home
