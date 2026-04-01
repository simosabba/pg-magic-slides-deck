import { SlideTitle, SlideSubtitle } from "../components/slides"
import { MainTemplate } from "../templates/MainTemplate"
import { FadeIn } from "#/components/effects/FadeIn"
import { HighlightText } from "#/components/effects/HighlightText"
import { useSlideSteps } from "#/hooks/useSlideSteps"
import { Button } from "#/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "#/components/ui/dialog"
import { CodeEditor } from "#/components/ui-extensions/CodeEditor"
import { slide4Files, slide4Contents, slide4DefaultFile } from "./code/slide4"

export function Slide4() {
  const { isVisible } = useSlideSteps(3)

  return (
    <MainTemplate>
      <SlideTitle>pgvector: Ricerca Semantica</SlideTitle>
      <SlideSubtitle>
        <strong>Ricetta #3: Il Buongustaio</strong> — Non cerchi per parola
        esatta, ma per significato. PostgreSQL con pgvector confronta embedding
        vettoriali e trova i documenti semanticamente più vicini alla tua query.
      </SlideSubtitle>

      {isVisible(1) && (
        <FadeIn delay={200} className="mt-10">
          <h3 className="mb-3 text-xl font-semibold text-slide-dark">
            Ingredienti
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-2xl text-slide-dark">
            <li>
              <HighlightText>pgvector</HighlightText> — estensione che aggiunge
              il tipo <HighlightText>vector(N)</HighlightText> e operatori di
              distanza
            </li>
            <li>
              <HighlightText>{"<->"}</HighlightText> — operatore di distanza L2
              (euclidea) tra due vettori
            </li>
            <li>
              <HighlightText>all-MiniLM-L6-v2</HighlightText> — modello di
              embedding che converte testo in vettori a 384 dimensioni
            </li>
            <li>
              <HighlightText>JOIN relazionali</HighlightText> — per combinare
              similarità vettoriale con filtri su dati strutturati
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
              Generare un embedding dal testo di ricerca con un modello (384
              dimensioni)
            </li>
            <li>
              Eseguire una query top-k: ordinare per distanza L2 (
              <HighlightText>{"<->"}</HighlightText>) e limitare i risultati
            </li>
            <li>
              Hybrid search: combinare <HighlightText>ORDER BY</HighlightText>{" "}
              vettoriale con <HighlightText>JOIN</HighlightText> e{" "}
              <HighlightText>WHERE</HighlightText> su colonne relazionali (es.
              filtrare per stack tecnologico e ordinare per similarità
              semantica)
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
                files={slide4Files}
                contents={slide4Contents}
                defaultSelectedFile={slide4DefaultFile}
                className="h-full w-full rounded-xl border-0"
              />
            </DialogContent>
          </Dialog>
        </FadeIn>
      )}
    </MainTemplate>
  )
}
