import { useState } from 'react';
import jsPDF from 'jspdf';

export default function App() {
  const [tubes, setTubes] = useState([{ od: '', id: '', length: '', qty: '' }]);
  const [quote, setQuote] = useState('');

  const density = 1.65;
  const ratePerKg = 13900;

  const handleChange = (i, field, val) => {
    const arr = [...tubes];
    arr[i][field] = val;
    setTubes(arr);
  };

  const addTube = () => setTubes([...tubes, { od: '', id: '', length: '', qty: '' }]);

  const generateQuote = () => {
    let out = "Thank you...\n\nQUOTE:\n\n";
    tubes.forEach((t, i) => {
      const od = parseFloat(t.od), id = parseFloat(t.id), len = parseFloat(t.length), qty = parseInt(t.qty);
      const thick = ((od - id) / 2).toFixed(2);
      const vol = (Math.PI / 4)*(od*od - id*id)*len/1000;
      const weight = vol * density / 1000;
      const price = Math.round(weight * ratePerKg);

      out += `[${i+1}] Name : Carbon Fiber Round Tube\n\n`;
      out += `Sizes :  ${od} mm OD x ${id} mm ID x ${len} mm L [ ${thick} mm thickness]\n`;
      out += `Qty./lot required : ${qty} nos\nPrice/ pcs. : Rs.${price}/-\n\n`;
    });
    out += "Note:\n[1] ...\n\nTerms & Conditions:\n...";
    setQuote(out);
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
      {tubes.map((t, i) => (
        <div key={i} className="border p-4 rounded bg-gray-50 space-y-2">
          <h2 className="font-semibold">Tube #{i+1}</h2>
          <input value={t.od} onChange={e => handleChange(i,'od',e.target.value)} placeholder="OD (mm)" />
          <input value={t.id} onChange={e => handleChange(i,'id',e.target.value)} placeholder="ID (mm)" />
          <input value={t.length} onChange={e => handleChange(i,'length',e.target.value)} placeholder="Length (mm)" />
          <input value={t.qty} onChange={e => handleChange(i,'qty',e.target.value)} placeholder="Quantity" />
        </div>
      ))}
      <button onClick={addTube}>+ Add Tube</button>
      <button onClick={generateQuote}>Generate Quote</button>

      {quote && (
        <div>
          <pre>{quote}</pre>
          <button onClick={downloadPDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
}
