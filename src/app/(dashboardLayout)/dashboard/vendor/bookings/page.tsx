import { Metadata } from "next";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { fetchVendorBookings } from "@/lib/api/venues/data";
import VendorBookingsClient from "./VendorBookingsClient";

export const metadata: Metadata = {
    title: "Venue Bookings | DreamVenue",
    description:
        "Manage customer bookings and event requests for your venues.",
};

export default async function VendorBookingsPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const email = session?.user?.email;

    if (!email) {
        return (
            <div className="p-10 text-center text-[#0A2F1D]">
                Unauthorized access
            </div>
        );
    }

    const bookings = await fetchVendorBookings(email);

    return (
        <VendorBookingsClient
            bookings={bookings || []}
        />
    );
}