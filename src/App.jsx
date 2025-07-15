import { useState } from 'react';
import jsPDF from 'jspdf';

export default function App() {
  const [od, setOd] = useState(0);
  const [id, setId] = useState(0);
  const [length, setLength] = useState(0);
  const [qty, setQty] = useState(1);
  const [quote, setQuote] = useState('');

  const density = 1.65;
  const ratePerKg = 13900;

  const generateQuote = () => {
    const thickness = (od - id) / 2;
    const volume = (Math.PI / 4) * (od ** 2 - id ** 2) * length / 1000;
    const weight = volume * density / 1000;
    const price = Math.round(weight * ratePerKg);

    const text = `Thank you for your inquiry. Please find below our quotation for the same.\n\nQUOTE:\n\n[1] Name : Carbon Fiber Round Tube\n\nSizes :  ${od} mm OD x ${id} mm ID x ${length} mm L [ ${thickness.toFixed(2)} mm thickness]  \nFinish of surface : Matte finish\nMaterial : Carbon fiber Bi-directional 3K woven fabric + Epoxy resin as matrix.\nProcess : Roll wrap\nQty./lot required : ${qty} nos\nPrice/ pcs. : Rs.${price}/-\n\nNote:\n[1] The dimensional tolerance for Tube is : OD +/- 0.1 mm, Length + 2-5 mm.\n\nTerms & Conditions:\nPayment : 50% advance along with the Purchase order, remaining amount to be paid prior to dispatch.\nTaxes : 18 % GST Extra as actual\nInspection : At our end\nPacking : Extra as actual\nFreight : Extra as actual.\nValidity : 7 days.\n\nHoping to receive your valued order.`;

    setQuote(text);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(quote, 10, 10);
    doc.save('quotation.pdf');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">Carbon Fiber Quote Generator</h1>
      <input type="number" placeholder="OD (mm)" className="border p-2 w-full" onChange={e => setOd(Number(e.target.value))} />
      <input type="number" placeholder="ID (mm)" className="border p-2 w-full" onChange={e => setId(Number(e.target.value))} />
      <input type="number" placeholder="Length (mm)" className="border p-2 w-full" onChange={e => setLength(Number(e.target.value))} />
      <input type="number" placeholder="Quantity" defaultValue={1} className="border p-2 w-full" onChange={e => setQty(Number(e.target.value))} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={generateQuote}>Generate Quote</button>

      {quote && (
        <div className="bg-white p-4 border rounded whitespace-pre-wrap">
          <pre>{quote}</pre>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded" onClick={downloadPDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
}