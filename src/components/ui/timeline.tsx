import React from "react";
import { cn } from "~/lib/utils";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Timeline({ className, children, ...props }: TimelineProps) {
  return (
    <div className={cn("relative space-y-4 pl-6", className)} {...props}>
      <span
        className="bg-border absolute inset-y-0 left-[9px] w-[1px]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function TimelineItem({
  className,
  children,
  ...props
}: TimelineItemProps) {
  return (
    <div className={cn("relative flex gap-2", className)} {...props}>
      <div className="bg-background border-primary absolute -left-[21px] mt-1 h-3.5 w-3.5 rounded-full border-2" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
