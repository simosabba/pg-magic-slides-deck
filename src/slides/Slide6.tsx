import { SlideTitle, SlideSubtitle } from "../components/slides"
import { MainTemplate } from "../templates/MainTemplate"
import { FadeIn } from "#/components/effects/FadeIn"
import { HighlightText } from "#/components/effects/HighlightText"
import { useSlideSteps } from "#/hooks/useSlideSteps"
import { Button } from "#/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "#/components/ui/dialog"
import { CodeEditor } from "#/components/ui-extensions/CodeEditor"
import { slide6Files, slide6Contents, slide6DefaultFile } from "./code/slide6"

export function Slide6() {
  const { isVisible } = useSlideSteps(3)

  return (
    <MainTemplate>
      <SlideTitle>PostGIS: Ricerca Geospaziale</SlideTitle>
      <SlideSubtitle>
        <strong>Ricetta #5: Il Km Zero</strong> — Trovare gli ingredienti più
        vicini al ristorante. PostGIS aggiunge il tipo geography a PostgreSQL
        per cercare per prossimità, calcolare distanze reali sul globo e
        filtrare entro un raggio.
      </SlideSubtitle>

      {isVisible(1) && (
        <FadeIn delay={200} className="mt-10">
          <h3 className="mb-3 text-xl font-semibold text-slide-dark">
            Ingredienti
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-2xl text-slide-dark">
            <li>
              <HighlightText>PostGIS</HighlightText> — estensione geospaziale:
              aggiunge tipi, indici e funzioni per dati geografici
            </li>
            <li>
              <HighlightText>geography(point, 4326)</HighlightText> — tipo che
              rappresenta un punto sulla Terra (lat/lon, sistema WGS84)
            </li>
            <li>
              <HighlightText>ST_DWithin(a, b, metri)</HighlightText> —
              restituisce true se due geometrie sono entro una distanza in metri
              (usa indice spaziale)
            </li>
            <li>
              <HighlightText>ST_Distance(a, b)</HighlightText> — calcola la
              distanza reale in metri tra due punti sul globo (geodetica, non
              planare)
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
              Definire colonne{" "}
              <HighlightText>geography(point, 4326)</HighlightText> per le
              posizioni di hackathon e developer
            </li>
            <li>
              Proximity search: filtrare con{" "}
              <HighlightText>ST_DWithin</HighlightText> per trovare developer
              entro un raggio (es. 150km) dall&apos;evento
            </li>
            <li>
              Ordinamento per distanza: usare{" "}
              <HighlightText>ST_Distance</HighlightText> in{" "}
              <HighlightText>ORDER BY</HighlightText> per mostrare i più vicini
              per primi
            </li>
            <li>
              Query combinata: aggiungere{" "}
              <HighlightText>JOIN</HighlightText> su stack richiesto
              dall&apos;hackathon per filtrare developer che sono vicini E hanno
              la competenza giusta
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
                files={slide6Files}
                contents={slide6Contents}
                defaultSelectedFile={slide6DefaultFile}
                className="h-full w-full rounded-xl border-0"
              />
            </DialogContent>
          </Dialog>
        </FadeIn>
      )}
    </MainTemplate>
  )
}
