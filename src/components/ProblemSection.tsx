
export function ProblemSection() {
  return (
    <section id="problem" className="bg-khadi py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-indigo mb-12">Who keeps the money</h2>
        
        <div className="space-y-12">
          {/* Traditional Retail */}
          <div>
            <h3 className="font-body text-indigo mb-4 text-lg">Traditional Retail (₹10,000 Saree)</h3>
            <div className="flex w-full h-12 rounded-sm overflow-hidden mb-2 text-sm font-semibold text-white">
              <div className="bg-madder flex items-center px-4" style={{ width: '45%' }}>
                Maker: ₹3,500-₹6,000
              </div>
              <div className="bg-kiln/30 flex items-center px-4 text-indigo" style={{ width: '55%' }}>
                Middlemen: ₹4,000-₹6,500
              </div>
            </div>
            <p className="text-kiln text-sm italic">Estimate from industry sources; to be verified</p>
          </div>

          {/* Milaan */}
          <div>
            <h3 className="font-body text-indigo mb-4 text-lg">With Milaan, the maker keeps ₹9,100 (91%)</h3>
            <div className="flex w-full h-12 rounded-sm overflow-hidden mb-2 text-sm font-semibold text-white">
              <div className="bg-neem flex items-center px-4" style={{ width: '91%' }}>
                Maker: ₹9,100
              </div>
              <div className="bg-kiln/20 flex items-center px-4 text-indigo" style={{ width: '9%' }}>
                Platform and shipping: ₹900
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
