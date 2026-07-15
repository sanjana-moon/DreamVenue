// import FeaturedSection from "./FeaturedSection.client";
import { fetchFeaturedVenues } from "@/lib/api/venues/data";
import FeaturedSection from "./FeaturedSection";

export default async function FeaturedSectionWrapper() {
    try {
        const data = await fetchFeaturedVenues();
        const venues = data.venues || [];
        return <FeaturedSection venues={venues} />;
    } catch (error) {
        console.error("Error fetching featured venues:", error);
        return <FeaturedSection venues={[]} error="Failed to load venues" />;
    }
}