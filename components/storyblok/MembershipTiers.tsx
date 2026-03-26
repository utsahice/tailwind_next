"use client";
import { storyblokEditable } from "@storyblok/react/rsc";

interface Tier {
    _uid: string;
    name: string;
    price: string;
    period: string;
    features: string;
    cta_text: string;
    cta_url: string;
    featured: boolean;
}

interface MembershipTiersProps {
    blok: {
        title: string;
        tiers: Tier[];
        _uid: string;
        component: string;
    };
}

export default function MembershipTiers({ blok }: MembershipTiersProps) {
    return (
        <section {...storyblokEditable(blok)} className="py-20 bg-white">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px]">
                <h2 className="font-ivy text-5xl md:text-6xl text-center text-black mb-16">
                    {blok.title || "Choose Your Plan"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blok.tiers?.map((tier) => {
                        const features = tier.features?.split('\n').filter(f => f.trim()) || [];

                        return (
                            <div
                                key={tier._uid}
                                className={`relative rounded-2xl p-8 border-2 transition-all duration-300 ${tier.featured
                                        ? 'border-yello bg-yello/5 shadow-xl scale-105'
                                        : 'border-gray-200 hover:border-yello hover:shadow-lg'
                                    }`}
                            >
                                {tier.featured && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-yello text-black px-6 py-2 rounded-full font-termina text-sm font-bold">
                                            MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="font-ivy text-3xl text-black mb-4">
                                        {tier.name}
                                    </h3>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="font-termina text-5xl font-bold text-black">
                                            ${tier.price}
                                        </span>
                                        <span className="font-termina text-gray-600">
                                            /{tier.period}
                                        </span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <svg className="w-6 h-6 text-yello flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="font-termina text-sm text-gray-700">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <a href={tier.cta_url} className="block">
                                    <button className={`w-full py-4 font-termina text-sm transition-all ${tier.featured
                                            ? 'btn-primary'
                                            : 'btn-outline'
                                        }`}>
                                        {tier.cta_text || "Get Started"}
                                    </button>
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
