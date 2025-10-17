import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <div className='max-w-2xl p-8 bg-white shadow-2xl rounded-2xl'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-4'>
          💈 Barbershop VT
        </h1>
        <p className='text-gray-600 mb-6 leading-relaxed'>
          Streamline your barbershop schedule — manage services, book appointments, and
          organize your day with ease.
        </p>
        <div className='flex justify-center gap-4'>
          <Link to="/services" className='bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition'>
            View Services
          </Link>

          {!user && (
            <Link
              to="/register"
              className="bg-gray-800 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-900 transition"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home