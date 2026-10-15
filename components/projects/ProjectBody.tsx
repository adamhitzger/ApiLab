import type { ReactNode } from "react";
import { PortableText, type PortableTextBlock, type PortableTextBlockComponent, type PortableTextComponents } from "next-sanity";

/**
 * Renders the project's Portable Text inside the dark "case card".
 * Headings (h2–h4) become the small colored labels — Problém / Řešení / Výsledek.
 */
const labelColors = ["text-white/40", "text-lime", "text-yellow"];

const HEADING_STYLES = new Set(["h2", "h3", "h4"]);

function makeComponents(value: PortableTextBlock[]): PortableTextComponents {
  // Color labels in document order: Problém (muted) → Řešení (lime) → Výsledek (yellow)
  const colorByKey = new Map<string, string>();
  value.filter((b) => HEADING_STYLES.has(String(b.style))).forEach((b, i) => colorByKey.set(b._key ?? String(i), labelColors[i % labelColors.length]));

  const Label: PortableTextBlockComponent = ({ children, value: block }) => (
    <p className={`mt-7 text-[12px] font-semibold uppercase tracking-[0.2em] first:mt-0 ${colorByKey.get(block._key ?? "") ?? labelColors[0]} before:mb-6 before:block before:h-px before:w-full before:bg-white/10 first:before:hidden`}>
      {children}
    </p>
  );
  return {
    block: {
      h2: Label,
      h3: Label,
      h4: Label,
      normal: ({ children }) => <p className="mt-2.5 text-[15.5px] leading-[1.6] text-white/85">{children}</p>,
    },
    list: {
      bullet: ({ children }) => <ul className="mt-2.5 list-disc space-y-1 pl-5 text-[15px] text-white/80">{children}</ul>,
      number: ({ children }) => <ol className="mt-2.5 list-decimal space-y-1 pl-5 text-[15px] text-white/80">{children}</ol>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
      link: ({ children, value }) => (
        <a href={value?.href} className="text-lime underline-offset-4 hover:underline" target="_blank" rel="noreferrer">{children}</a>
      ),
    },
  };
}

/** Bloky první sekce (do druhého nadpisu) — na výpisu stačí Problém, zbytek je v článku. */
export function firstSection(value: PortableTextBlock[]) {
  const headings = value.flatMap((b, i) => (HEADING_STYLES.has(String(b.style)) ? [i] : []));
  return headings.length > 1 ? value.slice(0, headings[1]) : value;
}

export function ProjectBody({ value, footer }: { value: PortableTextBlock[]; footer?: ReactNode }) {
  if (!value?.length) return null;
  return (
    <div className="relative overflow-hidden rounded-card bg-ink-2 p-7 ring-1 ring-white/10 texture-dots md:p-10">
      <PortableText value={value} components={makeComponents(value)} />
      {footer}
    </div>
  );
}
