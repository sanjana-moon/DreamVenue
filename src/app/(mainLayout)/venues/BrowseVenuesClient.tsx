"use client";

import { useState, useEffect } from "react";
import {
    useRouter,
    usePathname,
    useSearchParams,
} from "next/navigation";

import { motion } from "motion/react";

import { FaSearch } from "react-icons/fa";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import VenueCard from "@/component/venues/VenueCard";

interface BrowseVenuesClientProps {
    initialVenues: any[];
    totalVenues: number;
    totalPages: number;
    currentPage: number;
    currentSearch: string;
    currentCategory: string;
    currentSort: string;
    currentMinPrice: string;
    currentMaxPrice: string;
}

const BrowseVenuesClient = ({
    initialVenues,
    totalVenues,
    totalPages,
    currentPage,
    currentSearch,
    currentCategory,
    currentSort,
    currentMinPrice,
    currentMaxPrice,
}: BrowseVenuesClientProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(currentSearch);
    const [minPrice, setMinPrice] = useState(currentMinPrice);
    const [maxPrice, setMaxPrice] = useState(currentMaxPrice);

    useEffect(() => {
        setSearch(currentSearch);
    }, [currentSearch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            updateQueryParams("search", search);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    const updateQueryParams = (
        key: string,
        value: string | number
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (
            value &&
            value !== "all" &&
            value !== ""
        ) {
            params.set(key, String(value));
        } else {
            params.delete(key);
        }

        if (key !== "page") {
            params.set("page", "1");
        }

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };
    const categories = [
        "all",
        "Wedding",
        "Corporate",
        "Birthday",
        "Conference",
        "Concert",
        "Banquet Hall",
        "Outdoor",
        "Rooftop",
        "Community Hall",
        "Other",
    ];
    return (
        <div className="min-h-screen bg-[#F8F5EF]">

            <div className="container mx-auto px-4 py-10">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-5xl font-bold text-[#2D1B69]">
                        Browse Venues
                    </h1>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Discover beautiful venues for weddings, corporate events,
                        birthday parties, conferences and more.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-3xl shadow-lg border border-[#D4AF37]/20 p-6 mb-8"
                >

                    <div className="grid lg:grid-cols-5 gap-4">
                        <div className="flex items-center gap-3 border rounded-xl px-4">
                            <FaSearch className="text-[#D4AF37]" />
                            <input
                                type="text"
                                value={search}
                                placeholder="Search venue..."
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full py-3 outline-none"
                            />
                        </div>

                        <select
                            value={currentCategory}
                            onChange={(e) =>
                                updateQueryParams(
                                    "category",
                                    e.target.value
                                )
                            }
                            className="border rounded-xl px-4 py-3"
                        >
                            {categories.map(category => (

                                <option
                                    key={category}
                                    value={category}
                                >

                                    {category}

                                </option>

                            ))}

                        </select>
                        <select
                            value={currentSort}
                            onChange={(e) =>
                                updateQueryParams(
                                    "sort",
                                    e.target.value
                                )
                            }
                            className="border rounded-xl px-4 py-3"
                        >
                            <option value="name">
                                Name A-Z
                            </option>

                            <option value="price-low">
                                Price Low-High
                            </option>

                            <option value="price-high">
                                Price High-Low
                            </option>

                            <option value="rating">
                                Highest Rated
                            </option>

                            <option value="newest">
                                Newest
                            </option>

                        </select>

                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => {
                                setMinPrice(e.target.value);
                                updateQueryParams(
                                    "minPrice",
                                    e.target.value
                                );
                            }}
                            className="border rounded-xl px-4 py-3"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => {
                                setMaxPrice(e.target.value);
                                updateQueryParams(
                                    "maxPrice",
                                    e.target.value
                                );
                            }}
                            className="border rounded-xl px-4 py-3"
                        />
                    </div>
                </motion.div>
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing
                        <span className="font-bold text-[#2D1B69]">
                            {" "}
                            {totalVenues}{" "}
                        </span>
                        venues
                    </p>
                </div>
                {totalVenues === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-3xl font-bold text-[#2D1B69]">
                            No venues found
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Try changing your search or filters.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {initialVenues.map((venue) => (
                                <VenueCard
                                    key={venue._id}
                                    venue={venue}
                                />
                            ))}
                        </div>
                        <div className="flex justify-center gap-2 mt-10">
                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    updateQueryParams(
                                        "page",
                                        currentPage - 1
                                    )
                                }
                                className="px-4 py-2 rounded-lg bg-[#2D1B69] text-white disabled:bg-gray-300"
                            >
                                <BiLeftArrow />
                            </button>
                            {Array.from(
                                { length: totalPages },
                                (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() =>
                                            updateQueryParams(
                                                "page",
                                                i + 1
                                            )
                                        }
                                        className={`w-10 h-10 rounded-lg ${currentPage === i + 1
                                                ? "bg-[#D4AF37] text-white"
                                                : "bg-gray-200"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                )
                            )}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    updateQueryParams(
                                        "page",
                                        currentPage + 1
                                    )
                                }
                                className="px-4 py-2 rounded-lg bg-[#2D1B69] text-white disabled:bg-gray-300"
                            >
                                <BiRightArrow />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );

};

export default BrowseVenuesClient;