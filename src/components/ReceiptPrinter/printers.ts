export type PrinterColor = 'gold' | 'charcoal' | 'silver'

export type PrinterModel = {
  id: PrinterColor
  label: string
  src: string
  aspect: number
  swatch: string
}

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
