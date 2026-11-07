import React, { useState, useContext } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import FormError from '../components/FormError';
import Field from '../components/ui/Field';
import PasswordInput from '../components/ui/PasswordInput';
import Button from '../components/ui/Button';
import { apiErrorMessage } from '../lib/apiError';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [params] = useSearchParams();

  // Only allow in-app redirects.
  const rawRedirect = params.get('redirect') || '/';
  const redirect = rawRedirect.startsWith('/') && !rawRedirect.startsWith('//') ? rawRedirect : '/';

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const u = await login({ email, password });
      toast.success(`Welcome back${u?.name ? `, ${u.name}` : ''}.`);
      navigate(redirect);
    } catch (err) {
      console.error(err);
      setError(err?.response?.status === 401 ? 'That email and password don’t match. Try again.' : apiErrorMessage(err, 'Couldn’t log you in. Try again.'));
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={<>Welcome <span className="italic text-accent">back.</span></>}
      lede="Log in to book a chair and keep track of your appointments."
    >
      <FormError>{error}</FormError>
      <form onSubmit={submit} className="space-y-5">
        <Field
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordInput
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" size="lg" className="w-full mt-3" disabled={loading}>
          {loading ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
      <p className="text-muted text-[15px] mt-8">
        New here?{' '}
        <Link to="/register" className="text-ink underline hover:text-accent">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login
