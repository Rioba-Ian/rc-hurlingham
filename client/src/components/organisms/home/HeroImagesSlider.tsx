"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "@/components/molecules/images-slider";
import { Raleway } from "next/font/google";

const raleway = Raleway({
 weight: ["400", "500", "600", "700"],
 subsets: ["latin"],
});

export function ImagesSliderDemo() {
 const images = [
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754068288/rc-hurlingham/OGS01818_aenfza.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754068286/rc-hurlingham/OGS01821_jorwhj.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754068755/rc-hurlingham/OGS01867_vgmaeb.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754068290/rc-hurlingham/IMG_3048_z0edrg.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754069088/rc-hurlingham/IMG_3498_l61mhg.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754069129/rc-hurlingham/OGS01501_qilwbz.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754069144/rc-hurlingham/OGS01536_zfu9hq.jpg",
 ];
 return (
  <ImagesSlider className="h-[40rem] md:h-[48rem]" images={images}>
   <motion.div
    initial={{
     opacity: 0,
     y: -80,
    }}
    animate={{
     opacity: 1,
     y: 0,
    }}
    transition={{
     duration: 2.5,
    }}
    className="z-50 w-2/3 flex flex-col justify-center items-center"
   >
    <motion.p
     className={`${raleway.className} "font-medium text-2xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-6"`}
    >
     Welcome to the home of the fun and community
    </motion.p>
    <button className="my-2 px-4 py-2 backdrop-blur-sm border bg-cranberry/20 border-cranberry text-cranberry-foreground mx-auto text-center rounded-full relative mt-4">
     <span>Learn more →</span>
     <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
    </button>
   </motion.div>
  </ImagesSlider>
 );
}
