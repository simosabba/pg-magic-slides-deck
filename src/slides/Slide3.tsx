import { useState, useCallback } from "react"
import {
  SlideTitle,
  Typewriter,
  FadeIn,
  HighlightText,
} from "../components/slides"

export function Slide3() {
  const [titleDone, setTitleDone] = useState(false)
  const handleTitle = useCallback(() => setTitleDone(true), [])

  return (
    <div className="flex flex-col justify-center">
      <SlideTitle>
        <Typewriter
          text="Sed Ut Perspiciatis"
          delay={70}
          onComplete={handleTitle}
        />
      </SlideTitle>

      {titleDone && (
        <div className="mt-10 grid grid-cols-2 gap-8">
          <FadeIn delay={200}>
            <div className="rounded-lg border border-black/10 p-6">
              <h3 className="mb-3 text-xl font-bold text-black">
                <HighlightText>Nemo enim</HighlightText>
              </h3>
              <p className="text-lg text-black/70">
                Ipsam voluptatem quia voluptas sit aspernatur aut odit aut
                fugit.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={500}>
            <div className="rounded-lg border border-black/10 p-6">
              <h3 className="mb-3 text-xl font-bold text-black">
                <HighlightText>Neque porro</HighlightText>
              </h3>
              <p className="text-lg text-black/70">
                Quisquam est qui dolorem ipsum quia dolor sit amet consectetur.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={800}>
            <div className="rounded-lg border border-black/10 p-6">
              <h3 className="mb-3 text-xl font-bold text-black">
                <HighlightText>Ut enim</HighlightText>
              </h3>
              <p className="text-lg text-black/70">
                Ad minima veniam, quis nostrum exercitationem ullam corporis
                suscipit.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={1100}>
            <div className="rounded-lg border border-black/10 p-6">
              <h3 className="mb-3 text-xl font-bold text-black">
                <HighlightText>Quis autem</HighlightText>
              </h3>
              <p className="text-lg text-black/70">
                Vel eum iure reprehenderit qui in ea voluptate velit esse quam
                nihil.
              </p>
            </div>
          </FadeIn>
        </div>
      )}
    </div>
  )
}
