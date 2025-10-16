// create & edit service form
// src/pages/ServiceForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function ServiceForm() {
  const [form, setForm] = useState({ name: '', durationMin: 30, priceCents: 0 });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/services/${id}`).then(res => setForm(res.data)).catch(() => {});
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (id) await api.put(`/services/${id}`, form);
      else await api.post('/services', form);
      navigate('/services');
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit Service' : 'Create Service'}</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})}/>
        <input className="w-full p-2 border" placeholder="Duration (min)" type="number" value={form.durationMin} onChange={e=>setForm({...form, durationMin: Number(e.target.value)})}/>
        <input className="w-full p-2 border" placeholder="Price (cents)" type="number" value={form.priceCents} onChange={e=>setForm({...form, priceCents: Number(e.target.value)})}/>
        <button className="bg-green-600 text-white p-2 rounded">{id ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}

export default ServiceForm