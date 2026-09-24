import Link from "next/link";
import { cx } from "./index";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={cx("inline-flex items-center gap-2.5", className)} aria-label="ApiLab — úvod">
      <span className="size-3 rounded-[3px] bg-lime" />
      <span className={cx("font-display text-[20px] font-extrabold tracking-tight", tone === "light" ? "text-white" : "text-ink")}>ApiLab</span>
    </Link>
  );
}
