import { Metadata } from "next";
import { fetchProfile } from "@/lib/api/venues/data";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/api/session";
import ProfilePage from "./ProfilePage";

export const metadata: Metadata = {
    title: "My Profile | DreamVenue",
    description: "Manage your DreamVenue profile",
};

export default async function Page() {
    const user = await getUser();
    
    if (!user) {
        redirect("/login");
    }

    let profile = null;
    let error = null;

    try {
        profile = await fetchProfile();
    } catch (err) {
        error = err instanceof Error ? err.message : "Failed to load profile";
    }

    return <ProfilePage initialProfile={profile} error={error} />;
}