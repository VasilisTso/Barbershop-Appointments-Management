// create & edit service form
// src/pages/ServiceForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function ServiceForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // if id exists, we’re editing
  const [form, setForm] = useState({ name: '', durationMin: '', priceCents: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Fetch existing service data when editing
      setLoading(true);
      api
        .get(`/services/${id}`)
        .then((res) => setForm(res.data))
        .catch((err) => console.error("Failed to fetch service", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/services/${id}`, {
          name: form.name,
          durationMin: Number(form.durationMin),
          priceCents: Number(form.priceCents),
        });
      } else {
        await api.post("/services", {
          name: form.name,
          durationMin: Number(form.durationMin),
          priceCents: Number(form.priceCents),
        });
      }
      navigate("/services");
    } catch (err) {
      console.error("Error saving service:", err);
      alert("Failed to save service");
    }
  };

  if (loading) return <div className="text-center text-white mt-20 text-lg animate-pulse">Loading service data...</div>;

  return (
    <div className="max-w-lg mx-auto mt-16 bg-[#13141c] border border-white/10 shadow-2xl rounded-3xl p-8 relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-t-3xl"></div>
      
      <h2 className="text-3xl text-white font-bold mb-8 text-center">
        {id ? "Edit Service" : "Add New Service"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 text-sm mb-2 font-medium">Service Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none transition-colors"
            placeholder="Haircut & Beard Trim"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2 font-medium">Duration (min)</label>
            <input
              name="durationMin"
              type="number"
              value={form.durationMin}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none transition-colors"
                placeholder="30"
            />
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm mb-2 font-medium">Price (€)</label>
            <input
              name="priceCents"
              type="number"
              value={form.priceCents}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none transition-colors"
                placeholder="2500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-bold transition shadow-lg shadow-violet-900/20 active:scale-95"
        >
          {id ? "Update Service" : "Create Service"}
        </button>
      </form>
    </div>
  );
}

export default ServiceForm