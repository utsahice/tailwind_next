"use client";
import { useEffect, useState } from "react";
import StoryblokClient from "storyblok-js-client";
import { StoryblokStory } from "@storyblok/react/rsc";
import Layout from "@/components/Layout";
import "@/lib/storyblok"; // Import Storyblok configuration

export default function AboutPage() {
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutStory = async () => {
            try {
                // Create Storyblok client directly
                const storyblokApi = new StoryblokClient({
                    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN || process.env.STORYBLOK_ACCESS_TOKEN
                });

                const { data } = await storyblokApi.get('cdn/stories/about', {
                    version: 'draft',
                    cv: Date.now() // Cache busting
                });
                setStory(data?.story);
                console.log('✅ About story loaded from Storyblok:', data?.story);
            } catch (error) {
                console.error('❌ Error fetching about story:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutStory();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="loading-pulse mb-4">
                            <div className="w-16 h-16 bg-yello rounded-full mx-auto"></div>
                        </div>
                        <p className="font-termina text-gray-600">Loading About Page...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!story) {
        // Fallback content if story doesn't exist
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-ivy mb-4">About Us</h1>
                        <p className="font-termina text-gray-600">About page story not found in Storyblok...</p>
                        <p className="font-termina text-sm text-gray-500 mt-2">Check console for errors</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <StoryblokStory story={story} />
        </Layout>
    );
}