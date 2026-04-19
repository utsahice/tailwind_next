"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";

interface GlazedGlossProps {
    blok: {
        title?: string;
        subtitle?: string;
        description?: string;
        main_image?: {
            filename: string;
            alt: string;
        };
        video_url?: string;
        signature_image?: {
            filename: string;
            alt: string;
        };
        cta_text?: string;
        background_color?: string;
        _uid: string;
        component: string;
    };
}

export default function GlazedGloss({ blok }: GlazedGlossProps) {
    return (
        <section {...storyblokEditable(blok)} className="flex flex-col lg:flex-row items-center justify-between bg-white py-0.5 gap-12">
            <div className="relative w-full lg:w-1/2 flex justify-start">
                <Image
                    src={blok.main_image?.filename || "/gloss/1.jpg"}
                    alt={blok.main_image?.alt || "Glazed Gloss founder"}
                    width={800}
                    height={650}
                    className="w-full max-w-[80%] max-h-[650px] object-cover"
                />
                <div className="absolute top-[50px] left-[85%] transform -translate-x-1/2 w-[200px] h-[450] md:w-[150px] lg:w-[200px] aspect-[9/19] bg-black rounded-[40px] shadow-2xl overflow-hidden border-[6px] border-black">
                    <video
                        src={blok.video_url || "/gloss/2.mp4"}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/30">
                        <Image
                            src={blok.signature_image?.filename || "/gloss/sign.png"}
                            alt={blok.signature_image?.alt || "Signature"}
                            width={160}
                            height={55}
                            className="w-auto h-auto drop-shadow-xl"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2 text-dark px-6 lg:px-0">
                <p className="font-termina text-xs tracking-widest text-gray-500 uppercase mb-2">
                    {blok.subtitle || "Who We Are"}
                </p>
                <h2 className="text-4xl font-semibold font-ivy mb-6">
                    {blok.title || "We're Glazed Gloss"}
                </h2>
                <p className="text-[15px] font-termina text-gray-700 leading-relaxed mb-4">
                    {blok.description || "Based in Beverly Hills, CA, the hub of the film and commercial industry, the executive team of GLAZED GLOSS CREATIVE COLLECTIVE brings a wealth of historical expertise in retail sales and execution. Each C-Suite executive has over 25 years of experience within the core retail team. Previous brand launches & employers of team members include renowned beauty industry giants such as TOM FORD, Tom Ford Beauty, Estée Lauder, L'Oréal, Clarins, Chanel, LVMH, NuFace, Bloomingdales, Sephora, ULTA, Neiman Marcus, Saks 5th Ave., New York Fashion Commission, and Hearst Group Publications."}
                </p>
                <p className="text-[15px] font-termina text-gray-700 leading-relaxed mb-6">
                    A high-level overview of our retail commercial support includes the five pillars of commercial planning & a 360 degree approach for GLOBAL commerce & product deployment.
                </p>
                <button className="btn-primary px-6 py-3 font-termina tracking-wide">
                    {blok.cta_text || "MORE ABOUT GLAZED GLOSS CREATIVE"}
                </button>
            </div>
        </section>
    );
}