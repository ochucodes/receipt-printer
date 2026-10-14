import type { CSSProperties, ReactNode } from 'react'
import { printers, type PrinterColor } from './printers'
import './ReceiptPrinter.css'

type ReceiptPrinterProps = {
  // bump to print; 0 shows the printer empty and each new value feeds a fresh sheet
  printId: number
  // what goes on the paper
  children: ReactNode
  // the printer's finish
  color?: PrinterColor
  // seconds the paper takes to feed out
  duration?: number
  // once the paper has fed out
  onPrinted?: () => void
}

// A printer with a receipt that slides down out of its slot. The machine is drawn twice:
// once behind the paper, and once in front cropped to the slot's teeth, so the paper
// looks like it comes out from behind them.
export function ReceiptPrinter({ printId, children, color = 'gold', duration = 3.2, onPrinted }: ReceiptPrinterProps) {
  const printing = printId > 0
  const model = printers.find((p) => p.id === color) ?? printers[0]

  return (
    <div
      className="printer"
      style={{ '--feed-duration': `${duration}s`, '--printer-aspect': model.aspect } as CSSProperties}
    >
      <img className="printer-machine" src={model.src} alt="" />
      <img className="printer-machine printer-front" src={model.src} alt="" />

      {printing && (
        <div className="paper-feed">
          {/* keyed by printId, so every print remounts the sheet and feeds it out again */}
          <article
            key={printId}
            className="receipt-paper"
            onAnimationEnd={(e) => e.target === e.currentTarget && onPrinted?.()}
          >
            {children}
          </article>
        </div>
      )}
    </div>
  )
}
