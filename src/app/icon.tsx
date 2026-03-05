import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "#0a1214",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #c9a84c",
        }}
      >
        <span
          style={{
            fontFamily: "serif",
            fontSize: 18,
            fontWeight: 300,
            color: "#c9a84c",
            lineHeight: 1,
          }}
        >
          P
        </span>
      </div>
    ),
    { ...size }
  );
}
