/* 
fetches appointments depending on role (backend returns user’s or all)
shows list and allows booking
admin buttons change status.
*/
import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

function Appointments() {
  const { user, isAdmin } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get('/appointments').then(res => setAppointments(res.data)).catch(console.error);
    api.get('/services').then(res => setServices(res.data)).catch(console.error);
  }, []);

  const book = async (serviceId, startAt) => {
    try {
      await api.post('/appointments', { serviceId, startAt });
      const res = await api.get('/appointments');
      setAppointments(res.data);
    } catch (err) { alert(err.response?.data?.error || err.message); }
  };

  const changeStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, { status });
      const res = await api.get('/appointments');
      setAppointments(res.data);
    } catch (err) { alert(err.response?.data?.error || err.message); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>

      <div className="mb-6">
        <h3 className="font-semibold">Book an appointment</h3>
        <select id="service-select" className="border p-2 mr-2" defaultValue="">
          <option value="">Select service</option>
          {services.map(s => <option key={s.id} value={s.id}>{s.name} ({s.durationMin} min)</option>)}
        </select>
        <input id="start-input" type="datetime-local" className="border p-2 mr-2" />
        <button className="bg-blue-600 px-3 py-1 text-white rounded"
          onClick={()=>{
            const serviceId = Number(document.getElementById('service-select').value);
            const startAt = new Date(document.getElementById('start-input').value).toISOString();
            if (!serviceId || !startAt) return alert('Choose service and time');
            book(serviceId, startAt);
          }}>Book</button>
      </div>

      <div>
        {appointments.map(a => (
          <div key={a.id} className="border p-3 mb-3 rounded">
            <div><strong>Service:</strong> {a.service?.name}</div>
            <div><strong>Time:</strong> {new Date(a.startAt).toLocaleString()}</div>
            <div><strong>Status:</strong> {a.status}</div>
            <div className="mt-2">
              {isAdmin() && (
                <>
                  <button onClick={()=>changeStatus(a.id,'CONFIRMED')} className="mr-2 bg-green-500 px-2 py-1 rounded">Confirm</button>
                  <button onClick={()=>changeStatus(a.id,'CANCELLED')} className="bg-red-500 px-2 py-1 rounded">Cancel</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appointments