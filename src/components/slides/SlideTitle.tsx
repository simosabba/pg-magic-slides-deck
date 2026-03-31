import type { ReactNode } from "react"

interface SlideTitleProps {
  children: ReactNode
}

export function SlideTitle({ children }: SlideTitleProps) {
  return (
    <h1 className="slide-title inline-block bg-black px-2 text-5xl font-bold leading-tight text-white">
      {children}
    </h1>
  )
}
