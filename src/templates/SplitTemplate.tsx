import type { ReactNode } from "react"

interface SplitTemplateProps {
  title: ReactNode
  subtitle?: ReactNode
  sideText?: ReactNode
}

export function SplitTemplate({
  title,
  subtitle,
  sideText,
}: SplitTemplateProps) {
  return (
    <div className="flex h-full w-full">
      {/* Left panel - white */}
      <div className="flex w-[65%] flex-col justify-center px-16 py-12">
        <h1 className="text-7xl font-extrabold italic leading-tight text-[var(--color-slide-yellow)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-xl text-[var(--color-slide-dark)]">
            {subtitle}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="w-px bg-[var(--color-slide-dark)]/15" />

      {/* Right panel - yellow */}
      <div className="flex w-[35%] flex-col justify-center bg-[var(--color-slide-yellow)] px-10 py-12">
        {sideText && (
          <p className="text-lg leading-relaxed text-[var(--color-slide-dark)]">
            {sideText}
          </p>
        )}
        <div className="mt-auto">
          <div className="h-1.5 w-12 bg-[var(--color-slide-dark)]" />
        </div>
      </div>
    </div>
  )
}
