import FeaturedVenues from "@/component/home/FeaturedSection";
import HeroBanner from "@/component/home/HeroBanner";
import VenueCategories from "@/component/home/VenueCategories";
import WhyChooseUs from "@/component/home/WhyChoose";
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div className="">
      <HeroBanner/>
      <FeaturedVenues/>
      <VenueCategories/>
      <WhyChooseUs/>
    </div>
  );
}
