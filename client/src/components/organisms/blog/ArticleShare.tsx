"use client";

import { useState } from "react";
import { Twitter, Facebook, Link2, Check } from "lucide-react";

const iconBtn =
 "flex size-9 items-center justify-center rounded-full border border-border text-neutral-600 transition-colors hover:border-cranberry hover:text-cranberry dark:text-neutral-300";

const ArticleShare = ({ title }: { title: string }) => {
 const [copied, setCopied] = useState(false);

 const url = typeof window !== "undefined" ? window.location.href : "";

 const open = (href: string) =>
  window.open(href, "_blank", "noopener,noreferrer,width=600,height=500");

 const copy = async () => {
  try {
   await navigator.clipboard.writeText(url);
   setCopied(true);
   setTimeout(() => setCopied(false), 2000);
  } catch {
   // clipboard unavailable — no-op
  }
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
     onClick={() =>
      open(
       `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
       )}&url=${encodeURIComponent(url)}`,
      )
     }
     className={iconBtn}
    >
     <Twitter className="size-4" />
    </button>
    <button
     type="button"
     aria-label="Share on Facebook"
     onClick={() =>
      open(
       `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url,
       )}`,
      )
     }
     className={iconBtn}
    >
     <Facebook className="size-4" />
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
