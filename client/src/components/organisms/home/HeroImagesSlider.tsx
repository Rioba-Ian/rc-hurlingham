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
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754669664/rc-hurlingham/hero_compressed/IMG_3048_1_v7plsn.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754669667/rc-hurlingham/hero_compressed/OGS01867_1_m7pufk.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754669670/rc-hurlingham/hero_compressed/OGS01821_1_dldokh.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754669670/rc-hurlingham/hero_compressed/OGS01818_1_g0xd75.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754669671/rc-hurlingham/hero_compressed/IMG_3498_1_d2w1lp.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754669674/rc-hurlingham/hero_compressed/IMG_3687_1_hn2ugx.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754669665/rc-hurlingham/hero_compressed/OGS01536_1_zbm4wv.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1754669665/rc-hurlingham/hero_compressed/OGS01501_1_dawtxb.jpg",
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
