import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { printers, type PrinterColor } from './printers'
import { playPrintSound } from './printSound'
import './ReceiptPrinter.css'

type ReceiptPrinterProps = {
  printId: number
  children: ReactNode
  color?: PrinterColor
  duration?: number
  sound?: boolean
  onPrinted?: () => void
}

// The machine is drawn twice — behind the paper and, cropped to the slot, in front — so the paper feeds out from behind the teeth.
export function ReceiptPrinter({ printId, children, color = 'gold', duration = 3.2, sound = true, onPrinted }: ReceiptPrinterProps) {
  const printing = printId > 0
  const model = printers.find((p) => p.id === color) ?? printers[0]
  const stopSound = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!sound || printId === 0) return
    const stop = playPrintSound(duration)
    stopSound.current = stop
    return stop
  }, [printId, sound, duration])

  return (
    <div
      className="printer"
      style={{ '--feed-duration': `${duration}s`, '--printer-aspect': model.aspect } as CSSProperties}
    >
      <img className="printer-machine" src={model.src} alt="" />
      <img className="printer-machine printer-front" src={model.src} alt="" />

      {printing && (
        <div className="paper-feed">
          <article
            key={printId}
            className="receipt-paper"
            onAnimationEnd={(e) => {
              if (e.target !== e.currentTarget) return
              stopSound.current?.()
              onPrinted?.()
            }}
          >
            {children}
          </article>
        </div>
      )}
    </div>
  )
}
