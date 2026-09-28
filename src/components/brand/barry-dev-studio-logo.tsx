type LogoProps = {
  variant?: "dark" | "light" | "mark";
  className?: string;
  /** Use inside an already-labelled home link to avoid a duplicate announcement. */
  decorative?: boolean;
};

/** Option 8: two folded, parallel blades separated by a consistent diagonal gap. */
export function BarryDevStudioLogo({ variant = "dark", className = "", decorative = false }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={variant === "mark" ? "0 0 104 104" : "0 0 520 104"}
      width={variant === "mark" ? 104 : 520}
      height={104}
      className={`brand-logo ${className}`.trim()}
      data-variant={variant}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Barry Dev Studio"}
      aria-hidden={decorative || undefined}
      focusable="false"
    >
      <g className="brand-logo-mark" fill="#EB5E28">
        <path d="M2 60 56 6Q62 0 68 3Q72 5 72 11V25Q72 27 70 29L39 60Z" />
        <path d="M49 65 102 12V50L49 103Z" />
      </g>
      {variant !== "mark" && (
        <text
          className="brand-logo-wordmark"
          x="128"
          y="61"
          fill={variant === "dark" ? "#FFFFFF" : "#000000"}
          fontFamily="var(--font-geist-sans), Geist, Arial, sans-serif"
          fontSize="50"
          fontWeight="650"
          letterSpacing="-1.5"
        >Barry Dev Studio</text>
      )}
    </svg>
  );
}
