import Link from "next/link";
import { Button } from "@heroui/react";
import { FaStar } from "react-icons/fa";

import VenueCard from "@/component/venues/VenueCard";
import type { VenueListResponse } from "@/lib/api/venues/data";

interface FeaturedVenuesProps {
    featured: VenueListResponse;
}

const FeaturedVenues = ({
    featured,
}: FeaturedVenuesProps) => {
    return (
        <section className="bg-[#F0F7F4] py-24">
            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-5 py-2 text-sm font-semibold text-[#D4AF37]">
                        <FaStar />
                        Featured Venues
                    </div>

                    <h2 className="mt-6 text-4xl font-bold text-[#0A2F1D] md:text-5xl">
                        Discover Our Finest Venues
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-[#12201B]/70">
                        Handpicked premium venues for weddings,
                        birthdays, corporate events, conferences,
                        concerts, and unforgettable celebrations.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {featured.venues.map((venue) => (
                        <VenueCard
                            key={venue._id}
                            venue={venue}
                        />
                    ))}
                </div>

                {/* Empty */}
                {featured.venues.length === 0 && (
                    <div className="mt-16 rounded-3xl border border-dashed border-[#D4AF37]/30 bg-white py-16 text-center">
                        <h3 className="text-2xl font-bold text-[#0A2F1D]">
                            No Featured Venues Found
                        </h3>

                        <p className="mt-3 text-[#12201B]/70">
                            Please check back later.
                        </p>
                    </div>
                )}

                {/* Button */}
                {featured.venues.length > 0 && (
                    <div className="mt-16 flex justify-center">
                        <Link href="/venues">
                            <Button
                                size="lg"
                                className="bg-[#0A2F1D] px-8 text-white hover:bg-[#1E6B4F]"
                            >
                                Browse All Venues
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedVenues;