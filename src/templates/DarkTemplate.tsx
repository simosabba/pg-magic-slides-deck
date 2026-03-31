import type { ReactNode } from "react"

interface DarkTemplateProps {
  title: ReactNode
  subtitle?: ReactNode
}

export function DarkTemplate({ title, subtitle }: DarkTemplateProps) {
  return (
    <div className="flex h-full w-full flex-col bg-[var(--color-slide-gray)]">
      {/* Top accent */}
      <div className="px-12 pt-8">
        <div className="h-1.5 w-12 bg-white" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center px-16">
        <h1 className="text-6xl font-extrabold leading-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-xl text-white">{subtitle}</p>
        )}
      </div>
    </div>
  )
}
