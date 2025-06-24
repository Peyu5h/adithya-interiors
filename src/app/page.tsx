"use client";
import React, { useEffect } from "react";
import Navbar from "~/components/ui/navbar";
import Hero from "~/components/ui/hero";
import LocomotiveScroll from "locomotive-scroll";
import ChatBot from "~/components/chatbot/chatBot";
import Footer from "~/components/footer/Footer";

export default function HomePage() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <main className="">
      <div className="relative flex-grow rounded-b-[64px] bg-white">
        <Navbar />
        <ChatBot />

        <Hero />
        <div className="bg-background h-screen w-full">hello</div>
        <section className="relative z-0 mb-[55em] w-full overflow-hidden rounded-[64px] bg-neutral-950 drop-shadow-2xl md:mb-[32em]">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 bottom-0 z-0"></div>
            <div className="mb:pt-64 mx-auto mt-48 w-full max-w-6xl flex-col p-4 sm:px-12 md:pb-24">
              <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-start gap-2 py-4 md:flex"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
