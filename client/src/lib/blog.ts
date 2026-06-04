import type { BlocksContent } from "@strapi/blocks-react-renderer";

/** Format an ISO date like "12 July 2025". */
export function formatDate(iso?: string | null): string {
 if (!iso) return "";
 const d = new Date(iso);
 if (Number.isNaN(d.getTime())) return "";
 return new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
 }).format(d);
}

type AnyNode = { text?: string; children?: AnyNode[] };

/** Flatten all leaf text out of a Strapi Blocks tree. */
export function blocksToPlainText(content?: BlocksContent | null): string {
 if (!content) return "";
 const walk = (nodes: AnyNode[]): string =>
  nodes
   .map((n) => {
    if (typeof n.text === "string") return n.text;
    if (Array.isArray(n.children)) return walk(n.children);
    return "";
   })
   .join(" ");
 return walk(content as unknown as AnyNode[]).replace(/\s+/g, " ").trim();
}

/** Estimated reading time in minutes (~200 wpm), minimum 1. */
export function readingTime(content?: BlocksContent | null): number {
 const text = blocksToPlainText(content);
 const words = text ? text.split(/\s+/).length : 0;
 return Math.max(1, Math.round(words / 200));
}
