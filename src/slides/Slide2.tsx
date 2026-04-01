import { SlideTitle, SlideSubtitle } from "../components/slides"
import { MainTemplate } from "../templates/MainTemplate"
import { FadeIn } from "#/components/effects/FadeIn"
import { HighlightText } from "#/components/effects/HighlightText"
import { useSlideSteps } from "#/hooks/useSlideSteps"

export function Slide2() {
  const { isVisible } = useSlideSteps(2)

  return (
    <MainTemplate>
      <SlideTitle>LISTEN / NOTIFY: Pub/Sub nativo</SlideTitle>
      <SlideSubtitle>
        <strong>Ricetta #1: Il Passa-Comande</strong> — Un sistema pub/sub integrato in
        PostgreSQL. Niente broker esterni: il database gestisce la messaggistica
        in tempo reale.
      </SlideSubtitle>

      {isVisible(1) && (
        <FadeIn delay={200} className="mt-10">
          <h3 className="mb-3 text-xl font-semibold text-black/90">
            Ingredienti
          </h3>
          <ul className="space-y-2 text-2xl text-black/80">
            <li>
              <HighlightText>LISTEN</HighlightText> — registra un client su un
              canale di notifica
            </li>
            <li>
              <HighlightText>pg_notify(channel, payload)</HighlightText> — invia
              un messaggio a tutti i listener attivi su quel canale
            </li>
            <li>
              <HighlightText>JSONB</HighlightText> — payload strutturato,
              interrogabile e indicizzabile
            </li>
            <li>
              <HighlightText>Tabella events</HighlightText> — persistenza
              opzionale per audit e replay
            </li>
          </ul>
        </FadeIn>
      )}

      {isVisible(2) && (
        <FadeIn delay={200} className="mt-8">
          <h3 className="mb-3 text-xl font-semibold text-black/90">
            Preparazione
          </h3>
          <ul className="mt-2 space-y-2 text-2xl text-black/80">
            <li>
              Il subscriber apre una connessione dedicata (non pooled) e esegue{" "}
              <HighlightText>LISTEN channel</HighlightText>
            </li>
            <li>
              Il publisher persiste l'evento con{" "}
              <HighlightText>INSERT</HighlightText> e lo propaga con{" "}
              <HighlightText>pg_notify</HighlightText>
            </li>
            <li>
              Ogni client connesso in LISTEN riceve il payload come evento
              asincrono sulla stessa connessione TCP
            </li>
            <li>
              Il payload è una stringa (max 8000 byte) — si serializza in JSON
              lato applicativo
            </li>
          </ul>
        </FadeIn>
      )}
    </MainTemplate>
  )
}
