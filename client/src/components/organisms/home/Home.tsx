import React from "react";
import { Header } from "@/components/molecules/Header";
import { ImagesSliderDemo } from "./HeroImagesSlider";
import AboutCarousel from "./AboutCarousel";
import Footer from "../../molecules/Footer";

export default function Home() {
 return (
  <>
   <Header />
   <ImagesSliderDemo />
   <AboutCarousel />
   <Footer />
  </>
 );
}
