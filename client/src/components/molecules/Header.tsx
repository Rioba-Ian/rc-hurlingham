import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import ClubLogo from "@/assets/club_logo.png";
import ThemeSwitch from "./ThemeSwitch";

const navigationLinks = [
 { name: "Home", href: "/" },
 { name: "About Us", href: "/about" },
 { name: "Events", href: "/events" },
 { name: "Blog", href: "/blog" },
 { name: "Contact", href: "/contact" },
];

export default function Header() {
 return (
  <header className="max-w-[1440px] mx-auto">
   <nav className="flex items-center justify-between p-4">
    <div>
     <Link href={"/"}>
      <Image
       src={ClubLogo}
       alt="Rotaract Club of Hurlingham Logo"
       width={240}
       height={100}
       className="inline-block mr-2"
      />
     </Link>
    </div>
    <div className="flex-1 ml-[20%]">
     <ul className="hidden  sm:flex items-center justify-around">
      {navigationLinks.map((link) => (
       <li key={link.name}>
        <Link
         href={link.href}
         className="hover:underline uppercase font-medium relative inline-block group"
        >
         <ItemTextWithAnimation text={link.name} />
         <ItemAnimation />
        </Link>
       </li>
      ))}
     </ul>
    </div>
    <div className="flex items-center justify-end space-x-4">
     <ThemeSwitch />
     <Menu size={28} className="sm:hidden cursor-pointer ml-auto" />
    </div>
   </nav>
  </header>
 );
}

const ItemTextWithAnimation = ({ text }: { text: string }) => {
 return (
  <span
   className="
                relative z-10 block uppercase text-[#262626] dark:text-white
                    font-sans font-semibold transition-colors duration-300 
                    group-hover:text-white dark:group-hover:text-[#262626]
                    text-xl py-2 px-3
                    md:text-base md:py-2 md:px-3
                    lg:text-lg lg:py-2 lg:px-4
            "
  >
   {text}
  </span>
 );
};

const ItemAnimation = () => {
 return (
  <>
   <span
    className="
                  absolute inset-0 border-t-2 border-b-2 border-[#262626] dark:border-white
                  transform scale-y-[2] opacity-0 
                  transition-all duration-300 origin-center
                  group-hover:scale-y-100 group-hover:opacity-100
                "
   />
   <span
    className="
                  absolute top-[2px] left-0 w-full h-full bg-[#262626] dark:bg-white
                  transform scale-0 opacity-0
                  transition-all duration-300 origin-top
                  group-hover:scale-100 group-hover:opacity-100
                "
   />
  </>
 );
};
