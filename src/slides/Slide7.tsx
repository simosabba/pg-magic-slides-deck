import { SlideTitle, SlideSubtitle } from "../components/slides"
import { SplitTemplate } from "../templates/SplitTemplate"
import { FadeIn } from "#/components/effects/FadeIn"
import { HighlightText } from "#/components/effects/HighlightText"
import { useSlideSteps } from "#/hooks/useSlideSteps"

export function Slide7() {
  const { isVisible } = useSlideSteps(2)

  return (
    <SplitTemplate
      rightContent={
        isVisible(2) ? (
          <FadeIn delay={200} className="flex flex-col items-center gap-6">
            <p className="text-2xl font-semibold text-slide-dark">
              WTF, you&apos;ve got to be kidding me
            </p>
            <a
              href="http://localhost:3999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl font-bold text-blue-600 underline hover:text-blue-800"
            >
              Provare per credere →
            </a>
            <a
              href="https://planetscale.com/blog/video-conferencing-with-postgres"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-slide-dark/60 underline hover:text-slide-dark"
            >
              Articolo originale: PlanetScale Blog
            </a>
          </FadeIn>
        ) : undefined
      }
    >
      <SlideTitle>Ricetta Bonus: Video Call via PostgreSQL</SlideTitle>
      <SlideSubtitle>
        <strong>Ricetta #6: La Pazzia dello Chef</strong> — Sì, ho implementato
        una videochiamata usando PostgreSQL. No, non sto scherzando.
      </SlideSubtitle>

      {isVisible(1) && (
        <FadeIn delay={200} className="mt-10">
          <ul className="list-disc pl-6 space-y-2 text-2xl text-slide-dark">
            <li>
              <HighlightText>LISTEN / NOTIFY</HighlightText> come canale di
              segnalazione in tempo reale
            </li>
            <li>
              <HighlightText>Large Objects</HighlightText> per trasferire frame
              video e audio chunks
            </li>
            <li>
              <HighlightText>UNLOGGED tables</HighlightText> — tabelle senza
              Write-Ahead Log: niente scrittura su disco = velocità massima (i
              dati si perdono al crash, ma per frame video va benissimo)
            </li>
          </ul>
        </FadeIn>
      )}
    </SplitTemplate>
  )
}
