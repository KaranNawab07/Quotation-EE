import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

export default function QuoteGenerator() {
  const [tubes, setTubes] = useState([{ od: '', id: '', length: '', qty: '' }]);
  const [quote, setQuote] = useState("");

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
      result += `Sizes :  ${od} mm OD x ${id} mm ID x ${length} mm L [ ${thickness} mm thickness]\n`;
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
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const letterhead = new Image();
    letterhead.src = '/KUN-2.jpg'; // Place KUN 2.jpg in your public folder

    letterhead.onload = () => {
      doc.addImage(letterhead, 'JPEG', 0, 0, 595, 842);

      const lines = quote.split('\n');
      let y = 120;
      lines.forEach((line) => {
        if (line.startsWith("Sizes :") || line.startsWith("Price/ pcs. :") || line === "Note:" || line === "Terms & Conditions:") {
          doc.setFont("helvetica", "bold");
          if (line.includes("Price/ pcs.")) {
            doc.setTextColor(255, 0, 0);
          } else {
            doc.setTextColor(0);
          }
        } else {
          doc.setFont("helvetica", "normal");
          doc.setTextColor(0);
        }
        doc.text(line, 50, y);
        y += 16;
      });

      doc.save("quotation.pdf");
    };
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="mb-4">
        <CardContent className="space-y-4 pt-6">
          {tubes.map((t, i) => (
            <div key={i} className="space-y-2 border p-4 rounded bg-gray-50">
              <h2 className="font-semibold">Tube #{i + 1}</h2>
              <Input type="number" placeholder="OD (mm)" value={t.od} onChange={e => handleChange(i, 'od', e.target.value)} />
              <Input type="number" placeholder="ID (mm)" value={t.id} onChange={e => handleChange(i, 'id', e.target.value)} />
              <Input type="number" placeholder="Length (mm)" value={t.length} onChange={e => handleChange(i, 'length', e.target.value)} />
              <Input type="number" placeholder="Quantity" value={t.qty} onChange={e => handleChange(i, 'qty', e.target.value)} />
            </div>
          ))}
          <div className="flex gap-4">
            <Button onClick={addTube}>+ Add Tube</Button>
            <Button onClick={generateQuote}>Generate Quote</Button>
          </div>
        </CardContent>
      </Card>

      {quote && (
        <Card>
          <CardContent className="whitespace-pre-wrap p-4 space-y-4">
            <pre>{quote}</pre>
            <div className="flex gap-4">
              <Button onClick={downloadPDF}>Download PDF</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
