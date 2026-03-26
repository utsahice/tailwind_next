"use client";

import { storyblokEditable } from "@storyblok/react/rsc";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { useState } from "react";
import Image from "next/image";

interface WorkItem {
    _uid: string;
    title: string;
    description?: string;
    image: {
        filename: string;
        alt: string;
    };
    category?: string;
    case_study_url?: string;
}

interface WorkCategory {
    _uid: string;
    name: string;
    is_active?: boolean;
}

interface OurWorkProps {
    blok: {
        title?: string;
        subtitle?: string;
        description?: string;
        work_items?: WorkItem[];
        work_categories?: WorkCategory[];
        categories?: WorkCategory[]; // Add support for 'categories' field from Storyblok
        cta_text?: string;
        _uid: string;
        component: string;
    };
}

export default function OurWork({ blok }: OurWorkProps) {
    // Fallback categories if none provided
    const fallbackCategories = [
        "FEATURED",
        "DIGITAL DESIGN & ANIMATION",
        "VIDEOGRAPHY & PHOTOGRAPHY",
        "PAST PROJECTS & BRANDS"
    ];

    // Fallback work items if none provided
    const fallbackWorks = [
        { _uid: "1", title: "VANITY PLANET", category: "FEATURED", image: { filename: "/work/work1.jpg", alt: "Vanity Planet" }, description: "Complete brand transformation and digital strategy" },
        { _uid: "2", title: "GLOBAL NOURISH", category: "FEATURED", image: { filename: "/work/work2.jpg", alt: "Global Nourish" }, description: "Production and manufacturing excellence" },
        { _uid: "3", title: "HIGHER EDUCATION SKINCARE", category: "FEATURED", image: { filename: "/work/work3.jpg", alt: "Higher Education" }, description: "Full service brand development" },
        { _uid: "4", title: "KOVE", category: "FEATURED", image: { filename: "/work/work4.jpg", alt: "Kove" }, description: "Strategic branding and market positioning" },
        { _uid: "5", title: "DIGITAL CAMPAIGN", category: "DIGITAL DESIGN & ANIMATION", image: { filename: "/work/work1.jpg", alt: "Digital Campaign" }, description: "Animated brand storytelling" },
        { _uid: "6", title: "PHOTO SHOOT", category: "VIDEOGRAPHY & PHOTOGRAPHY", image: { filename: "/work/work2.jpg", alt: "Photo Shoot" }, description: "Professional product photography" },
    ];

    const workItems = blok.work_items?.length ? blok.work_items : fallbackWorks;

    // Support both 'categories' and 'work_categories' field names
    const categoriesData = blok.categories || blok.work_categories;
    const categories = categoriesData?.length
        ? categoriesData.map(cat => cat.name)
        : fallbackCategories;

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    // Filter work items by selected category
    const filteredWorks = workItems.filter(work =>
        !selectedCategory || work.category === selectedCategory || selectedCategory === categories[0]
    );

    return (
        <section {...storyblokEditable(blok)} className="w-full bg-[image:linear-gradient(to_bottom,white_0%,white_60%,gray_60%,gray_100%)] px-70 text-dark py-20">
            {/* Header Section */}
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-6">
                    <h2 className="text-4xl md:text-5xl sm:text-center text-center font-ivy font-bold tracking-wide">
                        {blok.title || "OUR WORK"}
                    </h2>
                    <button className="btn-primary font-termina self-center">
                        {blok.cta_text || "VIEW ALL"}
                    </button>
                </div>

                {/* Dynamic Category Tabs */}
                <div className="mt-4">
                    <div className="md:hidden w-full pl-27px">
                        <select
                            className="w-90px border-b border-gray-300 text-black font-termina py-3 mb-7 text-[10px]"
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
                    <div className="hidden md:flex flex-wrap gap-6 border-b mb-12 text-L text-black font-termina font-medium">
                        {categories.map((category, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedCategory(category)}
                                className={`transition-all duration-300 ${selectedCategory === category
                                    ? 'text-black border-b-2 border-yello'
                                    : 'text-gray hover:text-black'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredWorks.map((work) => (
                        <WorkCard key={work._uid} work={work} />
                    ))}
                </div>
                <div className="sm:hidden">
                    <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        spaceBetween={20}
                        slidesPerView={1.1}
                        className="pb-10">
                        {filteredWorks.map((work) => (
                            <SwiperSlide key={work._uid}>
                                <WorkCard work={work} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <style jsx global>{`
                .swiper-pagination {
                    position: relative !important;
                    padding-top: 10px !important;
                }
                .swiper-pagination-bullet {
                    background: #000 !important;
                    opacity: 0.3;
                }
                .swiper-pagination-bullet-active {
                    opacity: 1 !important;
                    background: #c6d302 !important;
                }
            `}</style>
        </section>
    );
}

function WorkCard({ work }: { work: any }) {
    return (
        <div className="flex flex-col bg-transparent overflow-hidden transition-all duration-300 rounded-xl group">
            {/* Image */}
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
                <Image
                    src={work.image?.filename || work.image}
                    alt={work.image?.alt || work.title}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-grow p-4 bg-transparent">
                <div>
                    <h3 className="text-black sm:text-white mb-1 font-ivy">
                        {work.title}
                    </h3>
                    <p className="text-yello text-xs font-medium font-termina mb-3">
                        {work.category || "FEATURED"}
                    </p>
                    {work.description && (
                        <p className="text-black sm:text-white text-xs font-termina mb-3 opacity-80">
                            {work.description}
                        </p>
                    )}
                </div>

                <div className="mt-auto">
                    <button
                        className="text-black sm:text-white font-termina text-xs underline decoration-yello decoration-2 text-left block hover:opacity-80 transition-opacity"
                        onClick={() => {
                            if (work.case_study_url) {
                                window.open(work.case_study_url, '_blank');
                            }
                        }}
                    >
                        VIEW CASE STUDY
                    </button>
                </div>
            </div>
        </div>
    );
}