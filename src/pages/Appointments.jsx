/* 
fetches appointments depending on role (backend returns user’s or all)
shows list and allows booking
admin buttons change status.
*/
import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useSearchParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { MdCancel, MdEvent, MdSwapVert, MdLockOutline } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { IoAddCircle } from "react-icons/io5";

// doesn't load, error
function Appointments() {
  const { user, isAdmin } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);

  // State to track sorting order (desc = newest first, asc = oldest first)
  const [sortOrder, setSortOrder] = useState("desc");

  // define URL params
  const [params] = useSearchParams();
  const selectedServiceId = params.get("serviceId");

  // define the selectedService state using the param (if any)
  const [selectedService, setSelectedService] = useState(selectedServiceId || "");

  const [isLoading, setIsLoading] = useState(true);

  // Fetch all appointments and services on page load
  useEffect(() => {
    // If no user, do not attempt to fetch data
    if (!user) return;

    const load = async () => {
      setIsLoading(true);

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
      } finally {
        setIsLoading(false); 
      }
    };
    load();
  }, [selectedServiceId, user]);

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

  // unauthorized users, tell them to log in
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto mt-20 px-4">
        <div className="bg-[#13141c] border border-white/10 shadow-2xl shadow-black/50 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-violet-600/20 blur-[100px] pointer-events-none rounded-full"></div>
          
          <div className="flex justify-center mb-6 relative z-10">
            <div className="bg-white/5 p-4 rounded-full border border-white/10">
              <MdLockOutline className="text-5xl text-violet-400" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4 relative z-10">Access Restricted</h2>
          <p className="text-gray-400 mb-8 text-lg relative z-10">
            You need to be logged in to view and book your appointments.
          </p>
          
          <Link 
            to="/login?redirect=/appointments" 
            className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-violet-900/20 active:scale-95 relative z-10"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Sort the appointments array based on startAt date before rendering
  const sortedAppointments = [...appointments].sort((a, b) => {
    const dateA = new Date(a.startAt).getTime();
    const dateB = new Date(b.startAt).getTime();
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

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

      {/* Sorting header section */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-xl font-bold text-white">
          {isAdmin() ? "All Appointments" : "Your Appointments"}
        </h3>
        {appointments.length > 0 && (
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="flex items-center gap-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            <MdSwapVert className="text-lg" />
            {sortOrder === "desc" ? "Newest First" : "Oldest First"}
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-gray-400 text-lg">No appointments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedAppointments.map((a) => (
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
