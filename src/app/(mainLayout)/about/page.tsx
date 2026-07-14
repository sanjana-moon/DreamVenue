"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Button } from "@heroui/react";
import {
    FaArrowRight,
    FaBuilding,
    FaUsers,
    FaCalendarCheck,
} from "react-icons/fa";

export default function AboutSection() {
    return (
        <section className="relative overflow-hidden bg-[#F8F6F2] py-24">

            {/* Decorative Background */}

            <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

            <div className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-[#0A2F1D]/10 blur-[140px]" />

            <div className="mx-auto max-w-7xl px-6">

                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Image */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -80,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.8,
                        }}
                        viewport={{
                            once: true,
                        }}
                        className="relative"
                    >

                        <div className="absolute -left-5 -top-5 h-full w-full rounded-[32px] border-2 border-[#D4AF37]" />

                        <Image
                            src="/about.jpg"
                            alt="DreamVenue"
                            width={700}
                            height={650}
                            className="relative rounded-[32px] object-cover shadow-2xl"
                        />

                    </motion.div>

                    {/* Content */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: 80,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.8,
                        }}
                        viewport={{
                            once: true,
                        }}
                    >

                        <p className="font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                            About DreamVenue
                        </p>

                        <h2 className="mt-4 text-5xl font-black leading-tight text-[#0A2F1D]">
                            Turning Every Celebration Into A Beautiful Memory
                        </h2>

                        <p className="mt-8 text-lg leading-9 text-[#12201B]/70">
                            DreamVenue helps you discover elegant wedding halls,
                            luxurious banquet spaces, corporate event venues,
                            birthday party locations, and more—all in one
                            place. Compare venues, explore detailed galleries,
                            read genuine reviews, and book your perfect venue
                            with confidence.
                        </p>

                        <p className="mt-6 text-lg leading-9 text-[#12201B]/70">
                            Whether you're planning an intimate gathering or a
                            grand celebration, DreamVenue connects you with
                            trusted venue owners to make your event planning
                            effortless.
                        </p>

                        <Button
                            radius="full"
                            endContent={<FaArrowRight />}
                            className="mt-10 bg-[#0A2F1D] px-8 py-7 text-white hover:bg-[#14452E]"
                        >
                            Explore Venues
                        </Button>

                    </motion.div>

                </div>

                {/* Statistics */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 60,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="mt-24 grid gap-8 md:grid-cols-3"
                >

                    <div className="rounded-3xl border border-[#D4AF37]/20 bg-white p-8 text-center shadow-lg">

                        <FaBuilding className="mx-auto mb-5 text-5xl text-[#D4AF37]" />

                        <h3 className="text-4xl font-black text-[#0A2F1D]">
                            250+
                        </h3>

                        <p className="mt-2 text-[#12201B]/70">
                            Premium Venues
                        </p>

                    </div>

                    <div className="rounded-3xl border border-[#D4AF37]/20 bg-white p-8 text-center shadow-lg">

                        <FaUsers className="mx-auto mb-5 text-5xl text-[#D4AF37]" />

                        <h3 className="text-4xl font-black text-[#0A2F1D]">
                            5K+
                        </h3>

                        <p className="mt-2 text-[#12201B]/70">
                            Happy Customers
                        </p>

                    </div>

                    <div className="rounded-3xl border border-[#D4AF37]/20 bg-white p-8 text-center shadow-lg">

                        <FaCalendarCheck className="mx-auto mb-5 text-5xl text-[#D4AF37]" />

                        <h3 className="text-4xl font-black text-[#0A2F1D]">
                            10K+
                        </h3>

                        <p className="mt-2 text-[#12201B]/70">
                            Successful Bookings
                        </p>

                    </div>

                </motion.div>

            </div>

        </section>
    );
}