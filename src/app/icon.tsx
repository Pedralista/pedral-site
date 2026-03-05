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
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="
            M 50,0  L 95,99 L 78,99 L 69,80 L 50,100 L 31,80 L 22,99 L 5,99 Z
            M 63,65 L 50,36 L 37,65 L 50,79 Z
          "
          fill="#0a1214"
        />
      </svg>
    ),
    { ...size }
  );
}
