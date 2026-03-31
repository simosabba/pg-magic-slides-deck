import { useState, useCallback } from "react"
import { SlideTitle, Typewriter, FadeIn } from "../components/slides"
import { TitleTemplate } from "../templates/TitleTemplate"

export function Slide1() {
  const [line1Done, setLine1Done] = useState(false)
  const [line2Done, setLine2Done] = useState(false)
  const handleLine1 = useCallback(() => setLine1Done(true), [])
  const handleLine2 = useCallback(() => setLine2Done(true), [])

  return (
    <TitleTemplate>
      <SlideTitle>
        <Typewriter text="Lorem Ipsum" delay={90} onComplete={handleLine1} />
      </SlideTitle>

      {line1Done && (
        <div className="mt-6">
          <SlideTitle>
            <Typewriter
              text="Dolor Sit Amet"
              delay={70}
              startDelay={200}
              onComplete={handleLine2}
            />
          </SlideTitle>
        </div>
      )}

      {line2Done && (
        <FadeIn delay={300} className="mt-10">
          <p className="max-w-2xl text-2xl leading-relaxed text-black/70">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </p>
        </FadeIn>
      )}
    </TitleTemplate>
  )
}
