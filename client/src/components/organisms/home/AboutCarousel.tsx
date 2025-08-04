import HorizontalScrollCarousel from "@/components/molecules/HorizontalScrollCarousel";

const cards = [
 {
  id: 1,
  title: "Community",
  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754301754/rc-hurlingham/504302524_18392626003188488_375231453140831669_n_ozbcoy.jpg",
 },
 {
  id: 2,
  title: "Leadership",
  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754301832/rc-hurlingham/524594164_18101375320601621_8044475636033552825_n_oqbs7q.jpg",
 },
 {
  id: 3,
  title: "Impact",
  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754301779/rc-hurlingham/525756364_18392626075188488_1218777187996823509_n_vrsgif.jpg",
 },
 {
  id: 4,
  title: "Professional Leadership & Development",
  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754302184/rc-hurlingham/489041455_17898809637163805_7384207761434184886_n_vwbezw.jpg",
 },
 {
  id: 5,
  title: "Mentorship",
  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754302686/rc-hurlingham/470254329_593849653194104_7572726715906509254_n_x6cfqi.jpg",
 },
 {
  id: 6,
  title: "Mentorship",
  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754302686/rc-hurlingham/469720245_1094096229119568_3431651376604334017_n_jvpc7h.jpg",
 },
 {
  id: 7,
  title: "Mentorship",
  url: "https://res.cloudinary.com/drxurk7lu/image/upload/v1754302649/rc-hurlingham/478740699_18086184880601621_4672046275343247977_n_dqilmx.jpg",
 },
];

const AboutCarousel = () => {
 return (
  <div className="bg-cranberry-foreground dark:bg-neutral-800">
   <div className="flex h-24 items-center justify-center font-raleway">
    <h2 className="font-semibold font-raleway uppercase text-neutral-500 text-2xl md:text-4xl">
     Community, Leadership and Impact
    </h2>
   </div>
   <HorizontalScrollCarousel
    title="Community, Leadership and Impact"
    cards={cards}
   />
   <div className="flex h-24 items-center justify-center font-raleway">
    <h3 className="font-semibold uppercase text-neutral-500 text-2xl md:text-4xl">
     Amazing Stories
    </h3>
   </div>
  </div>
 );
};

export default AboutCarousel;
