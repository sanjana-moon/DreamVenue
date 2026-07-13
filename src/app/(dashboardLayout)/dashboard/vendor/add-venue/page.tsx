import { Metadata } from "next";
import AddVenuePage from "./AddVenue";

export const metadata: Metadata = {
  title: "Add Venue | DreamVenue",
};

const AddVenue = () => {
  return <AddVenuePage />;
};

export default AddVenue;