import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TFT Climber",
  description: "Climb faster in Teamfight Tactics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0e111a] text-white flex min-h-screen flex-col`}>
        <Header />
        <main className="mx-auto max-w-6xl flex-1 px-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
