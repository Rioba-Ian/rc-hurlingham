import { Twitter, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { Rocket } from "lucide-react";
import Image from "next/image";

// Define sections as a constant
const sections = [
 {
  title: "Links & Services",
  links: [
   { name: "Training", href: "#" },
   { name: "Events", href: "#" },
   { name: "Blog", href: "#" },
   { name: "Contact", href: "#" },
   { name: "About Us", href: "#" },
  ],
 },
 {
  title: "Helpful Links",
  links: [
   { name: "Contact", href: "#" },
   { name: "FAQs", href: "#" },
   { name: "Privacy Policy", href: "#" },
  ],
 },
 {
  title: "Legal",
  links: [
   { name: "Accessibility", href: "#" },
   { name: "Ethics & Governance", href: "#" },
   { name: "Privacy Policy", href: "#" },
   { name: "Terms of Service", href: "#" },
  ],
 },
];

// Define social links as a constant
const socialLinks = [
 { icon: Twitter, name: "Twitter", href: "https://x.com/rac_hurlingham" },
 {
  icon: Instagram,
  name: "Instagram",
  href: "https://www.instagram.com/rac_hurlingham/",
 },
 {
  icon: Facebook,
  name: "Facebook",
  href: "https://www.facebook.com/RacHurlingham/",
 },
];

export default function Footer() {
 return (
  <footer className="container mx-auto py-16 bg-cranberry-foreground dark:bg-neutral-800">
   <div className="space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
     {/* Logo and Description */}
     <div>
      <Link href="/" className="flex items-center gap-1 text-primary">
       <Image
        src="/icons/icon0.svg"
        alt="Rotaract Club of Hurlingham"
        width={32}
        height={32}
       />
       <span className="text-xl font-medium">Rotaract Club of Hurlingham</span>
      </Link>
      <p className="mt-4 max-w-xs text-muted-foreground">
       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
       cupiditate quae nam molestias.
      </p>

      {/* Social Links */}
      <ul className="mt-8 flex gap-6">
       {socialLinks.map(({ icon: Icon, name, href }, idx) => (
        <li key={idx}>
         <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={name}
          className="text-muted-foreground transition hover:text-primary"
         >
          <Icon className="w-6 h-6" />
         </a>
        </li>
       ))}
      </ul>
     </div>

     {/* Footer Sections */}
     <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
      {sections.map((section, idx) => (
       <div key={idx}>
        <p className="font-medium text-foreground">{section.title}</p>
        <ul className="mt-6 space-y-4 text-sm">
         {section.links.map((link, linkIdx) => (
          <li key={linkIdx}>
           <a
            href={link.href}
            className="text-muted-foreground transition hover:text-primary"
           >
            {link.name}
           </a>
          </li>
         ))}
        </ul>
       </div>
      ))}
     </div>
    </div>
    <p className="text-xs text-muted-foreground">
     &copy; 2025. Rotaract Club of Hurlingham. All rights reserved.
    </p>
   </div>
  </footer>
 );
}
