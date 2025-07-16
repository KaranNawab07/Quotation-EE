
import React, { useState } from "react";
import jsPDF from "jspdf";

export default function App() {
  const [od, setOd] = useState(0);
  const [id, setId] = useState(0);
  const [length, setLength] = useState(0);
  const [qty, setQty] = useState(1);
  const [quote, setQuote] = useState("");

  const density = 1.65;

  const generateQuote = () => {
    let material = "Carbon fiber Bi-directional 3K woven fabric + Epoxy resin as matrix.";
    let ratePerKg = 13900;
    if (id < 10) {
      material = "Carbon fiber Bi-directional 3K Pre-Preg.";
      ratePerKg = 16900;
    }

    const thickness = (od - id) / 2;
    const volume = (Math.PI / 4) * (od ** 2 - id ** 2) * length / 1000;
    const weight = volume * density / 1000;
    const price = Math.round(weight * ratePerKg);

    const text = \`Thank you for your inquiry. Please find below our quotation for the same.

QUOTE:

[1] Name : Carbon Fiber Round Tube

Sizes :  \${od} mm OD x \${id} mm ID x \${length} mm L [ \${thickness.toFixed(2)} mm thickness]  
Finish of surface : Matte finish
Material : \${material}
Process : Roll wrap
Qty./lot required : \${qty} nos
Price/ pcs. : Rs.\${price}/-

Note:
[1] The dimensional tolerance for Tube is : OD +/- 0.1 mm, Length + 2-5 mm.

Terms & Conditions:
Payment : 50% advance along with the Purchase order, remaining amount to be paid prior to dispatch .
Taxes : 18 % GST Extra as actual
Inspection : At our end
Packing : Extra as actual
Freight : Extra as actual.
Validity : 7 days.

Hoping to receive your valued order.\`;

    setQuote(text);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(5);
    doc.text(quote, 10, 10);
    doc.save("quotation.pdf");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <input type="number" placeholder="OD (mm)" onChange={e => setOd(Number(e.target.value))} /><br/>
      <input type="number" placeholder="ID (mm)" onChange={e => setId(Number(e.target.value))} /><br/>
      <input type="number" placeholder="Length (mm)" onChange={e => setLength(Number(e.target.value))} /><br/>
      <input type="number" placeholder="Quantity" defaultValue={1} onChange={e => setQty(Number(e.target.value))} /><br/>
      <button onClick={generateQuote}>Generate Quote</button><br/>
      {quote && (
        <>
          <pre>{quote}</pre>
          <button onClick={downloadPDF}>Download PDF</button>
        </>
      )}
    </div>
  );
}
