import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Tone = "dark" | "light" | "muted";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export { cx };

/** 1312px content column with 64px gutters on desktop, 20px on mobile */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-[1440px] px-5 md:px-16", className)} {...props} />;
}

/** Small uppercase section label, e.g. "SLUŽBY" */
export function Eyebrow({ children, tone = "muted", className, reveal = true }: { children: ReactNode; tone?: Tone; className?: string; reveal?: boolean }) {
  const color = tone === "light" ? "text-white/50" : tone === "dark" ? "text-ink" : "text-muted";
  return (
    <p className={cx("text-[13px] font-semibold uppercase tracking-[0.18em]", color, className)} data-reveal={reveal ? "up" : undefined}>
      {children}
    </p>
  );
}

/** Section heading in Bricolage */
export function Heading({ as: Tag = "h2", children, tone = "dark", className, split = true }: { as?: "h1" | "h2" | "h3"; children: ReactNode; tone?: "dark" | "light"; className?: string; split?: boolean }) {
  return (
    <Tag className={cx("font-display text-[32px] font-extrabold leading-[1.1] md:text-[40px]", tone === "light" ? "text-white" : "text-ink", className)} data-split={split ? "" : undefined}>
      {children}
    </Tag>
  );
}

/** Lime pill with a dot, used above hero titles */
export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-[0.12em] text-ink md:text-[11px]", className)}>
      <span className="size-1.5 rounded-full bg-ink" />
      {children}
    </span>
  );
}

/** Rounded tag, e.g. technology chip */
export function Chip({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark" | "outline"; className?: string }) {
  const styles = {
    light: "bg-paper text-ink",
    outline: "bg-white text-ink border border-line",
    dark: "border border-white/15 bg-white/5 text-white/85",
  }[tone];
  return <span className={cx("inline-flex items-center rounded-full px-3 py-[7px] text-[12.5px] font-medium transition-colors duration-300 hover:bg-lime hover:text-ink", styles, className)}>{children}</span>;
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "lime" | "outline" | "ghost-dark";
  arrow?: boolean;
  className?: string;
  size?: "md" | "lg";
};

export function Button({ href, children, variant = "primary", arrow = true, className, size = "md" }: ButtonProps) {
  const base = "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";
  const sizes = size === "lg" ? "px-7 py-4 text-[15px]" : "px-6 py-3.5 text-[14.5px]";
  const variants = {
    primary: "bg-ink text-white hover:bg-ink/90 hover:shadow-[0_18px_40px_-18px_rgba(20,22,15,0.7)]",
    lime: "bg-lime text-ink hover:bg-[#dbff5a] hover:shadow-[0_18px_40px_-16px_rgba(207,251,46,0.8)]",
    outline: "border border-line bg-white text-ink hover:border-ink hover:shadow-[0_18px_40px_-24px_rgba(20,22,15,0.5)]",
    "ghost-dark": "border border-white/20 bg-white/5 text-white hover:border-lime/60 hover:bg-white/10",
  }[variant];
  return (
    <Link href={href} className={cx(base, sizes, variants, className)}>
      {children}
      {arrow && <span aria-hidden className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5">→</span>}
    </Link>
  );
}

/** Numbered lime/yellow square used on cards */
export function NumberBadge({ n, tone = "lime", size = 44, radius = 12, className }: { n: number | string; tone?: "lime" | "yellow"; size?: number; radius?: number; className?: string }) {
  return (
    <span
      className={cx("inline-flex shrink-0 items-center justify-center font-bold text-ink transition-transform duration-500 ease-out group-hover:-rotate-12 group-hover:scale-110", tone === "lime" ? "bg-lime" : "bg-yellow", className)}
      style={{ width: size, height: size, borderRadius: radius, fontSize: size >= 40 ? 14 : 12 }}
    >
      {typeof n === "number" ? String(n).padStart(2, "0") : n}
    </span>
  );
}

/** Corner brackets used as "HUD" decoration on dark cards */
export function HudCorners({ color = "#cffb2e" }: { color?: string }) {
  const s = { borderColor: color };
  return (
    <>
      <span className="pointer-events-none absolute left-5 top-5 size-4 border-l-2 border-t-2" style={s} />
      <span className="pointer-events-none absolute bottom-5 right-5 size-4 border-b-2 border-r-2" style={s} />
    </>
  );
}
