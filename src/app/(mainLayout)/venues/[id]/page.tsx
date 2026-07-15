import Link from "next/link";
import Image from "next/image";

import {
    Button,
    Card,
    Chip,
} from "@heroui/react";

import {
    FaMapMarkerAlt,
    FaStar,
    FaRegEnvelope,
    FaPhoneAlt,
    FaBed,
    FaBath,
    FaRulerCombined,
    FaWifi,
} from "react-icons/fa";

import VenueBookingWidget from "@/component/venues/VenueBookingWidget";
import VenueReviewSection from "@/component/venues/VenueReviewSection";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { baseURL } from "@/lib/api/baseUrl";
import {
    canReviewVenue,
    fetchVenueReviews,
} from "@/lib/api/venues/data";
import type { Venue } from "@/lib/api/venues/data";

const fetchVenue = async (id: string): Promise<Venue> => {
    const res = await fetch(`${baseURL}/api/single-venue/${id}`, {
        cache: "no-store",
    });

    return res.json() as Promise<Venue>;
};

export default async function VenueDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const venue = await fetchVenue(id);
    const reviews = await fetchVenueReviews(id);

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const permission = session
        ? await canReviewVenue(id, session.user.email)
        : { canReview: false };

    // Placeholder images for the right-side layout thumbnail list
    const images = [venue.image, venue.image, venue.image, venue.image];

    return (
        <div className="min-h-screen bg-white text-[#12201B]">
            {/* ================= SECTION TABS NAVIGATION ================= */}
            <div className="max-w-7xl mx-auto px-5 pt-6 flex gap-3 overflow-x-auto border-b border-gray-100 pb-4">
                <Button className="bg-[#174A31] text-white font-medium px-8 rounded-xl">Details</Button>
                <Button className="text-gray-600 font-medium px-6 rounded-xl">Features</Button>
                <Button className="text-gray-600 font-medium px-6 rounded-xl">Dining Options</Button>
                <Button className="text-gray-600 font-medium px-6 rounded-xl">Location</Button>
            </div>

            {/* ================= MAIN CONTENT SPLIT ================= */}
            <div className="max-w-7xl mx-auto px-5 py-8 grid lg:grid-cols-3 gap-10">

                {/* LEFT COLUMN: Gallery & Main Information */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Image Grid Gallery */}
                    <div className="grid grid-cols-4 gap-4 h-75 md:h-112">
                        <div className="col-span-3 relative rounded-2xl overflow-hidden h-full">
                            <Image
                                src={venue.image}
                                alt={venue.name}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        <div className="col-span-1 flex flex-col gap-3 h-full">
                            {images.map((img, index) => (
                                <div key={index} className="relative flex-1 rounded-xl overflow-hidden min-h-15">
                                    <Image
                                        src={img}
                                        alt={`Preview ${index + 1}`}
                                        fill
                                        className="object-cover cursor-pointer hover:opacity-80 transition"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Metadata Sub-bar */}
                    <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span className="font-medium text-gray-700">{venue.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <span>Rating</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                                <FaStar className="text-amber-400" />
                                <span className="font-bold">({reviews.length})</span>
                            </div>
                        </div>
                    </div>

                    {/* Header Title & Description */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#0A2F1D] mb-4">
                            {venue.name}
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-base">
                            {venue.description}
                        </p>
                        <button className="mt-3 text-sm font-semibold text-[#174A31] underline hover:text-[#0A2F1D]">
                            Read More
                        </button>
                    </div>

                    {/* Features Grid Panel */}
                    <div>
                        <h2 className="text-xl font-bold text-[#0A2F1D] mb-4">Features</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50/50">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                <FaBed className="text-gray-400 text-lg" />
                                <span>Max {venue.capacity} Guests</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                <FaBath className="text-gray-400 text-lg" />
                                <span>Premium Setup</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                <FaRulerCombined className="text-gray-400 text-lg" />
                                <span>{venue.category}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                <FaWifi className="text-gray-400 text-lg" />
                                <span>Free Wi-Fi</span>
                            </div>
                        </div>
                    </div>

                    {/* REVIEWS SECTION */}
                    <div className="pt-4">
                        <VenueReviewSection
                            reviews={reviews}
                            canReview={permission.canReview}
                            venue={venue}
                            user={session?.user}
                        />
                    </div>

                </div>

                {/* RIGHT COLUMN: Contact & Action Sticky Sidebars */}
                <div className="space-y-6">
                    <div className="sticky top-6 space-y-6">

                        {/* Contact Card */}
                        <Card className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                            <h3 className="text-base font-bold text-[#0A2F1D] mb-4">Contact Us</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-gray-400">Email</span>
                                    <span className="font-medium text-gray-700">info@venuehub.com</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-gray-400">Number</span>
                                    <span className="font-medium text-gray-700">+880 1234 56789</span>
                                </div>
                            </div>
                        </Card>

                        {/* Booking & Rate Box Card */}
                        <Card className="border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-md">
                            {/* Inner Header Label */}
                            <div className="p-6 border-b border-gray-50 pb-4">
                                <h3 className="text-base font-bold text-[#0A2F1D]">Booking Options</h3>
                            </div>

                            {/* Dynamic Native Booking Component Injection */}
                            <div className="p-6 bg-white space-y-4">
                                <div className="flex items-baseline justify-between mb-2">
                                    <span className="text-sm text-gray-500">Pricing Per Event</span>
                                    <span className="text-2xl font-black text-[#174A31]">${venue.pricePerEvent}</span>
                                </div>

                                <VenueBookingWidget
                                    venueId={venue._id}
                                    venueName={venue.name}
                                    price={venue.pricePerEvent}
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}