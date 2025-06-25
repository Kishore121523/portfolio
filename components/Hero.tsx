"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <div className="bg-foreground w-full max-w-[95%] h-[90%] flex flex-col items-center justify-center rounded-2xl">
      <div className="flex flex-col items-center justify-center">
        {/* Logo */}
        <Image
          src="/k_black.svg"
          alt="Logo Mask"
          width={100}
          height={100}
          className="w-[60px] sm:w-[60px] md:w-[70px]"
        />

        {/* Animated Text */}
        <div className="text-white text-2xl sm:text-3xl md:text-4xl font-bold opacity-0">
          Hey Kishore
        </div>
      </div>
    </div>
  );
}
