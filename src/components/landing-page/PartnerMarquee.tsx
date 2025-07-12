import Image from "next/image";
import { Marquee } from "../ui/marquee";
import { PartnersData } from "~/lib/data/data";

interface PartnerMarqueeProps {
  data: PartnersData;
}

export function PartnerMarquee({ data }: PartnerMarqueeProps) {
  return (
    <div className="mb-24">
      <div className="z-10 container mx-auto">
        <div className="mx-auto flex flex-col items-center justify-center">
          <h2 className="mt-5 text-xl font-bold tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            {data.section.title}
          </h2>
          <p className="mt-5 text-center opacity-75">{data.section.subtitle}</p>
        </div>
      </div>

      <Marquee pauseOnHover={true} speed={40}>
        {data.logos.map((url, index) => (
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
