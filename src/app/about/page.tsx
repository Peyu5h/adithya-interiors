import AboutUsSection from "~/components/about-us-section";
import Stairs from "~/components/animations/Pagetransition/Stairs";
import Navbar from "~/components/ui/navbar";

export default function Aboutpage() {
  return (
    <div>
      <Stairs backgroundColor={"#0e0e0e"}>
        <Navbar />
        <AboutUsSection />
      </Stairs>
    </div>
  );
}
