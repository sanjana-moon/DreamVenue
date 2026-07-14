"use client";

import { Card } from "@heroui/react";

interface BookingHistoryClientProps {
    bookings: any[];
}

const BookingHistoryClient = ({
    bookings,
}: BookingHistoryClientProps) => {
    return (
        <div className="min-h-screen bg-[#F0F7F4] p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#12201B]">
                        Booking History
                    </h1>

                    <p className="mt-2 text-[#5A6B63]">
                        View all your venue bookings and their current status.
                    </p>
                </div>

                {/* Table */}

                <Card className="overflow-hidden rounded-3xl border border-[#E3ECE7] shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#F7FBF9]">
                                <tr className="border-b border-[#E3ECE7]">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#12201B]">
                                        Venue
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#12201B]">
                                        Amount
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#12201B]">
                                        Booking Date
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#12201B]">
                                        Guest
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#12201B]">
                                        Status
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="py-16 text-center text-[#70817A]"
                                        >
                                            No booking history found.
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((booking) => (
                                        <tr
                                            key={booking._id}
                                            className="border-b border-[#EDF3EF] transition-colors hover:bg-[#F7FBF9]"
                                        >
                                            <td className="px-6 py-5 font-semibold text-[#12201B]">
                                                {booking.venueName}
                                            </td>

                                            <td className="px-6 py-5 text-[#4D5D56]">
                                                ${booking.totalPrice}
                                            </td>

                                            <td className="px-6 py-5 text-[#4D5D56]">
                                                {new Date(
                                                    booking.bookingDate
                                                ).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-5 text-[#4D5D56]">
                                                {booking.guestCount}
                                            </td>

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold
                                                    ${booking.status ===
                                                            "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : booking.status ===
                                                                "Confirmed"
                                                                ? "bg-emerald-100 text-emerald-700"
                                                                : booking.status ===
                                                                    "Completed"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : booking.status ===
                                                                        "Cancelled"
                                                                        ? "bg-red-100 text-red-700"
                                                                        : "bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    {booking.status}
                                                </span>

                                            </td>

                                        </tr>
                                    ))
                                )}

                            </tbody>

                        </table>

                    </div>

                </Card>

            </div>
        </div>
    );
};

export default BookingHistoryClient;