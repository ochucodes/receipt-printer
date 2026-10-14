import { useEffect, useState } from 'react';
import { ReceiptPrinter } from './components/ReceiptPrinter/ReceiptPrinter';
import { printers, type PrinterColor } from './components/ReceiptPrinter/printers';
import './App.css';

const priceFormat = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});
const dateFormat = new Intl.DateTimeFormat('en-NG', { dateStyle: 'medium', timeStyle: 'short' });

// a sample receipt to print
const lines = [
  { name: 'Air Max', qty: 1, price: 35000 },
  { name: 'Afnan 9PM', qty: 1, price: 55000 },
  { name: 'Bleu de', qty: 3, price: 9000 },
  { name: 'White Tee', qty: 2, price: 8500 },
  { name: 'Corduroy Cap', qty: 1, price: 12000 },
];
const VAT_RATE = 0.075;

export default function App() {
  // 0 until the first print; each click feeds a fresh sheet
  const [printId, setPrintId] = useState(0);
  const [printing, setPrinting] = useState(false);
  const [printedAt, setPrintedAt] = useState(() => Date.now());
  const [color, setColor] = useState<PrinterColor>('gold');

  // load every finish up front, so switching doesn't flash an empty printer
  useEffect(() => {
    for (const printer of printers) new Image().src = printer.src;
  }, []);

  const subtotal = lines.reduce((sum, line) => sum + line.price * line.qty, 0);
  const vat = Math.round(subtotal * VAT_RATE);

  const print = () => {
    setPrintedAt(Date.now());
    setPrintId((id) => id + 1);
    setPrinting(true);
  };

  return (
    <main className="demo">
      <header className="demo-head">
        <div>
          <h1>Receipt printer</h1>
          <p>Press print to feed a receipt out of the printer.</p>
        </div>
        <button type="button" className="print-btn" onClick={print} disabled={printing}>
          {printing ? 'Printing…' : printId > 0 ? 'Print again' : 'Print'}
        </button>
      </header>

      <div className="finish">
        <span id="finish-label">Colour</span>
        <div className="finish-options" role="radiogroup" aria-labelledby="finish-label">
          {printers.map((printer) => (
            <label key={printer.id} className="finish-option" title={printer.label}>
              <input
                type="radio"
                name="finish"
                value={printer.id}
                checked={color === printer.id}
                onChange={() => setColor(printer.id)}
              />
              <span className="finish-swatch" style={{ background: printer.swatch }} aria-hidden />
              <span className="finish-label">{printer.label}</span>
            </label>
          ))}
        </div>
      </div>

      <ReceiptPrinter printId={printId} color={color} onPrinted={() => setPrinting(false)}>
        <header className="receipt-head">
          <strong>Invio Store</strong>
          <span>Receipt #{String(printId).padStart(4, '0')}</span>
          <span>{dateFormat.format(printedAt)}</span>
        </header>

        <ul className="receipt-lines">
          {lines.map((line) => (
            <li key={line.name}>
              <span>
                {line.name} <span className="receipt-muted">× {line.qty}</span>
              </span>
              <span>{priceFormat.format(line.price * line.qty)}</span>
            </li>
          ))}
        </ul>

        <dl className="receipt-totals">
          <div>
            <dt>Subtotal</dt>
            <dd>{priceFormat.format(subtotal)}</dd>
          </div>
          <div>
            <dt>VAT (7.5%)</dt>
            <dd>{priceFormat.format(vat)}</dd>
          </div>
          <div className="receipt-total">
            <dt>Total</dt>
            <dd>{priceFormat.format(subtotal + vat)}</dd>
          </div>
        </dl>

        <p className="receipt-thanks">Thank you for shopping with us</p>
      </ReceiptPrinter>
    </main>
  );
}
