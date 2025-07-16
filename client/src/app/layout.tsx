import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

export const openSans = Open_Sans({
 subsets: ["latin"],
 variable: "--font-open-sans",
});

export const metadata: Metadata = {
 title: "Rotaract Club of Hurlingham",
 description:
  "Rotaract Club of Hurlingham is a community service club for young professionals in Nairobi, Kenya.",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="en">
   <body className={`${openSans.className} antialiased`}>{children}</body>
  </html>
 );
}
