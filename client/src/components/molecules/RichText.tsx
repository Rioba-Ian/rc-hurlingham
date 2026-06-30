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

interface RichTextProps {
 content: BlocksContent | string | Record<string, any>;
}

interface TipTapNode {
  type: string;
  attrs?: Record<string, any>;
  content?: TipTapNode[];
  text?: string;
  marks?: { type: string; attrs?: Record<string, any> }[];
}

/** Recursively renders TipTap JSON nodes with our custom styling. */
const TipTapRenderer = ({ node }: { node: TipTapNode }): React.JSX.Element | null => {
  if (!node) return null;

  const renderChildren = () => {
    if (!node.content) return null;
    return node.content.map((child, idx) => (
      <TipTapRenderer key={idx} node={child} />
    ));
  };

  // Render text with inline formatting marks (bold, italic, links, etc.)
  if (node.type === "text" && node.text) {
    let result: React.ReactNode = node.text;
    if (node.marks) {
      for (const mark of node.marks) {
        if (mark.type === "bold") {
          result = <strong className="font-semibold text-neutral-900 dark:text-neutral-100">{result}</strong>;
        } else if (mark.type === "italic") {
          result = <em className="italic">{result}</em>;
        } else if (mark.type === "underline") {
          result = <u>{result}</u>;
        } else if (mark.type === "strike") {
          result = <s>{result}</s>;
        } else if (mark.type === "code") {
          result = (
            <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.9em] text-cranberry dark:bg-neutral-800">
              {result}
            </code>
          );
        } else if (mark.type === "link" && mark.attrs?.href) {
          result = (
            <Link
              href={mark.attrs.href}
              className="text-cranberry underline underline-offset-2 hover:text-cranberry/80"
            >
              {result}
            </Link>
          );
        }
      }
    }
    return <>{result}</>;
  }

  switch (node.type) {
    case "doc":
      return <div className="space-y-1">{renderChildren()}</div>;
    case "paragraph":
      return (
        <p className="my-5 font-montserrat text-[16.5px] leading-[1.8] text-neutral-700 dark:text-neutral-300">
          {renderChildren()}
        </p>
      );
    case "heading": {
      const level = node.attrs?.level || 3;
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Tag className={`${headingClasses[level] ?? headingClasses[3]} text-neutral-900 dark:text-neutral-100`}>
          {renderChildren()}
        </Tag>
      );
    }
    case "bulletList":
      return (
        <ul className="my-5 list-disc space-y-2 pl-6 font-montserrat text-[16.5px] leading-[1.7] text-neutral-700 dark:text-neutral-300">
          {renderChildren()}
        </ul>
      );
    case "orderedList":
      return (
        <ol className="my-5 list-decimal space-y-2 pl-6 font-montserrat text-[16.5px] leading-[1.7] text-neutral-700 dark:text-neutral-300">
          {renderChildren()}
        </ol>
      );
    case "listItem":
      return <li>{renderChildren()}</li>;
    case "blockquote":
      return (
        <blockquote className="my-6 border-l-4 border-cranberry pl-5 font-montserrat text-[16.5px] italic leading-[1.7] text-neutral-700 dark:text-neutral-300">
          {renderChildren()}
        </blockquote>
      );
    case "codeBlock":
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-neutral-900 p-4 font-mono text-sm text-neutral-100 dark:bg-neutral-800">
          <code>{renderChildren()}</code>
        </pre>
      );
    case "image":
      if (!node.attrs?.src) return null;
      return (
        <Image
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          width={1200}
          height={800}
          className="my-6 h-auto w-full rounded-lg object-cover"
        />
      );
    case "table":
      return (
        <div className="my-6 w-full overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left font-montserrat text-sm text-neutral-700 dark:text-neutral-300">
            <tbody>{renderChildren()}</tbody>
          </table>
        </div>
      );
    case "tableRow":
      return <tr className="border-b border-border last:border-b-0 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">{renderChildren()}</tr>;
    case "tableHeader":
      return (
        <th className="bg-neutral-50 px-4 py-3 font-raleway font-semibold text-neutral-900 dark:bg-neutral-800/50 dark:text-neutral-100">
          {renderChildren()}
        </th>
      );
    case "tableCell":
      return <td className="px-4 py-3 align-top">{renderChildren()}</td>;
    case "horizontalRule":
      return <hr className="my-8 border-t border-border" />;
    case "hardBreak":
      return <br />;
    default:
      return <>{renderChildren()}</>;
  }
};

/** Renders either Strapi Blocks (JSON) or TipTap (HTML string/JSON) with the site's typography + cranberry accents. */
const RichText = ({ content }: RichTextProps) => {
  // 1. If the content is a string
  if (typeof content === "string") {
    const trimmed = content.trim();
    // Check if it is a stringified TipTap JSON object
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
      try {
        let parsed = JSON.parse(trimmed);
        // Handle double-stringified JSON
        if (typeof parsed === "string") {
          parsed = JSON.parse(parsed);
        }
        if (parsed && typeof parsed === "object" && (parsed.type === "doc" || Array.isArray(parsed.content))) {
          return <TipTapRenderer node={parsed as TipTapNode} />;
        }
      } catch (e) {
        // Fallback to HTML rendering if JSON parsing fails
      }
    }

    // Otherwise, render as raw HTML (from TipTap HTML Editor)
    return (
      <div 
        className="prose dark:prose-invert max-w-none font-montserrat text-[16.5px] leading-[1.8] text-neutral-700 dark:text-neutral-300
          prose-p:my-5 prose-p:leading-[1.8]
          prose-headings:font-raleway prose-headings:font-bold prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100
          prose-h1:mt-10 prose-h1:mb-4 prose-h1:text-3xl md:prose-h1:text-4xl
          prose-h2:mt-9 prose-h2:mb-3.5 prose-h2:text-2xl md:prose-h2:text-3xl
          prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl md:prose-h3:text-2xl
          prose-h4:mt-7 prose-h4:mb-2.5 prose-h4:text-lg md:prose-h4:text-xl
          prose-ul:my-5 prose-ul:list-disc prose-ul:pl-6
          prose-ol:my-5 prose-ol:list-decimal prose-ol:pl-6
          prose-li:my-2
          prose-blockquote:my-6 prose-blockquote:border-l-4 prose-blockquote:border-cranberry prose-blockquote:pl-5 prose-blockquote:italic
          prose-code:rounded prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.9em] prose-code:text-cranberry dark:prose-code:bg-neutral-800
          prose-pre:my-6 prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-neutral-900 prose-pre:p-4 prose-pre:font-mono prose-pre:text-sm prose-pre:text-neutral-100 dark:prose-pre:bg-neutral-800
          prose-a:text-cranberry prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-cranberry/80
          prose-img:my-6 prose-img:rounded-lg prose-img:w-full"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // 2. If the content is a parsed TipTap JSON object (non-array object)
  if (content && typeof content === "object" && !Array.isArray(content)) {
    const obj = content as any;
    if (obj.type === "doc" || Array.isArray(obj.content)) {
      return <TipTapRenderer node={obj as TipTapNode} />;
    }
  }

  // 3. If the content is a JSON Array (traditional Strapi Blocks Editor)
  return (
   <BlocksRenderer
    content={content as BlocksContent}
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
