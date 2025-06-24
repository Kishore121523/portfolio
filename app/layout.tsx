import type { Metadata } from "next";
import { Poppins } from 'next/font/google';

import "./globals.css";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] });

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
        className={`${poppins.className}`}
      >
        {children}
      </body>
    </html>
  );
}
