"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
    FaShieldAlt,
    FaCalendarCheck,
    FaCreditCard,
    FaStar,
    FaHeadset,
    FaMapMarkerAlt,
    FaUsers,
    FaGlassCheers,
    FaMusic,
    FaUtensils,
    FaCamera,
    FaGem,
    FaHeart,
} from "react-icons/fa";

const fadeInUp = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

export default function WhyChooseUs() {
    const features = [
        {
            icon: FaShieldAlt,
            title: "Secure & Trusted",
            description:
                "Protected bookings and safe payments for a worry-free experience.",
        },
        {
            icon: FaCalendarCheck,
            title: "Easy Booking",
            description:
                "Find and reserve your perfect venue with a simple process.",
        },
        {
            icon: FaCreditCard,
            title: "Flexible Payments",
            description:
                "Enjoy secure and convenient payment options.",
        },
        {
            icon: FaStar,
            title: "Premium Venues",
            description:
                "Discover verified venues selected for unforgettable moments.",
        },
        {
            icon: FaHeadset,
            title: "Dedicated Support",
            description:
                "Our team is always ready to assist you anytime.",
        },
        {
            icon: FaMapMarkerAlt,
            title: "Perfect Locations",
            description:
                "Explore beautiful venues in locations that match your event.",
        },
    ];

    const stats = [
        {
            number: "500+",
            label: "Verified Venues",
            icon: FaMapMarkerAlt,
        },
        {
            number: "10K+",
            label: "Happy Guests",
            icon: FaUsers,
        },
        {
            number: "98%",
            label: "Satisfaction",
            icon: FaStar,
        },
        {
            number: "24/7",
            label: "Support",
            icon: FaHeadset,
        },
    ];

    const occasions = [
        { icon: FaGlassCheers, label: "Weddings" },
        { icon: FaMusic, label: "Concerts" },
        { icon: FaUtensils, label: "Banquets" },
        { icon: FaCamera, label: "Photoshoots" },
        { icon: FaGem, label: "Corporate" },
        { icon: FaHeart, label: "Birthdays" },
    ];

    return (
        <div className="min-h-screen bg-[#F0F7F4] overflow-hidden">

            {/* Hero Section */}
            <section className="relative bg-[#0A2F1D] text-white py-16 md:py-20 px-5 overflow-hidden">

                <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1E6B4F]/30 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 max-w-3xl mx-auto text-center"
                >
                    <span className="inline-flex px-5 py-2 rounded-full bg-[#D4AF37] text-[#0A2F1D] text-xs font-semibold tracking-[0.25em] mb-6">
                        WHY CHOOSE US
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                        Creating{" "}
                        <span className="text-[#D4AF37]">
                            Unforgettable
                        </span>
                        <br />
                        Events Made Simple
                    </h1>

                    <p className="text-sm md:text-base text-white/75 max-w-xl mx-auto leading-relaxed">
                        From elegant weddings to corporate celebrations,
                        DreamVenue helps you discover and book the perfect
                        space for every special moment.
                    </p>

                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                        <Link
                            href="/venues"
                            className="px-7 py-3 bg-[#D4AF37] text-[#0A2F1D] rounded-lg font-semibold text-sm hover:scale-105 transition"
                        >
                            Explore Venues
                        </Link>

                        <Link
                            href="/contact"
                            className="px-7 py-3 border border-white/30 rounded-lg font-semibold text-sm hover:bg-white/10 transition"
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>

            </section>
                        {/* Stats Section */}
            <section className="py-12 md:py-16 px-5">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-5"
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;

                            return (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="bg-white rounded-xl p-5 text-center border border-[#D4AF37]/10 hover:shadow-lg transition"
                                >
                                    <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                                        <Icon className="text-xl text-[#D4AF37]" />
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#0A2F1D]">
                                        {stat.number}
                                    </h3>

                                    <p className="text-sm text-[#12201B]/60 mt-1">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>


            {/* Why Choose DreamVenue */}
            <section className="py-16 md:py-20 px-5">
                <div className="max-w-6xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-4xl font-bold text-[#0A2F1D]">
                            Why Choose DreamVenue?
                        </h2>

                        <p className="mt-3 text-sm md:text-base text-[#12201B]/70 max-w-xl mx-auto">
                            Everything you need to create memorable events,
                            from finding the venue to completing your booking.
                        </p>

                        <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-5 rounded-full" />
                    </motion.div>


                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {features.map((feature, index) => {
                            const Icon = feature.icon;

                            return (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="group bg-white rounded-xl p-6 border border-[#D4AF37]/10 hover:shadow-xl hover:-translate-y-1 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37] transition">
                                        <Icon className="text-xl text-[#0A2F1D] group-hover:text-white transition" />
                                    </div>

                                    <h3 className="text-lg font-semibold text-[#0A2F1D] mb-2">
                                        {feature.title}
                                    </h3>

                                    <p className="text-sm text-[#12201B]/70 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                </div>
            </section>
                        {/* Occasions Section */}
            <section className="py-16 md:py-20 px-5 bg-white">
                <div className="max-w-6xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-2xl md:text-4xl font-bold text-[#0A2F1D]">
                            Perfect For Every Occasion
                        </h2>
                        <p className="mt-3 text-sm md:text-base text-[#12201B]/70 max-w-xl mx-auto">
                            Whether it is a wedding, celebration, or corporate
                            event, find the perfect space for your moment.
                        </p>
                        <div className="w-16 h-1 bg-[#D4AF37] mx-auto mt-5 rounded-full" />
                    </motion.div>
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                    >
                        {occasions.map((occasion, index) => {
                            const Icon = occasion.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="bg-[#F0F7F4] rounded-xl p-5 text-center border border-transparent hover:border-[#D4AF37]/30 hover:shadow-md transition cursor-pointer"
                                >
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white flex items-center justify-center">
                                        <Icon className="text-xl text-[#0A2F1D]" />
                                    </div>

                                    <p className="text-sm font-medium text-[#0A2F1D]">
                                        {occasion.label}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-16 md:py-20 px-5 bg-[#F0F7F4]/80 overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1E6B4F]/30 rounded-full blur-3xl" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-[#0A2F1D]">
                        Create Your Perfect
                        <span className="text-[#D4AF37]">
                            {" "}Event
                        </span>
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-[#1E6B4F] max-w-xl mx-auto">
                        Explore beautiful venues and start planning an
                        unforgettable experience with DreamVenue.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/venues"
                            className="px-7 py-3 bg-[#D4AF37] text-[#0A2F1D] rounded-lg font-semibold text-sm hover:bg-[#D4AF37]/80 hover:scale-105 transition"
                        >
                            Browse Venues
                        </Link>
                        <Link
                            href="/contact"
                            className="px-7 py-3 border bg-[#0A2F1D] border-white/30 text-white rounded-lg font-semibold text-sm hover:bg-[#0A2F1D]/80 hover:scale-105 transition"
                        >
                            Get Started
                        </Link>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}