import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

import { Spinner } from "@heroui/react";
import { fetchVendorVenues } from "@/lib/api/venues/data";
import ManageVenuePage from "./MyVenue";

const ManageVenues = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const venues = await fetchVendorVenues(
        session?.user?.email || ""
    );

    return (
        <Suspense fallback={<Spinner />}>
            <ManageVenuePage venues={venues} />
        </Suspense>
    );
};

export default ManageVenues;