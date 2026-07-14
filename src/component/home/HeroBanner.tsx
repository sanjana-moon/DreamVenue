"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import hero1 from "@/component/assets/images/hero-1.jpg";
import hero2 from "@/component/assets/images/hero-2.webp";
import hero3 from "@/component/assets/images/hero-3.webp";

const images = [hero1, hero2, hero3];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-[#F0F7F4]">
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img.src})` }}
            />
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-[#0A2F1D]/50" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[#D4AF37]">Dream</span>Venue
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover the perfect space for your wedding, birthday, concert, or banquet — curated just for you.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="/venues"
              className="inline-block px-10 py-4 bg-[#D4AF37] hover:bg-[#C5A234] text-[#12201B] font-semibold text-lg rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Explore Venues
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24" />
    </section>
  );
}