import { useState } from 'react';

export function FairPriceCalculator() {
  const [materials, setMaterials] = useState<number>(3200);
  const [hours, setHours] = useState<number>(36);
  const [rate, setRate] = useState<number>(250);
  const [shipping, setShipping] = useState<number>(600);

  const labour = hours * rate;
  const makerReceives = materials + labour;
  const total = makerReceives + shipping;
  const percentage = total > 0 ? Math.round((makerReceives / total) * 100) : 0;

  const formatCurrency = (val: number) => '₹' + val.toLocaleString('en-IN');

  const materialsWidth = total > 0 ? (materials / total) * 100 : 0;
  const labourWidth = total > 0 ? (labour / total) * 100 : 0;
  const shippingWidth = total > 0 ? (shipping / total) * 100 : 0;

  return (
    <section id="fair-price" className="bg-khadi py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-indigo mb-10">What makes up the price</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-kiln font-body mb-1">Materials cost (₹)</label>
              <input
                type="number"
                value={materials}
                onChange={(e) => setMaterials(Number(e.target.value))}
                className="w-full bg-cream border border-kiln/30 rounded-sm px-4 py-2 text-indigo focus:outline-none focus:border-indigo"
              />
            </div>
            <div>
              <label className="block text-kiln font-body mb-1">Hours of work</label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full bg-cream border border-kiln/30 rounded-sm px-4 py-2 text-indigo focus:outline-none focus:border-indigo"
              />
            </div>
            <div>
              <label className="block text-kiln font-body mb-1">Skill rate per hour (₹)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full bg-cream border border-kiln/30 rounded-sm px-4 py-2 text-indigo focus:outline-none focus:border-indigo"
              />
            </div>
            <div>
              <label className="block text-kiln font-body mb-1">Shipping cost (₹)</label>
              <input
                type="number"
                value={shipping}
                onChange={(e) => setShipping(Number(e.target.value))}
                className="w-full bg-cream border border-kiln/30 rounded-sm px-4 py-2 text-indigo focus:outline-none focus:border-indigo"
              />
            </div>
          </div>

          {/* Result */}
          <div className="flex flex-col justify-center">
            <div className="flex w-full h-12 rounded-sm overflow-hidden mb-6 text-xs text-indigo font-semibold">
              <div className="bg-haldi flex items-center justify-center transition-all duration-300" style={{ width: `${materialsWidth}%` }}>
                {materialsWidth > 15 && 'Materials'}
              </div>
              <div className="bg-neem flex items-center justify-center transition-all duration-300 text-cream" style={{ width: `${labourWidth}%` }}>
                {labourWidth > 15 && 'Labour'}
              </div>
              <div className="bg-kiln/40 flex items-center justify-center transition-all duration-300" style={{ width: `${shippingWidth}%` }}>
                {shippingWidth > 15 && 'Shipping'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-display text-4xl text-indigo">
                Total: {formatCurrency(total)}
              </div>
              <div className="text-neem font-semibold text-xl">
                Maker keeps: {formatCurrency(makerReceives)} ({percentage}%)
              </div>
              <div className="text-kiln text-sm mt-4 pt-4 border-t border-kiln/20">
                price = materials + (hours × skill rate) + shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FairPriceCalculator;
