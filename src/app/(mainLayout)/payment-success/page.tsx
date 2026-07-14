import Link from "next/link";

import {
    Button,
    Card,
    CardFooter,
    CardHeader,
} from "@heroui/react";

import {
    FaArrowRight,
    FaCheckCircle,
    FaCalendarAlt,
    FaUsers,
    FaMapMarkerAlt,
} from "react-icons/fa";

import { stripe } from "@/lib/stripe";
import { baseURL } from "@/lib/api/baseUrl";

export default async function PaymentSuccess({
    searchParams,
}: {
    searchParams: Promise<{
        session_id: string;
    }>;
}) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error("Please provide a valid session_id");
    }

    const session =
        await stripe.checkout.sessions.retrieve(
            session_id,
            {
                expand: [
                    "line_items",
                    "payment_intent",
                ],
            }
        );

    const paymentData = {
        venueId: session?.metadata?.venueId,
        venueName: session?.metadata?.venueName,
        eventDate: session?.metadata?.eventDate,
        guestCount: Number(
            session?.metadata?.guestCount
        ),
        email: session?.metadata?.email,
        amount: Number(
            session?.metadata?.totalAmount
        ),
        paymentType:
            session?.metadata?.paymentType,
        transactionId:
            session?.payment_intent?.id,
        paymentStatus:
            session?.payment_status,
    };

    await fetch(
        `${baseURL}/api/venues/bookings`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify(paymentData),
        }
    );

    return (
        <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-6 py-16">

            <Card className="w-full max-w-2xl rounded-3xl shadow-2xl border border-[#D4AF37]/20 overflow-hidden">

                {/* Success Header */}

                <CardHeader className="flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-[#0A2F1D] to-[#174A31] py-12">

                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                        <FaCheckCircle
                            size={58}
                            className="text-green-600"
                        />
                    </div>

                    <div className="text-center">

                        <h1 className="text-4xl font-black text-white">
                            Booking Confirmed
                        </h1>

                        <p className="text-white/80 mt-2">
                            Thank you for booking with
                            DreamVenue.
                        </p>

                    </div>

                </CardHeader>

                <div className="p-8">
                    {/* Booking Details */}

                    <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#FCFBF8] p-8">

                        <h2 className="text-2xl font-bold text-[#0A2F1D] mb-8">
                            Booking Details
                        </h2>

                        <div className="space-y-6">

                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">

                                <div className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-[#D4AF37]" />
                                    <span className="text-[#12201B]/60">
                                        Venue
                                    </span>
                                </div>

                                <span className="font-semibold text-[#0A2F1D]">
                                    {session?.metadata?.venueName}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">

                                <div className="flex items-center gap-3">
                                    <FaCalendarAlt className="text-[#D4AF37]" />
                                    <span className="text-[#12201B]/60">
                                        Event Date
                                    </span>
                                </div>

                                <span className="font-semibold text-[#0A2F1D]">
                                    {session?.metadata?.eventDate}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">

                                <div className="flex items-center gap-3">
                                    <FaUsers className="text-[#D4AF37]" />
                                    <span className="text-[#12201B]/60">
                                        Guests
                                    </span>
                                </div>

                                <span className="font-semibold text-[#0A2F1D]">
                                    {session?.metadata?.guestCount}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">

                                <span className="text-[#12201B]/60">
                                    Customer Email
                                </span>

                                <span className="font-semibold text-[#0A2F1D]">
                                    {session?.customer_email}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">

                                <span className="text-[#12201B]/60">
                                    Transaction ID
                                </span>

                                <span className="max-w-[220px] truncate font-semibold text-blue-700">
                                    {session?.payment_intent?.id}
                                </span>

                            </div>

                            <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">

                                <span className="text-[#12201B]/60">
                                    Payment Status
                                </span>

                                <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold capitalize text-green-700">
                                    {session?.payment_status}
                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-lg font-semibold text-[#12201B]">
                                    Total Paid
                                </span>

                                <span className="text-3xl font-black text-[#D4AF37]">
                                    ৳{session?.metadata?.totalAmount}
                                </span>

                            </div>

                        </div>

                    </div>
                    {/* Footer */}

                    <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">

                        <Link
                            href="/dashboard/customer/my-bookings"
                            className="w-full sm:w-auto"
                        >
                            <Button
                                className="w-full bg-[#0A2F1D] hover:bg-[#174A31] text-white font-semibold rounded-xl"
                                endContent={<FaArrowRight />}
                            >
                                View My Bookings
                            </Button>
                        </Link>

                        <Link
                            href="/venues"
                            className="w-full sm:w-auto"
                        >
                            <Button
                                variant="bordered"
                                className="w-full border-[#D4AF37] text-[#0A2F1D] hover:bg-[#F8F6F2] rounded-xl"
                            >
                                Browse More Venues
                            </Button>
                        </Link>

                    </CardFooter>

                </div>

            </Card>

        </div>
    );
}