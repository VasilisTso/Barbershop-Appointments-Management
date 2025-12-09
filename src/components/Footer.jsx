import React from 'react'
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { FaArrowUp } from "react-icons/fa";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
        <footer className="mt-auto w-full border-t border-white/5 bg-black/20 backdrop-blur-md py-8">
            <div className="container mx-auto px-4 flex flex-col items-center">
                <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToTop}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 px-4 py-2 rounded-full border border-white/5 transition-all text-sm font-medium"
                >
                    Back to top <FaArrowUp className="text-xs" />
                </motion.button>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="text-center"
                >
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Vasilis Tsomakas. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                        University Project • Barbershop Management System
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer