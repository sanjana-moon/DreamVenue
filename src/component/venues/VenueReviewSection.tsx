"use client";

import { useState } from "react";
import { Card, Button, Modal, TextArea } from "@heroui/react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";

import { addReview } from "@/lib/api/venues/actions";
import type { Review, Venue } from "@/lib/api/venues/data";

interface SessionUser {
    email: string;
    name: string;
}

interface VenueReviewSectionProps {
    reviews: Review[];
    canReview: boolean;
    venue: Venue;
    user?: SessionUser | null;
}

interface AddReviewResult {
    insertedId?: string;
    message?: string;
}

export default function VenueReviewSection({
    reviews,
    canReview,
    venue,
    user,
}: VenueReviewSectionProps) {
    const [reviewList, setReviewList] = useState<Review[]>(reviews || []);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!user) {
            toast.error("Please login first.");
            return;
        }

        if (!comment.trim()) {
            toast.error("Please write your review.");
            return;
        }

        setLoading(true);

        try {
            const reviewData = {
                venueId: venue._id,
                venueName: venue.name,
                userEmail: user.email,
                userName: user.name,
                rating,
                comment,
            };

            const result = (await addReview(reviewData)) as AddReviewResult;

            if (!result.insertedId) {
                toast.error(result.message || "Failed to submit review.");
                return;
            }

            setReviewList((prev) => [
                {
                    ...reviewData,
                    _id: result.insertedId as string,
                    createdAt: new Date().toISOString(),
                },
                ...prev,
            ]);

            toast.success("Review submitted successfully.");
            setComment("");
            setRating(5);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Failed to submit review.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-[#0A2F1D]">
                        Guest Reviews
                    </h2>
                    <p className="text-[#12201B]/60 mt-1">
                        {reviewList.length} Review
                        {reviewList.length !== 1 && "s"}
                    </p>
                </div>
            </div>

            <div className="space-y-5">
                {reviewList.length === 0 && (
                    <Card className="p-10 text-center bg-white border border-[#D4AF37]/20 rounded-2xl">
                        <h3 className="text-xl font-semibold text-[#0A2F1D]">
                            No reviews yet
                        </h3>

                        <p className="text-[#12201B]/60 mt-2">
                            Be the first guest to review this venue.
                        </p>
                    </Card>
                )}

                {reviewList.map((review) => (
                    <Card
                        key={review._id || review.createdAt}
                        className="p-6 bg-white border border-[#D4AF37]/20 rounded-2xl"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg text-[#0A2F1D]">
                                    {review.userName}
                                </h3>

                                <div className="flex gap-1 mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={
                                                i < review.rating
                                                    ? "text-[#D4AF37]"
                                                    : "text-[#12201B]/15"
                                            }
                                        />
                                    ))}
                                </div>

                                <p className="text-[#12201B]/70 mt-4">
                                    {review.comment}
                                </p>

                                <p className="text-xs text-[#12201B]/40 mt-4">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal>
                <Button
                    className={`mt-6 bg-[#0A2F1D] text-white hover:bg-[#1E6B4F] rounded-xl font-semibold ${!canReview ? "hidden" : ""
                        }`}
                >
                    Write Review
                </Button>

                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-137">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <Modal.Icon className="bg-[#D4AF37]/15 text-[#0A2F1D]">
                                    <BiEdit className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading className="text-xl font-bold text-[#0A2F1D] text-center">
                                    Share Your Review
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body>
                                <div className="space-y-6">
                                    <div>
                                        <p className="font-semibold mb-3 text-[#12201B]">
                                            Rating
                                        </p>

                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setRating(star)}
                                                >
                                                    <FaStar
                                                        size={28}
                                                        className={
                                                            star <= rating
                                                                ? "text-[#D4AF37]"
                                                                : "text-[#12201B]/15"
                                                        }
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <TextArea
                                        className="w-full"
                                        placeholder="Tell other guests what you think about this venue..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                </div>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    className="bg-[#F0F7F4] text-[#0A2F1D] hover:bg-[#D4AF37]/15 rounded-xl font-semibold"
                                    slot="close"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    className="bg-[#0A2F1D] text-white hover:bg-[#1E6B4F] rounded-xl font-semibold"
                                    onPress={async () => {
                                        await handleSubmit();
                                    }}
                                    slot="close"
                                >
                                    Submit Review
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </section>
    );
}