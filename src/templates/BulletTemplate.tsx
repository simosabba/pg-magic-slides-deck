import type { ReactNode } from "react"

interface BulletTemplateProps {
  title: ReactNode
  bullets: ReactNode[]
}

export function BulletTemplate({ title, bullets }: BulletTemplateProps) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Top decoration */}
      <div className="flex items-center gap-4 px-12 pt-8">
        <div className="h-1.5 w-12 bg-[var(--color-slide-dark)]" />
        <div className="h-[3px] flex-1 bg-[var(--color-slide-dark)]" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-start px-16 pt-10">
        <h1 className="text-6xl font-extrabold leading-tight text-[var(--color-slide-dark)]">
          {title}
        </h1>
        <ul className="mt-10 space-y-6">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-baseline gap-4 text-xl text-[var(--color-slide-dark)]"
            >
              <span className="text-2xl leading-none">&#xB7;</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom decoration */}
      <div className="px-12 pb-8">
        <div className="h-[3px] w-full bg-[var(--color-slide-dark)]" />
      </div>
    </div>
  )
}
