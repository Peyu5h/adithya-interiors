"use client";

import React from "react";

interface CircularPatternProps {
  className?: string;
  size?: number;
}

export const CircularPattern = ({
  className = "",
  size = 120,
}: CircularPatternProps) => {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" }}
      >
        {/* Circle background */}
        <circle cx="60" cy="60" r="58" fill="#f0f0f0" />

        {/* Slanted zigzag stripes */}
        <mask id="circleMask">
          <circle cx="60" cy="60" r="58" fill="white" />
        </mask>

        <g mask="url(#circleMask)">
          <rect
            x="0"
            y="20"
            width="120"
            height="16"
            fill="black"
            transform="rotate(-10, 60, 60)"
          />
          <rect
            x="0"
            y="52"
            width="120"
            height="16"
            fill="black"
            transform="rotate(-10, 60, 60)"
          />
          <rect
            x="0"
            y="84"
            width="120"
            height="16"
            fill="black"
            transform="rotate(-10, 60, 60)"
          />
        </g>

        {/* Subtle highlight */}
        <circle cx="40" cy="40" r="30" fill="white" fillOpacity="0.2" />
      </svg>
    </div>
  );
};

export default CircularPattern;
