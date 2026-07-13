import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Venues | DreamVenue",
  description:
    "Manage all your venues, update details, publish or unpublish venues, and monitor their approval status on DreamVenue.",
};

import { fetchAllVenues } from "@/lib/api/venues/data";
import ManageVenuesClient from "./ManageVenuesClient";

export default async function ManageVenues() {
  const venues = await fetchAllVenues();

  return <ManageVenuesClient venues={venues} />;
}