"use client";
import { useEffect, useState } from "react";
import StoryblokClient from "storyblok-js-client";
import { StoryblokStory } from "@storyblok/react/rsc";
import Layout from "@/components/Layout";
import "@/lib/storyblok";

export default function WorkPage() {
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkStory = async () => {
            try {
                const storyblokApi = new StoryblokClient({
                    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN || 'YTUdrS7816o8CIAJACDpDQtt'
                });

                const { data } = await storyblokApi.get('cdn/stories/work', {
                    version: 'draft',
                    cv: Date.now()
                });
                setStory(data?.story);
                console.log('✅ Work story loaded from Storyblok:', data?.story);
            } catch (error) {
                console.error('❌ Error fetching work story:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkStory();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="loading-pulse mb-4">
                            <div className="w-16 h-16 bg-yello rounded-full mx-auto"></div>
                        </div>
                        <p className="font-termina text-gray-600">Loading Our Work...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!story) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-ivy mb-4">Our Work</h1>
                        <p className="font-termina text-gray-600">Work page story not found in Storyblok...</p>
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
