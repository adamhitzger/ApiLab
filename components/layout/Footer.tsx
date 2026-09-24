import Link from "next/link";
import { nav, nextSteps, site } from "@/lib/content";
import { Container, NumberBadge } from "@/components/ui";
import { Logo } from "@/components/ui/Logo";
import { ContactForm } from "./ContactForm";
import { CookieSettingsButton } from "./CookieSettingsButton";

export function FooterBottomRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 text-[13px] text-white/40 md:flex-row md:items-center md:justify-between ${className}`}>
      <p>© {new Date().getFullYear()} AUTOMA. Všechna práva vyhrazena.</p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/ochrana-osobnich-udaju" className="hover:text-white/70">Ochrana osobních údajů</Link>
        <Link href="/obchodni-podminky" className="hover:text-white/70">Obchodní podmínky</Link>
        <CookieSettingsButton className="hover:text-white/70" />
      </div>
    </div>
  );
}

function NextStepsCard() {
  return (
    <aside className="card-hover-dark relative flex flex-col gap-7 rounded-3xl border border-white/10 bg-ink/70 p-7 md:p-11">
      <p className="text-[12.5px] font-semibold uppercase tracking-[0.18em] text-white/40">{nextSteps.eyebrow}</p>
      <h3 className="font-display text-[22px] font-extrabold leading-[1.12] text-white md:text-[28px]">{nextSteps.title}</h3>
      <ol className="flex flex-col gap-5">
        {nextSteps.steps.map((s, i) => (
          <li key={s.title} className="group flex gap-4">
            <NumberBadge n={i + 1} tone={i === 1 ? "yellow" : "lime"} size={38} radius={100} />
            <div>
              <p className="text-[15.5px] font-semibold text-white">{s.title}</p>
              <p className="mt-1 text-[14px] leading-relaxed text-white/55">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <hr className="border-white/10" />
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-full border-[1.5px] border-lime bg-white/10 text-[13px] font-bold text-lime">AH</span>
        <div>
          <p className="text-[14.5px] font-semibold text-white">{site.owner}</p>
          <p className="text-[12.5px] text-white/50">zakladatel · odpovídá na každou poptávku osobně</p>
        </div>
      </div>
    </aside>
  );
}

export function Footer() {
  return (
    <footer id="kontakt" className="relative overflow-hidden bg-ink-2 text-white texture-dots texture-grain">
      <div data-parallax="0.4" className="glow-lime-soft pointer-events-none absolute -left-40 top-10 h-[680px] w-[900px]" />
      <Container className="relative flex flex-col gap-16 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <h2 data-split className="font-display text-[32px] font-extrabold leading-[1.1] md:text-[38px]">Máte proces, který vás zdržuje?</h2>
            <p data-reveal="up" className="max-w-[560px] text-[16px] leading-relaxed text-white/60">
              Pojďme ho zautomatizovat — napište nám a probereme, kde má automatizace ve vaší firmě smysl.
            </p>
            <div data-reveal="up"><ContactForm /></div>
          </div>
          <div data-reveal="right"><NextStepsCard /></div>
        </div>

        <hr className="border-white/10" />

        <div data-reveal-group className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,auto)] md:gap-16">
          <div className="flex flex-col gap-3.5">
            <Logo tone="light" />
            <p className="max-w-[320px] text-[14px] leading-relaxed text-white/55">{site.tagline}</p>
          </div>
          <FooterCol title="Navigace">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="w-fit transition-[color,transform] duration-300 hover:translate-x-1 hover:text-lime">{n.label}</Link>
            ))}
          </FooterCol>
          <FooterCol title="Kontakt">
            <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            <span>{site.owner} · IČO {site.ico}</span>
            <span>{site.address}</span>
            <span className="text-[12.5px] text-white/40">{site.legal}</span>
          </FooterCol>
          <FooterCol title="Sledujte nás">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">{s.label}</a>
            ))}
          </FooterCol>
        </div>

        <FooterBottomRow />
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3.5 text-[14.5px] font-medium text-white/85">
      <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-white/40">{title}</p>
      {children}
    </div>
  );
}
