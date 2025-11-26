import type { SVGProps } from "react";

export default function DiasporaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Diaspora AI Logo"
      role="img"
      {...props}
    >
      {/* Blue rounded background */}
      <rect width="64" height="64" rx="14" fill="#2196F3" />
      
      {/* Robot/Bot icon - centered */}
      <g>
        {/* Antenna stem */}
        <rect x="30.5" y="16" width="3" height="10" rx="1.5" fill="white" />
        
        {/* Antenna ball */}
        <circle cx="32" cy="14" r="3.5" fill="white" />
        
        {/* Robot head (rounded rectangle) */}
        <rect x="16" y="26" width="32" height="26" rx="7" fill="white" />
        
        {/* Left eye */}
        <circle cx="25" cy="36" r="3.5" fill="#2196F3" />
        
        {/* Right eye */}
        <circle cx="39" cy="36" r="3.5" fill="#2196F3" />
        
        {/* Smile */}
        <path
          d="M 23 44 Q 32 49 41 44"
          stroke="#2196F3"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}