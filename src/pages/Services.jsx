// list and basic admin buttons
import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiEdit, FiTrash } from "react-icons/fi";

function Services() {
  const [services, setServices] = useState([]);
  const { user, } = useContext(AuthContext);  

  const fetchServices = async () => {
    try {
      const res = await api.get("/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      alert("Error deleting service", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        Our Services
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-800">{s.name}</h3>
              <p className="text-gray-600">Duration: {s.durationMin} min</p>
              <p className="text-gray-700 font-semibold mt-2">
                Price: €{(s.priceCents / 100).toFixed(2)}
              </p>

              {user && user.role === "ADMIN" ? (
                <div className="flex justify-between mt-4">
                  <Link
                    to={`/services/edit/${s.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    <FiEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    <FiTrash /> Delete
                  </button>
                </div>
              ) : user ? (
                <div className="mt-4">
                  {/* added service name so it stays there when redirecting to appointments */}
                  <Link
                    to={`/appointments?serviceId=${s.id}&serviceName=${encodeURIComponent(s.name)}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Book Now
                  </Link>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services