import { Suspense } from "react";
import { headers } from "next/headers";
import { Spinner } from "@heroui/react";

import { auth } from "@/lib/auth";
import { myVenues } from "@/lib/api/venues/data";
import ManageVenuesPage from "./ManageVenues";

const ManageVenues = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const venues = await myVenues(session?.user?.email ?? "");

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <ManageVenuesPage venues={venues} />
    </Suspense>
  );
};

export default ManageVenues;