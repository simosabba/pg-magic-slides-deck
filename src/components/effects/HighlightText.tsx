import type { ReactNode } from "react"

interface HighlightTextProps {
  children: ReactNode
  className?: string
}

export function HighlightText({
  children,
  className = "",
}: HighlightTextProps) {
  return (
    <span className={`bg-[var(--color-slide-dark)] px-1 text-white ${className}`}>{children}</span>
  )
}
