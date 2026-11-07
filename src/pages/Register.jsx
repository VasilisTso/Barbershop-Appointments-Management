import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import FormError from '../components/FormError';
import Field from '../components/ui/Field';
import PasswordInput from '../components/ui/PasswordInput';
import Button from '../components/ui/Button';
import { apiErrorMessage, apiFieldErrors } from '../lib/apiError';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (fieldErrors[key]) setFieldErrors((fe) => ({ ...fe, [key]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);
    try {
      await register(form);
      toast.success('Account created. Log in to book.');
      navigate('/login');
    } catch (err) {
      const fe = apiFieldErrors(err);
      setFieldErrors(fe);
      const msg = apiErrorMessage(err, 'Couldn’t create the account. Try again.');
      if (!Object.keys(fe).length) setError(/exists/i.test(msg) ? 'An account with that email already exists. Log in instead.' : msg);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={<>Take a <span className="italic text-accent">seat.</span></>}
      lede="One account to book a chair and see every visit in one list."
    >
      <FormError>{error}</FormError>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field
          label="Full name"
          autoComplete="name"
          placeholder="Alex Papadopoulos"
          value={form.name}
          onChange={update('name')}
          error={fieldErrors.name}
          required
        />
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={form.email}
          onChange={update('email')}
          error={fieldErrors.email}
          required
        />
        <PasswordInput
          autoComplete="new-password"
          value={form.password}
          onChange={update('password')}
          hint="At least 6 characters."
          error={fieldErrors.password}
          minLength={6}
          required
        />
        <Button type="submit" size="lg" className="w-full mt-3" disabled={loading}>
          {loading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
      <p className="text-muted text-[15px] mt-8">
        Already have an account?{' '}
        <Link to="/login" className="text-ink underline hover:text-accent">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register
