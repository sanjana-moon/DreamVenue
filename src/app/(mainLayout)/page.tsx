import FeaturedVenues from "@/component/home/FeaturedSection";
import HeroBanner from "@/component/home/HeroBanner";
import { Button } from "@heroui/react";

export default function Home() {
  return (
    <div className="">
      <HeroBanner/>
      <FeaturedVenues/>
    </div>
  );
}
