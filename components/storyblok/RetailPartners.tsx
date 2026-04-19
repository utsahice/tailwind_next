import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface Partner {
    _uid: string;
    name: string;
    logo?: {
        filename: string;
        alt: string;
    };
}

interface RetailPartnersProps {
    blok: {
        title?: string;
        subtitle?: string;
        partners?: Partner[];
        _uid: string;
        component: string;
    };
}

export default function RetailPartners({ blok }: RetailPartnersProps) {
    // Fallback logos from public folder (only img2 and logo per request)
    const fallbackLogos = [
        "/img2.jpg",
        "/logo.jpg",
    ];

    const logos = blok.partners?.length ? blok.partners : fallbackLogos.map((src, i) => ({
        _uid: `fallback_${i}`,
        name: `Partner ${i + 1}`,
        logo: { filename: src, alt: `Partner ${i + 1}` }
    }));

    return (
        <>
            <section {...storyblokEditable(blok)} className="w-full bg-gray py-10 flex flex-col text-center items-center">
                <h2 className="text-center font-ivy text-[32px] md:text-[40px] text-yello mb-10">
                    {blok.title || "OUR RETAIL PARTNERS"}
                </h2>

                {/* Grid visible on desktop only */}
                <div className="w-full max-w-6xl hidden md:block">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
                        {logos.map((partner, i) => (
                            <Image
                                key={partner._uid}
                                src={partner.logo?.filename || fallbackLogos[i] || fallbackLogos[0]}
                                alt={partner.logo?.alt || partner.name}
                                width={150}
                                height={60}
                                className="object-contain"
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile marquee */}
                <div className="w-full md:hidden overflow-x-hidden whitespace-nowrap mt-2">
                    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 items-center gap-10 animate-marquee">
                        {logos.map((partner, i) => (
                            <Image
                                key={partner._uid}
                                src={partner.logo?.filename || fallbackLogos[i] || fallbackLogos[0]}
                                alt={partner.logo?.alt || partner.name}
                                width={150}
                                height={60}
                                className="object-contain"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Marquee Text */}
            <div className="w-full bg-dark py-4 overflow-hidden">
                <div className="animate-marquee whitespace-nowrap">
                    <span className="text-white font-termina text-sm tracking-wider">
                        Brand building. Amplified. Transforming brands into global icons. We leverage our capabilities and proprietary technology to design, market, distribute, scale, and accelerate brands on a global scale.
                    </span>
                </div>
            </div>
        </>
    );
}