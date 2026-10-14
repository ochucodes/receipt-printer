# Receipt printer

A React component that feeds a receipt out of a printer, with a demo page and a **Print** button.

```tsx
const [printId, setPrintId] = useState(0)

<button onClick={() => setPrintId((id) => id + 1)}>Print</button>
<ReceiptPrinter printId={printId} onPrinted={() => console.log('done')}>
  {/* whatever goes on the paper */}
</ReceiptPrinter>
```

- `printId`: bump it to print. `0` shows the printer empty; each new value feeds a fresh sheet.
- `children`: the content printed on the paper.
- `duration`: how long the paper takes to feed out, in seconds (default `3.2`).
- `onPrinted`: called once the paper has finished feeding out.

With reduced motion turned on, the paper appears at once.

## Scripts

```sh
npm install
npm run dev     # start the demo
npm run build   # type-check and build
npm run lint
```
