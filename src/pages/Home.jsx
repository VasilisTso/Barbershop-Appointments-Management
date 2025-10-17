import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaUser } from "react-icons/fa";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center rounded-2xl">
      <div className='max-w-2xl p-8 backdrop-blur-md bg-white shadow-xl shadow-gray-500 rounded-2xl'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-4'>
          💈 Barbershop VT
        </h1>
        <p className='text-lg text-gray-700 mb-6 leading-relaxed'>
          Streamline your barbershop schedule — manage services, book appointments, and
          organize your day with ease.
        </p>
        <div className='flex justify-center gap-4'>
          <Link to="/services" className='flex justify-center items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 hover:shadow-2xl transition'>
            View Services <MdOutlineArrowOutward />
          </Link>

          {!user && (
            <Link
              to="/register"
              className="flex justify-center items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-lg shadow hover:bg-gray-900 transition"
            >
              Get Started <FaUser />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home