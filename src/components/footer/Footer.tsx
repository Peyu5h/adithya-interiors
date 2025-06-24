import React from "react";
import { IoMailOpenOutline } from "react-icons/io5";
import HoverUpFoot from "../animations/TextAnimation/HoverUpFoot";
import Image from "next/image";
// import vignamLogo from "../../assests/logo/vignamLogo.png";
import { ASSETS } from "~/lib/constants";
import Link from "next/link";
import SocialButton from "./SocialButton";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url("https://res.cloudinary.com/dkysrpdi6/image/upload/v1750759175/gradient_1_ygdp24.png")`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
      className="fixed bottom-0 -z-10 mx-auto w-full overflow-hidden"
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bottom-0 z-0"></div>
        <div className="mb:pt-64 mx-auto mt-48 w-full max-w-6xl flex-col p-4 sm:px-12 md:pb-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            {/* Left Section with Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center justify-start gap-2 py-4 md:flex">
                {/* <Image
                  src={ASSETS.images.molecules}
                  alt="Adithya Interiors Logo"
                  width={36}
                  height={36}
                /> */}
                <span className="mt-1 pr-7 pl-1 text-2xl font-bold text-white">
                  ADITHYA INTERIORS
                </span>
              </div>
              <div className="mt-6 mb-8 md:mt-0 md:block md:opacity-100">
                <p className="mb-2 text-lg font-bold text-white/60 md:text-[18px]">
                  CRAFTING SPACES & DREAMS
                </p>
                <p className="md:text-md max-w-md text-sm leading-[18px] font-normal text-white/60">
                  Your one-stop solution for all interior needs.
                </p>
              </div>
            </div>

            {/* Right Section with Company and Contact */}
            <div className="flex flex-col gap-8 lg:flex-row">
              <div className="text-md flex flex-shrink-0 flex-col gap-4 text-white/70 md:min-w-72 md:gap-3">
                <h3 className="-mb-2 text-lg font-bold text-white md:mb-2">
                  COMPANY
                </h3>
                <Link href="/">
                  <HoverUpFoot text="Home" />
                </Link>
                <Link href="/services">
                  <HoverUpFoot text="Services" />
                </Link>
                <Link href="/projects">
                  <HoverUpFoot text="Projects" />
                </Link>
                <Link href="/blog">
                  <HoverUpFoot text="Blog" />
                </Link>
              </div>

              <div className="text-md flex flex-shrink-0 flex-col gap-6 text-white/70 md:min-w-72 md:gap-2">
                <h3 className="-mb-2 text-lg font-bold text-white md:mb-2">
                  CONTACT US
                </h3>
                <span className="inline-flex items-center gap-2 sm:justify-start">
                  <IoMailOpenOutline />
                  <span className="bg-secondary/40 rounded-md px-1.5 py-1 text-xs font-semibold text-white/80">
                    contact@adithyainteriors.com
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 sm:justify-start">
                  <IoMailOpenOutline />
                  <span className="bg-secondary/40 rounded-md px-1.5 py-1 text-xs font-semibold text-white/80">
                    info@adithyainteriors.com
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="my-9 h-0.5 w-full bg-black/5"></div>

          {/* Social Links and Policies */}
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <div className="flex flex-wrap gap-2">
              <SocialButton
                href="#"
                logo={<FaInstagram className="h-5 w-5 text-white" />}
                label="Instagram"
                sublabel="Follow us on"
              />
              <SocialButton
                href="#"
                logo={<FaFacebook className="h-5 w-5 text-white" />}
                label="Facebook"
                sublabel="Follow us on"
              />
              <SocialButton
                href="#"
                logo={<FaTwitter className="h-5 w-5 text-white" />}
                label="Twitter"
                sublabel="Follow us on"
              />
            </div>
            <div className="my-4 flex flex-col items-start md:mt-0 md:items-end md:gap-y-4">
              <div className="flex flex-col gap-x-6 gap-y-2 text-[13px] text-white/80 sm:flex-row sm:flex-wrap sm:justify-between md:gap-y-0">
                <a href="/termsofuse" className="hover:text-white">
                  Terms and Conditions
                </a>
                <a href="/privacypolicy" className="hover:text-white">
                  Privacy Policy
                </a>
              </div>
              <span className="pointer-events-none text-end text-xs text-white/80">
                &copy; 2024 Adithya Interiors. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
