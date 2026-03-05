import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="16" fill="#0a1214" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="
            M 50,6  L 93,94 L 77,94 L 69,76 L 50,96 L 31,76 L 23,94 L 7,94 Z
            M 63,62 L 50,34 L 37,62 L 50,75 Z
          "
          fill="#c9a84c"
        />
      </svg>
    ),
    { ...size }
  );
}
