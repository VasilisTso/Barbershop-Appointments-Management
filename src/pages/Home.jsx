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
    { name: "React", icon: FaReact, color: "text-[#61DBFB]" },
    { name: "JavaScript", icon: IoLogoJavascript, color: "text-[#F0DB4F]" },
    { name: "Tailwind", icon: RiTailwindCssFill, color: "text-[#06b6d4]" },
    { name: "HTML", icon: FaHtml5, color: "text-[#F06529]" },
    { name: "Git", icon: FaGitAlt, color: "text-[#F1502F]" },
    { name: "Node.js", icon: FaNodeJs, color: "text-[#3c873a]" },
    { name: "SQLite", icon: FaDatabase, color: "text-[#00758f]" },
    { name: "Trello", icon: FaTrello, color: "text-[#0079BF]" },
    { name: "Postman", icon: SiPostman, color: "text-[#EF5B25]" },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services", err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center pb-20">
      
      {/* Hero Section */}
      <div className="mt-20 mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight'>
            <span className='bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent'>Barbershop VT</span>
          </h1>
          <p className='text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed'>
            Elevate your style with premium grooming services. Book your appointment today and experience the difference.
          </p>

          {!user && (
            <Link to="/register"
              className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition transform hover:-translate-y-1 shadow-xl shadow-white/10"
            >
              Get Started <FaUser />
            </Link>
          )}
        </motion.div>
      </div>

      {/* Services Preview Section */}
      <div className="w-full max-w-6xl px-4 mb-32">
        <div className="flex justify-between items-end mb-10">
          <h2 className='text-3xl font-bold text-white'>Popular Services</h2>
          <Link to="/services" className='text-violet-400 hover:text-white flex items-center gap-1 transition-colors'>
              View all <MdOutlineArrowOutward />
          </Link>
        </div>

        {services.length === 0 ? (
          <p className="text-gray-500">No services available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.slice(0, 3).map((s) => (
              <motion.div
                key={s.id}
                whileHover={{ y: -5 }}
                className="bg-[#1A1B26] border border-white/5 p-8 rounded-3xl text-left shadow-lg hover:shadow-violet-900/10 hover:border-violet-500/30 transition-all"
              >
                <h3 className="text-2xl font-bold text-white mb-2">{s.name}</h3>
                <div className="flex justify-between items-end mt-8">
                  <div>
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white font-medium">{s.durationMin} mins</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">Price</p>
                    <p className="text-2xl font-bold text-violet-400">€{(s.priceCents / 100).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Tech Stack Section */}
      <div className="w-full max-w-4xl px-4 mb-32">
        <h2 className='text-3xl font-bold text-white mb-4'>Built With Modern Tech</h2>
        <p className='text-gray-400'>
          A full-stack university project demonstrating a CRUD web app with clean architecture.
          The goal of the app is to manage appointments for a barbershop.
        </p>
        <p className='text-gray-400 mb-10'>
          Below are some programming languages, tech and tools used to build this app.
        </p>

        <motion.div className="flex flex-wrap justify-center gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
                visible: { transition: { staggerChildren: 0.05 } },
            }}
        >
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <motion.div
                  key={skill.name}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-colors cursor-default"
                  variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
              >   
                <Icon className={`text-xl ${skill.color}`} />
                <span className="text-gray-300 font-medium">{skill.name}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Footer Contact Area */}
      <div className="w-full max-w-2xl px-4 mb-10">
        <div className="bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 border border-white/10 p-10 rounded-3xl backdrop-blur-sm">
          <h2 className='text-2xl font-bold text-white mb-6'>Get in Touch</h2>
          <div className="flex justify-center items-center gap-8">
            <a href="https://www.linkedin.com/in/vasilis-tsomakas-dev/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/></svg>
            </a>
            <a href="https://github.com/VasilisTso" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/></svg>
            </a>
            <a href="mailto:vtsomakas@gmail.com" className="text-gray-400 hover:text-white hover:scale-110 transition-all">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home