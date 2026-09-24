import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "./content";

/** Shared renderer for /opengraph-image and /twitter-image. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Same mark as app/icon.svg — satori renders it from a data URI. */
export const brandMark = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><rect width="64" height="64" rx="14" fill="#cffb2e"/><path fill="#14160f" fill-rule="evenodd" d="M27.9 13h8.2l11.5 38h-8.9l-2.3-8.1h-8.8L25.3 51h-8.9L27.9 13ZM32 21l4.6 14.6h-9.2L32 21Z"/></svg>`,
).toString("base64")}`;

// Fonts do not depend on the request, so they are read once at module scope.
const fonts = Promise.all([
  readFile(join(process.cwd(), "app/_fonts/BricolageGrotesque-ExtraBold.ttf")),
  readFile(join(process.cwd(), "app/_fonts/InstrumentSans-Medium.ttf")),
]).then(([display, sans]) => [
  { name: "Bricolage", data: display, weight: 800 as const, style: "normal" as const },
  { name: "Instrument", data: sans, weight: 500 as const, style: "normal" as const },
]);

export async function renderOgImage({ title, description }: { title: string; description: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: "#14160f",
          backgroundImage: "radial-gradient(circle at 78% 10%, rgba(207,251,46,0.20) 0%, rgba(20,22,15,0) 55%)",
          color: "#ffffff",
          fontFamily: "Instrument",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brandMark} width={56} height={56} alt="" />
          <span style={{ fontFamily: "Bricolage", fontSize: 40, letterSpacing: -1 }}>{site.name}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span style={{ fontFamily: "Bricolage", fontSize: 68, lineHeight: 1.08, letterSpacing: -2, maxWidth: 940 }}>{title}</span>
          <span style={{ fontSize: 30, lineHeight: 1.4, color: "rgba(255,255,255,0.68)", maxWidth: 900 }}>{description}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "rgba(255,255,255,0.55)" }}>
          <span style={{ display: "flex", width: 14, height: 14, borderRadius: 4, background: "#cffb2e" }} />
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
          <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
          <span>{site.email}</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts },
  );
}
