import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/AuthProvider";

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
  title: "StressCare",
  description: "Stress Assessment System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-gray-100 antialiased">

        <AuthProvider>
          {children}
        </AuthProvider>

        <Toaster
          position="top-right"
          richColors
          expand={true}
          closeButton
          duration={3000}
        />

      </body>
    </html>
  );
}