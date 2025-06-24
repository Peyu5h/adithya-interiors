"use client";

import React from "react";

interface CircularTextProps {
  text: string;
  repeat?: number;
  size?: number;
  fontSize?: string;
  letterSpacing?: string;
  textColor?: string;
  children?: React.ReactNode;
}

export const CircularText = ({
  text,
  repeat = 1,
  size = 100,
  fontSize = "8px",
  letterSpacing = "0.8px",
  textColor = "#000",
  children,
}: CircularTextProps) => {
  // Calculate the full text by repeating it
  const fullText = text.repeat(repeat);

  return (
    <div
      className="relative inline-flex cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-105"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="animate-spin-slow absolute inset-0"
        style={{ animationDuration: "20s" }}
      >
        <path
          id="textCircle"
          d="M50,15 a35,35 0 1,1 0,70 a35,35 0 1,1 0,-70"
          fill="none"
          stroke="transparent"
        />
        <text
          style={{
            fontSize,
            letterSpacing,
            fill: textColor,
          }}
        >
          <textPath href="#textCircle" startOffset="0%">
            {fullText}
          </textPath>
        </text>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default CircularText;
