"use client";
import { storyblokEditable } from "@storyblok/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DemoCredential {
    _uid: string;
    label: string;
    email: string;
    password: string;
}

interface LoginFormProps {
    blok: {
        _uid: string;
        title: string;
        subtitle: string;
        register_link_text: string;
        demo_credentials: DemoCredential[];
    };
}

export default function LoginForm({ blok }: LoginFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("userEmail", data.user.email);
                localStorage.setItem("userName", data.user.name);

                if (data.user.email === "admin@glazedgloss.com") {
                    router.push("/admin");
                } else {
                    router.push("/");
                }
            } else {
                setError(data.message || "Invalid credentials");
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const fillDemoCredentials = (email: string, password: string) => {
        setFormData({ email, password });
    };

    return (
        <div {...storyblokEditable(blok)} className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-ivy text-black mb-2">{blok.title}</h1>
                        <p className="font-termina text-gray-600">{blok.subtitle}</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-termina text-gray-700 mb-2">
                                Email Address
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
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yello transition-colors"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg font-termina text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full btn-primary font-termina py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "SIGNING IN..." : "SIGN IN"}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    {blok.demo_credentials && blok.demo_credentials.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <p className="text-sm font-termina text-gray-600 mb-4 text-center">
                                Demo Credentials (Click to fill)
                            </p>
                            <div className="space-y-2">
                                {blok.demo_credentials.map((cred) => (
                                    <button
                                        key={cred._uid}
                                        type="button"
                                        onClick={() => fillDemoCredentials(cred.email, cred.password)}
                                        className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-yello/20 rounded-lg transition-colors"
                                    >
                                        <p className="font-termina text-sm font-medium text-black">{cred.label}</p>
                                        <p className="font-termina text-xs text-gray-600">{cred.email}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <Link
                            href="/register"
                            className="font-termina text-sm text-gray-600 hover:text-black transition-colors"
                        >
                            {blok.register_link_text}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
