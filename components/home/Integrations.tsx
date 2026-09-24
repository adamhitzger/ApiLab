"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { Category, Tool } from "@/types";
import { Container, cx, Eyebrow, Heading } from "@/components/ui";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

function toolLabel(tool: Tool) {
  if (tool.name) return tool.name;
  try {
    return new URL(tool.url).hostname.replace(/^www\./, "");
  } catch {
    return "Integrace";
  }
}

export function Integrations({ tools, categories: allCategories = [] }: { tools: Tool[]; categories?: Category[] }) {
  // Tabs: only categories that have tools, most-populated first (ties keep Sanity's name order).
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    const used = new Map<string, Category>();
    for (const t of tools) if (t.category) { used.set(t.category.slug, t.category); counts.set(t.category.slug, (counts.get(t.category.slug) ?? 0) + 1); }
    const ordered = allCategories.filter((c) => used.has(c.slug));
    for (const c of used.values()) if (!ordered.some((o) => o.slug === c.slug)) ordered.push(c);
    return ordered.sort((a, b) => (counts.get(b.slug) ?? 0) - (counts.get(a.slug) ?? 0));
  }, [tools, allCategories]);

  const [active, setActive] = useState(categories[0]?.slug);
  const visible = tools.filter((t) => t.category?.slug === active);
  const panel = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);

  // Single fast pass: on first view it waits for scroll, on tab change it fires immediately.
  useGSAP(
    () => {
      if (!panel.current) return;
      const items = panel.current.querySelectorAll("li");
      const vars: gsap.TweenVars = { y: 0, scale: 1, autoAlpha: 1, duration: 0.45, stagger: 0.03, ease: "back.out(1.6)", overwrite: true };
      if (firstRun.current) {
        firstRun.current = false;
        vars.scrollTrigger = { trigger: panel.current, start: "top 90%", once: true };
      }
      gsap.fromTo(items, { y: 18, scale: 0.92, autoAlpha: 0 }, vars);
    },
    { dependencies: [active], scope: panel },
  );

  if (categories.length === 0) return null;

  return (
    <section id="integrace" className="scroll-mt-20 bg-paper">
      <Container className="flex flex-col gap-10 py-20 md:py-28">
        <div className="flex flex-col gap-4">
          <Eyebrow>INTEGRACE</Eyebrow>
          <Heading className="max-w-[560px]">Propojujeme se s nástroji, které už používáte</Heading>
          <p data-reveal="up" className="max-w-[640px] text-[16px] text-muted">Přes API napojujeme desítky služeb napříč platbami, CRM, mailingem, dopravou i CMS.</p>
        </div>

        <div role="tablist" aria-label="Kategorie integrací" data-reveal="up" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.slug}
              role="tab"
              type="button"
              aria-selected={active === c.slug}
              onClick={() => { setActive(c.slug); requestAnimationFrame(() => ScrollTrigger.refresh()); }}
              className={cx(
                "rounded-full px-4 py-2.5 text-[14px] font-semibold transition-[background-color,color,border-color,transform] duration-200 hover:-translate-y-0.5 active:scale-95",
                active === c.slug ? "bg-ink text-white" : "border border-line bg-white text-ink hover:border-ink/40",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div role="tabpanel" ref={panel} className="flex flex-col gap-5">
          <p className="text-[13px] font-medium text-muted">{visible.length} propojených nástrojů</p>
          <ul className="flex flex-wrap gap-3">
            {visible.map((t) => (
              <li key={t._id}>
                <a
                  href={t.url}
                  target={t.url?.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex h-18  items-center justify-center rounded-2xl border border-line bg-white p-2 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-lime hover:shadow-[0_18px_30px_-20px_rgba(20,22,15,0.4)]"
                  title={toolLabel(t)}
                >
                  {t.api_image ? (
                    <Image src={t.api_image} alt={toolLabel(t)} width={160} height={48} className="h-14 w-auto max-w-37.5 object-contain rounded-lg" />
                  ) : (
                    <span className="text-[14px] font-semibold text-ink">{toolLabel(t)}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
