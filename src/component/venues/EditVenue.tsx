"use client";

import { updateVenue, ApprovalStatus } from "@/lib/api/venues/actions";
import { uploadImage } from "@/component/utils/uploadImage";
import { Button, Input, Card, TextArea } from "@heroui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Image from "next/image";

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

interface EditVenueModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    editingVenue: Venue | null;
    setEditingVenue: (venue: Venue | null) => void;
}

interface FormInputs {
    name: string;
    location: string;
    capacity: number;
    pricePerEvent: number;
    category: string;
    description: string;
    image?: FileList;
}

const CATEGORIES = [
    "Wedding",
    "Corporate",
    "Birthday",
    "Conference",
    "Concert",
    "Banquet Hall",
    "Outdoor",
    "Rooftop",
    "Community Hall",
    "Other",
];

const EditVenueModal = ({
    isModalOpen,
    setIsModalOpen,
    editingVenue,
    setEditingVenue,
}: EditVenueModalProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormInputs>();

    useEffect(() => {
        if (editingVenue) {
            reset({
                name: editingVenue.name,
                location: editingVenue.location || "",
                capacity: editingVenue.capacity || 0,
                pricePerEvent: editingVenue.pricePerEvent,
                category: editingVenue.category,
                description: editingVenue.description || "",
            });
        }
    }, [editingVenue, reset]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (!editingVenue) {
            toast.error("No venue selected");
            return;
        }

        try {
            setLoading(true);

            const updateData: Record<string, any> = { ...data };
            delete updateData.image;

            if (data.image?.[0]) {
                updateData.image = await uploadImage(data.image[0]);
            }

            const result = await updateVenue(updateData, editingVenue._id);

            if (result.modifiedCount) {
                setIsModalOpen(false);
                toast.success("Venue updated successfully");

                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setEditingVenue(null);
            setLoading(false);
        }
    };

    if (!isModalOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/70 backdrop-blur-md border border-[#0A2F1D]/10 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8">

                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#0A2F1D]">
                        Edit Venue
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 mt-2">
                        Update the venue listing details below.
                    </p>
                </div>

                {/* Card */}
                <Card className="p-4 sm:p-6 md:p-8 border border-[#0A2F1D]/5 bg-white">

                    {/* Info Box */}
                    {(() => {
                        const imageUrl = editingVenue?.image;
                        if (!imageUrl) return null;

                        return (
                            <div className="bg-[#F0F7F4] border border-[#0A2F1D]/10 rounded-2xl p-4 mb-6 text-center">
                                <Image
                                    src={imageUrl}
                                    alt={editingVenue.name}
                                    width={200}
                                    height={200}
                                    className="h-auto max-h-40 object-cover rounded-xl mx-auto shadow-sm"
                                />
                            </div>
                        );
                    })()}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">

                        {/* Cover Image */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                Venue Banner Image
                            </label>
                            <Input
                                type="file"
                                accept="image/*"
                                className="w-full sm:w-2/3 md:w-1/2"
                                {...register("image")}
                            />
                            <p className="text-xs text-slate-400 mt-1">Leave empty to keep current photo</p>
                        </div>

                        {/* Title + Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                                <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                    Venue Name
                                </label>
                                <Input
                                    defaultValue={editingVenue?.name}
                                    placeholder="Enter the Venue Name"
                                    className="w-full"
                                    {...register("name", { required: "Venue name is required" })}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                    Location
                                </label>
                                <Input
                                    defaultValue={editingVenue?.location}
                                    placeholder="e.g. Gulshan, Dhaka"
                                    className="w-full"
                                    {...register("location", { required: "Location is required" })}
                                />
                                {errors.location && (
                                    <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Price + Capacity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                            <div>
                                <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                    Price Per Event ($)
                                </label>
                                <Input
                                    defaultValue={editingVenue?.pricePerEvent?.toString()}
                                    type="number"
                                    placeholder="Enter the booking fee"
                                    className="w-full"
                                    {...register("pricePerEvent", {
                                        valueAsNumber: true,
                                        required: "Price per event is required",
                                        min: { value: 0, message: "Price cannot be negative" },
                                    })}
                                />
                                {errors.pricePerEvent && (
                                    <p className="text-red-500 text-sm mt-1">{errors.pricePerEvent.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                    Guest Capacity
                                </label>
                                <Input
                                    defaultValue={editingVenue?.capacity?.toString()}
                                    type="number"
                                    placeholder="Max guests allowed"
                                    className="w-full"
                                    {...register("capacity", {
                                        valueAsNumber: true,
                                        required: "Capacity limit is required",
                                        min: { value: 1, message: "Capacity must be at least 1" },
                                    })}
                                />
                                {errors.capacity && (
                                    <p className="text-red-500 text-sm mt-1">{errors.capacity.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Category Selection */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                Category
                            </label>
                            <select
                                defaultValue={editingVenue?.category}
                                {...register("category", { required: "Category is required" })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#0A2F1D] outline-none text-sm sm:text-base"
                            >
                                <option value="">Select Category</option>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                Description
                            </label>
                            <TextArea
                                defaultValue={editingVenue?.description}
                                placeholder="Describe the layout, special features, or booking terms..."
                                className="w-full"
                                rows={6}
                                {...register("description", { required: "Description is required" })}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Control Buttons */}
                        <div className="flex gap-3">
                            <Button
                                type="button"
                                onPress={() => setIsModalOpen(false)}
                                className="flex-1 border border-[#0A2F1D]/20 text-[#0A2F1D] font-semibold py-5 sm:py-6 rounded-2xl hover:bg-[#F0F7F4] transition-all text-sm sm:text-base"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-[#0A2F1D] text-white font-semibold py-5 sm:py-6 rounded-2xl hover:bg-[#1E6B4F] transition-all text-sm sm:text-base"
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