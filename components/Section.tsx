import type { ReactNode } from "react";

export default function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-20 px-5 py-14 sm:px-8 sm:py-20 ${className}`}
    >
      {children}
    </section>
  );
}
