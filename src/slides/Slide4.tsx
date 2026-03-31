import { FadeIn } from "../components/slides"

export function Slide4() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <FadeIn delay={200} duration={800}>
        <h1 className="text-8xl font-bold text-black">Grazie!</h1>
      </FadeIn>
    </div>
  )
}
