"use client";

import { updateVenue } from "@/lib/api/venues/actions";
import { uploadImage } from "@/component/utils/uploadImage";
import { Button, Input, Card, TextArea } from "@heroui/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Image from "next/image";

const CATEGORIES = [
    "Wedding",
    "Conference",
    "Birthday",
    "Corporate",
    "Concert",
    "Banquet",
    "Outdoor",
    "Party",
];

const EditVenueModal = ({
    isModalOpen,
    setIsModalOpen,
    editingVenue,
    setEditingVenue,
}: any) => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    // Reset form when editingVenue changes
    useEffect(() => {
        if (editingVenue && isModalOpen) {
            console.log('=== EDIT VENUE MODAL ===');
            console.log('Editing Venue:', editingVenue);
            console.log('Venue ID:', editingVenue._id);
            console.log('Vendor Email:', editingVenue.vendorEmail);
            
            reset({
                name: editingVenue.name || "",
                location: editingVenue.location || "",
                category: editingVenue.category || "",
                pricePerEvent: editingVenue.pricePerEvent || "",
                capacity: editingVenue.capacity || "",
                description: editingVenue.description || "",
            });
        }
    }, [editingVenue, isModalOpen, reset]);

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            
            console.log('=== SUBMITTING EDIT ===');
            console.log('Venue ID:', editingVenue._id);
            console.log('Form Data:', data);

            const updateData = {
                ...data,
                pricePerEvent: Number(data.pricePerEvent),
                capacity: Number(data.capacity),
            };

            if (data?.image?.[0]) {
                updateData.image = await uploadImage(data.image[0]);
            } else {
                updateData.image = editingVenue.image;
            }

            console.log('Update Data:', updateData);

            const result = await updateVenue(updateData, editingVenue._id);
            console.log('Result:', result);

            if (result.modifiedCount > 0) {
                toast.success("Venue updated successfully");
                setIsModalOpen(false);
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                toast.warning("No changes were made");
                setLoading(false);
            }
        } catch (error: any) {
            console.error('Update error:', error);
            toast.error(error?.message || "Something went wrong");
            setLoading(false);
        } finally {
            setEditingVenue(null);
        }
    };

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/80 backdrop-blur-md border border-[#D4AF37]/20 rounded-3xl shadow-xl p-5 md:p-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-[#0A2F1D]">Edit Venue</h1>
                    <p className="text-sm text-[#12201B]/70 mt-2">Update your venue details below.</p>
                </div>

                <Card className="p-5 md:p-7">
                    <div className="bg-[#F0F7F4] border border-[#D4AF37]/20 rounded-2xl p-4 mb-6">
                        {editingVenue?.image && (
                            <Image
                                src={editingVenue.image}
                                alt={editingVenue.name}
                                width={250}
                                height={180}
                                className="rounded-xl object-cover mx-auto"
                            />
                        )}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Image */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#0A2F1D]">Venue Image</label>
                            <Input
                                type="file"
                                accept="image/*"
                                {...register("image")}
                            />
                            <p className="text-xs text-gray-400 mt-1">Leave empty to keep current image</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-2 font-semibold text-[#0A2F1D]">Venue Name</label>
                                <Input
                                    {...register("name", { required: "Venue name is required" })}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">
                                        {errors.name.message as string}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-[#0A2F1D]">Location</label>
                                <Input
                                    {...register("location", { required: "Location is required" })}
                                />
                                {errors.location && (
                                    <p className="text-red-500 text-sm">
                                        {errors.location.message as string}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div>
                                <label className="block mb-2 font-semibold text-[#0A2F1D]">Price Per Event</label>
                                <Input
                                    type="number"
                                    {...register("pricePerEvent", {
                                        required: "Price is required",
                                        valueAsNumber: true
                                    })}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-[#0A2F1D]">Capacity</label>
                                <Input
                                    type="number"
                                    {...register("capacity", {
                                        required: "Capacity is required",
                                        valueAsNumber: true
                                    })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-[#0A2F1D]">Category</label>
                            <select
                                {...register("category", { required: "Category required" })}
                                className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none"
                            >
                                <option value="">Select Category</option>
                                {CATEGORIES.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-[#0A2F1D]">Description</label>
                            <TextArea
                                className="w-full"
                                rows={5}
                                {...register("description", { required: "Description required" })}
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button
                                type="button"
                                onPress={() => {
                                    setIsModalOpen(false);
                                    setEditingVenue(null);
                                }}
                                className="flex-1 border-[#D4AF37] text-[#0A2F1D]"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="flex-1 bg-[#0A2F1D] text-white"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default EditVenueModal;