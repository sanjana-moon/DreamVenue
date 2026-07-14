"use server";

import { revalidatePath } from "next/cache";
import { deleteMutation, serverMutation } from "../server";

// ============================
// TYPES
// ============================

export interface VenueInput {
    name: string;
    location: string;
    category: string;
    pricePerEvent: number;
    capacity: number;
    description: string;
    image: string;
    vendorId: string;
    vendorEmail: string;
    vendorName: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReviewInput {
    venueId: string;
    venueName: string;
    userEmail: string;
    userName: string;
    rating: number;
    comment: string;
}

export type ApprovalStatus = "pending" | "approved" | "rejected";
export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";
export type UserRole = "customer" | "vendor" | "admin";

export interface InsertResult {
    acknowledged: boolean;
    insertedId?: string;
}

export interface UpdateResult {
    acknowledged: boolean;
    modifiedCount: number;
}

export interface DeleteResult {
    acknowledged: boolean;
    deletedCount: number;
}

// ============================
// VENUES
// ============================

export const addVenue = async (data: VenueInput): Promise<InsertResult> => {
    return serverMutation<InsertResult, VenueInput>("/api/venues", "POST", data);
};

export const updateVenue = async (
    data: Partial<VenueInput>,
    id: string
): Promise<UpdateResult> => {
    return serverMutation<UpdateResult, Partial<VenueInput>>(
        `/api/venues/${id}`,
        "PATCH",
        data
    );
};

export const deleteVenue = async (id: string): Promise<DeleteResult> => {
    const res = await deleteMutation<DeleteResult>(`/api/venues/${id}`);
    revalidatePath("/dashboard/vendor/my-venues");
    return res;
};

// ============================
// REVIEWS
// ============================

export const addReview = async (data: ReviewInput) => {
    return serverMutation("/api/reviews", "POST", data);
};

export const updateReview = async (
    id: string,
    data: { rating: number; comment: string }
) => {
    return serverMutation(`/api/reviews/${id}`, "PATCH", data);
};

export const deleteReview = async (id: string) => {
    return deleteMutation(`/api/reviews/${id}`);
};

// ============================
// ADMIN — VENUE APPROVAL
// ============================

export const updateVenueApprovalStatus = async (
    data: { approvalStatus: ApprovalStatus },
    id: string
) => {
    const result = await serverMutation(`/api/admin/venues/${id}`, "PATCH", data);
    revalidatePath("/dashboard/admin/manage-venues");
    return result;
};

// ============================
// ADMIN — USERS
// ============================

export const changeUserRole = async (id: string, role: UserRole) => {
    const result = await serverMutation(
        `/api/admin/users/${id}/role`,
        "PATCH",
        { role }
    );
    revalidatePath("/dashboard/admin/manage-users");
    return result;
};

export const toggleUserBlock = async (id: string, isBlocked: boolean) => {
    const result = await serverMutation(
        `/api/admin/users/${id}/block`,
        "PATCH",
        { isBlocked }
    );
    revalidatePath("/dashboard/admin/manage-users");
    return result;
};

export const deleteUser = async (id: string): Promise<DeleteResult> => {
    const result = await deleteMutation<DeleteResult>(`/api/admin/users/${id}`);
    revalidatePath("/dashboard/admin/manage-users");
    return result;
};

// ============================
// VENDOR — BOOKING STATUS
// ============================

export const updateBookingStatus = async (id: string, status: BookingStatus) => {
    const result = await serverMutation(
        `/api/vendor/bookings/${id}`,
        "PATCH",
        { status }
    );
    revalidatePath("/dashboard/vendor/bookings");
    return result;
};