import React from "react";
import clsx from "clsx";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section
      className={clsx(
        "h-screen bg-background flex items-center justify-center",
        className
      )}
    >
      {children}
    </section>
  );
}