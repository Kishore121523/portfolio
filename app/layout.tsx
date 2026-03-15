import "./globals.css";
import type { Metadata } from "next";
import { Poppins, Caveat } from 'next/font/google';
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-caveat' });

export const metadata: Metadata = {
  title: "Kishore's Portfolio",
  description: "Welcome to Kishore's Portfolio, a showcase of my work and skills in web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} ${caveat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}