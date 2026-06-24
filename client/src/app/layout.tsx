import type { Metadata } from "next";
import { Raleway, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/molecules/Footer";
import { Header } from "@/components/molecules/Header";
import Script from "next/script";

const raleway = Raleway({
 subsets: ["latin"],
 weight: ["400", "500", "600", "700", "800"],
 variable: "--font-raleway",
 display: "swap",
});

const montserrat = Montserrat({
 subsets: ["latin"],
 weight: ["400", "500", "600", "700"],
 variable: "--font-montserrat",
 display: "swap",
});

export const metadata: Metadata = {
 metadataBase: new URL(
  process.env.NEXT_PUBLIC_BASE_URL || "https://rotaractclubofhurlingham.co.ke",
 ),
 title: {
  default: "Rotaract Club of Hurlingham",
  template: "%s | Rotaract Club of Hurlingham",
 },
 description:
  "Rotaract Club of Hurlingham is a community service club for young professionals in Nairobi, Kenya.",
 applicationName: "Rotaract Club of Hurlingham",
 keywords: [
  "Rotaract",
  "Rotaract Club of Hurlingham",
  "Rotary",
  "Nairobi",
  "Kenya",
  "community service",
  "youth leadership",
  "volunteering",
 ],
 openGraph: {
  type: "website",
  siteName: "Rotaract Club of Hurlingham",
  locale: "en_KE",
  title: "Rotaract Club of Hurlingham",
  description:
   "A community of young professionals in Nairobi serving through leadership, friendship, and Service Above Self.",
 },
 twitter: {
  card: "summary_large_image",
  title: "Rotaract Club of Hurlingham",
  description:
   "A community of young professionals in Nairobi serving through leadership, friendship, and Service Above Self.",
 },
 robots: { index: true, follow: true },
 icons: {
  icon: [
   { url: "/icons/icon1.png" },
   { url: "/icons/icon0.svg", type: "image/svg+xml" },
  ],
  apple: "/icons/apple-icon.png",
  shortcut: "/icons/icon1.png",
 },
 manifest: "/manifest.json",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html
   lang="en"
   suppressHydrationWarning
   className={`${raleway.variable} ${montserrat.variable}`}
  >
   <Script
    async
    src="http://rotaract-hurlingham-umami-ff33f4-49-12-198-51.traefik.me/script.js"
    data-website-id="7f7d36e8-a8ba-412f-b26c-ebefa375baa5"
   />
   <body className={`antialiased`}>
    <ThemeProvider
     attribute="class"
     defaultTheme="system"
     enableSystem
     disableTransitionOnChange
    >
     <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
     </div>
    </ThemeProvider>
   </body>
  </html>
 );
}
