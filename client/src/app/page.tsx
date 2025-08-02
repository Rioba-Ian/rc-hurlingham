import Home from "@/components/organisms/Home";
import AboutCarousel from "@/components/organisms/home/AboutCarousel";
import { ImagesSliderDemo } from "@/components/organisms/home/HeroImagesSlider";

export default function HomePage() {
 return (
  <div className="h-full w-full">
   <Home />
   <ImagesSliderDemo />
   <div className="h-[40rem]">
    <AboutCarousel />
   </div>
  </div>
 );
}
