import { serverFetch } from "../server";
import type {
    ApprovalStatus,
    BookingStatus,
    UserRole,
} from "./actions";

/* ============================
   SHARED TYPES
============================ */

export interface Venue {
    _id: string;
    name: string;
    location: string;
    category: string;
    pricePerEvent: number;
    capacity: number;
    description: string;
    image: string;
    vendorEmail: string;
    approvalStatus: ApprovalStatus;
    publishStatus: "published" | "unpublished";
    avgRating: number;
    reviewCount: number;
    bookingCount?: number;
    createdAt: string;
}

export interface VenueListResponse {
    venues: Venue[];
    totalVenues: number;
    currentPage: number;
    totalPages: number;
}

export interface Booking {
    _id: string;
    venueId: string;
    venueName: string;
    customerEmail: string;
    bookingDate: string;
    totalPrice: number;
    transactionId: string;
    paymentStatus: string;
    status: BookingStatus;
    createdAt: string;
}

export interface Review {
    _id: string;
    venueId: string;
    venueName: string;
    userEmail: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface CanReviewResponse {
    canReview: boolean;
}

export interface VendorDashboard {
    totalVenues: number;
    totalEarnings: number;
    pendingRequests: number;
    popularVenues: { name: string; bookings: number }[];
    earningsChart: { month: string; earnings: number }[];
}

export interface AppUser {
    _id: string;
    name: string;
    email: string;
    role: UserRole;
    isBlocked: boolean;
}

export interface Transaction {
    _id: string;
    transactionId: string;
    userEmail: string;
    vendorEmail: string;
    amount: number;
    paidAt: string;
}

export interface AdminDashboard {
    totalUsers: number;
    totalVenues: number;
    totalBookings: number;
    totalRevenue: number;
    venuesByCategory: { category: string; value: number }[];
}

/* ============================
   CUSTOMER
============================ */

export const fetchCustomerBookings = async (email: string) => {
    return await serverFetch<Booking[]>(
        `/api/bookings/customer/${email}`,
        true
    );
};

export const fetchCustomerReviews = async (email: string) => {
    return await serverFetch<Review[]>(
        `/api/user/reviews/${email}`,
        true
    );
};

export const canReviewVenue = async (venueId: string, email: string) => {
    return await serverFetch<CanReviewResponse>(
        `/api/venues/${venueId}/can-review/${email}`,
        true
    );
};

/* ============================
   VENUES
============================ */

export const fetchVenues = async (query?: URLSearchParams) => {
    return await serverFetch<VenueListResponse>(
        `/api/venues?${query?.toString() || ""}`
    );
};

export const fetchFeaturedVenues = async () => {
    const query = new URLSearchParams({
        page: "1",
        limit: "6",
    });

    return await serverFetch<VenueListResponse>(
        `/api/venues?${query.toString()}`
    );
};

export const fetchVenueReviews = async (venueId: string) => {
    return await serverFetch<Review[]>(
        `/api/venues/${venueId}/reviews`
    );
};

/* ============================
   VENDOR
============================ */

export const fetchVendorVenues = async (email: string) => {
    return await serverFetch<Venue[]>(
        `/api/venues/vendor/${email}`,
        true
    );
};

export const fetchVendorBookings = async (email: string) => {
    return await serverFetch<Booking[]>(
        `/api/vendor/bookings/${email}`,
        true
    );
};

export const fetchVendorDashboard = async (email: string) => {
    return await serverFetch<VendorDashboard>(
        `/api/vendor-stats/${email}`,
        true
    );
};

/* ============================
   ADMIN
============================ */

export const fetchPendingVenues = async () => {
    return await serverFetch<Venue[]>(
        "/api/admin/pending-venues",
        true
    );
};

export const fetchAllVenues = async (status = "all") => {
    return await serverFetch<Venue[]>(
        `/api/admin/venues?status=${status}`,
        true
    );
};

export const fetchUsers = async () => {
    return await serverFetch<AppUser[]>(
        "/api/admin/users",
        true
    );
};

export const fetchTransactions = async () => {
    return await serverFetch<Transaction[]>(
        "/api/admin/transactions",
        true
    );
};

export const fetchAdminDashboard = async () => {
    return await serverFetch<AdminDashboard>(
        "/api/admin/dashboard",
        true
    );
};