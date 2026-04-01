import { useState, useCallback } from "react"
import { SlideTitle } from "../components/slides"
import { MainTemplate } from "../templates/MainTemplate"
import { Typewriter } from "#/components/effects/Typewriter"
import { FadeIn } from "#/components/effects/FadeIn"
import { HighlightText } from "#/components/effects/HighlightText"

export function Slide2() {
  const [titleDone, setTitleDone] = useState(false)
  const handleTitle = useCallback(() => setTitleDone(true), [])

  return (
    <MainTemplate>
      <SlideTitle>
        <Typewriter
          text="Ut Enim Ad Minim"
          delay={70}
          onComplete={handleTitle}
        />
      </SlideTitle>

      {titleDone && (
        <div className="mt-10 space-y-6">
          <FadeIn delay={200}>
            <p className="text-2xl text-black/80">
              <HighlightText>Quis nostrud</HighlightText> exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </FadeIn>

          <FadeIn delay={600}>
            <p className="text-2xl text-black/80">
              Duis aute irure dolor in{" "}
              <HighlightText>reprehenderit</HighlightText> in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </FadeIn>

          <FadeIn delay={1000}>
            <p className="text-2xl text-black/80">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia <HighlightText>deserunt mollit</HighlightText> anim id est
              laborum.
            </p>
          </FadeIn>
        </div>
      )}
    </MainTemplate>
  )
}
