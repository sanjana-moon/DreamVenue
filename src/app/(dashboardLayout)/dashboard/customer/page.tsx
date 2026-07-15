import { Metadata } from "next";
import { redirect } from "next/navigation";

import CustomerClient from "./CustomerClient";
import { roleValidator, getUser } from "@/lib/api/session";
import { fetchCustomerDashboard } from "@/lib/api/venues/data";

export const metadata: Metadata = {
    title: "Customer Dashboard | DreamVenue",
    description:
        "Manage your bookings, venues, and events from your DreamVenue customer dashboard.",
};

export default async function CustomerDashboardPage() {
    await roleValidator("customer");
    const user = await getUser();
    const dashboardData = await fetchCustomerDashboard(
        user!.email
    );

    return (
        <CustomerClient
            user={user!}
            dashboardData={dashboardData}
        />
    );
}