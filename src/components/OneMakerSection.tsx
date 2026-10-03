
export function OneMakerSection() {
  return (
    <section id="one-maker" className="bg-khadi py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-indigo mb-2">How one craft reaches you</h2>
        <p className="text-kiln text-sm mb-12">Example based on a real listing</p>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {/* Step 1 */}
          <div className="snap-center shrink-0 w-80 md:w-auto bg-cream border border-kiln/15 rounded-sm p-6">
            <div className="font-display text-4xl text-madder mb-4">1</div>
            <h3 className="font-display text-xl text-indigo mb-3">Minati speaks in Kosli</h3>
            <p className="font-body text-indigo mb-4 text-base leading-relaxed">
              "ମୋର ଏଇ ଶାଢ଼ୀ..."
            </p>
            <p className="text-kiln text-sm">Sambalpuri Kosli dialect</p>
          </div>

          {/* Step 2 */}
          <div className="snap-center shrink-0 w-80 md:w-auto bg-cream border border-kiln/15 rounded-sm p-6">
            <div className="font-display text-4xl text-madder mb-4">2</div>
            <h3 className="font-display text-xl text-indigo mb-3">The listing appears</h3>
            <div className="font-body text-indigo mb-2 text-base leading-relaxed bg-khadi/50 p-3 border border-kiln/10 rounded-sm">
              <p className="font-semibold">Minati & Dinabandhu Meher</p>
              <p className="text-sm">Pit-Loom Bandha • Barpali, Odisha</p>
              <p className="mt-2 text-lg">₹14,800</p>
              <p className="text-xs text-kiln mt-1">36 hours to craft</p>
            </div>
            <p className="text-kiln text-sm">Translated to English and Hindi</p>
          </div>

          {/* Step 3 */}
          <div className="snap-center shrink-0 w-80 md:w-auto bg-cream border border-kiln/15 rounded-sm p-6">
            <div className="font-display text-4xl text-madder mb-4">3</div>
            <h3 className="font-display text-xl text-indigo mb-3">A fair price is set</h3>
            <div className="font-body text-indigo text-sm space-y-2 mb-4">
              <div className="flex justify-between"><span>Materials:</span><span>₹3,200</span></div>
              <div className="flex justify-between"><span>Labour (36h × ₹250):</span><span>₹9,000</span></div>
              <div className="flex justify-between font-semibold"><span>Maker share:</span><span>₹12,200</span></div>
              <div className="flex justify-between text-kiln"><span>Shipping & Platform:</span><span>₹2,600</span></div>
              <div className="flex justify-between border-t border-kiln/20 pt-2 font-semibold"><span>Total:</span><span>₹14,800</span></div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="snap-center shrink-0 w-80 md:w-auto bg-cream border border-kiln/15 rounded-sm p-6">
            <div className="font-display text-4xl text-madder mb-4">4</div>
            <h3 className="font-display text-xl text-indigo mb-3">A buyer pays directly</h3>
            <p className="font-body text-indigo text-base leading-relaxed mb-4">
              Funds go directly to the Meher family.
            </p>
            <div className="bg-neem/10 text-neem font-semibold p-3 rounded-sm border border-neem/20">
              Maker receives: ₹13,500 (91%)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OneMakerSection;
