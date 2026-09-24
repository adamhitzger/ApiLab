"use client";

import { useState } from "react";
import { faq } from "@/lib/content";
import { Container, cx, Eyebrow, Heading } from "@/components/ui";
import { IconChevron } from "@/components/ui/Icons";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-paper">
      <Container className="flex flex-col gap-12 py-20 md:py-28">
        <div className="flex flex-col gap-4">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <Heading>{faq.title}</Heading>
        </div>
        <ul data-reveal-group className="flex flex-col gap-3.5">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={cx("hairline-light rounded-[18px] transition-shadow duration-300 hover:shadow-[0_18px_40px_-28px_rgba(20,22,15,0.4)]", isOpen && "shadow-[0_18px_40px_-28px_rgba(20,22,15,0.4)]")}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-7"
                  >
                    <span className="text-[15.5px] font-semibold text-ink">{item.q}</span>
                    <IconChevron className={cx("shrink-0 text-ink transition-transform duration-400", isOpen && "rotate-180 text-lime")} />
                  </button>
                </h3>
                <div id={`faq-${i}`} className="acc" data-open={isOpen} aria-hidden={!isOpen}>
                  <div>
                    <p className="max-w-[900px] px-6 pb-6 text-[14.5px] leading-relaxed text-muted md:px-7">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
