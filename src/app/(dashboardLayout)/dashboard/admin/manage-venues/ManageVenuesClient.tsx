"use client";

import { useState } from "react";
import { Card, Button } from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import {
    deleteVenue,
    updateVenueApprovalStatus,
} from "@/lib/api/venues/actions";

interface Venue {
    _id: string;
    name: string;
    location: string;
    category: string;
    pricePerEvent: number;
    approvalStatus: "pending" | "approved" | "rejected";
}

interface ManageVenuesClientProps {
    venues: Venue[];
}

const ManageVenuesClient = ({
    venues: initialVenues,
}: ManageVenuesClientProps) => {
    const [venues, setVenues] = useState(initialVenues ?? []);

    const handleToggleApproval = async (venue: Venue) => {
        try {
            const newStatus =
                venue.approvalStatus === "approved"
                    ? "pending"
                    : "approved";

            await updateVenueApprovalStatus(
                { approvalStatus: newStatus },
                venue._id
            );

            setVenues((prev) =>
                prev.map((item) =>
                    item._id === venue._id
                        ? {
                            ...item,
                            approvalStatus: newStatus,
                        }
                        : item
                )
            );

            toast.success(`Approval changed to ${newStatus}.`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update approval status.");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteVenue(id);

            setVenues((prev) =>
                prev.filter((venue) => venue._id !== id)
            );

            toast.success("Venue deleted successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete venue.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 p-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-emerald-900">
                        Manage Venues
                    </h1>

                    <p className="text-slate-600 mt-2">
                        Review venue submissions, approve or reject listings, and remove unwanted venues.
                    </p>
                </div>

                {/* Table */}

                <Card className="rounded-3xl overflow-hidden shadow-xl border border-emerald-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white">

                                <tr>
                                    <th className="px-6 py-4 text-left">
                                        Venue
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Location
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Price
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        Approval
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {venues.map((venue) => (

                                    <tr
                                        key={venue._id}
                                        className="border-b border-slate-100 hover:bg-emerald-50 transition-colors duration-200"
                                    >

                                        <td className="px-6 py-5">
                                            <div>
                                                <h3 className="font-semibold text-emerald-900">
                                                    {venue.name}
                                                </h3>

                                                <div className="flex gap-2 mt-2">

                                                    <span
                                                        className={`text-[11px] px-2 py-1 rounded-full font-medium ${venue.approvalStatus ===
                                                            "approved"
                                                            ? "bg-green-100 text-green-700"
                                                            : venue.approvalStatus ===
                                                                "pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {venue.approvalStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-slate-700">
                                            {venue.location}
                                        </td>

                                        <td className="px-6 py-5">
                                            {venue.category}
                                        </td>

                                        <td className="px-6 py-5 font-bold text-emerald-700">
                                            ${venue.pricePerEvent.toLocaleString()}
                                        </td>

                                        {/* Approval */}

                                        <td className="px-6 py-5">

                                            <Button
                                                onPress={() =>
                                                    handleToggleApproval(venue)
                                                }
                                                className={`capitalize ${venue.approvalStatus ===
                                                    "approved"
                                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                                    : venue.approvalStatus ===
                                                        "pending"
                                                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                                        : "bg-red-100 text-red-700 hover:bg-red-200"
                                                    }`}
                                            >
                                                {venue.approvalStatus}
                                            </Button>

                                        </td>

                                        {/* Delete */}
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <Button
                                                    isIconOnly
                                                    onPress={() =>
                                                        handleDelete(
                                                            venue._id
                                                        )
                                                    }
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {venues.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="text-center py-12 text-slate-500"
                                        >
                                            No venues found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ManageVenuesClient;