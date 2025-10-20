import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

import { MdOutlineArrowOutward } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FiEdit, FiTrash } from "react-icons/fi";
import { FaReact, FaHtml5, FaGitAlt, FaNodeJs, FaDatabase, FaTrello } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import { SiPostman } from "react-icons/si";


function Home() {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);

  const skills = [
                { name: "React", icon: FaReact, color: "bg-[#323330] text-[#61DBFB]", },
                { name: "JavaScript", icon: IoLogoJavascript, color: "bg-[#323330] text-[#F0DB4F]", },
                { name: "TailwindCSS", icon: RiTailwindCssFill, color: "bg-[#323330] text-[#06b6d4]", },
                { name: "HTML", icon: FaHtml5, color: "bg-[#323330] text-[#F06529]"},
                { name: "Git", icon:  FaGitAlt, color: "bg-[#323330] text-[#F1502F]"},
                { name: "Node.Js", icon:  FaNodeJs, color: "bg-[#323330] text-[#3c873a]"},
                { name: "SQLite", icon: FaDatabase, color: "bg-[#323330] text-[#00758f]"},
                { name: "Trello", icon: FaTrello, color: "bg-[#323330] text-[#0079BF]"},
                { name: "Postman", icon: SiPostman, color: "bg-[#323330] text-[#EF5B25]"},
    ];

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

  return (
    <div className="py-24 flex flex-col items-center justify-center min-h-screen text-center rounded-2xl">
      <div>
        <h1 className='text-5xl font-extrabold text-white mb-6 drop-shadow-lg'>
          💈 Barbershop VT
        </h1>
        <motion.div initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-60 relative z-10 max-w-2xl p-10 backdrop-blur-md bg-white/10 shadow-xl shadow-gray-500 border border-white/10 rounded-2xl'
        >
          <p className='text-lg text-gray-200 mb-8 leading-relaxed'>
            Streamline your barbershop schedule — manage services, book appointments, and
            organize your day with ease.
          </p>

          <div className='flex justify-center flex-wrap gap-4'>
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

      <div>
        <h1 className='text-5xl font-extrabold text-white mb-6 drop-shadow-lg'>
          Popular Services
        </h1>
        <motion.div initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-60 relative z-10 max-w-2xl p-10 backdrop-blur-md bg-white/10 shadow-xl shadow-gray-500 border border-white/10 rounded-2xl'
        >
          {services.length === 0 ? (
            <p className="text-center text-gray-300">No services available yet.</p>
          ) : (
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {services.slice(0, 3).map((s) => (
                <div
                  key={s.id}
                  className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between h-full border border-gray-100 hover:shadow-2xl transition"
                >
                  <h3 className="min-h-[60px] text-xl font-bold mb-8 text-gray-800">{s.name}</h3>
                  <p className="text-gray-600"><span className='font-semibold'>Duration:</span> {s.durationMin} min</p>
                  <p className="text-gray-700 mt-2"><span className='font-semibold'>Price:</span> €{(s.priceCents / 100).toFixed(2)}</p>
    
                </div>
              ))}
            </div>
          )}

          <div className='flex justify-center flex-wrap'>
            <Link to="/services" 
              className='mt-8 flex justify-center items-center gap-2 bg-violet-800 text-white px-6 py-3 rounded-lg shadow hover:bg-violet-900 font-medium hover:shadow-2xl transition transform hover:scale-102'
            >
              View All  Services <MdOutlineArrowOutward />
          </Link>
          </div>
        </motion.div>
      </div>

      <div>
        <h1 className='text-5xl font-extrabold text-white mb-6 drop-shadow-lg'>
          About Us
        </h1>
        <motion.div initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-60 relative z-10 max-w-2xl p-10 backdrop-blur-md bg-white/10 shadow-xl shadow-gray-500 border border-white/10 rounded-2xl'
        >
          <p className='text-lg text-gray-200 mb-8 leading-relaxed'>
            This is a university project about building a
            business CRUD web app. The goal of the app is 
            to manage appointments for a barbershop.
          </p>

          <p className='text-lg text-gray-200 mb-8 leading-relaxed'>
            Below are some programming languages, tech and tools used to build this app.
          </p>

          <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.05,
                        },
                    },
                }}
            >
                {skills.map((skill) => {
                  const Icon = skill.icon;

                  return (
                    <motion.div
                        key={skill.name}
                        className={`flex items-center justify-center gap-2 font-bold shadow px-3 py-2 rounded-lg hover:scale-105 transition-transform duration-300 ${skill.color}`}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        
                        <Icon className="text-lg" />
                        <span>{skill.name}</span>
                    </motion.div>
                  )
                })}
            </motion.div>
        </motion.div>
      </div>

      <div>
        <h1 className='bg-gradient-to-r from-violet-800 to-white bg-clip-text text-transparent text-5xl font-extrabold drop-shadow-lg'>
          Contact Us
        </h1>
        <motion.div initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-4 relative z-10 max-w-2xl p-10   rounded-2xl'
        >
          <p className='mb-6 max-w-[700px] text-xl text-gray-200'>You can reach Us below</p>

          <div className="flex justify-center text-white items-center space-x-6 mb-6">
              <motion.a href="https://www.linkedin.com/in/vasilis-tsomakas-dev/" className="hover:text-blue-600" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                    whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.95 }}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin size-6.5" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                  </svg>
              </motion.a>

              <motion.a href="https://github.com/VasilisTso" className="hover:text-violet-500" target="_blank" rel="noreferrer" aria-label="GitHub"
                  whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.95 }}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github size-6.5" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                  </svg>
              </motion.a>

              <motion.a href="mailto:vtsomakas@gmail.com" className="hover:text-red-600" aria-label="Email"
                  whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.95 }}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope size-6.5" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                  </svg>
              </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home