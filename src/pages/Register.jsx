import React, { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from "../services/api";
import toast from "react-hot-toast";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/users/register", form);
      toast.success("Registered successfully!", { duration: 1500 });
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
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
          Create Your Account
        </h2>


        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="text-gray-400 text-sm ml-1 mb-1 block">Full Name</label>
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm ml-1 mb-1 block">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm ml-1 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg shadow-violet-900/20 transition-all transform active:scale-95 ${
              loading 
                ? "bg-gray-600 cursor-not-allowed" 
                : "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
            }`}
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