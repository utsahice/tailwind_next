"use client";
import { useEffect, useState } from "react";
import StoryblokClient from "storyblok-js-client";
import { StoryblokComponent } from "@storyblok/react/rsc";
import Layout from "@/components/Layout";
import "@/lib/storyblok";

export default function Home() {
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeStory = async () => {
      try {
        // Create Storyblok client directly
        const storyblokApi = new StoryblokClient({
          accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN || 'YTUdrS7816o8CIAJACDpDQtt'
        });

        const { data } = await storyblokApi.get("cdn/stories/home", {
          version: "draft", // Always use draft for immediate updates
          resolve_links: "url",
          cv: Date.now() // Cache busting
        });
        setStory(data?.story);
        console.log('✅ Home story loaded from Storyblok:', data?.story);
      } catch (error) {
        console.error('❌ Error fetching home story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeStory();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="loading-pulse mb-4">
              <div className="w-16 h-16 bg-yello rounded-full mx-auto"></div>
            </div>
            <p className="font-termina text-gray-600">Loading Glazed Gloss...</p>
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
            <h1 className="text-4xl font-ivy mb-4">Glazed Gloss</h1>
            <p className="font-termina text-gray-600">Home story not found in Storyblok...</p>
            <p className="font-termina text-sm text-gray-500 mt-2">Check console for errors</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <StoryblokComponent blok={story.content} />
    </Layout>
  );
}
