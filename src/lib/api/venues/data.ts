import { serverFetch } from "../server";

/* ============================
   CUSTOMER
============================ */

export const fetchCustomerBookings = async (email: string) => {
  return await serverFetch(
    `/api/bookings/customer/${email}`,
    true
  );
};

export const fetchCustomerReviews = async (email: string) => {
  return await serverFetch(
    `/api/user/reviews/${email}`,
    true
  );
};

export const canReviewVenue = async (
  venueId: string,
  email: string
) => {
  return await serverFetch(
    `/api/venues/${venueId}/can-review/${email}`,
    true
  );
};

/* ============================
   VENUES
============================ */

export const fetchVenues = async (
  query?: URLSearchParams
) => {
  return await serverFetch(
    `/api/venues?${query?.toString() || ""}`
  );
};

export const fetchFeaturedVenues = async () => {
  const query = new URLSearchParams({
    page: "1",
    limit: "6",
  });

  return await serverFetch(
    `/api/venues?${query.toString()}`
  );
};

export const fetchVenueReviews = async (
  venueId: string
) => {
  return await serverFetch(
    `/api/venues/${venueId}/reviews`
  );
};

/* ============================
   VENDOR
============================ */

export const fetchVendorVenues = async (
  email: string
) => {
  return await serverFetch(
    `/api/venues/vendor/${email}`,
    true
  );
};

export const fetchVendorBookings = async (
  email: string
) => {
  return await serverFetch(
    `/api/vendor/bookings/${email}`,
    true
  );
};

export const fetchVendorDashboard = async (
  email: string
) => {
  return await serverFetch(
    `/api/vendor-stats/${email}`,
    true
  );
};

/* ============================
   ADMIN
============================ */

export const fetchPendingVenues = async () => {
  return await serverFetch(
    "/api/admin/pending-venues",
    true
  );
};

export const fetchAllVenues = async () => {
  return await serverFetch(
    "/api/admin/venues",
    true
  );
};

export const fetchUsers = async () => {
  return await serverFetch(
    "/api/admin/users",
    true
  );
};

export const fetchTransactions = async () => {
  return await serverFetch(
    "/api/admin/transactions",
    true
  );
};

export const fetchAdminDashboard = async () => {
  return await serverFetch(
    "/api/admin/dashboard",
    true
  );
};