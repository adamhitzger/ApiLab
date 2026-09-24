"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";
import { Container, cx } from "@/components/ui";
import { Logo } from "@/components/ui/Logo";
import { IconClose, IconMenu } from "@/components/ui/Icons";
import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";

export function Navbar({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);
  const isDark = tone === "dark";

  // Slide the bar away when scrolling down, bring it back on scroll up; compact after 40px.
  useGSAP(
    () => {
      const el = header.current;
      if (!el) return;
      const show = gsap.quickTo(el, "yPercent", { duration: 0.45, ease: "power3.out" });
      ScrollTrigger.create({
        start: "top -80",
        end: "max",
        onUpdate: (self) => {
          if (open) return show(0);
          show(self.direction === 1 && self.scroll() > 120 ? -100 : 0);
        },
        onLeaveBack: () => show(0),
      });
      ScrollTrigger.create({
        start: "top -40",
        end: "max",
        toggleClass: { targets: el, className: "is-scrolled" },
      });
    },
    { dependencies: [open], revertOnUpdate: true },
  );

  useGSAP(() => {
    if (header.current) gsap.from(header.current, { yPercent: -100, autoAlpha: 0, duration: 0.9, ease: "expo.out" });
  });

  useGSAP(
    () => {
      if (!open || !menu.current) return;
      gsap.fromTo(menu.current.querySelectorAll("a"), { x: -24, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06, ease: "expo.out" });
    },
    { dependencies: [open], scope: menu },
  );

  return (
    <header
      ref={header}
      className={cx(
        "group/nav sticky top-0 z-40 border-b transition-[box-shadow,background-color] duration-300 [&.is-scrolled]:shadow-[0_10px_40px_-20px_rgba(20,22,15,0.35)]",
        isDark ? "border-white/10 bg-ink-2/80 backdrop-blur" : "border-line bg-white/90 backdrop-blur",
      )}
    >
      <Container className="flex h-[58px] items-center justify-between transition-[height] duration-300 md:h-[83px] group-[.is-scrolled]/nav:md:h-[64px]">
        <Logo tone={isDark ? "light" : "dark"} className="transition-transform duration-300 hover:-rotate-2" />

        <nav className="hidden items-center gap-9 md:flex" aria-label="Hlavní navigace">
          {nav.map((item) => {
            const active = item.href !== "/" && !item.href.startsWith("/#") && pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cx("nav-link text-[14.5px] font-medium transition-colors", isDark ? "text-white/85 hover:text-white" : "text-ink/85 hover:text-ink")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/#kontakt"
          className={cx(
            "group hidden items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 active:scale-95 md:inline-flex",
            isDark ? "bg-lime text-ink hover:shadow-[0_16px_30px_-16px_rgba(207,251,46,0.8)]" : "bg-ink text-white hover:bg-ink/90 hover:shadow-[0_16px_30px_-16px_rgba(20,22,15,0.7)]",
          )}
        >
          Konzultace zdarma <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cx("inline-flex size-10 items-center justify-center rounded-full transition-transform active:scale-90 md:hidden", isDark ? "text-white" : "text-ink")}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zavřít menu" : "Otevřít menu"}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" ref={menu} className={cx("border-t md:hidden", isDark ? "border-white/10 bg-ink-2" : "border-line bg-white")}>
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className={cx("rounded-xl px-3 py-3 text-[16px] font-medium", isDark ? "text-white" : "text-ink hover:bg-paper")}>
                {item.label}
              </Link>
            ))}
            <Link href="/#kontakt" onClick={close} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3.5 text-[15px] font-semibold text-ink">
              Konzultace zdarma <span aria-hidden>→</span>
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
