import HorizontalScrollCarousel from "@/components/molecules/HorizontalScrollCarousel";
import Image from "next/image";
import underline from "@/assets/underline.svg";
import thinkinkPerson from "@/assets/face_thinking_person.svg";

const cards = [
 {
  id: 1,
  title: "Community",
  description:
   "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754301754/rc-hurlingham/504302524_18392626003188488_375231453140831669_n_ozbcoy.jpg",
 },
 {
  id: 2,
  title: "Leadership",
  description:
   "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",

  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754301832/rc-hurlingham/524594164_18101375320601621_8044475636033552825_n_oqbs7q.jpg",
 },
 {
  id: 3,
  title: "Impact",
  description:
   "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",

  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754301779/rc-hurlingham/525756364_18392626075188488_1218777187996823509_n_vrsgif.jpg",
 },
 {
  id: 4,
  title: "Professional Leadership & Development",
  description:
   "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",

  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754302184/rc-hurlingham/489041455_17898809637163805_7384207761434184886_n_vwbezw.jpg",
 },
 {
  id: 5,
  title: "Mentorship",
  description:
   "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",

  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754302686/rc-hurlingham/470254329_593849653194104_7572726715906509254_n_x6cfqi.jpg",
 },
 {
  id: 6,
  title: "Mentorship",
  description:
   "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",

  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754302686/rc-hurlingham/469720245_1094096229119568_3431651376604334017_n_jvpc7h.jpg",
 },
 {
  id: 7,
  title: "Mentorship",
  description:
   "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",

  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754302649/rc-hurlingham/478740699_18086184880601621_4672046275343247977_n_dqilmx.jpg",
 },
];

const AboutCarousel = () => {
 return (
  <div className="bg-cranberry-foreground dark:bg-neutral-800">
   <div className="py-16 md:py-32 flex flex-col items-center justify-center text-neutral-600 dark:text-neutral-200 gap-8 md:gap-16 w-1/2 mx-auto text-center relative">
    <div className="relative">
     <h2 className="font-semibold text-2xl md:text-6xl font-raleway">
      What is Rotaract?
     </h2>
     <Image
      src={underline}
      alt="Rotaract"
      width={200}
      height={200}
      className="top-16 left-0 absolute w-full scale-150 text-white"
     />
    </div>
    <div className="relative w-full">
     <p className="font-raleway text-sm md:text-lg">
      RYLA (Rotary Youth Leadership Awards) is an intensive leadership
      experience where young people develop skills as leaders in their
      communities, workplaces, and organizations.
      <br />
      Through a combination of presentations, activities, and challenges,
      participants explore leadership fundamentals, learn from experienced
      facilitators, and develop personal leadership styles.
     </p>
     <Image
      src={thinkinkPerson}
      alt="Rotaract"
      width={120}
      height={120}
      className="-top-1/2 -left-[40%] absolute"
     />
    </div>
   </div>
   <HorizontalScrollCarousel
    title="Community, Leadership and Impact"
    cards={cards}
   />
  </div>
 );
};

export default AboutCarousel;
