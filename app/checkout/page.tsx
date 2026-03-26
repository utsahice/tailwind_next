"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Layout from "@/components/Layout";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { clearCart, totalPrice } = useCart();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Basic redirect if not logged in
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/checkout");
    }
  }, [status, router]);

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center font-termina text-[10px] tracking-widest uppercase">Initializing...</div>;
  if (!session) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalPrice === 0) return;
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, totalPayment: totalPrice }),
      });

      if (res.ok) {
        clearCart();
        router.push("/profile?order=success");
      } else {
        const errorData = await res.json();
        alert(`Checkout Failed: ${errorData.error}`);
      }
    } catch (err) {
      alert("Error processing checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-40 md:pt-40 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Left Column: Form */}
            <div className="lg:w-2/3">
              <div className="mb-12">
                <h1 className="text-4xl font-termina font-bold text-black uppercase tracking-[0.2em] mb-4">Finalize Order</h1>
                <div className="h-1 w-24 bg-yello mb-10"></div>
                <p className="font-termina text-[10px] text-gray-400 uppercase tracking-widest leading-loose">Please provide your shipping details below to complete your purchase.</p>
              </div>

              <form onSubmit={handleCheckout} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="block font-termina text-[10px] text-gray-500 uppercase tracking-widest ml-1">Customer Name</label>
                    <input type="text" value={session.user?.name || ""} disabled className="w-full border-b border-gray-200 py-4 font-termina text-[10px] bg-gray-50/50 px-3 cursor-not-allowed opacity-60" />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-termina text-[10px] text-gray-500 uppercase tracking-widest ml-1">Email Connection</label>
                    <input type="email" value={session.user?.email || ""} disabled className="w-full border-b border-gray-200 py-4 font-termina text-[10px] bg-gray-50/50 px-3 cursor-not-allowed opacity-60" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-termina text-[10px] text-black font-bold uppercase tracking-widest ml-1">Shipping Destination</label>
                  <textarea 
                    required 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    rows={2} 
                    className="w-full border-b border-gray-400 py-4 font-termina text-sm focus:border-yello focus:outline-none transition-colors placeholder:text-gray-300" 
                    placeholder="HOUSE NO, STREET NAME, CITY, ZIP, COUNTRY" 
                  />
                </div>

                <button 
                  disabled={loading || totalPrice === 0} 
                  type="submit" 
                  className="w-full btn-primary font-termina font-bold text-[10px] tracking-[0.3em] py-5 mt-4 transition-all hover:translate-y-[-2px] disabled:opacity-50"
                >
                  {loading ? "AUTHENTICATING ORDER..." : "PLACE ORDER & PAY"}
                </button>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-lime/20 p-10 border border-lime rounded-2xl sticky top-40">
                <h3 className="font-termina text-[10px] font-bold text-black uppercase tracking-[0.3em] mb-8">Summary</h3>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center py-2 border-b border-lime/50">
                    <span className="font-termina text-[10px] text-gray-500 uppercase">Subtotal</span>
                    <span className="font-termina text-sm font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-lime/50">
                    <span className="font-termina text-[10px] text-gray-500 uppercase">Shipping</span>
                    <span className="font-termina text-sm text-black italic">Free</span>
                  </div>
                  <div className="flex justify-between items-center pt-6">
                    <span className="font-termina text-xs font-bold text-black uppercase">Grand Total</span>
                    <span className="font-ivy text-3xl font-bold text-black">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-white/50 p-6 rounded-xl border border-lime/30">
                   <p className="font-termina text-[9px] text-gray-400 uppercase tracking-widest text-center">Your order will be synchronized with our Salesforce CRM for priority fulfilment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

