import { Container, Eyebrow, Heading } from "@/components/ui";
import { site } from "@/lib/content";

export function LegalPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="bg-paper">
      <Container className="flex max-w-[900px] flex-col gap-6 py-16 md:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading as="h1">{title}</Heading>
        <div className="flex flex-col gap-4 text-[16px] leading-relaxed text-muted [&_h2]:mt-6 [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:font-extrabold [&_h2]:text-ink">
          {children}
        </div>
        <p className="mt-6 text-[13.5px] text-muted">
          {site.owner} · IČO {site.ico} · {site.address} · {site.email}
        </p>
      </Container>
    </section>
  );
}
