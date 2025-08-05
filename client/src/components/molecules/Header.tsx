"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ClubLogo from "@/assets/club_logo.png";
import ThemeSwitch from "./ThemeSwitch";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const menuItems = [
 { name: "Home", href: "/" },
 { name: "About Us", href: "/about" },
 { name: "Events", href: "/events" },
 { name: "Blog", href: "/blog" },
 { name: "Contact", href: "/contact" },
];

export const Header = () => {
 const [menuState, setMenuState] = React.useState(false);
 const [isScrolled, setIsScrolled] = React.useState(false);

 React.useEffect(() => {
  const handleScroll = () => {
   setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 const pathname = usePathname();

 return (
  <header>
   <nav
    data-state={menuState && "active"}
    className="fixed group z-20 w-full px-2"
   >
    <div
     className={cn(
      "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
      isScrolled &&
       "bg-background/20 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
     )}
    >
     <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
      <div className="flex w-full justify-between lg:w-auto">
       <Link href={"/"}>
        <Image
         src={ClubLogo}
         alt="Rotaract Club of Hurlingham Logo"
         width={180}
         height={80}
         className="inline-block mr-2"
        />
       </Link>

       <button
        onClick={() => setMenuState(!menuState)}
        aria-label={menuState == true ? "Close Menu" : "Open Menu"}
        className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5  lg:hidden"
       >
        <Menu className=" group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200 text-neutral-900 dark:text-white" />
        <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
       </button>
      </div>

      <div className="absolute inset-0 m-auto hidden size-fit lg:block">
       <ul className="flex gap-8 text-sm">
        {menuItems.map((item, index) => (
         <li key={index}>
          <Link
           href={item.href}
           className={`
            ${
             pathname !== "/" && !isScrolled
              ? "dark:text-neutral-900 text-neutral-900"
              : ""
            }
            ${
             isScrolled ? "text-neutral-900" : "text-white"
            }  hover:text-accent-foreground  dark:text-white block duration-150`}
          >
           <span>{item.name}</span>
          </Link>
         </li>
        ))}
       </ul>
      </div>

      <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
       <div className="lg:hidden">
        <ul className="space-y-6 text-base">
         {menuItems.map((item, index) => (
          <li key={index}>
           <Link
            href={item.href}
            className="text-muted-foreground hover:text-accent-foreground block duration-150"
           >
            <span>{item.name}</span>
           </Link>
          </li>
         ))}
        </ul>
       </div>
       <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
        <ThemeSwitch />
        <Button
         asChild
         size="sm"
         className={cn(isScrolled ? "lg:inline-flex" : "hidden")}
        >
         <Link href="#">
          <span>Subscribe</span>
         </Link>
        </Button>
       </div>
      </div>
     </div>
    </div>
   </nav>
  </header>
 );
};

// export default function Header() {
//  return (
//   <header className="max-w-[1440px] mx-auto">
//    <nav className="flex items-center justify-between p-2">
//     <div>
//      <Link href={"/"}>
//       <Image
//        src={ClubLogo}
//        alt="Rotaract Club of Hurlingham Logo"
//        width={180}
//        height={80}
//        className="inline-block mr-2"
//       />
//      </Link>
//     </div>
//     <div className="flex-1 ml-[20%]">
//      <ul className="hidden  sm:flex items-center justify-around">
//       {navigationLinks.map((link) => (
//        <li key={link.name}>
//         <Link
//          href={link.href}
//          className="hover:underline uppercase font-medium relative inline-block group"
//         >
//          <ItemTextWithAnimation text={link.name} />
//          <ItemAnimation />
//         </Link>
//        </li>
//       ))}
//      </ul>
//     </div>
//     <div className="flex items-center justify-end space-x-4">
//      <ThemeSwitch />
//      <Menu size={28} className="sm:hidden cursor-pointer ml-auto" />
//     </div>
//    </nav>
//   </header>
//  );
// }

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
