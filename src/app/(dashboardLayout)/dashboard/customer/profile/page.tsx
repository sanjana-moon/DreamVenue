// app/(dashboardLayout)/dashboard/customer/profile/page.tsx
import { Metadata } from "next";
import ProfilePage from "./ProfilePage";
import { fetchProfile } from "@/lib/api/venues/data";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/api/session";

export const metadata: Metadata = {
    title: "My Profile | DreamVenue",
    description: "Manage your DreamVenue profile",
};

export default async function Page() {
    // Check if user is authenticated
    const user = await getUser();
    
    if (!user) {
        redirect("/login");
    }

    // Fetch profile data on the server using your existing serverFetch
    let profile = null;
    let error = null;

    try {
        profile = await fetchProfile();
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load profile";
    }

    // Pass the data as props to the client component
    return <ProfilePage initialProfile={profile} error={error} />;
}