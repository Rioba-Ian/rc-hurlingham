import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
 name?: string | null;
 src?: string | null;
 size?: number;
 className?: string;
}

/** Round avatar that falls back to the author's initials when there's no image. */
const Avatar = ({ name, src, size = 28, className }: AvatarProps) => {
 const initials =
  (name || "RH")
   .split(" ")
   .map((w) => w[0])
   .filter(Boolean)
   .slice(0, 2)
   .join("")
   .toUpperCase() || "RH";

 if (src) {
  return (
   <Image
    src={src}
    alt={name || ""}
    width={size}
    height={size}
    style={{ width: size, height: size }}
    className={cn("rounded-full object-cover", className)}
   />
  );
 }

 return (
  <div
   style={{ width: size, height: size, fontSize: size * 0.4 }}
   className={cn(
    "flex items-center justify-center rounded-full bg-cranberry/10 font-montserrat font-semibold text-cranberry",
    className,
   )}
  >
   {initials}
  </div>
 );
};

export default Avatar;
