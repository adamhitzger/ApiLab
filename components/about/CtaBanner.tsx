import { ctaBanner } from "@/lib/content";
import { Button, Container } from "@/components/ui";

export function CtaBanner({ title = ctaBanner.title, text = ctaBanner.text, button = ctaBanner.button }: Partial<typeof ctaBanner>) {
  return (
    <section className="relative overflow-hidden bg-ink-2 texture-dots texture-grain">
      <Container className="relative flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:py-14">
        <div data-reveal="left" className="flex flex-col gap-2">
          <h2 className="font-display text-[24px] font-extrabold text-white md:text-[26px]">{title}</h2>
          <p className="max-w-[560px] text-[15.5px] text-white/60">{text}</p>
        </div>
        <div data-reveal="right" className="self-start md:self-auto"><Button href="/#kontakt" variant="lime" size="lg">{button}</Button></div>
      </Container>
    </section>
  );
}
