"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
    id: string;
    variantId: string;
    title: string;
    variantTitle: string;
    price: string;
    image: string;
    quantity: number;
    handle: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Omit<CartItem, "quantity">) => void;
    removeFromCart: (variantId: string) => void;
    updateQuantity: (variantId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if (saved) setItems(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (item: Omit<CartItem, "quantity">) => {
        setItems(prev => {
            const existing = prev.find(i => i.variantId === item.variantId);
            if (existing) {
                return prev.map(i =>
                    i.variantId === item.variantId
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (variantId: string) => {
        setItems(prev => prev.filter(i => i.variantId !== variantId));
    };

    const updateQuantity = (variantId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(variantId);
            return;
        }
        setItems(prev =>
            prev.map(i => i.variantId === variantId ? { ...i, quantity } : i)
        );
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);

    return (
        <CartContext.Provider value={{
            items, addToCart, removeFromCart, updateQuantity,
            clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
