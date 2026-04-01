import { useState, useCallback, useEffect } from "react"

/**
 * Hook for managing incremental reveal steps within a slide.
 * Right arrow advances to the next step (preventing slide change)
 * until all steps are revealed, then allows normal navigation.
 */
export function useSlideSteps(totalSteps: number) {
  const [step, setStep] = useState(0)

  const advance = useCallback(() => {
    setStep((s) => Math.min(s + 1, totalSteps))
  }, [totalSteps])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && step < totalSteps) {
        e.stopImmediatePropagation()
        advance()
      }
    }

    // Register before SlideNavigation's listener by using capture phase
    window.addEventListener("keydown", handleKeyDown, true)
    return () => window.removeEventListener("keydown", handleKeyDown, true)
  }, [step, totalSteps, advance])

  return { step, isVisible: (atStep: number) => step >= atStep }
}
