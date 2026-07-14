import { Metadata } from "next";
import { fetchUsers } from "@/lib/api/venues/data";
import ManageUsersClient from "./ManageUsersClient";

export const metadata: Metadata = {
    title: "Manage Users | DreamVenue",
    description: "Manage all registered users in DreamVenue.",
};

export default async function ManageUsersPage() {
    const users = await fetchUsers();

    return <ManageUsersClient users={users} />;
}