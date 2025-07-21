import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
  <html lang="en" suppressHydrationWarning>
   <body className={`antialiased`}>
    <ThemeProvider
     attribute="class"
     defaultTheme="system"
     enableSystem
     disableTransitionOnChange
    >
     {children}
    </ThemeProvider>
   </body>
  </html>
 );
}
