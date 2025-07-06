"use client";

import React from "react";
import HoverUp from "~/components/animations/TextAnimation/HoverUp";

interface TabButtonProps {
  text: string;
  onClick: () => void;
  isActive: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({ text, onClick, isActive }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-[10px] px-2 py-2 text-[10px] font-medium whitespace-nowrap transition-all md:rounded-2xl md:px-4 md:py-2 md:text-xs ${
        isActive ? "bg-primary text-white" : "text-black/60 hover:text-black/90"
      }`}
    >
      <HoverUp text={text} />
    </button>
  );
};

export default TabButton;
