import Image from "next/image";

export default function TransformingBrands() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <h2 className="text-center text-black font-ivy text-3xl md:text-4xl lg:text-5xl mb-10 tracking-wide">
        TRUSTED BY GLOBAL BRAND EXPERTS
      </h2>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-center gap-12 border-b border-gray-300 pb-12 mb-20">
        {[
          { title: "EXPERIENCE", value: "25", desc: "YEARS IN GGC INDUSTRY" },
          { title: "PERFORMANCE", value: "200%", desc: "INCREASE IN SALES" },
          {
            title: "EFFICIENT",
            value: "5X",
            desc: "FASTER PRODUCTION & ASSET DELIVERY",
          },
          {
            title: "FASTER",
            value: "3X",
            desc: "OPTIMIZED RETAIL STRATEGY & GLOBAL DISTRIBUTION",
          },
        ].map((item, i) => (
          <div key={i} className="relative flex flex-col items-center px-4">
            {/* Vertical divider */}
            {i !== 0 && (
              <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-25 w-px bg-black"></div>
            )}

            <p className="uppercase text-[10px] tracking-widest text-black font-termina mb-2">
              {item.title}
            </p>

            <p className="text-4xl md:text-5xl font-ivy text-sm mb-2">
              {item.value}
            </p>

            <p className="uppercase text-[10px] tracking-widest text-black font-termina max-w-[150px] leading-tight">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-9xl bg-gray mx-auto px-6 flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-auto flex-shrink-0">
          <div className="mx-auto lg:mx-0 h-[650] max-w-[280px] rounded-lg overflow-hidden shadow-lg transform lg:-translate-y-10">
            <Image
              src="/transforming/1.jpg"
              alt="Sephora building"
              width={400}
              height={800}
              className="object-cover w-full h-full "
            />
          </div>
        </div>

        <div className="w-full lg:w-3/4 overflow-x-auto ml-0.5">
          <p className="text-xs pt-9.5 uppercase font-termina tracking-widest text-white mb-2">
            What We Do
          </p>
          <h2 className="text-2xl lg:text-3xl font-ivy font-semibold text-yello mb-8 whitespace-nowrap">
            Transforming Brands Into Global Icons
          </h2>
          <div className="flex gap-1 min-w-15px text-[10px] font-termina text-gray-700">
            <div className="min-w-[180px]">
              <h3 className="font-semibold text-white mb-2 uppercase text-[12px]">
                Brand Strategy & Messaging
              </h3>
              <ul className="space-y-1 text-white font-termina uppercase">
                <li>Market Research</li>
                <li>Brand Naming</li>
                <li>Brand Positioning</li>
                <li>Brand Strategy</li>
                <li>Brand Evolution</li>
                <li>Tone of Voice</li>
                <li>Messaging</li>
                <li>Product Naming</li>
                <li>Campaign Strategy</li>
              </ul>
            </div>
            <div className="min-w-[180px] ">
              <h3 className="font-semibold text-white mb-2 uppercase text-[12px]">
                Brand Design
              </h3>
              <ul className="space-y-1 text-white font-termina uppercase">
                <li>Brand Identity</li>
                <li>Packaging Design</li>
                <li>Digital Design</li>
                <li>Campaign Development</li>
              </ul>
            </div>
            <div className="min-w-[180px]">
              <h3 className="font-semibold text-white mb-2 uppercase text-[12px]">
                Content Concept & Creation
              </h3>
              <ul className="space-y-1 text-white font-termina uppercase">
                <li>Art Direction</li>
                <li>Photography</li>
                <li>Video</li>
                <li>360 Social Campaigns</li>
                <li>Production Mgmt</li>
                <li>Copywriting</li>
                <li>Marketing Collateral</li>
              </ul>
            </div>
            <div className="min-w-[180px]">
              <h3 className="font-semibold text-white mb-2 uppercase text-[12px]">
                Architectural & Experiential
              </h3>
              <ul className="space-y-1 text-white font-termina uppercase">
                <li>Retail Strategy</li>
                <li>Concept & Design</li>
                <li>Playbook</li>
                <li>Popup & Exhibition</li>
                <li>Events</li>
                <li>Wayfinding</li>
              </ul>
            </div>
            <div className="min-w-[180px]">
              <h3 className="font-semibold text-white mb-2 uppercase text-[12px]">
                Industrial Design
              </h3>
              <ul className="space-y-1 text-white font-termina uppercase">
                <li>Product Design</li>
                <li>Fixture Design</li>
                <li>Packaging Design</li>
                <li>Open Sell Systems</li>
                <li>Planograms</li>
                <li>Retail Display</li>
              </ul>
            </div>
            <div className="min-w-[180px]">
              <h3 className="font-semibold text-white mb-2 uppercase text-[12px]">
                Global Retail Distribution
              </h3>
              <ul className="space-y-1 text-white font-termina uppercase">
                <li>Go-to-Market</li>
                <li>Asset Consultation</li>
                <li>Line Planning</li>
                <li>Pitch Decks</li>
                <li>Account Mgmt</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
                <li>Wholesale Strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
