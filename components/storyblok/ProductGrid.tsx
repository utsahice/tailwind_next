"use client";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

interface ProductGridProps {
    blok: {
        title: string;
        subtitle?: string;
        products: Array<{
            _uid: string;
            component: string;
            [key: string]: unknown;
        }>;
        _uid: string;
        component: string;
    };
}

export default function ProductGrid({ blok }: ProductGridProps) {
    return (
        <section {...storyblokEditable(blok)} className="py-20 bg-white">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px]">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-ivy text-5xl md:text-6xl text-black mb-6">
                        {blok.title || "Our Products"}
                    </h2>
                    {blok.subtitle && (
                        <p className="font-termina text-gray-600 max-w-2xl mx-auto">
                            {blok.subtitle}
                        </p>
                    )}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blok.products?.map((product) => (
                        <StoryblokComponent blok={product} key={product._uid} />
                    ))}
                </div>
            </div>
        </section>
    );
}
