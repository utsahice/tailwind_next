import Image from "next/image";

export default function TransformingBrands() {
  return (
    <section className=" py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-300 pb-10 mb-16">
        {[
          { title: "Experience", value: "25", desc: "Years in GGC Industry" },
          { title: "Performance", value: "200%", desc: "Increase in Sales" },
          {
            title: "Efficient",
            value: "5X",
            desc: "Faster Production & Asset Delivery",
          },
          {
            title: "Faster",
            value: "3X",
            desc: "Optimized Retail Strategy & Global Distribution",
          },
        ].map((item, i) => (
          <div key={i}>
            <p className="text-black uppercase font-termina tracking-widest ">
              {item.title}
            </p>
            <p className="text-4xl font-ivy text-sm">{item.value}</p>
            <p className="text-black font-termina uppercase tracking-widest ">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-9xl bg-gray mx-auto px-6 flex flex-col lg:flex-row gap-12">
        
        <div className="relative w-100p max-w-sm lg:max-w-md h-[650]">
          <div className=" relative lg:absolute lg:-top-40 overflow-hidden absolute  rounded-lg shadow-lg max-w-[280px] h-[650]">
            <Image
              src="/transforming/1.jpg"
              alt="Sephora building"
              width={400}
              height={800}
              className="object-cover w-full h-full "
            />
          </div>
        </div>

        <div className="w-full lg:w-3/4 overflow-x-auto">
          <p className="text-xs pt-9.5 uppercase font-termina tracking-widest text-white mb-2">
            What We Do
          </p>
          <h2 className="text-2xl lg:text-3xl font-ivy font-semibold text-yello mb-8 whitespace-nowrap">
            Transforming Brands Into Global Icons
          </h2>

          {/* Horizontal Scrollable Columns */}
          <div className="flex gap-1 min-w-15px text-[10px] font-termina text-gray-700">
            {/* COLUMN 1 */}
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

            {/* COLUMN 2 */}
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

            {/* COLUMN 3 */}
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

            {/* COLUMN 4 */}
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

            {/* COLUMN 5 */}
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

            {/* COLUMN 6 */}
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
