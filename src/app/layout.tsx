import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ZephyrSec | Advanced Cybersecurity Solutions",
    template: "%s | ZephyrSec",
  },
  description:
    "Arhitecturi de securitate și detecție a vulnerabilităților pentru infrastructuri moderne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
        {children}
      </body>
    </html>
  );
}
