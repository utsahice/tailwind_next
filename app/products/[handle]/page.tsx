"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface ProductDetail {
    id: string;
    title: string;
    description: string;
    price: string;
    currency: string;
    images: string[];
    variants: Array<{ id: string; title: string; price: string; available: boolean }>;
}

export default function ProductDetailPage() {
    const { handle } = useParams() as { handle: string };
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!handle) return;
        fetch(`/api/shopify/products/${handle}`)
            .then(async r => {
                if (!r.ok) { setFetchError("Product not found."); setLoading(false); return; }
                const d = await r.json();
                if (!d.product) { setFetchError("Product not found."); setLoading(false); return; }
                setProduct(d.product);
                setLoading(false);
            })
            .catch(() => { setFetchError("Failed to load product."); setLoading(false); });
    }, [handle]);

    const handleAddToCart = () => {
        if (!product) return;
        const v = product.variants[selectedVariant];
        addToCart({
            id: product.id,
            variantId: v?.id || product.id,
            title: product.title,
            variantTitle: v?.title || "Default Title",
            price: v?.price || product.price,
            image: product.images[0] || "/logo.png",
            handle,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-lime">
                <div className="w-10 h-10 border-4 border-yello border-t-transparent rounded-full animate-spin" />
            </div>
        </Layout>
    );

    if (fetchError || !product) return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-lime px-6">
                <div className="text-center">
                    <p className="font-ivy text-5xl text-dark mb-3">Product Not Found</p>
                    {fetchError && <p className="font-termina text-sm text-gray mb-6">{fetchError}</p>}
                    <Link href="/products"><button className="btn-primary font-termina">BACK TO PRODUCTS</button></Link>
                </div>
            </div>
        </Layout>
    );

    const currentVariant = product.variants[selectedVariant];
    const isAvailable = currentVariant?.available !== false;

    return (
        <Layout>
            <div className="min-h-screen bg-lime">

                {/* Breadcrumb */}
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px] pt-10">
                    <nav className="flex items-center gap-2 font-termina text-[11px] text-gray">
                        <Link href="/" className="hover:text-dark transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="hover:text-dark transition-colors">Products</Link>
                        <span>/</span>
                        <span className="text-dark truncate max-w-[200px]">{product.title}</span>
                    </nav>
                </div>

                <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px] py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

                        {/* ── Images ── */}
                        <div className="lg:sticky lg:top-28">
                            {/* Main image */}
                            <div className="relative bg-white overflow-hidden" style={{ aspectRatio: "1/1" }}>
                                <Image
                                    src={product.images[selectedImage] || "/logo.png"}
                                    alt={product.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Thumbnails */}
                            {product.images.length > 1 && (
                                <div className="flex gap-2 mt-2">
                                    {product.images.map((img, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setSelectedImage(i)}
                                            className={`relative flex-shrink-0 overflow-hidden transition-all duration-200 ${selectedImage === i
                                                    ? "ring-2 ring-dark opacity-100"
                                                    : "opacity-50 hover:opacity-80"
                                                }`}
                                            style={{ width: 72, height: 72 }}
                                        >
                                            <Image src={img} alt="" fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ── Info ── */}
                        <div className="py-2">
                            <p className="font-termina text-[10px] tracking-[0.4em] text-gray uppercase mb-4">
                                Glazed Gloss
                            </p>

                            <h1 className="font-ivy text-[52px] md:text-[64px] text-dark leading-tight mb-4">
                                {product.title}
                            </h1>

                            {/* Price */}
                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="font-termina text-[28px] font-bold text-dark">
                                    ${parseFloat(currentVariant?.price || product.price).toFixed(2)}
                                </span>
                                <span className="font-termina text-[11px] text-gray uppercase tracking-widest">
                                    {product.currency}
                                </span>
                            </div>

                            {/* Yellow rule */}
                            <div className="h-[3px] bg-yello w-16 mb-6" />

                            <p className="font-termina text-[13px] text-text leading-relaxed mb-8">
                                {product.description || "Premium quality product from Glazed Gloss."}
                            </p>

                            {/* Variants */}
                            {product.variants.length > 1 && (
                                <div className="mb-8">
                                    <p className="font-termina text-[10px] tracking-[0.3em] text-gray uppercase mb-3">
                                        Select Option
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.variants.map((v, i) => (
                                            <button
                                                key={v.id}
                                                onClick={() => setSelectedVariant(i)}
                                                disabled={!v.available}
                                                className={`px-5 py-2 font-termina text-[11px] rounded-10 border transition-all duration-200 ${selectedVariant === i
                                                        ? "border-dark bg-dark text-white"
                                                        : v.available
                                                            ? "border-dark/30 text-dark hover:border-dark"
                                                            : "border-gray/20 text-gray/40 cursor-not-allowed line-through"
                                                    }`}
                                            >
                                                {v.title}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="flex gap-3 mb-10">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!isAvailable}
                                    className={`flex-1 py-4 rounded-10 font-termina text-[12px] tracking-widest transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${added
                                            ? "bg-dark text-white"
                                            : "bg-yello text-dark hover:bg-dark hover:text-white"
                                        }`}
                                >
                                    {added ? "✓ ADDED TO CART" : isAvailable ? "ADD TO CART" : "OUT OF STOCK"}
                                </button>
                                <Link href="/checkout">
                                    <button className="btn-outline font-termina text-[12px] py-4 px-8">
                                        BUY NOW
                                    </button>
                                </Link>
                            </div>

                            {/* Trust strip */}
                            <div className="border-t border-dark/10 pt-6 grid grid-cols-2 gap-4">
                                {[
                                    { label: "Free Shipping", sub: "On orders over $50" },
                                    { label: "Authentic", sub: "100% genuine products" },
                                    { label: "Easy Returns", sub: "30-day return policy" },
                                    { label: "Secure Checkout", sub: "SSL encrypted payment" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-yello mt-1.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-termina text-[11px] font-bold text-dark">{item.label}</p>
                                            <p className="font-termina text-[10px] text-gray">{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
