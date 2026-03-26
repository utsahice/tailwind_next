"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
    blok: {
        name: string;
        description: string;
        price: string;
        image?: {
            filename: string;
            alt: string;
        };
        shopify_handle?: string;
        featured?: boolean;
        in_stock?: boolean;
        _uid: string;
        component: string;
    };
}

export default function ProductItem({ blok }: ProductItemProps) {
    const productUrl = blok.shopify_handle
        ? `/products/${blok.shopify_handle}`
        : '#';

    return (
        <div {...storyblokEditable(blok)} className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Product Image */}
            <div className="relative h-80 bg-gray-100 overflow-hidden">
                {blok.image?.filename ? (
                    <Image
                        src={blok.image.filename}
                        alt={blok.image.alt || blok.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {blok.featured && (
                        <span className="bg-yello text-black px-3 py-1 rounded-full font-termina text-xs font-bold">
                            FEATURED
                        </span>
                    )}
                    {!blok.in_stock && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full font-termina text-xs font-bold">
                            OUT OF STOCK
                        </span>
                    )}
                </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
                <h3 className="font-ivy text-2xl text-black mb-2">
                    {blok.name}
                </h3>
                <p className="font-termina text-sm text-gray-600 mb-4 line-clamp-2">
                    {blok.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="font-termina text-xl text-black font-bold">
                        ${blok.price}
                    </span>
                    {blok.shopify_handle ? (
                        <Link href={productUrl}>
                            <button className="px-6 py-2 btn-primary font-termina text-sm">
                                VIEW DETAILS
                            </button>
                        </Link>
                    ) : (
                        <button className="px-6 py-2 btn-outline font-termina text-sm">
                            LEARN MORE
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
