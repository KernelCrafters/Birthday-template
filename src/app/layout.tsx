import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { BIRTHDAY_CONFIG } from "@/config/birthday";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `Happy Birthday ${BIRTHDAY_CONFIG.birthdayPerson.name}`,
  description: `A cinematic 3D & interactive birthday experience celebrating ${BIRTHDAY_CONFIG.birthdayPerson.name}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#0D1025] text-white overflow-x-hidden`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
