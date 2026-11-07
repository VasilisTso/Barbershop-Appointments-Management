import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiPlus, FiArrowRight } from 'react-icons/fi';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/ui/Button';
import PageHeader from '../components/ui/PageHeader';
import Skeleton from '../components/ui/Skeleton';
import ServiceRow from '../components/ServiceRow';

function AdminActions({ service, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  if (confirming) {
    return (
      <div role="group" aria-label={`Confirm deleting ${service.name}`} className="flex items-center gap-2">
        <span className="text-sm text-brick mr-1">Delete this service?</span>
        <Button
          size="sm"
          variant="danger"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            const ok = await onDelete(service);
            if (!ok) {
              setBusy(false);
              setConfirming(false);
            }
          }}
        >
          {busy ? 'Deleting…' : 'Delete'}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setConfirming(false)} disabled={busy}>
          Keep
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button as={Link} to={`/services/edit/${service.id}`} size="sm" variant="ghost" aria-label={`Edit ${service.name}`}>
        <FiEdit2 aria-hidden="true" /> Edit
      </Button>
      <Button size="sm" variant="quietDanger" onClick={() => setConfirming(true)} aria-label={`Delete ${service.name}`}>
        <FiTrash2 aria-hidden="true" /> Delete
      </Button>
    </>
  );
}

function Services() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('loading');
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'ADMIN';
  const reduce = useReducedMotion();

  const fetchServices = useCallback(async () => {
    try {
      const res = await api.get('/services');
      setServices(res.data);
      setStatus('ready');
    } catch (err) {
      console.error('Failed to fetch services', err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleDelete = async (service) => {
    try {
      await api.delete(`/services/${service.id}`);
      setServices((list) => list.filter((s) => s.id !== service.id));
      toast.success(`${service.name} removed`);
      return true;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || 'Couldn’t delete the service. It may still have appointments.');
      return false;
    }
  };

  const bookAction = (s) =>
    user ? (
      <Button as={Link} to={`/appointments?serviceId=${s.id}`} size="sm" variant="secondary" aria-label={`Book ${s.name}`}>
        Book <FiArrowRight aria-hidden="true" />
      </Button>
    ) : (
      <Button as={Link} to="/login?redirect=/services" size="sm" variant="ghost" aria-label={`Log in to book ${s.name}`}>
        Log in to book
      </Button>
    );

  return (
    <>
      <PageHeader
        title="Services"
        lede="Every service, its time in the chair, and what it costs."
        actions={
          isAdmin && (
            <Button as={Link} to="/services/create">
              <FiPlus aria-hidden="true" /> Add service
            </Button>
          )
        }
      />

      {status === 'loading' ? (
        <ul aria-busy="true" aria-label="Loading services">
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className="flex items-center justify-between py-6 border-b border-hairline">
              <Skeleton className="h-7 w-56" />
              <Skeleton className="h-5 w-32" />
            </li>
          ))}
        </ul>
      ) : status === 'error' ? (
        <div className="py-12">
          <p className="text-lg">The price list couldn't load.</p>
          <p className="text-muted mt-1 mb-6">Check that the API is running, then try again.</p>
          <Button variant="secondary" onClick={() => { setStatus('loading'); fetchServices(); }}>Try again</Button>
        </div>
      ) : services.length === 0 ? (
        <div className="py-12">
          <p className="text-lg">No services listed yet.</p>
          {isAdmin && <p className="text-muted mt-1">Add the first one to open the book.</p>}
        </div>
      ) : (
        <ul>
          <AnimatePresence initial={false}>
            {services.map((s, i) => (
              <motion.li
                key={s.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.45, delay: reduce ? 0 : Math.min(i, 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <ServiceRow
                  as="div"
                  headingLevel={2}
                  service={s}
                  actions={isAdmin ? <AdminActions service={s} onDelete={handleDelete} /> : bookAction(s)}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </>
  );
}

export default Services
