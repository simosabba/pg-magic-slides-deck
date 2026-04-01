import { createFileRoute, redirect } from "@tanstack/react-router"
import { SlideContainer } from "../../components/slides"
import { Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8 } from "../../slides"

const TOTAL_SLIDES = 8

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
      {num === 4 && <Slide4 />}
      {num === 5 && <Slide5 />}
      {num === 6 && <Slide6 />}
      {num === 7 && <Slide7 />}
      {num === 8 && <Slide8 />}
    </SlideContainer>
  )
}
