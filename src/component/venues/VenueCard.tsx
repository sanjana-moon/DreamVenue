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

interface VenueCardProps {
    venue: {
        _id: string;
        image: string;
        name: string;
        location: string;
        category: string;
        capacity: number;
        pricePerEvent: number;
        avgRating: number;
        publishStatus: "published" | "unpublished";
    };
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

                    <Chip
                        size="sm"
                        color={
                            venue.publishStatus === "published"
                                ? "success"
                                : "danger"
                        }
                        className="absolute top-3 right-3"
                    >
                        {venue.publishStatus === "published"
                            ? "Available"
                            : "Unavailable"}
                    </Chip>

                </div>

                {/* Content */}

                <div className="p-5 space-y-3">

                    <div className="flex justify-between items-start gap-3">

                        <h2 className="text-xl font-bold text-[#2D1B69] line-clamp-1">
                            {venue.name}
                        </h2>

                        <span className="text-lg font-bold text-[#D4AF37] whitespace-nowrap">
                            ৳{venue.pricePerEvent.toLocaleString()}
                        </span>

                    </div>

                    <div className="flex items-center gap-2 text-gray-500 text-sm">

                        <FaMapMarkerAlt className="text-[#D4AF37]" />

                        <span>{venue.location}</span>

                    </div>

                    <div className="flex items-center justify-between">

                        <Chip
                        >
                            {venue.category}
                        </Chip>

                        <div className="flex items-center gap-1 text-sm text-gray-600">

                            <FaUsers className="text-[#D4AF37]" />

                            {venue.capacity}

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <FaStar className="text-yellow-500" />

                        <span className="font-semibold">
                            {venue.avgRating?.toFixed(1) || "0.0"}
                        </span>

                    </div>

                    <Link href={`/venues/${venue._id}`}>

                        <Button
                            fullWidth
                            className="bg-[#2D1B69] hover:bg-[#241654] text-white rounded-xl font-semibold"
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