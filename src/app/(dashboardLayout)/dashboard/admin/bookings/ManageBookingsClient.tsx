"use client";

import { useState } from "react";
import { Card } from "@heroui/react";
import { toast } from "react-toastify";

import {
    Booking,
} from "@/lib/api/venues/data";

import {
    BookingStatus,
    updateAdminBookingStatus,
} from "@/lib/api/venues/actions";

interface ManageBookingsClientProps {
    bookings: Booking[];
}

export default function ManageBookingsClient({
    bookings: initialBookings,
}: ManageBookingsClientProps) {
    const [bookings, setBookings] =
        useState<Booking[]>(initialBookings);

    const handleStatusChange = async (
        booking: Booking,
        status: BookingStatus
    ) => {
        try {
            await updateAdminBookingStatus(
                booking._id,
                status
            );

            setBookings((prev) =>
                prev.map((b) =>
                    b._id === booking._id
                        ? { ...b, status }
                        : b
                )
            );

            toast.success("Booking status updated.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update booking.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F7F4] p-6">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-[#0A2F1D]">
                    Manage Bookings
                </h1>

                <p className="text-gray-600 mt-2 mb-8">
                    View and manage all venue bookings.
                </p>

                <Card className="rounded-3xl overflow-hidden shadow-md">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#E7F2EC]">
                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Venue
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Customer
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Booking Date
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Total Price
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Payment
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {bookings.map((booking) => (
                                    <tr
                                        key={booking._id}
                                        className="border-t hover:bg-[#F7FBF8]"
                                    >

                                        <td className="px-6 py-5 font-medium">
                                            {booking.venueName}
                                        </td>

                                        <td className="px-6 py-5">
                                            {booking.customerEmail}
                                        </td>

                                        <td className="px-6 py-5">
                                            {booking.bookingDate}
                                        </td>

                                        <td className="px-6 py-5">
                                            ৳{booking.totalPrice}
                                        </td>

                                        <td className="px-6 py-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    booking.paymentStatus ===
                                                    "paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {booking.paymentStatus}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">

                                            <select
                                                className="border rounded-lg px-3 py-2 outline-none focus:border-[#1E6B4F]"
                                                value={booking.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        booking,
                                                        e.target
                                                            .value as BookingStatus
                                                    )
                                                }
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>

                                                <option value="Confirmed">
                                                    Confirmed
                                                </option>

                                                <option value="Completed">
                                                    Completed
                                                </option>

                                                <option value="Cancelled">
                                                    Cancelled
                                                </option>

                                            </select>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}