import type { ReactNode } from "react"

interface BulletTemplateProps {
  children: ReactNode
}

export function BulletTemplate({ children }: BulletTemplateProps) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Top decoration */}
      <div className="flex items-center gap-4 px-12 pt-8">
        <div className="h-1.5 w-12 bg-[var(--color-slide-dark)]" />
        <div className="h-[3px] flex-1 bg-[var(--color-slide-dark)]" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-start px-16 pt-10">
        {children}
      </div>

      {/* Bottom decoration */}
      <div className="px-12 pb-8">
        <div className="h-[3px] w-full bg-[var(--color-slide-dark)]" />
      </div>
    </div>
  )
}
