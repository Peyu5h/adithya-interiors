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
import { landingPageData } from "~/lib/data/data";
import { CTAPopover } from "~/components/ui/cta-popover";
import { useCTAPopover } from "~/hooks/useCTAPopover";

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const { isVisible, closePopover } = useCTAPopover();

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
      <Navbar data={landingPageData.navigation} />

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
          <ChatBot data={landingPageData.chatbot} />

          <Hero data-critical="true" data={landingPageData.hero} />

          <LandingCarousel data={landingPageData.projects} />
          <Testimonials data={landingPageData.testimonials} />
          <OneSol data={landingPageData.services} />

          <PartnerMarquee data={landingPageData.partners} />
          <Faq data={landingPageData.faq} />
          {/* <div className="px-12 py-4">
          <WordReveal paragraph="Lorem ipsum dolor sit amet dolor sit amet dolor sit amet" />
        </div> */}
          <section className="relative z-0 mb-[55em] w-full overflow-hidden rounded-[64px] bg-neutral-950 drop-shadow-2xl md:mb-[32em]">
            <div className="relative">
              <HeroGeometric
                badge={landingPageData.hero.badge}
                title1={landingPageData.hero.title1}
                title2={landingPageData.hero.title2}
                subtitle={landingPageData.hero.subtitle}
              />
            </div>
          </section>
        </div>

        <Footer data={landingPageData.footer} />
      </div>

      {showLoader && (
        <div className="fixed inset-0 z-50">
          <Loader />
        </div>
      )}

      <CTAPopover isVisible={isVisible} onClose={closePopover} />
    </main>
  );
}
