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
  let result = "Thank you for your inquiry. Please find below our quotation for the same.\n\nQUOTE:\n\n";

  tubes.forEach((tube, index) => {
    const od = parseFloat(tube.od);
    const id = parseFloat(tube.id);
    const length = parseFloat(tube.length);
    const qty = parseInt(tube.qty);
    const thickness = ((od - id) / 2).toFixed(2);
    const volume = (Math.PI / 4) * (od ** 2 - id ** 2) * length / 1000;
    const weight = volume * density / 1000;
    const price = Math.round(weight * ratePerKg);

    result += `[${index + 1}] Name : Carbon Fiber Round Tube\n\n`;
    result += `Sizes :  ${od} mm OD x ${id} mm ID x ${length} mm L [ ${thickness} mm thickness]  \n`;
    result += `Finish of surface : Matte finish\n`;
    result += `Material : Carbon fiber Bi-directional 3K woven fabric + Epoxy resin as matrix.\n`;
    result += `Process : Roll wrap\n`;
    result += `Qty./lot required : ${qty} nos\n`;
    result += `Price/ pcs. : Rs.${price}/-\n\n`;
  });

  result += `Note:\n[1] The dimensional tolerance for Tube is : OD +/- 0.1 mm, Length + 2-5 mm.\n\n`;
  result += `Terms & Conditions:\n`;
  result += `Payment : 50% advance along with the Purchase order, remaining amount to be paid prior to dispatch .\n`;
  result += `Taxes : 18 % GST Extra as actual\n`;
  result += `Inspection : At our end\n`;
  result += `Packing : Extra as actual\n`;
  result += `Freight : Extra as actual.\n`;
  result += `Validity : 7 days.\n\n`;
  result += `Hoping to receive your valued order.`;

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
      {tubes.map((t, i) => (
        <div key={i} className="border p-4 rounded bg-gray-50 space-y-2">
          <h2 className="font-semibold">Tube #{i+1}</h2>
          <input value={t.od} onChange={e => handleChange(i,'od',e.target.value)} placeholder="OD (mm)" />
          <input value={t.id} onChange={e => handleChange(i,'id',e.target.value)} placeholder="ID (mm)" />
          <input value={t.length} onChange={e => handleChange(i,'length',e.target.value)} placeholder="Length (mm)" />
          <input value={t.qty} onChange={e => handleChange(i,'qty',e.target.value)} placeholder="Quantity" />
        </div>
      ))}
      <div className="flex gap-4">
  <button onClick={addTube}>+ Add Tube</button>
  <button onClick={generateQuote}>Generate Quote</button>
</div>


      {quote && (
        <div>
          <pre>{quote}</pre>
          <button onClick={downloadPDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
}
