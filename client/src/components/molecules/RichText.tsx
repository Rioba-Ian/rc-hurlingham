"use client";

import Image from "next/image";
import Link from "next/link";
import {
 BlocksRenderer,
 type BlocksContent,
} from "@strapi/blocks-react-renderer";

const headingClasses: Record<number, string> = {
 1: "mt-10 mb-4 font-raleway text-3xl font-bold md:text-4xl",
 2: "mt-9 mb-3.5 font-raleway text-2xl font-bold md:text-3xl",
 3: "mt-8 mb-3 font-raleway text-xl font-bold md:text-2xl",
 4: "mt-7 mb-2.5 font-raleway text-lg font-semibold md:text-xl",
 5: "mt-6 mb-2 font-raleway text-base font-semibold md:text-lg",
 6: "mt-6 mb-2 font-raleway text-sm font-semibold uppercase tracking-wide",
};

/** Renders Strapi Blocks rich text with the site's typography + cranberry accents. */
const RichText = ({ content }: { content: BlocksContent }) => {
 return (
  <BlocksRenderer
   content={content}
   blocks={{
    paragraph: ({ children }) => (
     <p className="my-5 font-montserrat text-[16.5px] leading-[1.8] text-neutral-700 dark:text-neutral-300">
      {children}
     </p>
    ),
    heading: ({ children, level }) => {
     const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
     return (
      <Tag
       className={`${headingClasses[level] ?? headingClasses[3]} text-neutral-900 dark:text-neutral-100`}
      >
       {children}
      </Tag>
     );
    },
    list: ({ children, format }) =>
     format === "ordered" ? (
      <ol className="my-5 list-decimal space-y-2 pl-6 font-montserrat text-[16.5px] leading-[1.7] text-neutral-700 dark:text-neutral-300">
       {children}
      </ol>
     ) : (
      <ul className="my-5 list-disc space-y-2 pl-6 font-montserrat text-[16.5px] leading-[1.7] text-neutral-700 dark:text-neutral-300">
       {children}
      </ul>
     ),
    "list-item": ({ children }) => <li>{children}</li>,
    quote: ({ children }) => (
     <blockquote className="my-6 border-l-4 border-cranberry pl-5 font-montserrat text-[16.5px] italic leading-[1.7] text-neutral-700 dark:text-neutral-300">
      {children}
     </blockquote>
    ),
    code: ({ children }) => (
     <pre className="my-6 overflow-x-auto rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-100 dark:bg-neutral-800">
      <code>{children}</code>
     </pre>
    ),
    link: ({ children, url }) => (
     <Link
      href={url}
      className="text-cranberry underline underline-offset-2 hover:text-cranberry/80"
     >
      {children}
     </Link>
    ),
    image: ({ image }) => (
     <Image
      src={image.url}
      alt={image.alternativeText || ""}
      width={image.width || 1200}
      height={image.height || 800}
      className="my-6 h-auto w-full rounded-lg object-cover"
     />
    ),
   }}
   modifiers={{
    bold: ({ children }) => (
     <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
      {children}
     </strong>
    ),
    italic: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <u>{children}</u>,
    strikethrough: ({ children }) => <s>{children}</s>,
    code: ({ children }) => (
     <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.9em] text-cranberry dark:bg-neutral-800">
      {children}
     </code>
    ),
   }}
  />
 );
};

export default RichText;
