import { Navbar } from "@/components/layout/Navbar";
import { FooterBottomRow } from "@/components/layout/Footer";
import { Button, Container, Pill } from "@/components/ui";
import { MotionProvider } from "@/components/motion/MotionProvider";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-ink-2 texture-dots texture-grain">
      <div className="glow-lime-soft pointer-events-none absolute left-1/2 top-[10%] h-[680px] w-[900px] -translate-x-1/2" />
      <MotionProvider />
      <Navbar tone="dark" />
      <main className="relative flex flex-1 items-center">
        <Container className="flex flex-col items-center gap-6 py-20 text-center">
          <div data-hero-item><Pill>Chyba 404 · Stránka nenalezena</Pill></div>
          <p data-hero-pop className="text-gradient font-display text-[128px] font-extrabold leading-[0.9] tracking-[-0.04em] md:text-[200px]">404</p>
          <h1 data-hero-title className="max-w-[760px] font-display text-[28px] font-extrabold leading-[1.1] text-white md:text-[40px]">
            Tenhle proces jsme ještě nezautomatizovali.
          </h1>
          <p data-hero-item className="max-w-[560px] text-[15px] leading-relaxed text-white/60 md:text-[17px]">
            Stránka, kterou hledáte, neexistuje nebo se přestěhovala. Zkontrolujte adresu, nebo se vraťte na některou z cest níže — tam už všechno běží.
          </p>
          <div data-hero-item className="flex w-full flex-col gap-3.5 sm:w-auto sm:flex-row">
            <Button href="/" variant="lime">Zpět na úvod</Button>
            <Button href="/projekty" variant="ghost-dark" arrow={false}>Naše projekty</Button>
          </div>
          <p data-hero-item className="text-[13.5px] text-white/45">
            Nebo nám napište na <a href="mailto:hello@automa.cz" className="text-white/70">hello@automa.cz</a> — odpovíme do 24 hodin.
          </p>
        </Container>
      </main>
      <Container className="relative pb-8">
        <FooterBottomRow />
      </Container>
    </div>
  );
}
