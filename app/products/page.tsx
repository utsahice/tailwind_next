"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Product {
    id: string;
    title: string;
    description: string;
    price: string;
    image: string;
    handle: string;
    variantId?: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
    const { addToCart } = useCart();

    useEffect(() => {
        fetch("/api/shopify/products")
            .then(r => r.json())
            .then(d => setProducts(d.products || []))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart({
            id: product.id,
            variantId: product.variantId || product.id,
            title: product.title,
            variantTitle: "Default Title",
            price: product.price,
            image: product.image,
            handle: product.handle,
        });
        setAddedIds(prev => new Set(prev).add(product.id));
        setTimeout(() => setAddedIds(prev => { const n = new Set(prev); n.delete(product.id); return n; }), 2000);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-lime">

                {/* ── Page Header ── */}
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px] pt-14 pb-10">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <p className="font-termina text-[10px] tracking-[0.35em] text-gray uppercase mb-3">
                                Glazed Gloss / Shop
                            </p>
                            <h1 className="font-ivy text-[64px] md:text-[90px] text-dark leading-none">
                                Our Products
                            </h1>
                        </div>
                        <p className="font-termina text-[12px] text-gray max-w-xs leading-relaxed pb-2">
                            Premium beauty essentials crafted for professionals and enthusiasts alike.
                        </p>
                    </div>
                    {/* Yellow rule */}
                    <div className="mt-8 h-[3px] bg-yello w-full" />
                </div>

                {/* ── Grid ── */}
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px] pb-24">

                    {/* Skeleton */}
                    {loading && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray/20">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-lime animate-pulse">
                                    <div className="aspect-square bg-gray/10" />
                                    <div className="p-5 space-y-3">
                                        <div className="h-5 bg-gray/20 rounded w-3/4" />
                                        <div className="h-3 bg-gray/10 rounded w-full" />
                                        <div className="h-10 bg-gray/20 rounded mt-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Products */}
                    {!loading && products.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-dark/10">
                            {products.map((product) => (
                                <article
                                    key={product.id}
                                    className="group bg-lime flex flex-col"
                                >
                                    {/* Image container */}
                                    <Link href={`/products/${product.handle}`} className="block relative overflow-hidden bg-white" style={{ aspectRatio: "1/1" }}>
                                        <Image
                                            src={product.image || "/logo.jpg"}
                                            alt={product.title}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-all duration-500 flex items-end justify-center pb-6">
                                            <span className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-yello text-dark font-termina text-[10px] tracking-widest px-5 py-2 rounded-10">
                                                VIEW DETAILS →
                                            </span>
                                        </div>
                                    </Link>

                                    {/* Card body */}
                                    <div className="p-5 flex flex-col flex-1 border-t border-dark/10">
                                        <Link href={`/products/${product.handle}`}>
                                            <h3 className="font-ivy text-[20px] text-dark leading-snug mb-1 hover:text-gray transition-colors line-clamp-2">
                                                {product.title}
                                            </h3>
                                        </Link>
                                        <p className="font-termina text-[11px] text-gray leading-relaxed line-clamp-2 mb-5 flex-1">
                                            {product.description || "Premium quality product"}
                                        </p>
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="font-termina text-[16px] font-bold text-dark">
                                                ${parseFloat(product.price).toFixed(2)}
                                            </span>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className={`flex-1 py-2.5 rounded-10 font-termina text-[10px] tracking-widest transition-all duration-300 ${addedIds.has(product.id)
                                                    ? "bg-dark text-white"
                                                    : "bg-yello text-dark hover:bg-dark hover:text-white"
                                                    }`}
                                            >
                                                {addedIds.has(product.id) ? "✓ ADDED" : "ADD TO CART"}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Empty */}
                    {!loading && products.length === 0 && (
                        <div className="text-center py-32">
                            <p className="font-ivy text-5xl text-dark/20 mb-4">No products yet</p>
                            <p className="font-termina text-sm text-gray mb-8">Check back soon for our latest collection.</p>
                            <Link href="/contact">
                                <button className="btn-primary font-termina">CONTACT US</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
