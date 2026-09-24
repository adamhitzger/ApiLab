import { hero } from "@/lib/content";
import { cx, HudCorners } from "@/components/ui";

function Donut({ value, size, stroke, label, sub, className, ...rest }: { value: number; size: number; stroke: number; label: string; sub: string; className?: string } & Record<`data-${string}`, string | boolean | undefined>) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div {...rest} className={cx("grid place-items-center rounded-full bg-white shadow-[0_24px_60px_-28px_rgba(20,22,15,0.45)]", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#e4e6dc" strokeWidth={stroke} fill="none" />
        <circle data-donut={value} data-length={c} cx={size / 2} cy={size / 2} r={r} stroke={value > 50 ? "#cffb2e" : "#ffd23f"} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      <div className="absolute inset-0 grid place-items-center rounded-full bg-white/90 text-center" style={{ margin: stroke + 6 }}>
        <div>
          <p data-count className="font-display text-[22px] font-extrabold leading-none text-ink md:text-[32px]">{label}</p>
          <p className="mt-1 text-[8.5px] font-medium text-muted md:text-[10px]">{sub}</p>
        </div>
      </div>
    </div>
  );
}

const bars = [38, 52, 30, 60, 46, 70, 58];

export function HeroVisual() {
  return (
    <div data-hero-visual className="relative mx-auto aspect-[656/560] w-full max-w-[656px]" aria-hidden>
      <div className="glow-lime pointer-events-none absolute left-[12%] top-[6%] h-[80%] w-[80%] opacity-70 blur-2xl" />

      {/* Dashboard card */}
      <div data-hero-card data-tilt="5" className="absolute left-[22%] top-[17%] w-[68%] rounded-[26px] bg-white p-5 shadow-[0_30px_80px_-30px_rgba(20,22,15,0.35)] md:p-6">
        <HudCorners />
        <div className="flex items-center justify-between pr-16 md:pr-24">
          <div className="flex gap-1.5 pl-6">
            {[0, 1, 2].map((i) => <span key={i} className="size-1.5 rounded-full bg-line" />)}
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-muted">
            <span className="size-1.5 animate-pulse rounded-full bg-lime" /> ŽIVĚ
          </span>
        </div>
        <ul className="mt-4 divide-y divide-line/70">
          {hero.dashboard.map((row) => (
            <li key={row.title} data-hero-row className="flex items-center gap-3 py-2.5 md:py-3">
              <span className={cx("grid size-8 shrink-0 place-items-center rounded-lg text-[14px] font-bold text-ink", row.tone === "lime" ? "bg-lime" : "bg-yellow")}>{row.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-ink md:text-[13.5px]">{row.title}</p>
                <p className="truncate text-[10px] text-muted md:text-[11.5px]">{row.sub}</p>
              </div>
              <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] font-medium text-muted">{row.status}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 border-t border-line/70 pt-4">
          <p className="text-[9px] font-semibold tracking-[0.12em] text-muted md:text-[10px]">ZPRACOVÁNO TENTO TÝDEN</p>
          <div className="mt-3 flex h-12 items-end gap-2">
            {bars.map((h, i) => (
              <span key={i} data-bar className={cx("w-3 origin-bottom rounded-sm md:w-3.5", i === 5 ? "bg-lime" : "bg-ink")} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* 72% donut + badge */}
      <Donut value={72} size={200} stroke={16} label="72%" sub="úkolů automatizováno" className="absolute -right-[4%] top-[2%] origin-top-right scale-[0.6] md:scale-100" data-hero-pop data-float />
      <div data-hero-pop data-float className="absolute right-[27%] top-[-1%] rounded-[16px] bg-ink px-3 py-2.5 text-center text-white shadow-lg md:right-[22%] md:rounded-[20px] md:px-4 md:py-4">
        <p className="font-display text-[14px] font-extrabold leading-none text-lime md:text-[20px]">24/7</p>
        <p className="mt-0.5 text-[8px] text-white/60 md:text-[10px]">bez zásahu</p>
      </div>

      {/* 45% donut + badge */}
      <Donut value={45} size={168} stroke={14} label="45%" sub="méně ruční práce" className="absolute bottom-[9%] left-[1%] origin-bottom-left scale-[0.65] md:scale-100" data-hero-pop data-float />
      <div data-hero-pop data-float className="absolute bottom-[1%] left-[12%] rounded-[16px] bg-white px-3 py-2.5 text-center shadow-[0_20px_50px_-20px_rgba(20,22,15,0.35)] md:left-[8%] md:rounded-[20px] md:px-4 md:py-4">
        <p className="font-display text-[14px] font-extrabold leading-none text-ink md:text-[20px]">0</p>
        <p className="mt-0.5 text-[8px] text-muted md:text-[10px]">ručních exportů</p>
      </div>
    </div>
  );
}
