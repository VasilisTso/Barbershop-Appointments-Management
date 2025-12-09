/* 
fetches appointments depending on role (backend returns user’s or all)
shows list and allows booking
admin buttons change status.
*/
import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { MdCancel, MdEvent } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { IoAddCircle } from "react-icons/io5";

// doesn't load, error
function Appointments() {
  const { user, isAdmin } = useContext(AuthContext); // eslint-disable-line no-unused-vars
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);

  // FIRST define URL params
  const [params] = useSearchParams();
  const selectedServiceId = params.get("serviceId");
  const selectedServiceName = params.get("serviceName"); // eslint-disable-line no-unused-vars

  // THEN define the selectedService state using the param (if any)
  const [selectedService, setSelectedService] = useState(selectedServiceId || "");

  // Fetch all appointments and services on page load
  useEffect(() => {
    const load = async () => {
      try {
        const [a, s] = await Promise.all([
          api.get("/appointments"),
          api.get("/services"),
        ]);
        setAppointments(a.data);
        setServices(s.data);

        // If user came via ?serviceId=..., and that id exists in loaded services,
        // set it as the selectedService (controlled select will show correct option)
        if (selectedServiceId) {
          // ensure it's an existing id (optional safety)
          const exists = s.data.some((svc) => String(svc.id) === String(selectedServiceId));
          if (exists) setSelectedService(String(selectedServiceId));
          else setSelectedService(""); // fallback if id not found
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      }
    };
    load();
  }, [selectedServiceId]);

  // Book new appointment
  const book = async (serviceId, startAt) => {
    try {
      await api.post("/appointments", { serviceId, startAt });
      const res = await api.get("/appointments");
      setAppointments(res.data);
      toast.success("Appointment booked successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to book appointment");
    }
  };

  // Admin status update
  const changeStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, { status });
      const res = await api.get("/appointments");
      setAppointments(res.data);
      toast.success(`Appointment ${status.toLowerCase()}!`);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to update status");
    }
  };

  // Render
  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-white drop-shadow-lg">
        Manage Appointments
      </h1>

      {!isAdmin() && (
        <div className="bg-[#1A1B26]/80 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
          
          <h3 className="font-bold text-2xl mb-6 text-white flex items-center gap-2">
            <MdEvent className="text-violet-400" /> Book an Appointment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="w-full">
                <label className="block text-gray-400 text-sm mb-2">Service</label>
                <select
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none transition-colors"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="" className="bg-gray-900">Select a service...</option>
                  {services.map((s) => (
                    <option key={s.id} value={String(s.id)} className="bg-gray-900">
                      {s.name} ({s.durationMin} min)
                    </option>
                  ))}
                </select>
            </div>

            <div className="w-full">
                <label className="block text-gray-400 text-sm mb-2">Date & Time</label>
                <input
                  id="start-input"
                  type="datetime-local"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none transition-colors [color-scheme:dark]"
                />
            </div>

            <button
              className="w-full flex justify-center items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-violet-900/20 active:scale-95"
              onClick={() => {
                const serviceId = Number(selectedService);
                const startInput = document.getElementById("start-input").value;
                const startAt = startInput ? new Date(startInput).toISOString() : null;
                if (!serviceId || !startAt) return toast.error("Please choose a service and time.");
                book(serviceId, startAt);
              }}
            >
              Book Now <IoAddCircle className="text-xl"/>
            </button>
          </div>
        </div>
      )}

      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-gray-400 text-lg">No appointments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="bg-[#13141c] border border-white/5 rounded-xl p-5 shadow-lg hover:border-violet-500/30 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <div className="text-xl font-bold text-white mb-1 flex items-center gap-3">
                  {a.service?.name}
                  <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        a.status === "CONFIRMED"
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : a.status === "CANCELLED"
                          ? "bg-red-500/10 text-red-400 border-red-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }`}
                    >
                      {a.status}
                    </span>
                </div>
                <div className="text-gray-400 text-sm">
                  {new Date(a.startAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </div>
                  
              {isAdmin() && (
                <div className="flex gap-3 w-full md:w-auto">
                  {a.status !== "CONFIRMED" && (
                      <button
                        onClick={() => changeStatus(a.id, "CONFIRMED")}
                        className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 px-4 py-2 rounded-lg transition"
                      >
                        Confirm <GiConfirmed />
                      </button>
                  )}
                  {a.status !== "CANCELLED" && (
                      <button
                        onClick={() => changeStatus(a.id, "CANCELLED")}
                        className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg transition"
                      >
                        Cancel <MdCancel />
                      </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appointments
