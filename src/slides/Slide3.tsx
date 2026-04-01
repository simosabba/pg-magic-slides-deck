import { SlideTitle, SlideSubtitle } from "../components/slides"
import { MainTemplate } from "../templates/MainTemplate"
import { FadeIn } from "#/components/effects/FadeIn"
import { HighlightText } from "#/components/effects/HighlightText"
import { useSlideSteps } from "#/hooks/useSlideSteps"
import { Button } from "#/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "#/components/ui/dialog"
import { CodeEditor } from "#/components/ui-extensions/CodeEditor"
import { slide3Files, slide3Contents, slide3DefaultFile } from "./code/slide3"

export function Slide3() {
  const { isVisible } = useSlideSteps(3)

  return (
    <MainTemplate>
      <SlideTitle>JSONB: Documenti dentro il Database</SlideTitle>
      <SlideSubtitle>
        <strong>Ricetta #2: Il Ragù a Strati</strong> — Una colonna JSONB
        contiene strutture annidate di profondità arbitraria. PostgreSQL le
        attraversa, filtra e indicizza nativamente.
      </SlideSubtitle>

      {isVisible(1) && (
        <FadeIn delay={200} className="mt-10">
          <h3 className="mb-3 text-xl font-semibold text-slide-dark">
            Ingredienti
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-2xl text-slide-dark">
            <li>
              <HighlightText>JSONB</HighlightText> — tipo binario per documenti
              JSON, con supporto a operatori e indici
            </li>
            <li>
              <HighlightText>
                {"->"} / {"->>"}
              </HighlightText>{" "}
              — navigazione nei path annidati (
              <HighlightText>{"->"}</HighlightText> restituisce JSONB,{" "}
              <HighlightText>{"->>"}</HighlightText> restituisce text)
            </li>
            <li>
              <HighlightText>@&gt;</HighlightText> — operatore di containment
              per filtrare array e oggetti
            </li>
            <li>
              <HighlightText>B-tree index</HighlightText> — indice su
              espressioni JSONB per accelerare le query sui path più usati
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
              Definire una colonna{" "}
              <HighlightText>metadata jsonb NOT NULL</HighlightText> sulla
              tabella
            </li>
            <li>
              Navigare campi nested con la sintassi a frecce:{" "}
              <HighlightText>{"metadata->'repo'->>'name'"}</HighlightText>
            </li>
            <li>
              Creare un <HighlightText>indice B-tree</HighlightText> su
              un&apos;espressione JSONB per accelerare le query su path
              specifici
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
                files={slide3Files}
                contents={slide3Contents}
                defaultSelectedFile={slide3DefaultFile}
                className="h-full w-full rounded-xl border-0"
              />
            </DialogContent>
          </Dialog>
        </FadeIn>
      )}
    </MainTemplate>
  )
}
