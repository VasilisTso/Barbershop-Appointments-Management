import React, { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from "../services/api";

/* before polish works
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
*/

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/users/register", form);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-12 text-center text-gray-800">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
          />
          <button
            type="submit"
            className="w-full bg-violet-800 hover:bg-violet-900 cursor-pointer text-white font-semibold py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>
        <p className="text-gray-600 text-sm mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-violet-800 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register