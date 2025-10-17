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

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl text-white font-semibold mb-4 text-center">
        {id ? "Edit Service" : "Add New Service"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 px-2">
        <div>
          <label className="block text-white text-xl font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-300 bg-white text-gray-800 rounded w-full px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-white text-xl font-medium mb-1">Duration (minutes)</label>
          <input
            name="durationMin"
            type="number"
            value={form.durationMin}
            onChange={handleChange}
            required
            className="border bg-white border-gray-300 text-gray-800 rounded w-full px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-white text-xl font-medium mb-1">Price (€)</label>
          <input
            name="priceCents"
            type="number"
            value={form.priceCents}
            onChange={handleChange}
            required
            className="border border-gray-300 bg-white text-gray-800 rounded w-full px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="mt-4 mb-4 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded w-full font-semibold"
        >
          {id ? "Update Service" : "Create Service"}
        </button>
      </form>
    </div>
  );
}

export default ServiceForm