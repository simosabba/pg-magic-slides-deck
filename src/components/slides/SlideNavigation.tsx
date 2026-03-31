import { useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"

interface SlideNavigationProps {
  currentSlide: number
  totalSlides: number
}

export function SlideNavigation({
  currentSlide,
  totalSlides,
}: SlideNavigationProps) {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSlide < totalSlides) {
        navigate({
          to: "/s/$slideNumber",
          params: { slideNumber: String(currentSlide + 1) },
        })
      } else if (e.key === "ArrowLeft" && currentSlide > 1) {
        navigate({
          to: "/s/$slideNumber",
          params: { slideNumber: String(currentSlide - 1) },
        })
      } else if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, totalSlides, navigate])

  return null
}
