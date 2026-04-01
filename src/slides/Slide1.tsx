import { SlideTitle } from "../components/slides"
import { TitleTemplate } from "../templates/TitleTemplate"
import { FadeIn } from "#/components/effects/FadeIn"
import { Typewriter } from "#/components/effects/Typewriter"
import { useSlideSteps } from "#/hooks/useSlideSteps"

export function Slide1() {
  const { isVisible } = useSlideSteps(2)

  return (
    <TitleTemplate>
      {isVisible(1) && (
        <SlideTitle>
          <Typewriter text="pg_magic" delay={90} />
        </SlideTitle>
      )}

      {isVisible(2) && (
        <FadeIn delay={300} className="mt-10">
          <p className="max-w-2xl text-2xl leading-relaxed text-black/70">
            Le ricette segrete di PostgreSQL che non trovi sul menu —
            cucinate con Drizzle ORM
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
