import Image from "next/image";

export default function OurServices() {
  return (
    <section className="w-full px-10 py-24 bg-[var(--color-bg)] flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* ✅ LEFT TEXT AREA */}
        <div className="flex flex-col gap-6">
          <p className="text-[var(--text-14)] tracking-wide text-[#555] font-termina">
            HOW WE HELP
          </p>

          <h2 className="font-ivy text-[var(--text-40)] leading-none text-[var(--color-text-dark)]">
            OUR SERVICES
          </h2>

          <p className="text-[#444] text-[var(--text-16)] max-w-md leading-6">
            Glazed Gloss Creative Collective was founded by a seasoned brand builder
            driven by a singular purpose: to accelerate your brand vision from
            inception to fruition and to accelerate brand growth.
          </p>

          <div className="flex gap-4 mt-4">
            <button className="btn-primary">HIRE GLAZED</button>
            <button className="btn-outline">VIEW ALL SERVICES</button>
          </div>
        </div>

        {/* ✅ RIGHT SIDE IMAGES */}
        <div className="grid grid-cols-2 gap-6 relative">
          
          {/* Top Left */}
          <div className="card">
            <Image
              src="/services/img1.jpg"
              width={500}
              height={400}
              alt="service 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right */}
          <div className="card">
            <Image
              src="/services/img2.jpg"
              width={500}
              height={400}
              alt="service 2"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Left - with small overlay card */}
          <div className="relative card">
            <Image
              src="/services/img3.jpg"
              width={500}
              height={400}
              alt="service 3"
              className="w-full h-full object-cover"
            />

            {/* ✅ overlay mini card */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-md p-3 flex items-center gap-3">
              <Image
                src="/services/avatar.jpg"
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-[var(--text-14)]">
                <p className="font-bold">Lorem Ipsum</p>
                <p className="text-[#666]">Lorem ipsum</p>
              </div>
            </div>
          </div>

          {/* Bottom Right */}
          <div className="card">
            <Image
              src="/services/img4.jpg"
              width={500}
              height={400}
              alt="service 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>

      {/* ✅ TAGS BELOW IMAGES */}
      <div className="absolute mt-[580px] flex flex-wrap gap-4 w-full justify-center">
        <span className="service-tag">CREATIVE & MARKETING</span>
        <span className="service-tag">FORMULATION IDEATION & ASSORTMENT CONCEPT</span>
        <span className="service-tag">THE SHOWROOM / PRODUCTION</span>
        <span className="service-tag">SALES & DISTRIBUTION</span>
        <span className="service-tag">FULFILLMENT & OPERATIONS</span>
      </div>
    </section>
  );
}
