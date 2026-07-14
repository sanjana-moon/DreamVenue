import { Metadata } from "next";
import ProfilePage from "./ProfilePage";

export const metadata: Metadata = {
    title: "My Profile | DreamVenue",
    description: "Manage your DreamVenue profile",
};

export default function Page() {
    return <ProfilePage />;
}