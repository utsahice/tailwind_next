import Image from "next/image";
import Marquee from "@/app/Retail/Marquee";

export default function RetailPartners() {
  const logos = [
    "/retail/group1.svg",
    "/retail/group2.svg",
    "/retail/group3.svg",
    "/retail/group5.svg",
    "/retail/group6.svg",
    "/retail/group7.svg",
    "/retail/group8.svg",
    "/retail/group9.svg",
    "/retail/group10.svg",
    "/retail/group11.svg",
    "/retail/group12.svg",
    "/retail/group13.svg",
    "/retail/group14.svg",
    "/retail/group15.svg",
    "/retail/group16.svg",
  ];

  return (
    <>
    <section className="w-full bg-gray py-10 flex flex-col items-center">
      <h2 className="text-center font-ivy text-[32px] md:text-[40px] text-yello mb-10">
        OUR RETAIL PARTNERS
      </h2>

      <div className="w-full max-w-6xl ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {logos.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`partner-${i}`}
              width={150}
              height={60}
              className="object-contain "
            />
          ))}
        </div>
      </div>
    </section>
    <div>
      <Marquee text="Brand building. Amplified. Transforming brands into global icons. We leverage our capabilities and proprietary technology to design, market, distribute, scale, and accelerate brands on a global scale." speed={40} />
    </div>
    </>
  );
}
