import type { ReactNode } from "react"

interface SplitTemplateProps {
  children: ReactNode
  rightContent?: ReactNode
}

export function SplitTemplate({ children, rightContent }: SplitTemplateProps) {
  return (
    <div className="flex h-full w-full">
      {/* Left panel - white */}
      <div className="flex w-[65%] flex-col justify-center px-16 py-12">
        {children}
      </div>

      {/* Divider */}
      <div className="w-px bg-[var(--color-slide-dark)]/15" />

      {/* Right panel - yellow */}
      <div className="flex w-[35%] flex-col justify-center bg-[var(--color-slide-yellow)] px-10 py-12">
        {rightContent}
      </div>
    </div>
  )
}
