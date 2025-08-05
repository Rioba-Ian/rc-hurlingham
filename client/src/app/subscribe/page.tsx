import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Subscribe() {
 return (
  <main className="flex-1 py-[20vmin] font-montserrat">
   <div className="max-w-2xl w-4/5 mx-auto space-y-8 p-8">
    <h1 className="relative z-10 text-3xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-raleway font-bold">
     Subscribe to our newsletter
     <sup>
      <span className="text-[0.6rem] md:text-xs">(Coming soon)</span>
     </sup>
    </h1>
    <p className=" text-sm md:text-lg font-montserrat text-center relative z-10">
     Get the latest news and updates from our club. We will send you an email
     when we launch.
    </p>
    <form
     action=""
     className="flex flex-col items-center justify-center space-y-8"
    >
     <Input
      type="email"
      placeholder="hello@rotaract.co.ke"
      className="w-full relative z-10"
     />
     <Button type="submit" size={"lg"}>
      Subscribe
     </Button>
    </form>
   </div>
  </main>
 );
}
