import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Welcome to Barber Appointment Manager 💈</h1>
      <p className="text-gray-700 mb-6">
        Book, manage, and organize your barbershop appointments easily.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/services" className="bg-blue-600 text-white px-4 py-2 rounded">View Services</Link>
        <Link to="/login" className="bg-gray-800 text-white px-4 py-2 rounded">Login</Link>
      </div>
    </div>
  );
}

export default Home