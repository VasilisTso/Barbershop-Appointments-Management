// Create & edit service form (admin only).
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../services/api';
import Field from '../components/ui/Field';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import PageHeader from '../components/ui/PageHeader';
import FormError from '../components/FormError';
import ServiceRow from '../components/ServiceRow';
import { apiErrorMessage, apiFieldErrors } from '../lib/apiError';

function ServiceForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // present when editing
  // Price is edited in euros and sent to the API in cents.
  const [form, setForm] = useState({ name: '', durationMin: '', priceEuros: '' });
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!id) return;
    api
      .get(`/services/${id}`)
      .then((res) =>
        setForm({
          name: res.data.name,
          durationMin: String(res.data.durationMin),
          priceEuros: (res.data.priceCents / 100).toFixed(2),
        })
      )
      .catch((err) => setError(apiErrorMessage(err, 'Couldn’t load this service.')))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      durationMin: Number(form.durationMin),
      priceCents: Math.round(Number(form.priceEuros) * 100),
    };
    try {
      if (id) await api.put(`/services/${id}`, payload);
      else await api.post('/services', payload);
      toast.success(id ? `${payload.name} updated` : `${payload.name} added to the list`);
      navigate('/services');
    } catch (err) {
      console.error('Error saving service:', err);
      const fe = apiFieldErrors(err);
      setFieldErrors({ name: fe.name, durationMin: fe.durationMin, priceEuros: fe.priceCents });
      if (!Object.keys(fe).length) setError(apiErrorMessage(err, 'Couldn’t save the service. Try again.'));
      setSaving(false);
    }
  };

  const preview = {
    name: form.name || 'Service name',
    durationMin: Number(form.durationMin) || 0,
    priceCents: Math.round((Number(form.priceEuros) || 0) * 100),
  };

  return (
    <>
      <Link to="/services" className="inline-flex items-center gap-2 text-[15px] text-muted hover:text-ink mb-6 py-1">
        <FiArrowLeft aria-hidden="true" /> Services
      </Link>
      <PageHeader title={id ? 'Edit service' : 'New service'} />

      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <FormError>{error}</FormError>
          {loading ? (
            <div className="space-y-6" aria-busy="true" aria-label="Loading service">
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-1/2" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Field
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={fieldErrors.name}
                placeholder="Haircut & beard trim"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Duration (minutes)"
                  name="durationMin"
                  type="number"
                  inputMode="numeric"
                  min={5}
                  step={5}
                  value={form.durationMin}
                  onChange={handleChange}
                  error={fieldErrors.durationMin}
                  placeholder="30"
                  required
                />
                <Field
                  label="Price (€)"
                  name="priceEuros"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={0.01}
                  value={form.priceEuros}
                  onChange={handleChange}
                  error={fieldErrors.priceEuros}
                  placeholder="25.00"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" size="lg" disabled={saving}>
                  {saving ? 'Saving…' : id ? 'Save changes' : 'Add service'}
                </Button>
                <Button as={Link} to="/services" size="lg" variant="ghost">
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>

        <aside aria-label="Preview" className="lg:col-span-5 lg:col-start-8">
          <h2 className="text-sm text-muted mb-1">How it reads on the price list</h2>
          <ul className="border-t border-ink">
            <ServiceRow service={preview} />
          </ul>
        </aside>
      </div>
    </>
  );
}

export default ServiceForm
