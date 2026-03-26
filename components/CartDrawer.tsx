"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
    const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

    return (
        <>
            {/* Overlay */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] transition-opacity"
                    onClick={() => setIsCartOpen(false)}
                />
            )}

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-white z-[70] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <h2 className="font-termina text-[10px] font-bold text-black uppercase tracking-[0.2em]">Your Shopping Bag</h2>
                        {totalItems > 0 && (
                            <span className="bg-yello text-black text-[10px] font-termina font-black px-2 py-0.5 rounded-full">
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="group flex items-center justify-center p-2 -mr-2 transition-all duration-300 hover:rotate-90"
                        aria-label="Close Cart"
                    >
                        <svg className="w-10 h-10 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <svg className="w-20 h-20 text-gray-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p className="font-ivy text-2xl text-gray-400 mb-2">Your cart is empty</p>
                            <p className="font-termina text-sm text-gray-400 mb-6">Add some products to get started</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="px-8 py-3 btn-primary font-termina text-sm"
                            >
                                SHOP NOW
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.variantId} className="flex gap-4 py-4 border-b border-gray-100">
                                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.image || "/logo.png"}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-ivy text-base text-black leading-tight mb-1 truncate">{item.title}</h4>
                                        {item.variantTitle !== "Default Title" && (
                                            <p className="font-termina text-xs text-gray-500 mb-2">{item.variantTitle}</p>
                                        )}
                                        <p className="font-termina text-sm font-bold text-black">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors font-termina"
                                                >
                                                    −
                                                </button>
                                                <span className="w-8 text-center font-termina text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors font-termina"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.variantId)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="px-6 py-5 border-t border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-termina text-gray-600">Subtotal</span>
                            <span className="font-termina text-xl font-bold text-black">${totalPrice.toFixed(2)}</span>
                        </div>
                        <p className="font-termina text-xs text-gray-500 mb-4">Shipping & taxes calculated at checkout</p>
                        <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                            <button className="w-full py-4 btn-primary font-termina text-base mb-3">
                                CHECKOUT
                            </button>
                        </Link>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="w-full py-3 btn-outline font-termina text-sm"
                        >
                            CONTINUE SHOPPING
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
