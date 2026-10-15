import { PortableText, type PortableTextBlock, type PortableTextBlockComponent, type PortableTextComponents } from "next-sanity";

/**
 * Celý text projektu na /projekty/[slug] — světlá, čitelná varianta ProjectBody.
 * Nadpisy h2–h4 jsou tady skutečné nadpisy sekcí (Problém / Řešení / Výsledek),
 * barevná tečka drží stejné pořadí barev jako labely na výpisu.
 */
const dotColors = ["bg-ink/25", "bg-lime", "bg-yellow"];

const HEADING_STYLES = new Set(["h2", "h3", "h4"]);

function makeComponents(value: PortableTextBlock[]): PortableTextComponents {
  const indexByKey = new Map<string, number>();
  value.filter((b) => HEADING_STYLES.has(String(b.style))).forEach((b, i) => indexByKey.set(b._key ?? String(i), i));

  const SectionHeading: PortableTextBlockComponent = ({ children, value: block }) => {
    const i = indexByKey.get(block._key ?? "") ?? 0;
    return (
      <h2 data-reveal="up" className="mt-14 flex items-center gap-3 border-t border-line pt-10 font-display text-[26px] font-extrabold leading-tight text-ink first:mt-0 first:border-t-0 first:pt-0 md:text-[30px]">
        <span aria-hidden className={`size-2.5 shrink-0 rounded-full ${dotColors[i % dotColors.length]}`} />
        {children}
      </h2>
    );
  };

  return {
    block: {
      h2: SectionHeading,
      h3: SectionHeading,
      h4: SectionHeading,
      normal: ({ children }) => <p className="mt-4 text-[17px] leading-[1.7] text-ink/80">{children}</p>,
      blockquote: ({ children }) => <blockquote className="mt-6 border-l-2 border-lime pl-5 text-[18px] font-medium leading-relaxed text-ink">{children}</blockquote>,
    },
    list: {
      bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] leading-[1.6] text-ink/80 marker:text-ink/30">{children}</ul>,
      number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-[17px] leading-[1.6] text-ink/80 marker:text-ink/40">{children}</ol>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
      link: ({ children, value }) => (
        <a href={value?.href} className="font-medium text-ink underline decoration-lime decoration-2 underline-offset-4 hover:decoration-ink" target="_blank" rel="noreferrer">
          {children}
        </a>
      ),
    },
  };
}

export function ProjectArticle({ value }: { value: PortableTextBlock[] }) {
  if (!value?.length) return null;
  return (
    <div className="max-w-[720px]">
      <PortableText value={value} components={makeComponents(value)} />
    </div>
  );
}
