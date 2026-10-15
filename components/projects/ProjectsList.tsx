"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import type { Project } from "@/types";
import { Button, Chip, Container, cx, NumberBadge } from "@/components/ui";
import { firstSection, ProjectBody } from "./ProjectBody";

export function ProjectsList({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const p of projects) if (p.category && !seen.has(p.category.slug)) seen.set(p.category.slug, p.category.name);
    return [...seen.entries()];
  }, [projects]);

  const [active, setActive] = useState<string>("all");
  const list = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  // Every section stays mounted and filtering only toggles `display`. Unmounting them
  // would hand back DOM nodes that MotionProvider never sees — those keep the CSS
  // `visibility: hidden` from [data-reveal] and the section renders blank until reload.
  const shown = projects.map((p) => active === "all" || p.category?.slug === active);
  let rank = 0;
  const order = shown.map((visible) => (visible ? rank++ : -1));

  useGSAP(
    () => {
      if (!list.current) return;
      if (first.current) {
        first.current = false; // first paint belongs to MotionProvider's scroll reveals
        return;
      }
      gsap.fromTo(
        list.current.querySelectorAll("[data-block]:not([hidden])"),
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, ease: "expo.out", overwrite: true, onComplete: () => ScrollTrigger.refresh() },
      );
    },
    { dependencies: [active], scope: list },
  );

  return (
    <>
      {categories.length > 1 && (
        <div className="bg-white">
          <Container data-reveal-group className="flex flex-wrap items-center gap-2.5 pb-10">
            <span className="mr-3 hidden text-[12.5px] font-semibold uppercase tracking-[0.18em] text-muted md:block">Filtr</span>
            {[["all", "Vše"], ...categories].map(([slug, name]) => (
              <button
                key={slug}
                type="button"
                onClick={() => setActive(slug)}
                aria-pressed={active === slug}
                className={cx(
                  "rounded-full px-4 py-2.5 text-[14px] font-semibold transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-0.5 active:scale-95",
                  active === slug ? "bg-ink text-white" : "border border-line bg-white text-ink hover:border-ink/40",
                )}
              >
                {name}
              </button>
            ))}
          </Container>
        </div>
      )}

      <div ref={list}>
      {projects.map((p, i) => (
        <section
          key={p._id}
          id={p.slug}
          data-block
          hidden={!shown[i]}
          className={cx("scroll-mt-24", order[i] % 2 === 0 ? "bg-paper" : "bg-white")}
        >
          <Container className="grid gap-10 py-16 md:py-[88px] lg:grid-cols-[520px_1fr] lg:gap-16">
            <div data-reveal="left" className="group flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <NumberBadge n={order[i] + 1} tone={order[i] % 2 ? "yellow" : "lime"} size={38} radius={11} />
                {p.category && <span className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-muted">{p.category.name}</span>}
              </div>
              <h2 className="font-display text-[28px] font-extrabold leading-[1.08] text-ink md:text-[36px]">
                <Link href={`/projekty/${p.slug}`} className="transition-colors hover:text-ink/70">{p.heading}</Link>
              </h2>
              {p.heading2 && <p className="text-[14.5px] font-semibold text-muted">{p.heading2}</p>}
              <p className="text-[16px] leading-[1.6] text-muted md:text-[16.5px]">{p.overview}</p>
              {p.pills?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {p.pills.map((c) => <Chip key={c} tone="outline">{c}</Chip>)}
                </div>
              )}
              <Button href={`/projekty/${p.slug}`} variant="outline" className="mt-2 self-start">Celý projekt</Button>
            </div>
            <div data-reveal="right" data-tilt="4">
              <ProjectBody
                value={firstSection(p.text ?? [])}
                footer={
                  <Link href={`/projekty/${p.slug}`} className="group/more mt-7 flex items-center gap-1.5 border-t border-white/10 pt-6 text-[14px] font-semibold text-lime">
                    Jak jsme to vyřešili a co to přineslo
                    <span aria-hidden className="inline-block transition-transform duration-300 group-hover/more:translate-x-1.5">→</span>
                  </Link>
                }
              />
            </div>
          </Container>
        </section>
      ))}
      </div>
    </>
  );
}
