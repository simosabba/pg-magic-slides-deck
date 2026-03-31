import { createFileRoute, redirect } from "@tanstack/react-router"
import { useState, useCallback } from "react"
import {
  SlideContainer,
  SlideTitle,
  Typewriter,
  FadeIn,
  HighlightText,
} from "../../components/slides"

const TOTAL_SLIDES = 3

export const Route = createFileRoute("/s/$slideNumber")({
  beforeLoad: ({ params }) => {
    const num = Number(params.slideNumber)
    if (isNaN(num) || num < 1 || num > TOTAL_SLIDES) {
      throw redirect({ to: "/s/$slideNumber", params: { slideNumber: "1" } })
    }
  },
  component: SlideRoute,
})

function SlideRoute() {
  const { slideNumber } = Route.useParams()
  const num = Number(slideNumber)

  return (
    <SlideContainer slideNumber={num} totalSlides={TOTAL_SLIDES}>
      {num === 1 && <Slide1 />}
      {num === 2 && <Slide2 />}
      {num === 3 && <Slide3 />}
    </SlideContainer>
  )
}

function Slide1() {
  const [line1Done, setLine1Done] = useState(false)
  const [line2Done, setLine2Done] = useState(false)
  const handleLine1 = useCallback(() => setLine1Done(true), [])
  const handleLine2 = useCallback(() => setLine2Done(true), [])

  return (
    <div className="flex flex-col justify-center">
      <SlideTitle>
        <Typewriter text="Lorem Ipsum" delay={90} onComplete={handleLine1} />
      </SlideTitle>

      {line1Done && (
        <div className="mt-6">
          <SlideTitle>
            <Typewriter
              text="Dolor Sit Amet"
              delay={70}
              startDelay={200}
              onComplete={handleLine2}
            />
          </SlideTitle>
        </div>
      )}

      {line2Done && (
        <FadeIn delay={300} className="mt-10">
          <p className="max-w-2xl text-2xl leading-relaxed text-black/70">
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </p>
        </FadeIn>
      )}
    </div>
  )
}

function Slide2() {
  const [titleDone, setTitleDone] = useState(false)
  const handleTitle = useCallback(() => setTitleDone(true), [])

  return (
    <div className="flex flex-col justify-center">
      <SlideTitle>
        <Typewriter
          text="Ut Enim Ad Minim"
          delay={70}
          onComplete={handleTitle}
        />
      </SlideTitle>

      {titleDone && (
        <div className="mt-10 space-y-6">
          <FadeIn delay={200}>
            <p className="text-2xl text-black/80">
              <HighlightText>Quis nostrud</HighlightText> exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </FadeIn>

          <FadeIn delay={600}>
            <p className="text-2xl text-black/80">
              Duis aute irure dolor in{" "}
              <HighlightText>reprehenderit</HighlightText> in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </FadeIn>

          <FadeIn delay={1000}>
            <p className="text-2xl text-black/80">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia <HighlightText>deserunt mollit</HighlightText> anim id est
              laborum.
            </p>
          </FadeIn>
        </div>
      )}
    </div>
  )
}

function Slide3() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <FadeIn delay={200} duration={800}>
        <h1 className="text-8xl font-bold text-black">Grazie!</h1>
      </FadeIn>
    </div>
  )
}
