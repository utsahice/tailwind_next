"use client";
import { storyblokEditable } from "@storyblok/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BenefitItem {
    _uid: string;
    icon: string;
    title: string;
    description: string;
}

interface RegisterFormProps {
    blok: {
        _uid: string;
        title: string;
        subtitle: string;
        login_link_text: string;
        benefits: BenefitItem[];
    };
}

export default function RegisterForm({ blok }: RegisterFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        company: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccess(false);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            setError("Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div {...storyblokEditable(blok)} className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Benefits */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-4xl font-ivy text-black mb-4">Why Join Us?</h2>
                        <p className="font-termina text-gray-600 mb-8">
                            Become part of the Glazed Gloss Beauty community and unlock exclusive benefits.
                        </p>

                        {blok.benefits && blok.benefits.length > 0 && (
                            <div className="space-y-6">
                                {blok.benefits.map((benefit) => (
                                    <div key={benefit._uid} className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-yello rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-ivy text-lg text-black mb-1">{benefit.title}</h3>
                                            <p className="font-termina text-sm text-gray-600">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="order-1 lg:order-2">
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-4xl font-ivy text-black mb-2">{blok.title}</h1>
                                <p className="font-termina text-gray-600">{blok.subtitle}</p>
                            </div>

                            {/* Registration Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-termina text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yello transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-termina text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yello transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-termina text-gray-700 mb-2">
                                        Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yello transition-colors"
                                        placeholder="••••••••"
                                    />
                                    <p className="text-xs font-termina text-gray-500 mt-1">
                                        Minimum 6 characters
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-termina text-gray-700 mb-2">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yello transition-colors"
                                        placeholder="Your Company"
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg font-termina text-sm">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg font-termina text-sm">
                                        ✓ Registration successful! Redirecting to login...
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting || success}
                                    className="w-full btn-primary font-termina py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                                </button>
                            </form>

                            {/* Login Link */}
                            <div className="mt-6 text-center">
                                <Link
                                    href="/login"
                                    className="font-termina text-sm text-gray-600 hover:text-black transition-colors"
                                >
                                    {blok.login_link_text}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
