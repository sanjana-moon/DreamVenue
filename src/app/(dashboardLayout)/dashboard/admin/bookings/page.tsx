import { Metadata } from "next";
import ManageBookingsClient from "./ManageBookingsClient";
import { fetchBookings } from "@/lib/api/venues/data";

export const metadata: Metadata = {
    title: "Manage Bookings | DreamVenue",
    description: "Manage all venue bookings.",
};

export default async function ManageBookingsPage() {
    const bookings = await fetchBookings();

    return (
        <ManageBookingsClient
            bookings={bookings}
        />
    );
}