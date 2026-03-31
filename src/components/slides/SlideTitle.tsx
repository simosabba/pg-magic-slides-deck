import type { ReactNode } from "react"

interface SlideTitleProps {
  children: ReactNode
}

export function SlideTitle({ children }: SlideTitleProps) {
  return (
    <h1 className="text-6xl font-extrabold leading-tight text-slide-dark">
      {children}
    </h1>
  )
}
