"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { useState } from "react";

interface Service {
    _uid: string;
    title: string;
    description?: string;
    image?: {
        filename: string;
        alt: string;
    };
    category?: string;
}

interface ServiceCategory {
    _uid: string;
    name: string;
    is_active?: boolean;
}

interface OurServicesProps {
    blok: {
        title?: string;
        subtitle?: string;
        description?: string;
        services?: Service[];
        service_categories?: ServiceCategory[];
        categories?: ServiceCategory[]; // Add support for 'categories' field from Storyblok
        cta_primary_text?: string;
        cta_secondary_text?: string;
        _uid: string;
        component: string;
    };
}

export default function OurServices({ blok }: OurServicesProps) {
    // Fallback categories if none provided
    const fallbackCategories = [
        "CREATIVE & MARKETING",
        "FORMULATION IDEATION & ASSORTMENT CONCEPT",
        "THE SHOWROOM/PRODUCTION",
        "SALES & DISTRIBUTION",
        "FULFILMENT & OPERATIONS",
    ];

    // Fallback services if none provided
    const fallbackServices = [
        { _uid: "1", title: "Creative & Marketing", description: "Strategic brand development and marketing solutions", image: { filename: "/service_1.jpg", alt: "Creative Marketing" }, category: "CREATIVE & MARKETING" },
        { _uid: "2", title: "Formulation & Concept", description: "Product ideation and formulation expertise", image: { filename: "/service_2.jpg", alt: "Formulation" }, category: "FORMULATION IDEATION & ASSORTMENT CONCEPT" },
        { _uid: "3", title: "Production", description: "High-quality production and manufacturing", image: { filename: "/service_3.jpg", alt: "Production" }, category: "THE SHOWROOM/PRODUCTION" },
        { _uid: "4", title: "Sales & Distribution", description: "Global retail strategy and distribution networks", image: { filename: "/service_4.jpg", alt: "Sales" }, category: "SALES & DISTRIBUTION" },
        { _uid: "5", title: "Avatar Service", description: "Expert consultation services", image: { filename: "/service_5.jpg", alt: "Avatar" }, category: "CREATIVE & MARKETING" },
        { _uid: "6", title: "Fulfilment & Operations", description: "End-to-end operational excellence and logistics", image: { filename: "/service_6.jpg", alt: "Operations" }, category: "FULFILMENT & OPERATIONS" },
    ];

    const services = blok.services?.length ? blok.services : fallbackServices;

    // Support both 'categories' and 'service_categories' field names
    const categoriesData = blok.categories || blok.service_categories;
    const categories = categoriesData?.length
        ? categoriesData.map(cat => cat.name)
        : fallbackCategories;

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    // Filter services by selected category
    const filteredServices = services.filter(service =>
        !selectedCategory || service.category === selectedCategory || selectedCategory === categories[0]
    );

    return (
        <section {...storyblokEditable(blok)} className="w-full py-10 px-10 bg-lime flex justify-center">
            <div className="max-w-7xl w-full grid items-center justify-center grid-cols-1 md:grid-cols-2 gap-16">
                <div className="flex flex-col gap-6">
                    <p className="text-[var(--text-14)] tracking-wide text-text font-termina">
                        HOW WE HELP
                    </p>

                    <h2 className="font-ivy leading-none text-[52px]">
                        {blok.title || "OUR SERVICES"}
                    </h2>

                    <p className="font-termina max-w-md text-text leading-6">
                        {blok.description || blok.subtitle || "Glazed Gloss Creative Collective was founded by a seasoned brand builder driven by a singular purpose: to accelerate your brand vision from inception to fruition and to accelerate brand growth."}
                    </p>

                    <div className="flex gap-4 mt-4">
                        <button className="btn-primary font-termina">
                            {blok.cta_primary_text || "HIRE GLAZED"}
                        </button>
                        <button className="btn-outline font-termina">
                            {blok.cta_secondary_text || "VIEW ALL SERVICES"}
                        </button>
                    </div>
                </div>

                <div className="relative w-full">
                    {/* Dynamic Service Images Grid */}
                    <div className="grid grid-cols-2 gap-5 relative w-[85%]">
                        {filteredServices.slice(0, 4).map((service, index) => {
                            const positions = [
                                "relative group overflow-hidden rounded-10",
                                "relative top-8 w-[145%] group overflow-hidden rounded-10",
                                "relative left-[93px] pt-20px w-[85%] group overflow-hidden rounded-10",
                                "relative -top-[18px] left-[80px] w-[85%] group overflow-hidden rounded-10"
                            ];
                            const heights = ["h-[240px]", "h-[180px]", "h-[200px]", "h-[200px]"];

                            return (
                                <div key={service._uid} className={positions[index]}>
                                    <Image
                                        src={service.image?.filename || `/service_${index + 1}.jpg`}
                                        alt={service.image?.alt || service.title}
                                        width={500}
                                        height={400}
                                        className={`w-full ${heights[index]} object-cover rounded-10 transition-transform duration-300 group-hover:scale-105`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-orange-300 via-orange-200 to-white opacity-0 group-hover:opacity-90 transition-opacity duration-300 rounded-10 flex items-center justify-center">
                                        <div className="text-center px-4">
                                            <h3 className="text-black font-ivy text-lg mb-2">
                                                {service.title}
                                            </h3>
                                            <p className="text-black font-termina text-sm">
                                                {service.description || "Professional service description"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Special avatar overlay for service 5 (index 2) */}
                                    {index === 2 && filteredServices[4] && (
                                        <div className="absolute -top-7 -left-21 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
                                            <Image
                                                src={filteredServices[4].image?.filename || "/service_5.jpg"}
                                                alt={filteredServices[4].image?.alt || "avatar"}
                                                width={55}
                                                height={55}
                                                className="rounded-md"
                                            />
                                            <div className="text-[10px] leading-tight">
                                                <p className="text-text font-ivy">{filteredServices[4].title.toUpperCase()}</p>
                                                <p className="text-text font-termina">Expert Service</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Dynamic Category Buttons */}
                    <div className="mt-8">
                        <div className="md:hidden w-full">
                            <select
                                className="w-full border border-gray-400 text-[12px] font-termina px-4 py-2 rounded-10 bg-white"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map((category, i) => (
                                    <option key={i} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="hidden md:flex flex-wrap gap-4 mt-4">
                            {categories.map((category, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`border border-gray-400 text-[10px] font-termina rounded-10 px-5 py-2 transition-all duration-300 hover:scale-[1.06] hover:shadow-md ${selectedCategory === category
                                        ? 'bg-yello text-black border-yello'
                                        : 'text-black hover:bg-gray-100'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}