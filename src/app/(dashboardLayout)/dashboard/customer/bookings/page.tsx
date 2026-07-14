import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import BookingHistoryClient from "./BookingHistoryClient";
import { fetchCustomerBookings } from "@/lib/api/venues/data";

const BookingHistoryPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.email) {
        return <BookingHistoryClient bookings={[]} />;
    }

    const bookings = await fetchCustomerBookings(session.user.email);

    return (
        <BookingHistoryClient
            bookings={bookings}
        />
    );
};

export default BookingHistoryPage;