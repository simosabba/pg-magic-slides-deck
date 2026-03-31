import type { ReactNode } from "react"

interface SlideSubtitleProps {
  children: ReactNode
  className?: string
}

export function SlideSubtitle({
  children,
  className = "",
}: SlideSubtitleProps) {
  return <p className={`mt-6 text-xl ${className}`}>{children}</p>
}
