import type { ReactNode } from "react"

interface SlideBulletsProps {
  children: ReactNode[]
}

export function SlideBullets({ children }: SlideBulletsProps) {
  return (
    <ul className="mt-10 space-y-6">
      {children.map((bullet, i) => (
        <li
          key={i}
          className="flex items-baseline gap-4 text-xl text-slide-dark"
        >
          <span className="text-2xl leading-none">&#xB7;</span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  )
}
