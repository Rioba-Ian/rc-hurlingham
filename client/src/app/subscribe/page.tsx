import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Subscribe() {
 return (
  <main className="flex-1 py-32 md:py-48 font-montserrat">
   <div className="max-w-2xl mx-auto p-4">
    <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-raleway font-bold">
     Subscribe to our newsletter
     <sup>
      <span className="text-xs text-blue-600">(Coming soon)</span>
     </sup>
    </h1>
    <p className=" max-w-lg mx-auto my-2 text-sm md:text-lg font-montserrat text-center relative z-10">
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
      className="w-full mt-4 relative z-10"
     />
     <Button type="submit" size={"lg"}>
      Subscribe
     </Button>
    </form>
   </div>
  </main>
 );
}
