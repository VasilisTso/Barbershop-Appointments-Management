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
import { MdCancel } from "react-icons/md";
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
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Appointments
      </h1>

      {!isAdmin() && (
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-xl mb-4 text-gray-700">
            Book an Appointment
          </h3>

          <div className="flex flex-wrap gap-3">
            <select
              id="service-select"
              className="border rounded-lg p-2 flex-1 min-w-[150px]"
              value={selectedService} // controlled value
              onChange={(e) => setSelectedService(e.target.value)} // update state on change
            >
              <option value="">
                {selectedService ? "Select service" : "Select service"}
              </option>

              {services.map((s) => (
                <option key={s.id} value={String(s.id)}>
                  {s.name} ({s.durationMin} min)
                </option>
              ))}
            </select>

            <input
              id="start-input"
              type="datetime-local"
              className="border rounded-lg p-2 flex-1 min-w-[180px]"
            />

            <button
              className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
              onClick={() => {
                const serviceId = Number(selectedService); // controlled state value
                const startInput = document.getElementById("start-input").value;
                const startAt = startInput ? new Date(startInput).toISOString() : null;

                if (!serviceId || !startAt) return toast.error("Please choose a service and time.");
                book(serviceId, startAt);
              }}
            >
              Book <IoAddCircle />
            </button>
          </div>
        </div>
      )}

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <div className="text-lg font-semibold text-gray-800 mb-4">
                    {a.service?.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(a.startAt).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-700 mt-4">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        a.status === "CONFIRMED"
                          ? "text-green-600"
                          : a.status === "CANCELLED"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                </div>
                    
                {isAdmin() && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => changeStatus(a.id, "CONFIRMED")}
                      className="flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                    >
                      Confirm <GiConfirmed />
                    </button>
                    <button
                      onClick={() => changeStatus(a.id, "CANCELLED")}
                      className="flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Cancel <MdCancel />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appointments



// works but preselect doesn't work perfectly
/*
function Appointments() {
  const { isAdmin } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [params] = useSearchParams();

  const selectedServiceId = params.get("serviceId");
  const selectedServiceName = params.get("serviceName");

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
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      }
    };
    load();
  }, []);

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
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-10 text-center text-white">
        Appointments
      </h1>

      {!isAdmin() && (
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-xl mb-4 text-gray-700">
            Book an Appointment
          </h3>

          <div className="flex flex-wrap gap-3">
            <select
              id="service-select"
              className="border rounded-lg p-2 flex-1 min-w-[150px]"
              // Preselect the service if user came from Services page
              defaultValue={selectedServiceId || ""}
            >
              <option value="">
                {selectedServiceName || "Select service"}
              </option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.durationMin} min)
                </option>
              ))}
            </select>

            <input
              id="start-input"
              type="datetime-local"
              className="border rounded-lg p-2 flex-1 min-w-[180px]"
            />

            <button
              className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
              onClick={() => {
                const serviceId = Number(
                  document.getElementById("service-select").value
                );
                const startAt = new Date(
                  document.getElementById("start-input").value
                ).toISOString();

                if (!serviceId || !startAt)
                  return toast.error("Please choose a service and time.");
                book(serviceId, startAt);
              }}
            >
              Book <IoAddCircle />
            </button>
          </div>
        </div>
      )}

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((a) => (
            <div
              key={a.id}
              className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <div className="text-lg font-semibold text-gray-800 mb-4">
                    {a.service?.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(a.startAt).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-700 mt-4">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        a.status === "CONFIRMED"
                          ? "text-green-600"
                          : a.status === "CANCELLED"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                </div>
                    
                {isAdmin() && (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => changeStatus(a.id, "CONFIRMED")}
                      className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md cursor-pointer"
                    >
                      Confirm <GiConfirmed />
                    </button>
                    <button
                      onClick={() => changeStatus(a.id, "CANCELLED")}
                      className="flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md cursor-pointer"
                    >
                      Cancel <MdCancel />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appointments
*/
