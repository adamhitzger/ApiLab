"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "./gsap";

const REVEAL_FROM: Record<string, gsap.TweenVars> = {
  up: { y: 72, autoAlpha: 0 },
  left: { x: -80, autoAlpha: 0, rotation: -1.5 },
  right: { x: 80, autoAlpha: 0, rotation: 1.5 },
  scale: { scale: 0.86, autoAlpha: 0 },
  clip: { clipPath: "inset(0 0 100% 0)", autoAlpha: 1 },
};

const q = <T extends Element = HTMLElement>(sel: string) => Array.from(document.querySelectorAll<T>(sel));

/** background-clip:text does not survive a transformed child — give each split word its own gradient */
function adoptGradient(words: HTMLElement[]) {
  words.forEach((w) => {
    const g = w.parentElement?.closest(".text-gradient");
    if (g && g !== w) w.classList.add("text-gradient");
  });
}

function enter(trigger: Element, extra?: ScrollTrigger.Vars): ScrollTrigger.Vars {
  return { trigger, start: "top 86%", once: true, ...extra };
}

export function MotionProvider() {
  const pathname = usePathname();
  const progress = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal], [data-split], [data-hero-item], [data-reveal-group] > *", { autoAlpha: 1, clearProps: "transform,clipPath" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* --- scroll progress bar ------------------------------------ */
        if (progress.current) {
          gsap.fromTo(progress.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
        }

        /* --- hero load sequence -------------------------------------- */
        const heroItems = q("[data-hero-item]");
        if (heroItems.length) {
          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
          const title = document.querySelector<HTMLElement>("[data-hero-title]");
          if (title) {
            SplitText.create(title, {
              type: "lines,words",
              mask: "lines",
              autoSplit: true,
              onSplit(self) {
                adoptGradient(self.words as HTMLElement[]);
                gsap.set(title, { autoAlpha: 1 });
                return gsap.from(self.words, { yPercent: 130, rotation: 8, autoAlpha: 0, duration: 0.9, stagger: 0.05, ease: "expo.out", delay: 0.1 });
              },
            });
          }
          tl.fromTo(heroItems, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07 }, 0.3);

          const card = document.querySelector("[data-hero-card]");
          if (card) tl.fromTo(card, { y: 120, rotation: -6, scale: 0.9, autoAlpha: 0 }, { y: 0, rotation: 0, scale: 1, autoAlpha: 1, duration: 1, ease: "expo.out" }, 0.15);
          tl.fromTo("[data-hero-pop]", { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.65, stagger: 0.06, ease: "back.out(2.4)" }, 0.4);
          tl.fromTo("[data-hero-row]", { x: 40, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 }, 0.45);
          tl.fromTo("[data-bar]", { scaleY: 0 }, { scaleY: 1, duration: 0.6, stagger: 0.04, ease: "back.out(1.8)", transformOrigin: "bottom" }, 0.7);

          q<SVGCircleElement>("[data-donut]").forEach((c) => {
            const target = Number(c.dataset.donut);
            const len = Number(c.getAttribute("data-length"));
            tl.fromTo(c, { strokeDashoffset: len }, { strokeDashoffset: len * (1 - target / 100), duration: 1.1, ease: "expo.inOut" }, 0.5);
          });

          // hero visual drifts up & tilts away as you scroll past
          const visual = document.querySelector("[data-hero-visual]");
          if (visual) {
            gsap.to(visual, { yPercent: -18, rotation: -3, ease: "none", scrollTrigger: { trigger: visual, start: "top top", end: "bottom top", scrub: true } });
          }
        }

        /* --- headings: words out of a line mask ----------------------- */
        q("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines,words",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              adoptGradient(self.words as HTMLElement[]);
              gsap.set(el, { autoAlpha: 1 });
              return gsap.from(self.words, {
                yPercent: 120,
                rotation: 5,
                autoAlpha: 0,
                duration: 0.85,
                stagger: 0.035,
                ease: "expo.out",
                scrollTrigger: enter(el),
              });
            },
          });
        });

        /* --- single reveals ------------------------------------------- */
        q("[data-reveal]").forEach((el) => {
          const kind = el.dataset.reveal || "up";
          const from = REVEAL_FROM[kind] ?? REVEAL_FROM.up;
          const to: gsap.TweenVars = { x: 0, y: 0, scale: 1, rotation: 0, autoAlpha: 1, duration: 0.9 };
          if (kind === "clip") to.clipPath = "inset(0 0 0% 0)";
          gsap.fromTo(el, from, { ...to, scrollTrigger: enter(el) });
        });

        /* --- staggered groups ----------------------------------------- */
        q("[data-reveal-group]").forEach((group) => {
          const items = Array.from(group.children);
          gsap.fromTo(
            items,
            { y: 90, rotation: 2.5, autoAlpha: 0, transformOrigin: "left bottom" },
            { y: 0, rotation: 0, autoAlpha: 1, duration: 0.85, stagger: 0.08, ease: "back.out(1.4)", scrollTrigger: enter(group, { start: "top 84%" }) },
          );
        });

        /* --- scrubbed parallax ---------------------------------------- */
        q("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax || 0.2);
          gsap.fromTo(
            el,
            { yPercent: amount * 60 },
            { yPercent: -amount * 60, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        /* --- scrubbed scale-in (featured cards) ----------------------- */
        q("[data-scrub-scale]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 0.88, rotationX: 12, autoAlpha: 0.4, transformPerspective: 1200, transformOrigin: "center top" },
            { scale: 1, rotationX: 0, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 45%", scrub: 0.6 } },
          );
        });

        /* --- hazard stripe drift -------------------------------------- */
        q("[data-hazard]").forEach((el) => {
          gsap.to(el, { backgroundPositionX: "-=420px", ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
        });

        /* --- count-ups ------------------------------------------------- */
        q("[data-count]").forEach((el) => {
          const raw = el.dataset.countOriginal ?? (el.dataset.countOriginal = el.textContent ?? "");
          const match = raw.match(/^([^\d]*?)(\d[\d\s]*)(.*)$/);
          if (!match) return;
          const [, prefix, rawNum, rest] = match;
          const num = rawNum.trimEnd();
          const suffix = rawNum.slice(num.length) + rest;
          const target = Number(num.replace(/\s/g, ""));
          const grouped = /\s/.test(num); // "7 500" keeps thousands grouping, "2024" stays a year
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: enter(el, { start: "top 92%" }),
            onUpdate: () => {
              const v = Math.round(obj.v);
              el.textContent = `${prefix}${grouped ? v.toLocaleString("cs-CZ") : String(v)}${suffix}`;
            },
          });
        });

        /* --- floaters -------------------------------------------------- */
        q("[data-float]").forEach((el, i) => {
          gsap.to(el, { y: i % 2 ? 10 : -12, rotation: i % 2 ? -2 : 2, duration: 2.6 + i * 0.4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.8 });
        });

        /* --- pointer tilt ---------------------------------------------- */
        const cleanups: Array<() => void> = [];
        q("[data-tilt]").forEach((el) => {
          const max = Number(el.dataset.tilt || 8);
          gsap.set(el, { transformPerspective: 900, transformStyle: "preserve-3d" });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ry(px * max * 2);
            rx(-py * max * 2);
          };
          const leave = () => { rx(0); ry(0); };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
        });

        return () => cleanups.forEach((fn) => fn());
      });

      // fonts change line breaks → re-measure triggers
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  // hash links (/#sluzby) need a refresh once the target section has painted
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => clearTimeout(t);
  }, [pathname]);

  return <div ref={progress} aria-hidden className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left scale-x-0 bg-lime" />;
}
