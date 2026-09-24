import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function IconChart(p: P) {
  return (<svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="M5 20V12M12 20V5M19 20v-8" /></svg>);
}
export function IconSpark(p: P) {
  return (<svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>);
}
export function IconCode(p: P) {
  return (<svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>);
}
export function IconTarget(p: P) {
  return (<svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>);
}
export function IconRefresh(p: P) {
  return (<svg viewBox="0 0 24 24" width="64" height="64" {...base} strokeWidth={2.4} {...p}><path d="M20 12a8 8 0 1 1-2.34-5.66" /><path d="M20 4v5h-5" /></svg>);
}
export function IconChip(p: P) {
  return (
    <svg viewBox="0 0 24 24" width="64" height="64" {...base} strokeWidth={2} {...p}>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 10.5h4M10 13.5h4" />
      <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
    </svg>
  );
}
export function IconCheck(p: P) {
  return (<svg viewBox="0 0 24 24" width="14" height="14" {...base} strokeWidth={2.6} {...p}><path d="m5 12 4.5 4.5L19 7" /></svg>);
}
export function IconMenu(p: P) {
  return (<svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}><path d="M3 6h18M3 12h18M3 18h18" /></svg>);
}
export function IconClose(p: P) {
  return (<svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
}
export function IconChevron(p: P) {
  return (<svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>);
}
