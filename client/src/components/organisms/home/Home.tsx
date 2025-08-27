import React from "react";
import { ImagesSliderDemo } from "./HeroImagesSlider";
import AboutCarousel from "./AboutCarousel";
import Blog from "./Blog";
import SubscribeCTA from "./SubscribeCTA";

export default function Home() {
 return (
  <>
   <ImagesSliderDemo />
   <AboutCarousel />
   <Blog />
   <SubscribeCTA />
  </>
 );
}
