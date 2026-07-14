"use client";

import Link from "next/link";

import {
    FaHeart,
    FaBuilding,
    FaBirthdayCake,
    FaRing,
    FaTree,
    FaMicrophone,
} from "react-icons/fa";

const categories = [
    {
        title: "Wedding Venues",
        value: "Wedding",
        description: "Elegant spaces for your perfect wedding day.",
        icon: FaHeart,
    },
    {
        title: "Corporate Events",
        value: "Corporate",
        description: "Professional venues for meetings and events.",
        icon: FaBuilding,
    },
    {
        title: "Birthday Parties",
        value: "Birthday",
        description: "Celebrate unforgettable birthday moments.",
        icon: FaBirthdayCake,
    },
    {
        title: "Engagements",
        value: "Engagement",
        description: "Beautiful places for your special beginning.",
        icon: FaRing,
    },
    {
        title: "Outdoor Events",
        value: "Outdoor",
        description: "Natural settings for memorable gatherings.",
        icon: FaTree,
    },
    {
        title: "Conference Halls",
        value: "Conference",
        description: "Modern halls for professional occasions.",
        icon: FaMicrophone,
    },
];

const VenueCategories = () => {

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">

                {/* HEADER */}
                <div className="mb-12 text-center">
                    <p className="
                    text-sm uppercase tracking-[0.3em]
                    font-semibold text-[#D4AF37]
                    ">
                        Explore Categories
                    </p>
                    <h2 className="
                    mt-3 text-3xl md:text-5xl
                    font-bold text-[#0A2F1D]
                    ">
                        Find The Perfect Venue
                    </h2>
                    <p className="
                    mx-auto mt-4 max-w-2xl
                    text-gray-600
                    ">
                        Choose from our curated venue categories
                        designed for every celebration and occasion.
                    </p>
                </div>

                {/* CATEGORY CARDS */}
                <div className="
                grid gap-6
                sm:grid-cols-2
                lg:grid-cols-3
                ">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.value}
                                href={`/venues?category=${category.value}`}
                                className="
                                group
                                rounded-3xl
                                border border-[#D4AF37]/20
                                bg-[#F0F7F4]
                                p-8
                                transition-all
                                duration-500
                                hover:-translate-y-2
                                hover:bg-[#0A2F1D]
                                hover:shadow-xl
                                "
                            >
                                <div className="
                                flex items-center justify-between
                                ">
                                    <div className="
                                    flex h-16 w-16
                                    items-center justify-center
                                    rounded-2xl
                                    bg-[#D4AF37]
                                    text-[#0A2F1D]
                                    text-2xl
                                    transition
                                    group-hover:scale-110
                                    ">

                                        <Icon />

                                    </div>
                                    <span className="
                                    text-[#D4AF37]
                                    text-3xl
                                    opacity-0
                                    transition
                                    group-hover:opacity-100
                                    ">
                                        →
                                    </span>
                                </div>
                                <h3 className="
                                mt-6 text-2xl
                                font-bold
                                text-[#0A2F1D]
                                group-hover:text-white
                                ">
                                    {category.title}
                                </h3>
                                <p className="
                                mt-3 text-gray-600
                                group-hover:text-gray-200
                                ">
                                    {category.description}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default VenueCategories;