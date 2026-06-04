import React from "react";
import { ImagesSliderDemo } from "./HeroImagesSlider";
import AboutCarousel from "./AboutCarousel";
import Blog from "./Blog";
import SubscribeCTA from "./SubscribeCTA";
import { Contact2 } from "@/components/molecules/Contact";

export default function Home() {
 return (
  <>
   <ImagesSliderDemo />
   <AboutCarousel />
   <Blog />
   <SubscribeCTA />
   <Contact2 />
  </>
 );
}
