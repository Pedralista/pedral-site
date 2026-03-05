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
            M 50,0  L 100,100  L 74,100  L 50,87  L 26,100  L 0,100  Z
            M 50,23 L 75,53   L 50,70   L 24,53  Z
            M 50,70 L 74,100  L 50,87   L 26,100 Z
          "
          fill="#c9a84c"
        />
      </svg>
    ),
    { ...size }
  );
}
