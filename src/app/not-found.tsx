// app/not-found.tsx (Themed Version)
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarPlus, FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F0F7F4] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Venue Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-[#0A2F1D] rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-6xl">🏛️</span>
            </div>
            <motion.div
              className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#0A2F1D] text-sm font-bold px-3 py-1 rounded-full"
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              404
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-4xl font-bold text-[#0A2F1D] mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[#12201B]/70 text-lg mb-8"
        >
          Looks like this Page is already booked or doesn't exist. 
          Let's find you the perfect space instead!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A2F1D] text-white rounded-xl hover:bg-[#1E6B4F] transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <FaHome />
            Home
          </Link>
          <Link
            href="/venues"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#12201B] rounded-xl hover:bg-[#C5A234] transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <FaSearch />
            Explore Venues
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#0A2F1D] text-[#0A2F1D] rounded-xl hover:bg-[#0A2F1D] hover:text-white transition-all duration-300"
          >
            <FaCalendarPlus />
            Need Help?
          </Link>
        </motion.div>
      </div>
    </div>
  );
}