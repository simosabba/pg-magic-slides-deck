import { useState, useCallback } from "react"
import { SlideTitle } from "../components/slides"
import { TitleTemplate } from "../templates/TitleTemplate"
import { FadeIn } from "#/components/effects/FadeIn"
import { Typewriter } from "#/components/effects/Typewriter"

export function Slide1() {
  const [line1Done, setLine1Done] = useState(false)
  const handleLine1 = useCallback(() => setLine1Done(true), [])

  return (
    <TitleTemplate>
      <SlideTitle>
        <Typewriter text="pg_magic" delay={90} onComplete={handleLine1} />
      </SlideTitle>

      {line1Done && (
        <FadeIn delay={300} className="mt-10">
          <p className="max-w-2xl text-2xl leading-relaxed text-black/70">
            Le creature magiche di PostgreSQL che non conosci (ancora) —
            addomesticate con Drizzle ORM
          </p>
          <p className="mt-4 text-lg text-black/50">
            by{" "}
            <a
              href="https://www.linkedin.com/in/simone-sabba/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black/70"
            >
              Simo
            </a>
          </p>
        </FadeIn>
      )}
    </TitleTemplate>
  )
}
