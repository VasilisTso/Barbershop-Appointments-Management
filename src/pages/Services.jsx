// list and basic admin buttons
import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Services() {
  const [services, setServices] = useState([]);
  const { user, isAdmin } = useContext(AuthContext); 

  useEffect(() => {
    api.get('/services').then(res => setServices(res.data)).catch(console.error);
  }, []);

  const deleteService = async (id) => {
    if (!confirm('Delete service?')) return;
    try {
      await api.delete(`/services/${id}`);
      setServices(s => s.filter(x => x.id !== id));
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      {isAdmin() && <Link to="/services/create" className="bg-blue-500 text-white px-3 py-1 rounded">Create Service</Link>}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map(s => (
          <div key={s.id} className="border p-4 rounded">
            <h3 className="font-semibold">{s.name}</h3>
            <div>Duration: {s.durationMin} min</div>
            <div>Price: {(s.priceCents/100).toFixed(2)} €</div>
            <div className="mt-2 flex gap-2">
              {isAdmin() && <>
                <Link to={`/services/edit/${s.id}`} className="px-2 py-1 border">Edit</Link>
                <button onClick={()=>deleteService(s.id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services