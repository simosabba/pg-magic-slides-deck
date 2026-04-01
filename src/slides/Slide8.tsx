import { FadeIn } from "#/components/effects/FadeIn"
import { DarkTemplate } from "../templates/DarkTemplate"

export function Slide8() {
  return (
    <DarkTemplate>
      <FadeIn delay={200} duration={800}>
        <h1 className="text-8xl font-bold text-black">Grazie!</h1>
      </FadeIn>
    </DarkTemplate>
  )
}
