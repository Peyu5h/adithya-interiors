"use client";
import React, { useEffect, useState, useRef } from "react";
import Hero from "~/components/ui/hero";
// import LocomotiveScroll from "locomotive-scroll";
import ChatBot from "~/components/chatbot/chatBot";
import Footer from "~/components/footer/Footer";
import Faq from "~/components/landing-page/faq/Faq";
import { HeroGeometric } from "~/components/ui/shape-landing-hero";
import { Testimonials } from "~/components/landing-page/testimonials/testimonials";
import { PartnerMarquee } from "~/components/landing-page/PartnerMarquee";
import OneSol from "~/components/landing-page/oneSol";
import Loader from "~/components/animations/Pagetransition/Loader";
import { LandingCarousel } from "~/components/landing-page/landingCarousel";
import Navbar from "~/components/navbar";

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      const handleLoad = () => {
        handlePageLoad();
      };

      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  const handlePageLoad = () => {
    const checkContentReady = () => {
      if (mainContentRef.current) {
        const criticalElements = mainContentRef.current.querySelectorAll(
          '[data-critical="true"], nav, main, section',
        );

        if (criticalElements.length > 0) {
          setIsContentReady(true);
          setTimeout(() => {
            setShowLoader(false);
          }, 500);
        } else {
          setTimeout(checkContentReady, 100);
        }
      }
    };

    requestAnimationFrame(() => {
      setTimeout(checkContentReady, 50);
    });
  };

  // useEffect(() => {
  //   const locomotiveScroll = new LocomotiveScroll();
  // }, []);

  return (
    <main className="">
      <Navbar />

      <div
        ref={mainContentRef}
        className={
          showLoader
            ? "pointer-events-none absolute inset-0 -z-10 opacity-0"
            : ""
        }
        style={{ visibility: showLoader ? "hidden" : "visible" }}
      >
        <div className="bg-background relative flex-grow rounded-b-[64px]">
          <ChatBot />

          <Hero data-critical="true" />

          <LandingCarousel />
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
      </div>

      {showLoader && (
        <div className="fixed inset-0 z-50">
          <Loader />
        </div>
      )}
    </main>
  );
}
