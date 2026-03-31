import type { ReactNode } from "react"

interface DarkTemplateProps {
  children: ReactNode
}

export function DarkTemplate({ children }: DarkTemplateProps) {
  return (
    <div className="flex h-full w-full flex-col bg-[var(--color-slide-gray)]">
      {/* Top accent */}
      <div className="px-12 pt-8">
        <div className="h-1.5 w-12 bg-white" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center px-16">
        {children}
      </div>
    </div>
  )
}
