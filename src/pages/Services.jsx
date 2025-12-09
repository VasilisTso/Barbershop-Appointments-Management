// list and basic admin buttons
import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiEdit, FiTrash } from "react-icons/fi";
import { MdOutlineArrowOutward } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { IoAddCircle } from "react-icons/io5";

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
      <div className='flex justify-between items-center mb-10'>
        <h2 className="text-3xl font-semibold text-white text-center">
          Our Services
        </h2>

        {user && user.role === "ADMIN" && (
          <Link
            to="/services/create"
            className="flex justify-center items-center gap-2 bg-violet-800 text-white px-3 py-1 text-center rounded-md font-medium hover:bg-violet-900 transition"
          >
            Add Service <IoAddCircle />
          </Link>
        )}
      </div>
      
      {services.length === 0 ? (
        <p className="text-center text-gray-300">No services available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.id}
              className="group relative bg-[#1A1B26] rounded-2xl p-6 border border-white/5 hover:border-violet-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1"
            >
              {/* Absolute glow effect behind the card */}
              <div className="absolute inset-0 bg-violet-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-violet-300 transition-colors">{s.name}</h3>
                    <span className="bg-violet-500/10 text-violet-300 px-3 py-1 rounded-full text-sm font-medium border border-violet-500/20">
                      {s.durationMin} min
                    </span>
                </div>
                
                <p className="text-gray-400 mb-6 text-sm">Experience our premium {s.name} service designed for your style.</p>
                
                <div className="flex items-end justify-between mt-auto">
                    <p className="text-3xl font-bold text-white">€{(s.priceCents / 100).toFixed(2)}</p>
                    
                    {/* Action Button */}
                    {user && user.role === "ADMIN" ? (
                      <div className="flex gap-2">
                          <Link to={`/services/edit/${s.id}`} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg transition"><FiEdit /></Link>
                          <button onClick={() => handleDelete(s.id)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg transition"><FiTrash /></button>
                      </div>
                    ) : (
                      <Link
                          to={user ? `/appointments?serviceId=${s.id}&serviceName=${encodeURIComponent(s.name)}` : `/login?redirect=/services`}
                          className="bg-white text-black hover:bg-violet-400 hover:text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-white/5"
                      >
                          {user ? "Book Now" : "Login to Book"}
                      </Link>
                    )}
                </div>
            </div>







              {/* OLD DESIGN
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
                  {/* added service name so it stays there when redirecting to appointments */}{/*
                  <Link
                    to={`/appointments?serviceId=${s.id}&serviceName=${encodeURIComponent(s.name)}`}
                    className="flex justify-center items-center gap-2 bg-violet-800 text-white px-4 py-2 rounded-lg hover:bg-violet-900 transition"
                  >
                    Book Now <MdOutlineArrowOutward />
                  </Link>
                </div>
              ) : (
                <div className="mt-8 text-center">
                  {/* if we want to redirect to service clicked do: to={`/login?redirect=/appointments?serviceId=${s.id}&serviceName=${encodeURIComponent(s.name)}`}*/}
                  {/*
                  <Link
                    to={`/login?redirect=/services`}
                    className="flex justify-center items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
                  >
                    Login for more Info <CiLogin />
                  </Link>
                </div>
              )}*/}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services