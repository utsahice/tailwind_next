"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ContactPage() {
    const { data: session } = useSession();
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
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isOpen, setIsOpen] = useState(false);
    const [currentTimeIST, setCurrentTimeIST] = useState("");

    // Pre-fill form if user is logged in
    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                name: session.user?.name || prev.name,
                email: session.user?.email || prev.email
            }));
        }
    }, [session]);

    // IST Status Check
    useEffect(() => {
        const checkStatus = () => {
            const now = new Date();
            // Convert to IST (UTC+5:30)
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const istDate = new Date(utc + (3600000 * 5.5));
            
            const hours = istDate.getHours();
            const minutes = istDate.getMinutes();
            const day = istDate.getDay(); // 0 is Sunday, 1-5 is Mon-Fri, 6 is Sat
            
            setCurrentTimeIST(istDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }));

            let open = false;
            if (day >= 1 && day <= 5) { // Mon-Fri
                if (hours >= 9 && hours < 18) open = true;
            } else if (day === 6) { // Sat
                if (hours >= 10 && hours < 16) open = true;
            }
            // Sun (0) is always closed
            setIsOpen(open);
        };

        checkStatus();
        const interval = setInterval(checkStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    const validateForm = () => {
        let newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "Full name is required";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
        if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
        if (!formData.message || formData.message.length < 10) newErrors.message = "Message must be at least 10 characters";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

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
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrs = { ...prev };
                delete newErrs[name];
                return newErrs;
            });
        }
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-yello transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="John Doe"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1 font-termina">{errors.name}</p>}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-yello transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 font-termina">{errors.email}</p>}
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
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-yello transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="+91 00000 00000"
                                    />
                                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-termina">{errors.phone}</p>}
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
                                        rows={5}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-yello transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Tell us about your project..."
                                    />
                                    {errors.message && <p className="text-red-500 text-xs mt-1 font-termina">{errors.message}</p>}
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
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-ivy text-2xl text-black">Business Hours</h3>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-termina uppercase tracking-widest flex items-center gap-2 ${isOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                        {isOpen ? 'Open Now' : 'Closed Now'}
                                    </div>
                                </div>
                                
                                <p className="text-[10px] font-termina text-gray-500 mb-4 uppercase tracking-tighter">
                                    Current Time (IST): {currentTimeIST}
                                </p>

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
                                <p className="text-[10px] font-termina text-gray-500 mt-4 italic">
                                    * All times are in Indian Standard Time (IST)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
