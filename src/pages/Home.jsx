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
      <motion.div initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='relative z-10 max-w-2xl p-10 backdrop-blur-md bg-white/10 shadow-xl shadow-gray-500 border border-white/10 rounded-2xl'
      >
        <h1 className='text-5xl font-extrabold text-white mb-6 drop-shadow-lg'>
          💈 Barbershop VT
        </h1>

        <p className='text-lg text-gray-200 mb-8 leading-relaxed'>
          Streamline your barbershop schedule — manage services, book appointments, and
          organize your day with ease.
        </p>

        <div className='flex justify-center flex-wrap gap-4'>
          <Link to="/services" 
            className='flex justify-center items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 font-medium hover:shadow-2xl transition transform hover:scale-102'
          >
            View Services <MdOutlineArrowOutward />
          </Link>

          {!user && (
            <Link to="/register"
              className="flex justify-center items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-900 font-medium hover:shadow-2xl transition transform hover:scale-102"
            >
              Get Started <FaUser />
            </Link>
          )}
        </div>
      </motion.div> 

    </div>
  );
}

export default Home