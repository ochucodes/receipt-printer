export type PrinterColor = 'gold' | 'charcoal' | 'silver'

export type PrinterModel = {
  id: PrinterColor
  label: string
  src: string
  // the image's height / width; the paper starts halfway down the slot, so it depends on it
  aspect: number
  // a CSS background for a colour swatch
  swatch: string
}

// To add a colour: drop the image in public/images and add a line here.
export const printers: PrinterModel[] = [
  {
    id: 'gold',
    label: 'Gold',
    src: '/images/printer.png',
    aspect: 332 / 2110,
    swatch: 'linear-gradient(135deg, #f6e7cf, #d99a4e)',
  },
  {
    id: 'charcoal',
    label: 'Charcoal',
    src: '/images/charcoal-printer.png',
    aspect: 338 / 2093,
    swatch: 'linear-gradient(135deg, #8a8d93, #3a3c40)',
  },
  {
    id: 'silver',
    label: 'Silver',
    src: '/images/sliver-printer.png',
    aspect: 348 / 2111,
    swatch: 'linear-gradient(135deg, #f4f6f8, #b9bec6)',
  },
]
