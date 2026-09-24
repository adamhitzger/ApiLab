import { ImageResponse } from "next/og";
import { brandMark } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS ignores SVG touch icons, so app/icon.svg is rasterised here. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <img src={brandMark} width={size.width} height={size.height} alt="" />
      </div>
    ),
    size,
  );
}
