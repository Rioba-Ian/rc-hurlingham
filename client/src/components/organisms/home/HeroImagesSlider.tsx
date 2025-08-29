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
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1756373080/rc-hurlingham/hero_compressed/compressed_2/compressed-images%20%281%29/OGS01821_1_dldokh_du0p2r.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1756373079/rc-hurlingham/hero_compressed/compressed_2/compressed-images%20%281%29/OGS01867_1_m7pufk_gqim3s.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1756373079/rc-hurlingham/hero_compressed/compressed_2/compressed-images%20%281%29/OGS01818_1_g0xd75_qjewcy.jpg",

  "https://res.cloudinary.com/drxurk7lu/image/upload/v1756373057/rc-hurlingham/hero_compressed/compressed_2/compressed-images/OGS01501_1_dawtxb_yx03l0.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1756373057/rc-hurlingham/hero_compressed/compressed_2/compressed-images/OGS01536_1_zbm4wv_axrxbv.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1756373057/rc-hurlingham/hero_compressed/compressed_2/compressed-images/IMG_3498_1_d2w1lp_qiwybi.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1756373057/rc-hurlingham/hero_compressed/compressed_2/compressed-images/IMG_3048_1_v7plsn_yzd7rw.jpg",
  "https://res.cloudinary.com/drxurk7lu/image/upload/v1756373057/rc-hurlingham/hero_compressed/compressed_2/compressed-images/IMG_3687_1_hn2ugx_ghrnau.jpg",
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
    <h1
     className={`font-raleway font-bold text-4xl md:text-7xl bg-clip-text text-center text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-8`}
    >
     Rotaract Club of Hurlingham
    </h1>
    <motion.p
     className={`${raleway.className} "font-medium text-sm w-4/5 md:text-xl text-center bg-clip-text text-neutral-200 py-6"`}
    >
     A vibrant community of young adults making a difference through service,
     leadership, and meaningful connections across borders.
    </motion.p>
    <button className="my-2 px-4 py-2 backdrop-blur-sm border bg-cranberry/20 border-cranberry text-cranberry-foreground mx-auto text-center rounded-full relative mt-4">
     <span>Learn more →</span>
     <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
    </button>
   </motion.div>
  </ImagesSlider>
 );
}

/*
<motion.div
    initial={{ opacity: 0, y: -80 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 2.5 }}
    className="z-50 w-2/3 flex flex-col justify-center items-center text-center px-4"
  >
    <h1 className="font-bold text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4">
      Rotaract: Leadership, Service, Global Friendship
    </h1>
    <p className="max-w-2xl font-medium text-lg md:text-2xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300 mb-6">
      A vibrant global network of young adults—aged 18 and over—making a difference through community service projects, leadership development, and meaningful connections across borders.
    </p>
    <button className="my-2 px-6 py-3 backdrop-blur-sm border bg-cranberry/20 border-cranberry text-cranberry-foreground rounded-full hover:bg-cranberry/30 transition">
      <span>Explore Our Mission →</span>
      <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
    </button>
  </motion.div>
*/
