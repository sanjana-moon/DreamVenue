"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import {
    FaCalendarAlt,
    FaUsers,
    FaMoneyBillWave,
    FaCheck,
} from "react-icons/fa";
import { updateAdminBookingStatus } from "@/lib/api/venues/actions";
import { Booking } from "@/lib/api/venues/data";

interface Props {
    bookings: Booking[];
}
export default function VendorBookingsClient({
    bookings: initialBookings,
}: Props) {
    const [bookings, setBookings] = useState(initialBookings);
    const [filter, setFilter] = useState("all");
    const filteredBookings =
        filter === "all"
            ? bookings
            : bookings.filter(
                (booking) =>
                    booking.status === filter
            );
    const handleStatusChange = async (
        id: string,
        status: Booking["status"]
    ) => {

        try {
            await updateAdminBookingStatus(
                id,
                status
            );
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === id
                        ? {
                            ...booking,
                            status,
                        }
                        : booking
                )
            );
            toast.success(
                "Booking status updated"
            );

        } catch (error) {
            toast.error(
                "Failed to update booking"
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F7F4] p-5 md:p-8">
            {/* Header */}
            <div className="mb-8">

                <h1 className="text-3xl font-bold text-[#0A2F1D]">
                    Venue Bookings
                </h1>
                <p className="mt-2 text-sm text-[#12201B]/70">
                    Manage customer booking requests for your venues.
                </p>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-6 flex-wrap">
                {
                    [
                        "all",
                        "Pending",
                        "Confirmed",
                        "Completed",
                        "Cancelled",
                    ].map((item) => (
                        <button
                            key={item}
                            onClick={() => setFilter(item)}
                            className={`
                            px-4 py-2 rounded-lg text-sm font-medium transition
                            ${filter === item
                                    ?
                                    "bg-[#0A2F1D] text-white"
                                    :
                                    "bg-white text-[#0A2F1D]"
                                }
                            `}
                        >
                            {item}
                        </button>
                    ))
                }
            </div>

            {/* Booking Cards */}
            <div className="space-y-5">
                {filteredBookings.length === 0 ? (

                    <div className="
                        bg-white 
                        rounded-xl 
                        p-10 
                        text-center
                        text-[#12201B]/60
                        ">
                        No bookings found.
                    </div>

                ) : (
                    filteredBookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="
                                bg-white
                                rounded-2xl
                                p-6
                                border
                                border-[#D4AF37]/10
                                shadow-sm
                                "
                        >
                            <div className="
                                flex
                                flex-col
                                md:flex-row
                                md:items-center
                                md:justify-between
                                gap-5
                                ">
                                <div>
                                    <h2 className="
                                        text-xl
                                        font-semibold
                                        text-[#0A2F1D]
                                        ">
                                        {booking.venueName}
                                    </h2>
                                    <div className="mt-3 space-y-2 text-sm text-[#12201B]/70
                                        ">
                                        <p className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-[#D4AF37]" />
                                            {booking.bookingDate}
                                        </p>


                                        <p className="flex items-center gap-2">
                                            <FaUsers className="text-[#D4AF37]" />
                                            {booking.guestCount} Guests
                                        </p>


                                        <p className="flex items-center gap-2">
                                            <FaMoneyBillWave className="text-[#D4AF37]" />
                                            ৳{booking.totalPrice}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span
                                        className="
                                            px-4
                                            py-2
                                            rounded-full
                                            text-sm
                                            text-center
                                            bg-[#F0F7F4]
                                            text-[#0A2F1D]
                                            "
                                    >
                                        {booking.status}
                                    </span>
                                    <select
                                        value={booking.status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                booking._id,
                                                e.target.value as Booking["status"]
                                            )
                                        }
                                        className="
                                            border
                                            rounded-lg
                                            px-3
                                            py-2
                                            text-sm
                                            "
                                    >
                                        <option>
                                            Pending
                                        </option>

                                        <option>
                                            Confirmed
                                        </option>

                                        <option>
                                            Completed
                                        </option>

                                        <option>
                                            Cancelled
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))
                )
                }
            </div>
        </div>
    );
}