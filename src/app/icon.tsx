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
          width="22"
          height="22"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50 2 L96 96 L68 96 L50 72 L32 96 L4 96 Z M50 28 L62 52 L50 64 L38 52 Z"
            fill="#c9a84c"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
