import React from "react";
import { ImagesSliderDemo } from "./HeroImagesSlider";
import AboutCarousel from "./AboutCarousel";
import UpcomingEvents from "./UpcomingEvents";
import Blog from "./Blog";
import SubscribeCTA from "./SubscribeCTA";
import { Contact2 } from "@/components/molecules/Contact";

export default function Home() {
 return (
  <>
   <ImagesSliderDemo />
   <AboutCarousel />
   <UpcomingEvents />
   <Blog />
   <SubscribeCTA />
   <Contact2 />
  </>
 );
}
