// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmartNetEstimateProvider } from "@/components/smartNetWizard/SmartNetEstimateProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartNET Installation · AI Estimates & Booking",
  description:
    "SmartNET Installation LLC – AI-powered estimates for network cabling, cameras, Wi-Fi, and security, plus an easy booking calendar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#020617] text-slate-50`}
      >
        <SmartNetEstimateProvider>{children}</SmartNetEstimateProvider>
      </body>
    </html>
  );
}
