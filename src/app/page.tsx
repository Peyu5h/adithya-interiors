"use client";
import React, { useEffect } from "react";
import Navbar from "~/components/ui/navbar";
import Hero from "~/components/ui/hero";
import LocomotiveScroll from "locomotive-scroll";
import ChatBot from "~/components/chatbot/chatBot";

export default function HomePage() {
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <main className="relative">
      <Navbar />
      <ChatBot />

      <Hero />
      <div className="bg-background h-screen w-full">hello</div>
    </main>
  );
}
