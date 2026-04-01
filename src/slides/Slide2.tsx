import { SlideTitle, SlideSubtitle } from "../components/slides"
import { MainTemplate } from "../templates/MainTemplate"
import { FadeIn } from "#/components/effects/FadeIn"
import { HighlightText } from "#/components/effects/HighlightText"
import { useSlideSteps } from "#/hooks/useSlideSteps"
import { Button } from "#/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "#/components/ui/dialog"
import { CodeEditor } from "#/components/ui-extensions/CodeEditor"
import { slide2Files, slide2Contents, slide2DefaultFile } from "./code/slide2"

export function Slide2() {
  const { isVisible } = useSlideSteps(3)

  return (
    <MainTemplate>
      <SlideTitle>LISTEN / NOTIFY: Pub/Sub nativo</SlideTitle>
      <SlideSubtitle>
        <strong>Ricetta #1: Il Passa-Comande</strong> — Un sistema pub/sub
        integrato in PostgreSQL. Niente broker esterni: il database gestisce la
        messaggistica in tempo reale.
      </SlideSubtitle>

      {isVisible(1) && (
        <FadeIn delay={200} className="mt-10">
          <h3 className="mb-3 text-xl font-semibold text-slide-dark">
            Ingredienti
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-2xl text-slide-dark">
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
          <h3 className="mb-3 text-xl font-semibold text-slide-dark">
            Preparazione
          </h3>
          <ul className="mt-2 list-disc pl-6 space-y-2 text-2xl text-slide-dark">
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
      {isVisible(3) && (
        <FadeIn delay={200} className="mt-8 flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button>SHOW ME THE CODE</Button>
            </DialogTrigger>
            <DialogContent
              showCloseButton
              closeButtonClassName="text-white hover:bg-white/10 hover:text-white top-[2px] right-[2px]"
              className="h-[90vh] w-[90vw] max-w-none sm:max-w-none p-0 overflow-hidden"
            >
              <CodeEditor
                files={slide2Files}
                contents={slide2Contents}
                defaultSelectedFile={slide2DefaultFile}
                className="h-full w-full rounded-xl border-0"
              />
            </DialogContent>
          </Dialog>
        </FadeIn>
      )}
    </MainTemplate>
  )
}
