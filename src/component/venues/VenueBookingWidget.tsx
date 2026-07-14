"use client";

import { useEffect, useState } from "react";
import {
    Button,
    Input,
    Label,
    Modal,
    TextArea,
    TextField,
} from "@heroui/react";

import { FaCalendarAlt, FaLock } from "react-icons/fa";
import { useSession } from "@/lib/auth-client";
import { baseURL } from "@/lib/api/baseUrl";

interface VenueBookingWidgetProps {
    venueId: string;
    venueName: string;
    price: number;
}

interface BookedDatesResponse {
    bookedDates: string[];
}

export default function VenueBookingWidget({
    venueId,
    venueName,
    price,
}: VenueBookingWidgetProps) {
    const { data: session } = useSession();
    const user = session?.user;

    const [guests, setGuests] = useState(100);
    const [bookingDate, setBookingDate] = useState("");
    const [eventType, setEventType] = useState("");
    const [note, setNote] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [bookedDates, setBookedDates] = useState<string[]>([]);

    useEffect(() => {
        const loadBookedDates = async () => {
            try {
                const res = await fetch(
                    `${baseURL}/api/venues/${venueId}/booked-dates`
                );

                if (!res.ok) return;

                const data: BookedDatesResponse = await res.json();
                setBookedDates(data.bookedDates || []);
            } catch (error) {
                console.error(error);
            }
        };

        loadBookedDates();
    }, [venueId]);

    const dateIsTaken = bookingDate !== "" && bookedDates.includes(bookingDate);

    const handleBooking = async () => {
        if (!bookingDate) {
            return;
        }

        if (dateIsTaken) {
            return;
        }

        setSubmitting(true);

        try {
            const bookingData = {
                type: "venue_booking",
                venueId,
                venueName,
                bookingDate,
                eventType,
                guests,
                note,
                amount: Number(price),
            };

            const res = await fetch("/api/checkout_sessions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            if (res.status === 409) {
                const data = await res.json();
                setBookedDates((prev) => [...prev, bookingDate]);
                console.error(data?.message);
                return;
            }

            const data = await res.json();

            if (data?.url) {
                window.location.href = data.url;
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal>
            <Button className="w-full bg-[#0A2F1D] text-white hover:bg-[#1E6B4F] font-bold h-12 rounded-xl transition-colors">
                Book Now
            </Button>

            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[550px]">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Icon className="bg-[#D4AF37]/15 text-[#0A2F1D]">
                                <FaCalendarAlt className="size-5" />
                            </Modal.Icon>

                            <Modal.Heading className="text-2xl font-bold text-[#0A2F1D] text-center">
                                Reserve Venue
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="pb-6">

                            {!user ? (
                                <p className="text-center text-red-500 py-4">
                                    Please login to continue.
                                </p>
                            ) : user.role !== "customer" ? (
                                <p className="text-center text-red-500 py-4">
                                    Only customers can make bookings.
                                </p>
                            ) : (
                                <div className="space-y-5">

                                    <div className="flex justify-between">
                                        <span className="text-[#12201B]/60">
                                            Venue
                                        </span>

                                        <span className="font-semibold text-[#0A2F1D]">
                                            {venueName}
                                        </span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-[#12201B]/60">
                                            Starting Price
                                        </span>

                                        <span className="text-[#D4AF37] font-bold text-xl">
                                            ৳{price}
                                        </span>
                                    </div>

                                    <TextField>
                                        <Label className="text-[#12201B] font-medium">
                                            Event Date
                                        </Label>
                                        <Input
                                            type="date"
                                            value={bookingDate}
                                            onChange={(e) =>
                                                setBookingDate(e.target.value)
                                            }
                                            className="mt-2"
                                        />
                                    </TextField>

                                    {dateIsTaken && (
                                        <p className="text-sm text-red-500 -mt-3">
                                            This venue is already booked on the
                                            selected date. Please choose another
                                            date.
                                        </p>
                                    )}

                                    <TextField>
                                        <Label className="text-[#12201B] font-medium">
                                            Event Type
                                        </Label>
                                        <select
                                            value={eventType}
                                            onChange={(e) =>
                                                setEventType(e.target.value)
                                            }
                                            className="mt-2 w-full px-4 py-3 rounded-xl border border-[#D4AF37]/40 bg-white focus:ring-2 focus:ring-[#1E6B4F] outline-none text-[#12201B]"
                                        >
                                            <option value="">Select Event Type</option>
                                            <option value="Wedding">Wedding</option>
                                            <option value="Birthday">Birthday</option>
                                            <option value="Reception">Reception</option>
                                            <option value="Corporate">Corporate</option>
                                            <option value="Engagement">Engagement</option>
                                            <option value="Conference">Conference</option>
                                        </select>
                                    </TextField>

                                    <TextField>
                                        <Label className="text-[#12201B] font-medium">
                                            Expected Guests
                                        </Label>
                                        <Input
                                            type="number"
                                            min={1}
                                            value={String(guests)}
                                            onChange={(e) =>
                                                setGuests(
                                                    Math.max(
                                                        1,
                                                        Number(e.target.value)
                                                    )
                                                )
                                            }
                                            className="mt-2"
                                        />
                                    </TextField>

                                    <TextField>
                                        <Label className="text-[#12201B] font-medium">
                                            Special Requests
                                        </Label>
                                        <TextArea
                                            placeholder="Decoration, Catering, Photography, Sound System..."
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                            className="mt-2"
                                            rows={4}
                                        />
                                    </TextField>

                                    <Button
                                        isDisabled={!bookingDate || dateIsTaken || submitting}
                                        onPress={handleBooking}
                                        className="w-full bg-[#0A2F1D] text-white hover:bg-[#1E6B4F] font-bold rounded-xl transition-colors"
                                    >
                                        {submitting
                                            ? "Booking..."
                                            : dateIsTaken
                                                ? "Date Unavailable"
                                                : "Proceed to Payment"}
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 text-xs text-[#12201B]/50">
                                        <FaLock />

                                        <span>
                                            Secure booking powered by Stripe
                                        </span>
                                    </div>
                                </div>
                            )}

                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}