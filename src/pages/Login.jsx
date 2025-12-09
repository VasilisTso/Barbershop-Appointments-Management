import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      toast.success("Logged in successfully! Redirecting…", { duration: 1500 });
      setTimeout(() => navigate(redirect), 400);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Invalid email or password");
      toast.error("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Outer container
    <div className="flex justify-center items-center min-h-[80vh]">
      {/* Card Container - Dark Glass */}
      <div className="bg-[#13141c] border border-white/10 shadow-2xl shadow-black/50 rounded-3xl p-8 w-full max-w-md relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-violet-600/20 blur-[100px] pointer-events-none rounded-full"></div>
        
        <h2 className="text-3xl font-bold mb-8 text-center text-white relative z-10">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5 relative z-10">
          <div>
            <label className="text-gray-400 text-sm ml-1 mb-1 block">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm ml-1 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-violet-900/20 transition-all transform active:scale-95 ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-violet-800 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login