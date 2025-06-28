// components/Wrapper.tsx
import React from "react";
import clsx from "clsx";

interface SectionWrapperProps {
  children?: React.ReactNode;
  className?: string;
  heightClass?: string; // allows custom height like h-[150vh]
  isSpacer?: boolean;
}

export default function SectionWrapper({
  children,
  className,
  heightClass = "min-h-screen",
  isSpacer = false,
}: SectionWrapperProps) {
  return (
    <section
      className={clsx(
        heightClass,
        isSpacer ? "" : "flex items-center justify-center",
        className
      )}
    >
      {!isSpacer && children}
    </section>
  );
}
