"use client";
import React, { useEffect } from "react";
import Navbar from "~/components/ui/navbar";
import Hero from "~/components/ui/hero";
import LocomotiveScroll from "locomotive-scroll";
import ChatBot from "~/components/chatbot/chatBot";
import Footer from "~/components/footer/Footer";
import Faq from "~/components/faq/Faq";
import MainModal from "~/components/HoverProjectCards/MainModal";
import { HeroGeometric } from "~/components/ui/shape-landing-hero";
import { Testimonials } from "~/components/testimonials";
import { PartnerMarquee } from "~/components/PartnerMarquee";
import { LandingCarousel } from "~/components/landingCarousel";
import OneSol from "~/components/oneSol";

export default function HomePage() {
  // useEffect(() => {
  //   const locomotiveScroll = new LocomotiveScroll();
  // }, []);

  return (
    <main className="">
      <div className="relative flex-grow rounded-b-[64px] bg-white">
        <Navbar />
        <ChatBot />

        <Hero />

        <div className="hidden md:block">{/* <MainModal /> */}</div>
        <LandingCarousel />
        {/* <ImageSlide /> */}
        <Testimonials />
        <OneSol />

        <PartnerMarquee />
        <Faq />
        {/* <div className="px-12 py-4">
          <WordReveal paragraph="Lorem ipsum dolor sit amet dolor sit amet dolor sit amet" />
        </div> */}
        <section className="relative z-0 mb-[55em] w-full overflow-hidden rounded-[64px] bg-neutral-950 drop-shadow-2xl md:mb-[32em]">
          <div className="relative">
            <HeroGeometric
              badge="Adithya interiors"
              title1="Elevate Your"
              title2="Home's Vision"
            />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
