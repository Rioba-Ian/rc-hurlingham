import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/molecules/Footer";
import { Header } from "@/components/molecules/Header";

export const metadata: Metadata = {
 title: "Rotaract Club of Hurlingham",
 description:
  "Rotaract Club of Hurlingham is a community service club for young professionals in Nairobi, Kenya.",
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
  <html lang="en" suppressHydrationWarning>
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
