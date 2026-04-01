import { SlideTitle, SlideSubtitle } from "../components/slides"
import { MainTemplate } from "../templates/MainTemplate"
import { FadeIn } from "#/components/effects/FadeIn"
import { HighlightText } from "#/components/effects/HighlightText"
import { useSlideSteps } from "#/hooks/useSlideSteps"
import { Button } from "#/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "#/components/ui/dialog"
import { CodeEditor } from "#/components/ui-extensions/CodeEditor"
import { slide5Files, slide5Contents, slide5DefaultFile } from "./code/slide5"

export function Slide5() {
  const { isVisible } = useSlideSteps(3)

  return (
    <MainTemplate>
      <SlideTitle>Apache AGE: Grafi nel Database</SlideTitle>
      <SlideSubtitle>
        <strong>Ricetta #4: L&apos;Albero Biologico</strong> — Chi dipende da
        chi? Chi lavora con cosa? Le relazioni tra entità si navigano meglio
        come grafi. Apache AGE porta Cypher (il linguaggio di Neo4j)
        direttamente dentro PostgreSQL.
      </SlideSubtitle>

      {isVisible(1) && (
        <FadeIn delay={200} className="mt-10">
          <h3 className="mb-3 text-xl font-semibold text-slide-dark">
            Ingredienti
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-2xl text-slide-dark">
            <li>
              <HighlightText>Apache AGE</HighlightText> — estensione che
              aggiunge un motore a grafi dentro PostgreSQL
            </li>
            <li>
              <HighlightText>Cypher</HighlightText> — linguaggio dichiarativo
              per descrivere pattern di nodi e relazioni (come SQL, ma per
              grafi)
            </li>
            <li>
              <HighlightText>MATCH ... CREATE</HighlightText> — creazione di
              nodi (:Developer, :Stack, :Project) e relazioni (:USES,
              :WORKS_ON, :DEPENDS_ON)
            </li>
            <li>
              <HighlightText>{"[:DEPENDS_ON*1..3]"}</HighlightText> — traversal
              variabile: segui catene di dipendenze fino a 3 livelli di
              profondità
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
              Caricare l&apos;estensione AGE e creare un grafo con nome (
              <HighlightText>dev_graph</HighlightText>)
            </li>
            <li>
              Popolare il grafo con nodi e relazioni tramite{" "}
              <HighlightText>CREATE</HighlightText> in Cypher
            </li>
            <li>
              Path query: partendo da un progetto, trovare tutte le dipendenze
              transitive con{" "}
              <HighlightText>
                {"MATCH (p)-[:DEPENDS_ON*1..3]->(dep)"}
              </HighlightText>
            </li>
            <li>
              Query composita: combinare più{" "}
              <HighlightText>MATCH</HighlightText> per trovare developer che
              usano un certo stack E lavorano su progetti che dipendono da un
              altro progetto
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
                files={slide5Files}
                contents={slide5Contents}
                defaultSelectedFile={slide5DefaultFile}
                className="h-full w-full rounded-xl border-0"
              />
            </DialogContent>
          </Dialog>
        </FadeIn>
      )}
    </MainTemplate>
  )
}
