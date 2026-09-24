import { Container, Pill } from "@/components/ui";

export function ProjectsHero({ count }: { count: number }) {
  const stats = [`${count} ${count === 1 ? "projekt" : count < 5 ? "projekty" : "projektů"} v provozu`, "15+ API, se kterými pracujeme", "Monitoring 24/7"];
  return (
    <section className="bg-white">
      <Container className="flex flex-col gap-7 pb-10 pt-12 md:pb-16 md:pt-[88px]">
        <div data-hero-item className="self-start"><Pill>{count > 0 ? `Projekty · ${count} v provozu` : "Projekty"}</Pill></div>
        <h1 data-hero-title className="max-w-[820px] font-display text-[40px] font-extrabold leading-[1] text-ink md:text-[64px]">
          Automatizace,
          <br />
          které už běží v provozu.
        </h1>
        <p data-hero-item className="max-w-[640px] text-[16px] leading-relaxed text-muted md:text-[18px]">
          Žádné koncepty ani demo. Automatizace, které dnes šetří klientům hodiny týdně — od CNC výroby přes obchod a marketing až po účetnictví. U každé najdete, co bylo špatně, jak jsme to postavili a co to přineslo.
        </p>
        {count > 0 && (
        <ul data-hero-item className="flex flex-col gap-2 text-[13px] font-medium text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
          {stats.map((s, i) => (
            <li key={s} className="flex items-center gap-2 sm:gap-5">
              {i > 0 && <span className="hidden size-[3px] rounded-full bg-muted sm:block" />}
              <span className="size-1.5 rounded-full bg-lime sm:hidden" />
              {s}
            </li>
          ))}
        </ul>
        )}
      </Container>
    </section>
  );
}
