"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import { Card, Button, Chip } from "@heroui/react";

import {
    FaMapMarkerAlt,
    FaUsers,
    FaStar,
} from "react-icons/fa";

import type { Venue } from "@/lib/api/venues/data";

interface VenueCardProps {
    venue: Venue;
}

const VenueCard = ({ venue }: VenueCardProps) => {
    return (
        <motion.div
            whileHover={{
                y: -8,
                scale: 1.02,
            }}
            transition={{ duration: 0.25 }}
        >
            <Card className="overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-white shadow-lg hover:shadow-2xl transition-all duration-300">

                {/* Image */}

                <div className="relative">

                    <Image
                        src={venue.image}
                        alt={venue.name}
                        width={500}
                        height={350}
                        className="w-full h-60 object-cover"
                    />

                    {/* Subtle gradient so the badge always reads clearly over any photo */}
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent" />

                    <Chip
                        size="sm"
                        className="absolute top-3 right-3 bg-[#D4AF37] text-[#0A2F1D] font-semibold"
                    >
                        {venue.category}
                    </Chip>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 shadow-sm">
                        <FaStar className="text-[#D4AF37]" size={13} />
                        <span className="text-sm font-bold text-[#12201B]">
                            {venue.avgRating?.toFixed(1) || "New"}
                        </span>
                    </div>

                </div>

                {/* Content */}

                <div className="p-5 space-y-3">

                    <div className="flex justify-between items-start gap-3">

                        <h2 className="text-xl font-bold text-[#0A2F1D] line-clamp-1">
                            {venue.name}
                        </h2>

                        <span className="text-lg font-bold text-[#D4AF37] whitespace-nowrap">
                            ৳{venue.pricePerEvent.toLocaleString()}
                        </span>

                    </div>

                    <div className="flex items-center gap-2 text-[#12201B]/60 text-sm">

                        <FaMapMarkerAlt className="text-[#D4AF37]" />

                        <span className="line-clamp-1">{venue.location}</span>

                    </div>

                    <div className="flex items-center justify-between pt-1">

                        <Chip
                            size="sm"
                            className="bg-[#F0F7F4] text-[#0A2F1D] font-medium border border-[#D4AF37]/20"
                        >
                            {venue.category}
                        </Chip>

                        <div className="flex items-center gap-1.5 text-sm text-[#12201B]/70">

                            <FaUsers className="text-[#D4AF37]" />

                            {venue.capacity} guests

                        </div>

                    </div>

                    <Link href={`/venues/${venue._id}`} className="block pt-1">

                        <Button
                            fullWidth
                            className="bg-[#0A2F1D] hover:bg-[#1E6B4F] text-white rounded-xl font-semibold transition-colors"
                        >
                            View Details
                        </Button>

                    </Link>

                </div>

            </Card>
        </motion.div>
    );
};

export default VenueCard;