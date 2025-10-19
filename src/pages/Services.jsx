// list and basic admin buttons
import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiEdit, FiTrash } from "react-icons/fi";
import { MdOutlineArrowOutward } from "react-icons/md";
import { CiLogin } from "react-icons/ci";

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
      <h2 className="text-3xl font-semibold text-white mb-10 text-center">
        Our Services
      </h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-300">No services available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between h-full border border-gray-100 hover:shadow-2xl transition"
            >
              <h3 className="min-h-[60px] text-xl font-bold mb-8 text-gray-800">{s.name}</h3>
              <p className="text-gray-600"><span className='font-semibold'>Duration:</span> {s.durationMin} min</p>
              <p className="text-gray-700 mt-2"><span className='font-semibold'>Price:</span> €{(s.priceCents / 100).toFixed(2)}</p>

              {user && user.role === "ADMIN" ? (
                <div className="flex justify-between mt-8">
                  <Link
                    to={`/services/edit/${s.id}`}
                    className="flex justify-center items-center gap-2 text-violet-800 hover:text-violet-900 font-medium cursor-pointer"
                  >
                    Edit <FiEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="flex justify-center items-center gap-2 text-red-600 hover:text-red-700 font-medium cursor-pointer"
                  >
                    Delete <FiTrash />
                  </button>
                </div>
              ) : user ? (
                <div className="mt-8">
                  {/* added service name so it stays there when redirecting to appointments */}
                  <Link
                    to={`/appointments?serviceId=${s.id}&serviceName=${encodeURIComponent(s.name)}`}
                    className="flex justify-center items-center gap-2 bg-violet-800 text-white px-4 py-2 rounded-lg hover:bg-violet-900 transition"
                  >
                    Book Now <MdOutlineArrowOutward />
                  </Link>
                </div>
              ) : (
                <div className="mt-8 text-center">
                  <Link
                    to={`/login?redirect=/appointments?serviceId=${s.id}&serviceName=${encodeURIComponent(s.name)}`}
                    className="flex justify-center items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                  >
                    Login to Book <CiLogin />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services