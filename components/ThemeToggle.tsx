"use client";

/**
 * Theme toggle — flips <html data-theme> and persists to localStorage.
 * Icon visibility is driven purely by the `dark:` CSS variant (not React
 * state), so it renders identically on server and client — no hydration
 * flash. The initial attribute is set by the inline script in layout.tsx.
 */
export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const toggle = () => {
    const el = document.documentElement;
    const next = el.getAttribute("data-theme") === "dark" ? "light" : "dark";
    el.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage may be blocked — theme still applies for this session */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle theme"
      className={`group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-sumi/20 text-sumi transition-colors hover:border-vermilion hover:text-vermilion ${className}`}
    >
      {/* Moon — shown in light mode (tap to go dark) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[18px] w-[18px] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      {/* Sun — shown in dark mode (tap to go light) */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
