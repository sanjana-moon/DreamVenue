"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Button, Input, Card, TextArea, TextField } from "@heroui/react";
import { uploadImage } from "@/component/utils/uploadImage";
import { useSession } from "@/lib/auth-client";
import { addVenue } from "@/lib/api/venues/actions";

type VenueFormValues = {
    name: string;
    location: string;
    category: string;
    pricePerEvent: number;
    capacity: number;
    description: string;
    image: FileList;
};

const AddVenuePage = () => {
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<VenueFormValues>();

    const onSubmit: SubmitHandler<VenueFormValues> = async (data) => {
        try {
            setLoading(true);

            if (!session?.user) {
                toast.error("You must be logged in to add a venue.");
                return;
            }

            const imageFile = data.image?.[0];

            if (!imageFile) {
                toast.error("Venue image is required.");
                return;
            }

            const imageUrl = await uploadImage(imageFile);

            const venueData = {
                name: data.name,
                location: data.location,
                category: data.category,
                pricePerEvent: Number(data.pricePerEvent),
                capacity: Number(data.capacity),
                description: data.description,
                image: imageUrl,

                vendorId: session.user.id,
                vendorEmail: session.user.email,
                vendorName: session.user.name,

                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const result = await addVenue(venueData);

            if (result.insertedId) {
                toast.success("Venue submitted successfully");
                reset();
                router.push("/dashboard/vendor/my-venue");
            }
        } catch (error) {
            toast.error("Failed to submit venue");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-1 sm:p-6 md:p-8 w-full bg-[#F0F7F4]">
            <div className="container mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-6 sm:mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A2F1D]">
                        Add New Venue
                    </h1>
                    <p className="text-sm sm:text-base text-[#12201B]/70 mt-2">
                        List your venue and start receiving bookings on DreamVenue.
                    </p>
                </div>

                {/* Card */}
                <Card className="bg-white border border-[#D4AF37]/20 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8">

                    {/* Info Box */}
                    <div className="bg-[#F0F7F4] border border-[#D4AF37]/40 rounded-2xl p-4 mb-6 sm:mb-8 text-center">
                        <h3 className="font-semibold text-[#0A2F1D] text-sm sm:text-base">
                            Review Process
                        </h3>
                        <p className="text-xs sm:text-sm text-[#12201B]/70 mt-1">
                            Every submitted venue will be reviewed by administrators before appearing publicly.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">

                        {/* Image */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                Venue Photo
                            </label>

                            <Input
                                type="file"
                                accept="image/*"
                                className="w-full sm:w-2/3 md:w-1/2"
                                {...register("image", {
                                    required: "Venue photo is required",
                                })}
                            />

                            {errors.image && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.image.message}
                                </p>
                            )}
                        </div>

                        {/* Name + Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

                            <TextField>
                                <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                    Venue Name
                                </label>
                                <Input
                                    placeholder="Enter the venue name"
                                    className="w-full"
                                    {...register("name", {
                                        required: "Venue name is required",
                                    })}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </TextField>

                            <TextField>
                                <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                    Location
                                </label>
                                <Input
                                    placeholder="Enter the venue location"
                                    className="w-full"
                                    {...register("location", {
                                        required: "Location is required",
                                    })}
                                />
                                {errors.location && (
                                    <p className="text-red-500 text-sm">{errors.location.message}</p>
                                )}
                            </TextField>

                        </div>

                        {/* Price + Capacity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

                            <div className="flex flex-col gap-2">
                                <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                    Price Per Event
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Enter the price"
                                    className="w-full"
                                    {...register("pricePerEvent", {
                                        required: "Price is required",
                                        min: {
                                            value: 0,
                                            message: "Price cannot be negative",
                                        },
                                    })}
                                />
                                {errors.pricePerEvent && (
                                    <p className="text-red-500 text-sm">
                                        {errors.pricePerEvent.message}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                    Guest Capacity
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Enter maximum guests"
                                    className="w-full"
                                    {...register("capacity", {
                                        required: "Capacity is required",
                                        min: {
                                            value: 1,
                                            message: "Capacity must be at least 1",
                                        },
                                    })}
                                />
                                {errors.capacity && (
                                    <p className="text-red-500 text-sm">
                                        {errors.capacity.message}
                                    </p>
                                )}
                            </div>

                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                Category
                            </label>

                            <select
                                {...register("category", {
                                    required: "Category is required",
                                })}
                                className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/40 bg-white focus:ring-2 focus:ring-[#1E6B4F] outline-none text-sm sm:text-base text-[#12201B]"
                            >
                                <option value="">Select Category</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Conference">Conference</option>
                                <option value="Concert">Concert</option>
                                <option value="Banquet Hall">Banquet Hall</option>
                                <option value="Outdoor">Outdoor</option>
                                <option value="Rooftop">Rooftop</option>
                                <option value="Community Hall">Community Hall</option>
                                <option value="Other">Other</option>
                            </select>

                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block mb-2 font-semibold text-[#0A2F1D] text-sm sm:text-base">
                                Description
                            </label>
                            <TextArea
                                placeholder="Write a short overview about the venue..."
                                className="w-full"
                                rows={6}
                                {...register("description", {
                                    required: "Description is required",
                                })}
                            />
                        </div>

                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full bg-[#0A2F1D] text-white font-semibold py-5 sm:py-6 md:py-7 rounded-2xl hover:bg-[#1E6B4F] transition-all text-sm sm:text-base"
                        >
                            {loading ? "Submitting..." : "Submit Venue For Approval"}
                        </Button>

                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AddVenuePage;