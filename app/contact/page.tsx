"use client";
import { useState } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        service: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", phone: "", company: "", message: "", service: "" });
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <Layout>
            <div className="min-h-screen bg-white py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <p className="text-sm font-termina tracking-widest uppercase mb-4 text-gray-600">
                            Get In Touch
                        </p>
                        <h1 className="text-5xl md:text-6xl font-ivy text-black mb-8">
                            Contact Us
                        </h1>
                        <p className="text-lg font-termina text-gray-700 max-w-2xl mx-auto">
                            Ready to transform your beauty brand? Let's start the conversation.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Form */}
                        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
                            <h2 className="text-3xl font-ivy text-black mb-6">Send us a message</h2>

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
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-termina text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yello transition-colors"
                                        placeholder="+1 (555) 000-0000"
                                    />
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

                                <div>
                                    <label className="block text-sm font-termina text-gray-700 mb-2">
                                        Service Interested In
                                    </label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yello transition-colors"
                                    >
                                        <option value="">Select a service</option>
                                        <option value="Brand Strategy">Brand Strategy & Development</option>
                                        <option value="Product Formulation">Product Formulation</option>
                                        <option value="Packaging Design">Packaging Design</option>
                                        <option value="Manufacturing">Manufacturing & Production</option>
                                        <option value="Retail Distribution">Retail Distribution</option>
                                        <option value="Digital Marketing">Digital Marketing</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-termina text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yello transition-colors resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary font-termina py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                                </button>

                                {submitStatus === "success" && (
                                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg font-termina text-sm">
                                        ✓ Message sent successfully! We'll get back to you soon.
                                    </div>
                                )}

                                {submitStatus === "error" && (
                                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg font-termina text-sm">
                                        ✗ Something went wrong. Please try again.
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-ivy text-black mb-6">Get in touch</h2>
                                <p className="font-termina text-gray-700 leading-relaxed mb-8">
                                    Whether you're launching a new beauty brand or looking to scale an existing one,
                                    we're here to help bring your vision to life.
                                </p>
                            </div>

                            {/* Contact Details */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-yello rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-ivy text-lg text-black mb-1">Office Location</h3>
                                        <p className="font-termina text-gray-700">Beverly Hills, CA 90210</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-yello rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-ivy text-lg text-black mb-1">Email Us</h3>
                                        <p className="font-termina text-gray-700">hello@glazedgloss.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-yello rounded-full flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-ivy text-lg text-black mb-1">Call Us</h3>
                                        <p className="font-termina text-gray-700">858.353.3220</p>
                                    </div>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-lime rounded-2xl p-8 mt-8">
                                <h3 className="font-ivy text-2xl text-black mb-4">Business Hours</h3>
                                <div className="space-y-2 font-termina text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Monday - Friday</span>
                                        <span className="text-black font-medium">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Saturday</span>
                                        <span className="text-black font-medium">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Sunday</span>
                                        <span className="text-black font-medium">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
