"use client";
import { useEffect } from "react";

export default function ClientWakeup() {
  useEffect(() => {
    fetch("https://www.adithyaconstructions.in/api").catch(() => {});
  }, []);
  return null;
}
