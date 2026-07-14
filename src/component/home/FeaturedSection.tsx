import { fetchFeaturedVenues } from "@/lib/api/venues/data";
import Link from "next/link";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const FeaturedVenues = async () => {
    const data = await fetchFeaturedVenues();
    const venues = data?.venues || [];
    if (!venues.length) return null;

    return (
        <section className="bg-[#F0F7F4] py-20">
            <div className="mx-auto max-w-7xl px-6">

                {/* HEADER */}
                <div className="mb-12 text-center">
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                        Featured Venues
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0A2F1D]">
                        Discover Beautiful Places
                        <br />
                        For Your Special Moments
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-gray-600">
                        Handpicked venues designed to make weddings,
                        celebrations, and unforgettable events extraordinary.
                    </p>
                </div>

                {/* CARDS */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {venues.map((venue) => (
                        <div
                            key={venue._id}
                            className="
                            group overflow-hidden rounded-3xl 
                            bg-white shadow-lg
                            transition-all duration-500
                            hover:-translate-y-2
                            hover:shadow-2xl
                            "
                        >
                            {/* IMAGE */}

                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={venue.image}
                                    alt={venue.name}
                                    className="
                                    h-full w-full object-cover
                                    transition duration-700
                                    group-hover:scale-110
                                    "
                                />
                                <div
                                    className="
                                    absolute inset-0
                                    bg-gradient-to-t
                                    from-[#0A2F1D]/80
                                    via-transparent
                                    "
                                />
                                <div
                                    className="
                                    absolute bottom-4 left-4
                                    rounded-full
                                    bg-[#D4AF37]
                                    px-4 py-1
                                    text-sm font-semibold
                                    text-[#0A2F1D]
                                    "
                                >
                                    {venue.category}
                                </div>
                            </div>
                            {/* CONTENT */}

                            <div className="p-6">
                                <h3 className="
                                text-xl font-bold
                                text-[#0A2F1D]
                                ">
                                    {venue.name}
                                </h3>
                                <div className="
                                mt-3 flex items-center gap-2
                                text-sm text-gray-600
                                ">
                                    <FaMapMarkerAlt className="text-[#D4AF37]" />

                                    {venue.location}
                                </div>
                                <div className="
                                mt-4 flex items-center justify-between
                                ">
                                    <div className="
                                    flex items-center gap-2
                                    "
                                    >
                                        <FaStar className="text-[#D4AF37]" />
                                        <span className="font-semibold">
                                            {venue.avgRating || 0}
                                        </span>

                                        <span className="text-gray-500">
                                            ({venue.reviewCount})
                                        </span>

                                    </div>
                                    <p className="
                                    font-bold text-[#1E6B4F]
                                    ">
                                        ৳{venue.pricePerEvent}
                                    </p>
                                </div>

                                <Link
                                    href={`/venues/${venue._id}`}
                                    className="
                                    mt-6 block rounded-xl
                                    bg-[#0A2F1D]
                                    py-3 text-center
                                    font-semibold text-white
                                    transition
                                    hover:bg-[#1E6B4F]
                                    "
                                >
                                    View Details
                                </Link>
                            </div>
                       </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedVenues;