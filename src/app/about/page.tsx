import AboutUsSection from "~/components/about-us-section";
import Navbar from "~/components/navbar";
import { landingPageData } from "~/lib/data/data";

export default function Aboutpage() {
  return (
    <div>
      <Navbar data={landingPageData.navigation} />
      <AboutUsSection data={landingPageData.about} />
    </div>
  );
}
