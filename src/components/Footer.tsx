import React from 'react';
import {
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="charter" className="relative w-full bg-[#050608] border-t border-[#D4AF37]/20 pt-16 pb-12 px-6 sm:px-12 select-none overflow-hidden text-left">
      
      {/* Background radial ambient glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] opacity-20 blur-[130px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, #C85A32 50%, transparent 80%)',
        }}
      />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        
        {/* Top Partner Guild Banners */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-telemetry text-[#D4AF37]">
            <ShieldCheck size={14} />
            <span>INTEROPERABLE TRADE ECOSYSTEM & INSTITUTIONAL PARTNERS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'ONDC Network', desc: 'Beckn v2 Protocol Core' },
              { name: 'GeM Portal', desc: 'Government E-Marketplace' },
              { name: 'Ministry of Textiles', desc: 'Craft Cluster Recognition' },
              { name: 'UNESCO Living Heritage', desc: 'Intangible Genealogies' },
              { name: 'GI Registry India', desc: 'Geographical Indication' },
              { name: 'Indian Post Export Hub', desc: 'Direct Village Customs Clear' },
            ].map((partner, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-[#0c0906] border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-colors"
              >
                <div className="text-xs font-semibold text-[#FAF7F2]">{partner.name}</div>
                <div className="text-[10px] text-[#FAF7F2]/50 font-sans mt-0.5">{partner.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Middle Grid: Brand, Charter, Clusters & Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-6 border-t border-[#D4AF37]/15">
          
          {/* Brand & Mission Statement (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-2xl font-bold tracking-[0.2em] text-[#FAF7F2]">
                MILAAN
              </span>
              <Sparkles size={16} className="text-[#D4AF37]" />
            </div>

            <div className="font-serif-luxury italic text-sm text-[#D4AF37]">
              "Jahan Hunar Mile Technology Se" — Where Timeless Indian Heritage Meets Autonomous Global Trade.
            </div>

            <p className="text-xs text-[#FAF7F2]/70 font-sans leading-relaxed max-w-md">
              MILAAN is an autonomous sovereign trade engine connecting rural master kaarigars directly with conscious global patrons. 
              By leveraging computer vision authenticity checks, dialect-native voice onboarding, and ONDC Beckn v2 protocols, 
              we dismantle extractive middleman hierarchies and deliver 91.4% of total export value straight to artisan hands.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-telemetry text-[#58D68D]">
              <span className="w-2 h-2 rounded-full bg-[#58D68D] animate-ping" />
              <span>BECKN NETWORK NODE: milaan.global.trade (200 OK)</span>
            </div>
          </div>

          {/* Sovereign Artisan Rights Charter (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-telemetry text-xs uppercase text-[#D4AF37] tracking-wider">
              Sovereign Artisan Rights Charter
            </h4>
            <ul className="text-xs text-[#FAF7F2]/75 space-y-2 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] font-bold">•</span>
                <span><strong>No Intermediary Commission:</strong> 91.4% minimum direct DBT escrow payout on every international transaction.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] font-bold">•</span>
                <span><strong>Living Intellectual Property:</strong> Kaarigar families retain perpetual on-chain copyright to their generational motifs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4AF37] font-bold">•</span>
                <span><strong>Zero-Literacy Parity:</strong> Oral voice AI enables full sovereign trade participation without requiring written literacy.</span>
              </li>
            </ul>
          </div>

          {/* Verified Clusters (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-telemetry text-xs uppercase text-[#D4AF37] tracking-wider">
              Protected GI Clusters
            </h4>
            <div className="space-y-1.5 text-xs text-[#FAF7F2]/70 font-sans">
              <div>Sambalpuri Bandha (Odisha)</div>
              <div>Bastar Dhokra (Chhattisgarh)</div>
              <div>Nizamabad Black Pottery (UP)</div>
              <div>Channapatna Wooden Toys (Karnataka)</div>
              <div>Kutch Mirrorwork (Gujarat)</div>
              <div>Mithila Madhubani (Bihar)</div>
              <div>Assam Cane & Bamboo (Assam)</div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Ticker */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#D4AF37]/15 text-xs font-telemetry text-[#FAF7F2]/50">
          <div>
            © {new Date().getFullYear()} MILAAN Autonomous Trade Engine. All Sovereign Artisan Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#charter" className="hover:text-[#D4AF37]">Privacy Policy</a>
            <a href="#charter" className="hover:text-[#D4AF37]">Beckn Protocol Spec</a>
            <a href="#charter" className="hover:text-[#D4AF37]">Artisan DBT Transparency</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
