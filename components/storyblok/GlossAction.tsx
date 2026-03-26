"use client";

import { storyblokEditable } from "@storyblok/react/rsc";

interface GlossActionProps {
    blok: {
        title?: string;
        subtitle?: string;
        description?: string;
        background_image?: {
            filename: string;
            alt: string;
        };
        cta_text?: string;
        cta_link?: string;
        _uid: string;
        component: string;
    };
}

export default function GlossAction({ blok }: GlossActionProps) {
    return (
        <main {...storyblokEditable(blok)} className="w-full">
            <section className="relative w-full h-[560px] md:h-[500px] overflow-hidden">
                <div className="absolute inset-0 w-100vh h-100vh overflow-hidden">
                    <video
                        src={blok.background_image?.filename || "/gloss/action.mp4"}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/12"></div>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-[78%] md:w-[60%] lg:w-[48%] max-w-[980px] text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-4xl font-ivy text-yello mb-4 leading-snug">
                            {blok.title || "Experience Glazed Gloss in Action"}
                        </h2>
                        <p className="text-white font-termina text-[13px] md:white-sm max-w-2xl mx-auto mb-14">
                            {blok.description || "A glimpse into our creative process, impact, passion and strategic creativity for transforming brands"}
                        </p>
                    </div>
                    <div className="pointer-events-auto mt-[50px]">
                        <button className="px-9 py-2 btn-primary font-termina uppercase shadow hover:opacity-95">
                            {blok.cta_text || "Your Brand: Elevated"}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}