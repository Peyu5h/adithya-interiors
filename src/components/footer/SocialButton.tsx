import React from "react";

interface SocialButtonProps {
  href: string;
  logo: React.ReactNode;
  label: string;
  sublabel: string;
}

export default function SocialButton({
  href,
  logo,
  label,
  sublabel,
}: SocialButtonProps) {
  return (
    <a
      className="flex items-center gap-3 rounded-lg bg-black/20 p-2.5 transition-colors hover:bg-black/30"
      target="_blank"
      href={href}
    >
      <div className="">{logo}</div>
      {/* <div>
        <div className="line-clamp-1 block text-xs font-semibold text-white/50">
          {sublabel}
        </div>
        <span className="block text-sm font-medium text-white">{label}</span>
      </div> */}
    </a>
  );
}
