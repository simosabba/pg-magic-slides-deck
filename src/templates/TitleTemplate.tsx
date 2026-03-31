import type { ReactNode } from "react"

interface TitleTemplateProps {
  title: ReactNode
  subtitle?: ReactNode
}

export function TitleTemplate({ title, subtitle }: TitleTemplateProps) {
  return (
    <div className="flex h-full w-full flex-col bg-[var(--color-slide-yellow)]">
      {/* Top decoration */}
      <div className="flex items-center gap-4 px-12 pt-8">
        <div className="h-1.5 w-12 bg-[var(--color-slide-dark)]" />
        <div className="h-[3px] flex-1 bg-[var(--color-slide-dark)]" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center px-16">
        <h1 className="text-7xl font-extrabold text-[var(--color-slide-dark)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-10 text-2xl text-[var(--color-slide-dark)]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom decoration */}
      <div className="px-12 pb-8">
        <div className="h-[3px] w-full bg-[var(--color-slide-dark)]" />
      </div>
    </div>
  )
}
