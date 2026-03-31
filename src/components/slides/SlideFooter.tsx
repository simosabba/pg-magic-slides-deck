interface SlideFooterProps {
  slideNumber: number
}

export function SlideFooter({ slideNumber }: SlideFooterProps) {
  return (
    <footer className="flex items-center justify-between px-6 py-4">
      <span className="text-lg text-black">{slideNumber}</span>
      <span className="text-sm font-semibold tracking-widest text-black/60 uppercase">
        Slides
      </span>
    </footer>
  )
}
