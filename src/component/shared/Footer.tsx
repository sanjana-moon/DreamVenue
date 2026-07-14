"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";
import logo from "@/component/assets/images/Logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2F1D] text-white/90">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-[#F0F7F4]/80 p-2 rounded-lg backdrop-blur-sm border border-white/10">
                <Image 
                  src={logo} 
                  alt="DreamVenue Logo" 
                  width={150} 
                  height={150}
                  className="h-20 w-full"
                />
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Your premier destination for booking the perfect venue for weddings, 
              birthdays, concerts, and corporate events. We make event planning 
              seamless and memorable.
            </p>
            
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/venues" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  Find Venues
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D4AF37]">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-[#D4AF37] mt-1 flex-shrink-0" size={18} />
                <span className="text-sm text-white/70">
                  123 Venue Street,<br />
                  Event City, EC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-[#D4AF37] flex-shrink-0" size={18} />
                <a href="tel:+1234567890" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-[#D4AF37] flex-shrink-0" size={18} />
                <a href="mailto:info@dreamvenue.com" className="text-sm text-white/70 hover:text-[#D4AF37] transition-colors duration-300">
                  info@dreamvenue.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaClock className="text-[#D4AF37] flex-shrink-0" size={18} />
                <span className="text-sm text-white/70">
                  Mon-Sat: 9:00 AM - 8:00 PM
                </span>
              </li>
            </ul>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-[#D4AF37] transition-colors duration-300"
                aria-label="YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/50">
              &copy; {currentYear} <span className="text-[#D4AF37]">Dream</span>Venue. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors duration-300">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors duration-300">
                Terms
              </Link>
              <Link href="/cookies" className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors duration-300">
                Cookies
              </Link>
              <Link href="/sitemap" className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors duration-300">
                Sitemap
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}