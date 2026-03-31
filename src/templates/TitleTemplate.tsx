import type { ReactNode } from "react"

interface TitleTemplateProps {
  children: ReactNode
}

export function TitleTemplate({ children }: TitleTemplateProps) {
  return (
    <div className="flex h-full w-full flex-col bg-[var(--color-slide-yellow)]">
      {/* Top decoration */}
      <div className="flex items-center gap-8 px-20 pt-12">
        <div className="h-1.5 w-12 bg-[var(--color-slide-dark)]" />
        <div className="h-1.5 flex-1 bg-[var(--color-slide-dark)]" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center px-24">
        {children}
      </div>

      {/* Bottom decoration */}
      <div className="px-20 pb-12">
        <div className="h-1.5 w-full bg-[var(--color-slide-dark)]" />
      </div>
    </div>
  )
}
