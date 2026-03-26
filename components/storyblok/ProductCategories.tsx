"use client";
import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

interface ProductCategoriesProps {
    blok: {
        title: string;
        categories: Array<{
            _uid: string;
            component: string;
            [key: string]: unknown;
        }>;
        _uid: string;
        component: string;
    };
}

export default function ProductCategories({ blok }: ProductCategoriesProps) {
    return (
        <section {...storyblokEditable(blok)} className="py-20 bg-gray-50">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-[100px]">
                <h2 className="font-ivy text-5xl md:text-6xl text-center text-black mb-16">
                    {blok.title || "Shop by Category"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {blok.categories?.map((category) => (
                        <StoryblokComponent blok={category} key={category._uid} />
                    ))}
                </div>
            </div>
        </section>
    );
}
