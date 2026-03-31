import type { ReactNode } from "react"

interface TitleTemplateProps {
  children: ReactNode
}

export function TitleTemplate({ children }: TitleTemplateProps) {
  return (
    <div className="flex h-full w-full flex-col bg-[var(--color-slide-yellow)]">
      {/* Top decoration */}
      <div className="flex items-center gap-[250px] px-20 pt-12">
        <div className="h-1.5 w-12 bg-[var(--color-slide-dark)]" />
        <div className="h-1.5 flex-1 bg-[var(--color-slide-dark)]" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center pr-24 pl-[378px]">
        {children}
      </div>

      {/* Bottom decoration */}
      <div className="pb-12 pl-[378px] pr-20">
        <div className="h-1.5 w-full bg-[var(--color-slide-dark)]" />
      </div>
    </div>
  )
}
