import React from "react";
import { RxCross2 } from "react-icons/rx";

interface TagButtonProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TagButton({
  title,
  isActive,
  onClick,
}: TagButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-primary hover:bg-primary/90 border text-white"
          : "text-default hover:bg-default/10 border-[1px] border-gray-300 bg-white"
      }`}
    >
      {title}
      {isActive && <RxCross2 className="ml-2 text-lg" />}
    </button>
  );
}
