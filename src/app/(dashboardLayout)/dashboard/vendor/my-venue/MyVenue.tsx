"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button } from "@heroui/react";
import { FaEdit, FaTrash, FaBuilding } from "react-icons/fa";

import {
    deleteVenue,
    ApprovalStatus,
} from "@/lib/api/venues/actions";
// import EditVenueModal from "@/component/venues/EditVenue";
import DeleteVenueModal from "@/component/venues/DeleteVenue";
import EditVenueModal from "@/component/venues/EditVenue";

interface Venue {
    _id: string;
    name: string;
    category: string;
    pricePerEvent: number;
    approvalStatus: ApprovalStatus;
    location?: string;
    capacity?: number;
    description?: string;
    image?: string;
}

interface ManageInventoryPageProps {
    venues: Venue[];
}

const ManageVenuePage = ({ venues: initialVenues }: ManageInventoryPageProps) => {
    const [venues, setVenues] = useState<Venue[]>(initialVenues || []);
    const router = useRouter();

    const [deletedId, setDeletedId] = useState<string | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingVenue, setEditingVenue] = useState<Venue | null>(null);

    const onDeleteSuccess = (id: string) => {
        setVenues((prev) => prev.filter((venue) => venue._id !== id));
    };

    return (
        <div className="min-h-screen bg-[#F0F7F4] p-4 md:p-8 text-[#12201B]">
            <div className="container mx-auto space-y-8 max-w-7xl">

                {/* DreamVenue Branding Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#0A2F1D]/10 pb-6 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A2F1D] tracking-tight flex items-center gap-3">
                            <FaBuilding className="text-[#D4AF37]" />
                            Manage Venue Inventory
                        </h1>
                        <p className="text-[#12201B]/70 mt-2 text-sm md:text-base">
                            Oversee your organized venues, adjust booking options, and control public listing visibilities.
                        </p>
                    </div>
                </div>

                {/* Inventory Table Container */}
                <Card className="bg-white/80 backdrop-blur-md border border-[#0A2F1D]/10 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-[#0A2F1D]/10 bg-[#0A2F1D] text-white flex justify-between items-center">
                        <h2 className="text-lg font-bold tracking-wide">Hosted Venues & Locations</h2>
                        <span className="text-xs bg-[#D4AF37] text-[#12201B] font-bold px-3 py-1 rounded-full shadow-sm">
                            Total: {venues.length}
                        </span>
                    </div>

                    {venues.length === 0 ? (
                        <div className="py-24 text-center">
                            <p className="text-[#12201B]/60 text-lg font-medium">No venues listed yet.</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table View */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-[#0A2F1D]/5 border-b border-[#0A2F1D]/10 text-[#0A2F1D] text-left">
                                            <th className="px-6 py-4 font-bold text-sm">Venue Name</th>
                                            <th className="px-6 py-4 font-bold text-sm">Category</th>
                                            <th className="px-6 py-4 font-bold text-sm">Price Per Event</th>
                                            <th className="px-6 py-4 font-bold text-sm">Verification</th>
                                            <th className="px-6 py-4 font-bold text-sm-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#0A2F1D]/5">
                                        {venues.map((venue) => (
                                            <tr key={venue._id} className="hover:bg-[#F0F7F4]/50 transition-colors duration-200">
                                                <td className="px-6 py-5 font-semibold text-[#0A2F1D]">{venue.name}</td>
                                                <td className="px-6 py-5 text-sm font-medium text-[#12201B]/80">{venue.category}</td>
                                                <td className="px-6 py-5 text-sm font-bold text-[#0A2F1D]">${venue.pricePerEvent.toLocaleString()}</td>
                                                <td className="px-6 py-5">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize shadow-sm ${venue.approvalStatus === "approved"
                                                        ? "bg-green-100 text-green-800 border border-green-200"
                                                        : venue.approvalStatus === "rejected"
                                                            ? "bg-red-100 text-red-800 border border-red-200"
                                                            : "bg-amber-100 text-amber-800 border border-amber-200"
                                                        }`}>
                                                        {venue.approvalStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex justify-center items-center gap-2.5">
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            type="button"
                                                            className="bg-[#0A2F1D] text-white hover:bg-[#1E6B4F] transition-all"
                                                            onPress={() => { setEditingVenue(venue); setIsModalOpen(true); }}
                                                            aria-label="Edit venue"
                                                        >
                                                            <FaEdit size={14} />
                                                        </Button>
                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            type="button"
                                                            className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all"
                                                            onPress={() => {
                                                                setDeletedId(venue._id);
                                                                setIsDeleteOpen(true);
                                                            }}
                                                            aria-label="Delete venue"
                                                        >
                                                            <FaTrash size={13} />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Grid Layout */}
                            <div className="lg:hidden p-4 space-y-4">
                                {venues.map((venue) => (
                                    <Card key={venue._id} className="bg-white border border-[#0A2F1D]/10 rounded-xl shadow-sm p-4 space-y-4">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="font-bold text-[#0A2F1D] text-base leading-tight">{venue.name}</h3>
                                            <span className="text-sm font-bold text-[#D4AF37] whitespace-nowrap">${venue.pricePerEvent.toLocaleString()}</span>
                                        </div>

                                        <div className="text-xs space-y-1 text-[#12201B]/80">
                                            <p><span className="font-semibold text-[#12201B]">Category:</span> {venue.category}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-2 pt-1 border-t border-[#0A2F1D]/5">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${venue.approvalStatus === "approved" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                                                }`}>
                                                {venue.approvalStatus}
                                            </span>
                                        </div>

                                        <div className="flex gap-2 pt-2 border-t border-[#0A2F1D]/5 justify-end">
                                            <Button
                                                size="sm"
                                                type="button"
                                                className="bg-[#0A2F1D] text-white hover:bg-[#1E6B4F] flex-1 font-semibold"
                                                onPress={() => { setEditingVenue(venue); setIsModalOpen(true); }}
                                            >
                                                <FaEdit className="mr-1" /> Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                type="button"
                                                className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 flex-1 font-semibold"
                                                onPress={() => {
                                                    setDeletedId(venue._id);
                                                    setIsDeleteOpen(true);
                                                }}
                                            >
                                                <FaTrash className="mr-1" /> Delete
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </>
                    )}
                </Card>
            </div>

            {/* Render Edit Modal Component */}
            <EditVenueModal
                key={editingVenue?._id || 'edit-modal'} // Add this key
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                editingVenue={editingVenue}
                setEditingVenue={setEditingVenue}
            />

            {/* Render Delete Modal Component */}
            <DeleteVenueModal
                isDeleteOpen={isDeleteOpen}
                setIsDeleteOpen={setIsDeleteOpen}
                deletedId={deletedId}
                setDeletedId={setDeletedId}
                onDeleteSuccess={onDeleteSuccess}
            />
        </div>
    );
};

export default ManageVenuePage;