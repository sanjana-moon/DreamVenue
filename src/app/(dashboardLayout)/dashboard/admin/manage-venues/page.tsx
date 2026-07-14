import type { Metadata } from "next";
import ManageVenuesClient from "./ManageVenuesClient";

export const metadata: Metadata = {
  title: "Manage Venues | DreamVenue",
  description:
    "Manage all your venues, update details, and monitor their approval status on DreamVenue.",
};

import { fetchAllVenues } from "@/lib/api/venues/data";

export default async function ManageVenues() {
  const venues = await fetchAllVenues();

  return <ManageVenuesClient venues={venues} />;
}