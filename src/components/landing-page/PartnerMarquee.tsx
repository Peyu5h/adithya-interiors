import Image from "next/image";
import { Marquee } from "../ui/marquee";

// Array of partner logo image URLs
const partnerLogos = [
  "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751714579/biju/partners/1913237_uk6lfj.png",
  "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751714579/biju/partners/polycab-logo-freelogovectors.net__gtkiyw.png",
  "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751716359/biju/partners/asian-paints-seeklogo_ktl3jf.png",
  "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751714580/biju/partners/1913265_fws6je.png",
  "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751714580/biju/partners/ambuja-seeklogo_dqvz5c.png",
  "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751716359/biju/partners/caparol-seeklogo_ekvvbh.png",
  "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751716360/biju/partners/indigo-paints-seeklogo_gtixdu.png",
  "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751716360/biju/partners/dulux-seeklogo_yt1pff.png",
  "https://res.cloudinary.com/dkysrpdi6/image/upload/v1751716360/biju/partners/kajaria-tiles-seeklogo_xvm5gs.png",
];

export function PartnerMarquee() {
  return (
    <div className="mb-24">
      <div className="z-10 container mx-auto">
        <div className="mx-auto flex flex-col items-center justify-center">
          <h2 className="mt-5 text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Our trusted partners
          </h2>
          <p className="mt-5 text-center opacity-75">
            See what our customers have to say about us.
          </p>
        </div>
      </div>

      <Marquee pauseOnHover={true} speed={40}>
        {partnerLogos.map((url, index) => (
          <div
            key={index}
            className="mx-8 flex h-24 w-40 flex-shrink-0 items-center justify-center"
          >
            <Image
              src={url}
              alt={`Partner logo ${index + 1}`}
              height={96}
              width={160}
              className="max-h-full max-w-full object-contain"
              priority={index < 3}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
