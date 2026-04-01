import { FadeIn } from "#/components/ui/FadeIn"
import { DarkTemplate } from "../templates/DarkTemplate"

export function Slide4() {
  return (
    <DarkTemplate>
      <FadeIn delay={200} duration={800}>
        <h1 className="text-8xl font-bold text-black">Grazie!</h1>
      </FadeIn>
    </DarkTemplate>
  )
}
