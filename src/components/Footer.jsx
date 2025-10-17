import React from 'react'
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
        <footer 
            className="text-center bg-gray-800 py-8 border-t border-gray-600 font-sans"
        >
            <motion.button whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="text-gray-400 hover:text-gray-200 cursor-pointer mb-4 rounded-lg px-2 py-1 transition shadow-sm shadow-gray-600"
            >
                Back to top ↑
            </motion.button>

            <motion.p initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="text-sm text-gray-400"
            >
                © {new Date().getFullYear()} Vasilis Tsomakas. 
            </motion.p>
        </footer>
    )
}

export default Footer