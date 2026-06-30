"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
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

const moreItems = [
 { name: "Gallery", href: "/gallery" },
 { name: "Projects", href: "/projects" },
 { name: "RYLA", href: "/ryla" },
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
 const isHome = pathname === "/";

 React.useEffect(() => {
  setMenuState(false);
 }, [pathname]);

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
       "bg-background/20 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5",
     )}
    >
     <div className="relative flex flex-wrap items-center justify-between gap-6 py-2 lg:gap-0 lg:py-4">
      <div className="flex w-full items-center justify-between lg:w-auto">
       <Link href={"/"}>
        <Image
         src={ClubLogo}
         alt="Rotaract Club of Hurlingham Logo"
         width={180}
         height={80}
         className="inline-block mr-2 h-auto w-[120px] lg:w-[180px]"
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
       <ul className="flex items-center gap-8 text-sm">
        {menuItems.map((item, index) => (
         <li key={index}>
          <Link
           href={item.href}
           className={cn(
            "block duration-150 hover:text-accent-foreground",
            isScrolled
             ? "text-neutral-900 dark:text-white"
             : isHome
               ? "text-white dark:text-white"
               : "text-neutral-900 dark:text-white",
           )}
          >
           <span>{item.name}</span>
          </Link>
         </li>
        ))}

        {/* More dropdown (hover) */}
        <li className="group/more relative">
         <span
          className={cn(
           "flex cursor-default items-center gap-1 duration-150 hover:text-accent-foreground",
           isScrolled
            ? "text-neutral-900 dark:text-white"
            : isHome
              ? "text-white dark:text-white"
              : "text-neutral-900 dark:text-white",
          )}
         >
          More
          <ChevronDown className="size-4 transition-transform duration-200 group-hover/more:rotate-180" />
         </span>
         <div className="invisible absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-hover/more:visible group-hover/more:opacity-100">
          <ul className="min-w-[170px] rounded-xl border bg-background p-2 shadow-lg">
           {moreItems.map((item) => (
            <li key={item.href}>
             <Link
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
             >
              {item.name}
             </Link>
            </li>
           ))}
          </ul>
         </div>
        </li>
       </ul>
      </div>

      <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-4 hidden w-full flex-wrap items-center justify-end space-y-6 rounded-2xl border p-5 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
       <div className="lg:hidden">
        <ul className="space-y-4 text-sm">
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
         <li className="pt-2 font-montserrat text-xs font-semibold uppercase tracking-[0.08em] text-cranberry">
          More
         </li>
         {moreItems.map((item) => (
          <li key={item.href}>
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
         <Link href="/subscribe">
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
