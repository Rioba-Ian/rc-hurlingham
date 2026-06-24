"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { FaXTwitter, FaFacebookF } from "react-icons/fa6";

const iconBtn =
 "flex size-9 items-center justify-center rounded-full border border-border text-neutral-600 transition-colors hover:border-cranberry hover:text-cranberry dark:text-neutral-300";

const ArticleShare = ({ title }: { title: string }) => {
 const [copied, setCopied] = useState(false);

 // Resolve the live URL at click time so it's always the current page.
 const currentUrl = () =>
  typeof window !== "undefined" ? window.location.href : "";

 const open = (href: string) =>
  window.open(href, "_blank", "noopener,noreferrer,width=600,height=520");

 const shareX = () =>
  open(
   `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title,
   )}&url=${encodeURIComponent(currentUrl())}`,
  );

 const shareFacebook = () =>
  open(
   `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl(),
   )}`,
  );

 const copy = async () => {
  const url = currentUrl();
  try {
   await navigator.clipboard.writeText(url);
  } catch {
   // Fallback for non-secure contexts / older browsers
   const ta = document.createElement("textarea");
   ta.value = url;
   ta.style.position = "fixed";
   ta.style.opacity = "0";
   document.body.appendChild(ta);
   ta.select();
   try {
    document.execCommand("copy");
   } catch {
    // give up silently
   }
   document.body.removeChild(ta);
  }
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
 };

 return (
  <div className="my-10 flex items-center gap-3.5 border-y border-border py-6">
   <span className="font-montserrat text-sm text-neutral-600 dark:text-neutral-400">
    Share
   </span>
   <div className="flex gap-3">
    <button
     type="button"
     aria-label="Share on X / Twitter"
     onClick={shareX}
     className={iconBtn}
    >
     <FaXTwitter className="size-4" />
    </button>
    <button
     type="button"
     aria-label="Share on Facebook"
     onClick={shareFacebook}
     className={iconBtn}
    >
     <FaFacebookF className="size-4" />
    </button>
    <button
     type="button"
     aria-label="Copy link"
     onClick={copy}
     className={iconBtn}
    >
     {copied ? (
      <Check className="size-4 text-cranberry" />
     ) : (
      <Link2 className="size-4" />
     )}
    </button>
   </div>
  </div>
 );
};

export default ArticleShare;
