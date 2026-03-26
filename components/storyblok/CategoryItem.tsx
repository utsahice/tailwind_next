"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
    blok: {
        name: string;
        description: string;
        image?: {
            filename: string;
            alt: string;
        };
        link?: string;
        _uid: string;
        component: string;
    };
}

export default function CategoryItem({ blok }: CategoryItemProps) {
    const content = (
        <div {...storyblokEditable(blok)} className="group relative h-80 rounded-xl overflow-hidden cursor-pointer">
            {/* Category Image */}
            <div className="absolute inset-0">
                {blok.image?.filename ? (
                    <Image
                        src={blok.image.filename}
                        alt={blok.image.alt || blok.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-yello/20 to-yello/40"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>

            {/* Category Info */}
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <h3 className="font-ivy text-3xl mb-2 group-hover:text-yello transition-colors">
                    {blok.name}
                </h3>
                <p className="font-termina text-sm text-white/90 mb-4">
                    {blok.description}
                </p>
                <div className="flex items-center gap-2 font-termina text-sm">
                    <span>Explore</span>
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </div>
    );

    if (blok.link) {
        return <Link href={blok.link}>{content}</Link>;
    }

    return content;
}
