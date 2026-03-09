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

  const [showPassword, setShowPassword] = useState(false);

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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle text and password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                required
              />
              
              {/*Toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-5 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-violet-900/20 transition-all transform active:scale-95 ${
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