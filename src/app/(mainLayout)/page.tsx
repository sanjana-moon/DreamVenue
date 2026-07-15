import FeaturedVenues from "@/component/home/FeaturedSection";
import HeroBanner from "@/component/home/HeroBanner";
import Newsletter from "@/component/home/NewsLetter";
import VenueCategories from "@/component/home/VenueCategories";
import WhyChooseUs from "@/component/home/WhyChoose";
import { fetchFeaturedVenues } from "@/lib/api/venues/data";

export default async function HomePage() {
  const featured = await fetchFeaturedVenues();

  return (
    <div className="">
      <HeroBanner />
      <FeaturedVenues featured={featured} />
      <VenueCategories />
      <WhyChooseUs />
      <Newsletter />
    </div>
  );
}
