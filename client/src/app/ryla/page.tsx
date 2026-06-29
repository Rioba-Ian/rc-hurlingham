import type { Metadata } from "next";
import RylaPageClient from "@/components/organisms/ryla/RylaPageClient";

const title = "RYLA Pamoja '26 Diani — Rotary Youth Leadership Awards";
const description = 
  "Join the Rotaract Club of Hurlingham at RYLA Pamoja '26 in Diani, Kenya from 5th–8th November 2026. A 3-day leadership, connection, and coastal adventure.";
const ogImageUrl = 
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1782303224/Whats_App_Image_2026_06_23_at_10_58_43_d373ee69ad.jpg";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/ryla",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 1600,
        alt: "RYLA Pamoja '26 Diani - Njoo Diani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImageUrl],
  },
};

export default function RylaPage() {
  return <RylaPageClient />;
}
