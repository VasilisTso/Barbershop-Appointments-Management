import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/services');
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };


  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-3">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border" placeholder="Email" value={email}
          onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full p-2 border" placeholder="Password" type="password"
          value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  )
}

export default Login