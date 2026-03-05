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
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 100 105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer A shape with pointed feet and V notch */}
          <path
            d="M50 2 L88 95 L63 95 L50 76 L37 95 L12 95 Z"
            fill="#c9a84c"
          />
          {/* Diamond cutout */}
          <path
            d="M50 28 L65 52 L50 66 L35 52 Z"
            fill="#0a1214"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
