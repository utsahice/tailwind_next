"use client";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PlansPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                name: session.user.name || "",
                email: session.user.email || "",
            }));
        }
    }, [session]);

    const handlePlanSelect = (plan: string) => {
        if (status !== "authenticated") {
            router.push("/login?callbackUrl=/plans");
            return;
        }
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/membership", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, plan: selectedPlan })
            });
            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSuccess(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-white pt-40 md:pt-40 pb-20">
                {/* Hero Section */}
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px] mb-24">
                    <div className="text-center">
                        <h1 className="font-ivy text-5xl md:text-7xl text-black mb-8 leading-tight">
                            Elevate Your Experience
                        </h1>
                        <p className="font-termina text-xs md:text-sm text-gray-500 max-w-2xl mx-auto uppercase tracking-[0.2em] leading-relaxed">
                            Join our exclusive community and unlock premium benefits, special discounts, and access to limited edition products.
                        </p>
                    </div>
                </div>

                {/* Membership Tiers */}
                <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-[100px] mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
                        {/* Basic Tier */}
                        <div className="group relative rounded-3xl p-10 border border-gray-100 bg-white hover:border-yello hover:shadow-2xl transition-all duration-500 flex flex-col">
                            <div className="mb-10">
                                <h3 className="font-termina text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400 mb-6">Discovery</h3>
                                <h4 className="font-ivy text-4xl text-black mb-4">Basic</h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-termina text-5xl font-bold text-black">$9.99</span>
                                    <span className="font-termina text-[10px] text-gray-400 uppercase tracking-widest">/mo</span>
                                </div>
                            </div>

                            <ul className="space-y-6 mb-12 flex-1">
                                {[
                                    "Access to exclusive content",
                                    "10% discount on products",
                                    "Monthly newsletter",
                                    "Community access"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4">
                                        <div className="w-5 h-5 rounded-full bg-yello/10 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-yello" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-termina text-[10px] uppercase font-medium tracking-wider text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button 
                                onClick={() => handlePlanSelect("Basic")}
                                className="w-full py-5 btn-outline font-termina text-[10px] uppercase font-bold tracking-[0.2em]"
                            >
                                Select Plan
                            </button>
                        </div>

                        {/* Premium Tier */}
                        <div className="group relative rounded-3xl p-10 border-2 border-yello bg-white shadow-2xl scale-105 z-10 flex flex-col">
                            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                                <span className="bg-yello text-black px-8 py-2 rounded-full font-termina text-[8px] font-black uppercase tracking-[0.3em] shadow-lg">
                                    MOST POPULAR
                                </span>
                            </div>

                            <div className="mb-10">
                                <h3 className="font-termina text-[10px] uppercase font-bold tracking-[0.3em] text-yello mb-6">Artistry</h3>
                                <h4 className="font-ivy text-4xl text-black mb-4">Premium</h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-termina text-5xl font-bold text-black">$19.99</span>
                                    <span className="font-termina text-[10px] text-gray-400 uppercase tracking-widest">/mo</span>
                                </div>
                            </div>

                            <ul className="space-y-6 mb-12 flex-1">
                                {[
                                    "All Basic features",
                                    "20% discount on products",
                                    "Priority support",
                                    "Early access to new products",
                                    "Exclusive events"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4">
                                        <div className="w-5 h-5 rounded-full bg-yello flex items-center justify-center">
                                            <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-termina text-[10px] uppercase font-bold tracking-wider text-black">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button 
                                onClick={() => handlePlanSelect("Premium")}
                                className="w-full py-5 btn-primary font-termina text-[10px] uppercase font-bold tracking-[0.2em]"
                            >
                                Select Plan
                            </button>
                        </div>

                        {/* VIP Tier */}
                        <div className="group relative rounded-3xl p-10 border border-gray-100 bg-white hover:border-yello hover:shadow-2xl transition-all duration-500 flex flex-col">
                            <div className="mb-10">
                                <h3 className="font-termina text-[10px] uppercase font-bold tracking-[0.3em] text-gray-400 mb-6">Expertise</h3>
                                <h4 className="font-ivy text-4xl text-black mb-4">VIP</h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-termina text-5xl font-bold text-black">$49.99</span>
                                    <span className="font-termina text-[10px] text-gray-400 uppercase tracking-widest">/mo</span>
                                </div>
                            </div>

                            <ul className="space-y-6 mb-12 flex-1">
                                {[
                                    "All Premium features",
                                    "30% discount on products",
                                    "Personal beauty consultant",
                                    "Free shipping",
                                    "VIP events and workshops"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4">
                                        <div className="w-5 h-5 rounded-full bg-yello/10 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-yello" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="font-termina text-[10px] uppercase font-medium tracking-wider text-gray-600">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button 
                                onClick={() => handlePlanSelect("VIP")}
                                className="w-full py-5 btn-outline font-termina text-[10px] uppercase font-bold tracking-[0.2em]"
                            >
                                Select Plan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Member Benefits */}
                <div className="bg-gray-50 py-32 mb-32">
                    <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px]">
                        <h2 className="font-ivy text-5xl md:text-6xl text-center text-black mb-20">
                            Member Benefits
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            <div className="bg-white rounded-3xl p-10 text-center hover:shadow-2xl transition-shadow duration-500">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-yello/10 rounded-full mb-8 text-yello">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </div>
                                <h3 className="font-ivy text-3xl text-black mb-4">Exclusive Products</h3>
                                <p className="font-termina text-[10px] uppercase tracking-widest text-gray-500 leading-relaxed">
                                    Access to limited edition and member-only products
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl p-10 text-center hover:shadow-2xl transition-shadow duration-500">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-yello/10 rounded-full mb-8 text-yello">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-ivy text-3xl text-black mb-4">Special Discounts</h3>
                                <p className="font-termina text-[10px] uppercase tracking-widest text-gray-500 leading-relaxed">
                                    Save on every purchase with member pricing
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl p-10 text-center hover:shadow-2xl transition-shadow duration-500">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-yello/10 rounded-full mb-8 text-yello">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-ivy text-3xl text-black mb-4">Community Access</h3>
                                <p className="font-termina text-[10px] uppercase tracking-widest text-gray-500 leading-relaxed">
                                    Connect with beauty enthusiasts and experts
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl p-10 text-center hover:shadow-2xl transition-shadow duration-500">
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-yello/10 rounded-full mb-8 text-yello">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-ivy text-3xl text-black mb-4">Priority Support</h3>
                                <p className="font-termina text-[10px] uppercase tracking-widest text-gray-500 leading-relaxed">
                                    Get help when you need it from our team
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Form */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative">
                            {/* Close Button */}
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/3 bg-lime p-10 flex flex-col justify-center">
                                    <h5 className="font-termina text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500 mb-4">Joining</h5>
                                    <p className="font-ivy text-3xl text-black mb-2 leading-tight">{selectedPlan} Plan</p>
                                    <div className="h-0.5 w-12 bg-yello mt-4"></div>
                                </div>
                                <div className="md:w-2/3 p-10">
                                    {success ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center py-10 animate-in zoom-in duration-500">
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="font-ivy text-3xl text-black mb-2">Welcome Aboard!</h3>
                                            <p className="font-termina text-[10px] text-gray-500 uppercase tracking-widest leading-loose">Your request has been sent to Salesforce. Check your email shortly.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-1">
                                                    <label className="font-termina text-[8px] text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                                    <input 
                                                        disabled
                                                        type="text" 
                                                        value={formData.name}
                                                        className="w-full font-termina text-xs border-b border-gray-200 bg-gray-50 px-3 py-3 focus:outline-none" 
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="font-termina text-[8px] text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                                    <input 
                                                        disabled
                                                        type="email" 
                                                        value={formData.email}
                                                        className="w-full font-termina text-xs border-b border-gray-200 bg-gray-50 px-3 py-3 focus:outline-none" 
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="font-termina text-[8px] text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                                <input 
                                                    required
                                                    type="tel" 
                                                    placeholder="+1 (555) 000-0000"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                    className="w-full font-termina text-xs border-b border-gray-400 bg-transparent py-3 focus:outline-none focus:border-yello transition-colors" 
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="font-termina text-[8px] text-gray-400 uppercase tracking-widest ml-1">Home Address</label>
                                                <textarea 
                                                    required
                                                    rows={1}
                                                    placeholder="ENTER FULL MAILING ADDRESS"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                                    className="w-full font-termina text-xs border-b border-gray-400 bg-transparent py-3 focus:outline-none focus:border-yello transition-colors resize-none" 
                                                />
                                            </div>
                                            <button 
                                                disabled={loading}
                                                type="submit" 
                                                className="w-full py-5 btn-primary font-termina text-[10px] uppercase font-bold tracking-[0.2em] mt-4 flex items-center justify-center gap-4"
                                            >
                                                {loading ? "Processing..." : "Complete Registration"}
                                                {!loading && (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
