"use client";

import { Modal, Button } from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteVenue } from "@/lib/api/venues/actions";

interface Props {
    isDeleteOpen: boolean;
    setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
    deletedId: string | null;
    setDeletedId: React.Dispatch<React.SetStateAction<string | null>>;
    onDeleteSuccess?: (id: string) => void;
}

export default function DeleteVenueModal({
    isDeleteOpen,
    setIsDeleteOpen,
    deletedId,
    setDeletedId,
    onDeleteSuccess,
}: Props) {
    const handleDeleteVenue = async () => {
        if (!deletedId) return;
        try {
            const result = await deleteVenue(deletedId);
            if (result?.deletedCount > 0) {
                toast.success("Venue deleted successfully.");
                onDeleteSuccess?.(deletedId);
                setIsDeleteOpen(false);
                setDeletedId(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete venue.");
        }
    };

    return (
        <Modal isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="bg-white/80 backdrop-blur-md border border-[#0A2F1D]/10 rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-sm text-center">
                        <Modal.Header className="flex justify-center mb-4">
                            <div className="bg-red-100 p-4 rounded-full mx-auto">
                                <FaTrash className="text-red-600 text-xl" />
                            </div>
                        </Modal.Header>
                        <Modal.Body className="py-2">
                            <h2 className="text-xl font-bold text-[#0A2F1D] mb-2">
                                Delete Venue?
                            </h2>
                            <p className="text-sm text-[#12201B]/70 mb-6">
                                Are you sure you want to delete this venue? This action will permanently remove this venue and all its data.
                            </p>
                        </Modal.Body>
                        <Modal.Footer className="flex justify-end gap-3 pt-4">
                            <Button
                                className="flex-1 border border-[#0A2F1D]/20 text-[#0A2F1D] font-semibold rounded-2xl hover:bg-[#F0F7F4] transition-all"
                                onPress={() => {
                                    setDeletedId(null);
                                    setIsDeleteOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 transition-all"
                                onPress={handleDeleteVenue}
                            >
                                Delete Venue
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}