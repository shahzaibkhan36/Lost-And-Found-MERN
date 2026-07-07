export default function Logo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00DBDE" />
          <stop offset="1" stopColor="#FC00FF" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="19" fill="url(#logoGrad)" stroke="white" strokeOpacity="0.3" />
      <path
        d="M13 21.5c0-3.6 2.9-6.5 6.5-6.5.9 0 1.7.2 2.5.5M27 18.5c0 3.6-2.9 6.5-6.5 6.5-.9 0-1.7-.2-2.5-.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="14" r="1.8" fill="white" />
      <circle cx="16" cy="26" r="1.8" fill="white" />
    </svg>
  );
}
