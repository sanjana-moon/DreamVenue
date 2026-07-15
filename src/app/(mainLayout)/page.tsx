import FeaturedVenues from "@/component/home/FeaturedSection";
import HeroBanner from "@/component/home/HeroBanner";
import Newsletter from "@/component/home/NewsLetter";
import VenueCategories from "@/component/home/VenueCategories";
import WhyChooseUs from "@/component/home/WhyChoose";
import { fetchFeaturedVenues } from "@/lib/api/venues/data";
import { Button } from "@heroui/react";

export default async function HomePage() {
  const featured = await fetchFeaturedVenues();

  return (
    <div className="">
      <HeroBanner />
      <VenueCategories />
      <FeaturedVenues featured={featured} />
      <WhyChooseUs />
      <Newsletter />
    </div>
  );
}
