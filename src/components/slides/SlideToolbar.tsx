import { useEffect, useState } from "react"

export function SlideToolbar() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    setIsFullscreen(!!document.fullscreenElement)

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  if (isFullscreen) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleFullscreen}
        className="flex items-center gap-2 rounded-lg bg-black/80 px-4 py-2 text-sm text-white transition-opacity hover:bg-black"
        title="Enter fullscreen (F)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
        Fullscreen
      </button>
    </div>
  )
}
