"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface ProductHeroProps {
    blok: {
        title: string;
        subtitle: string;
        background_image?: {
            filename: string;
            alt: string;
        };
        cta_text?: string;
        cta_url?: string;
        _uid: string;
        component: string;
    };
}

export default function ProductHero({ blok }: ProductHeroProps) {
    return (
        <section {...storyblokEditable(blok)} className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            {blok.background_image?.filename && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={blok.background_image.filename}
                        alt={blok.background_image.alt || blok.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px] py-20 text-center">
                <h1 className="font-ivy text-6xl md:text-8xl text-white mb-6">
                    {blok.title || "Our Products"}
                </h1>
                {blok.subtitle && (
                    <p className="font-termina text-xl text-white/90 max-w-3xl mx-auto mb-8">
                        {blok.subtitle}
                    </p>
                )}
                {blok.cta_text && blok.cta_url && (
                    <a href={blok.cta_url}>
                        <button className="px-10 py-4 btn-primary font-termina text-lg">
                            {blok.cta_text}
                        </button>
                    </a>
                )}
            </div>
        </section>
    );
}
