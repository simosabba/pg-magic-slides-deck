import { FadeIn } from "#/components/effects/FadeIn"
import { DarkTemplate } from "../templates/DarkTemplate"
import { QRCodeSVG } from "qrcode.react"

const REPO_URL = "https://github.com/wearedevpunks/pg-magic"

export function Slide8() {
  return (
    <DarkTemplate>
      <div className="flex flex-col items-center gap-10">
        <FadeIn delay={200} duration={800}>
          <h1 className="text-8xl font-bold text-black">Grazie!</h1>
        </FadeIn>
        <FadeIn delay={600} duration={800}>
          <div className="flex flex-col items-center gap-4">
            <QRCodeSVG
              value={REPO_URL}
              size={200}
              bgColor="transparent"
              fgColor="black"
            />
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-black/60 underline hover:text-black"
            >
              {REPO_URL}
            </a>
          </div>
        </FadeIn>
      </div>
    </DarkTemplate>
  )
}
