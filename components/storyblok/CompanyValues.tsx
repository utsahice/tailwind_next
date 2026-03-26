import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface Value {
    _uid: string;
    title: string;
    description: string;
    icon?: {
        filename: string;
        alt: string;
    };
}

interface CompanyValuesProps {
    blok: {
        title?: string;
        subtitle?: string;
        description?: string;
        values?: Value[];
        background_image?: {
            filename: string;
            alt: string;
        };
        _uid: string;
        component: string;
    };
}

export default function CompanyValues({ blok }: CompanyValuesProps) {
    // Fallback values
    const fallbackValues = [
        {
            _uid: "value_1",
            title: "Excellence",
            description: "We deliver exceptional results that exceed expectations, setting new standards in beauty brand development and execution.",
            icon: { filename: "/service_1.jpg", alt: "Excellence" }
        },
        {
            _uid: "value_2",
            title: "Innovation",
            description: "We embrace cutting-edge technologies and creative approaches to solve complex brand challenges and drive growth.",
            icon: { filename: "/service_2.jpg", alt: "Innovation" }
        },
        {
            _uid: "value_3",
            title: "Partnership",
            description: "We build lasting relationships with our clients, working as true partners in their journey to global success.",
            icon: { filename: "/service_3.jpg", alt: "Partnership" }
        },
        {
            _uid: "value_4",
            title: "Integrity",
            description: "We operate with transparency, honesty, and ethical practices in all our business relationships and decisions.",
            icon: { filename: "/service_4.jpg", alt: "Integrity" }
        }
    ];

    const values = blok.values?.length ? blok.values : fallbackValues;

    return (
        <section {...storyblokEditable(blok)} className="w-full py-20 bg-white relative overflow-hidden">
            {/* Background Image */}
            {blok.background_image && (
                <div className="absolute inset-0 opacity-5">
                    <Image
                        src={blok.background_image.filename}
                        alt={blok.background_image.alt}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-termina tracking-widest uppercase mb-4 text-gray-600">
                        {blok.subtitle || "Our Values"}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-ivy text-black mb-8">
                        {blok.title || "What Drives Us Forward"}
                    </h2>
                    <p className="text-lg font-termina text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        {blok.description || "Our core values guide every decision we make and every relationship we build. They are the foundation of our success and the promise we make to every client."}
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div key={value._uid} className="group">
                            <div className="relative mb-6 overflow-hidden rounded-xl">
                                <div className="aspect-square relative">
                                    <Image
                                        src={value.icon?.filename || `/service_${index + 1}.jpg`}
                                        alt={value.icon?.alt || value.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                    {/* Value Number */}
                                    <div className="absolute top-6 left-6">
                                        <div className="w-12 h-12 bg-yello text-black rounded-full flex items-center justify-center font-ivy text-xl font-bold">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>
                                    </div>

                                    {/* Value Title */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <h3 className="text-white font-ivy text-xl mb-2">
                                            {value.title}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Value Description */}
                            <div className="px-2">
                                <p className="text-gray-700 font-termina text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="inline-flex items-center gap-4 bg-gray-50 rounded-full px-8 py-4">
                        <span className="font-termina text-sm text-gray-700">Ready to work with us?</span>
                        <button className="btn-primary font-termina px-6 py-2">
                            GET STARTED
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}