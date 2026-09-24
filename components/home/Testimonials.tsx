import type { Review } from "@/types";
import { Container, Eyebrow, Heading } from "@/components/ui";

export function Testimonials({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;
  return (
    <section id="reference" className="relative scroll-mt-20 overflow-hidden bg-ink-2 texture-dots texture-grain">
      <div data-parallax="0.6" className="glow-lime-soft pointer-events-none absolute -bottom-40 left-1/3 h-[500px] w-[700px]" />
      <Container className="relative flex flex-col gap-14 py-20 md:py-28">
        <div className="flex flex-col gap-4">
          <Eyebrow tone="light">REFERENCE</Eyebrow>
          <Heading tone="light" className="max-w-[760px]">Co říkají klienti, kterým automatizujeme</Heading>
        </div>
        <ul data-reveal-group className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={r._id} className="card-hover-dark group flex flex-col gap-5 rounded-[22px] bg-ink p-7 ring-1 ring-white/10 md:p-8">
              <p className="text-[14px] tracking-widest text-lime transition-[letter-spacing] duration-500 group-hover:tracking-[0.35em]" aria-label="5 z 5 hvězdiček">★★★★★</p>
              <blockquote className="text-[15.5px] leading-relaxed text-white">„{r.text}“</blockquote>
              <div className="mt-auto flex items-center gap-3 pt-2">
                <span className={`grid size-[38px] place-items-center rounded-full text-[15px] font-bold text-ink ${i % 2 ? "bg-yellow" : "bg-lime"}`}>{r.person?.[0]}</span>
                <div>
                  <p className="text-[14px] font-semibold text-white">{r.person}</p>
                  <p className="text-[12.5px] text-white/50">{[r.role, r.company].filter(Boolean).join(" · ")}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
