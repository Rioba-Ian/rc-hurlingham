import Image from "next/image";
import React from "react";
import RCHurlingham from "@/assets/Rotary_Hurlingham_Logo.png";
import RotaryLogo from "@/assets/RotaryMBS.png";
import Link from "next/link";

const Sponsors = () => {
 return (
  <section className="container mx-auto">
   <div className="flex flex-col items-center justify-center space-y-4 md:space-y-8">
    <h2 className="font-semibold text-2xl md:text-6xl font-raleway">
     Sponsors
    </h2>
    <div className="flex items-center justify-center gap-8 md:gap-16">
     <Link
      href={"https://rotaryclubofhurlinghamnairobi.org/"}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full"
     >
      <Image
       src={RCHurlingham}
       alt="Rotary Club of Hurlingham"
       width={400}
       height={400}
       className="mx-auto"
      />
     </Link>
     <Link
      href={"https://www.rotary.org/"}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full"
     >
      <Image
       src={RotaryLogo}
       alt="Rotary Club of MBS"
       width={200}
       height={200}
       className="mx-auto"
      />
     </Link>
    </div>
   </div>
  </section>
 );
};

export default Sponsors;
