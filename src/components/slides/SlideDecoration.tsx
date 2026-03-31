import type { ReactNode } from "react"

interface SlideDecorationProps {
  children: ReactNode
  className?: string
}

export function SlideDecoration({
  children,
  className = "",
}: SlideDecorationProps) {
  return (
    <div className={`flex items-center gap-4 px-12 ${className}`}>
      {children}
    </div>
  )
}
