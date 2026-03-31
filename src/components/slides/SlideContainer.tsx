import type { ReactNode } from "react"
import { SlideFooter } from "./SlideFooter"
import { SlideNavigation } from "./SlideNavigation"
import { SlideToolbar } from "./SlideToolbar"

interface SlideContainerProps {
  children: ReactNode
  slideNumber: number
  totalSlides?: number
  className?: string
}

export function SlideContainer({
  children,
  slideNumber,
  totalSlides = 3,
  className = "",
}: SlideContainerProps) {
  return (
    <div
      className={`relative flex h-screen w-full flex-col bg-white ${className}`}
    >
      <SlideNavigation currentSlide={slideNumber} totalSlides={totalSlides} />
      <SlideToolbar />
      <div className="flex flex-1 p-16">{children}</div>
      <SlideFooter slideNumber={slideNumber} />
    </div>
  )
}
