import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-3">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border" placeholder="Name"
          value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
        <input className="w-full p-2 border" placeholder="Email"
          value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
        <input className="w-full p-2 border" placeholder="Password" type="password"
          value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} />
        <button className="bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register