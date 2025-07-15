import { useState } from 'react';
import jsPDF from 'jspdf';

export default function App() {
  const [tubes, setTubes] = useState([{ od: 0, id: 0, length: 0, qty: 1 }]);
  const [quote, setQuote] = useState('');

  const density = 1.65;
  const ratePerKg = 13900;

  const handleChange = (index, field, value) => {
    const newTubes = [...tubes];
    newTubes[index][field] = Number(value);
    setTubes(newTubes);
  };

  const addTube = () => {
    setTubes([...tubes, { od: 0, id: 0, length: 0, qty: 1 }]);
  };

  const generateQuote = () => {
    let result = "Thank you for your inquiry. Please find below our quotation for the same.\n\nQUOTE:\n\n";

    tubes.forEach((tube, index) => {
      const thickness = (tube.od - tube.id) / 2;
      const volume = (Math.PI / 4) * (tube.od ** 2 - tube.id ** 2) * tube.length / 1000;
      const weight = volume * density / 1000;
      const price = Math.round(weight * ratePerKg);

      result += `[${index + 1}] Name : Carbon Fiber Round Tube\n\n` +
        `Sizes :  ${tube.od} mm OD x ${tube.id} mm ID x ${tube.length} mm L [ ${thickness.toFixed(2)} mm thickness]  \n` +
        `Finish of surface : Matte finish\n` +
        `Material : Carbon fiber Bi-directional 3K woven fabric + Epoxy resin as matrix.\n` +
        `Process : Roll wrap\n` +
        `Qty./lot required : ${tube.qty} nos\n` +
        `Price/ pcs. : Rs.${price}/-\n\n`;
    });

    result += `Note:\n[1] The dimensional tolerance for Tube is : OD +/- 0.1 mm, Length + 2-5 mm.\n\n` +
      `Terms & Conditions:\n` +
      `Payment : 50% advance along with the Purchase order, remaining amount to be paid prior to dispatch .\n` +
      `Taxes : 18 % GST Extra as actual\n` +
      `Inspection : At our end\n` +
      `Packing : Extra as actual\n` +
      `Freight : Extra as actual.\n` +
      `Validity : 7 days.\n\n` +
      `Hoping to receive your valued order.`;

    setQuote(result);
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
      {tubes.map((tube, index) => (
        <div key={index} className="border p-4 rounded space-y-2 bg-gray-50">
          <h2 className="font-semibold">Tube #{index + 1}</h2>
          <input type="number" placeholder="OD (mm)" className="border p-2 w-full" value={tube.od} onChange={e => handleChange(index, 'od', e.target.value)} />
          <input type="number" placeholder="ID (mm)" className="border p-2 w-full" value={tube.id} onChange={e => handleChange(index, 'id', e.target.value)} />
          <input type="number" placeholder="Length (mm)" className="border p-2 w-full" value={tube.length} onChange={e => handleChange(index, 'length', e.target.value)} />
          <input type="number" placeholder="Quantity" className="border p-2 w-full" value={tube.qty} onChange={e => handleChange(index, 'qty', e.target.value)} />
        </div>
      ))}
      <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={addTube}>+ Add Tube</button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2" onClick={generateQuote}>Generate Quote</button>

      {quote && (
        <div className="bg-white p-4 border rounded whitespace-pre-wrap">
          <pre>{quote}</pre>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded" onClick={downloadPDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
}