"use client";
import { useEffect, useState } from "react";
import StoryblokClient from "storyblok-js-client";
import Navbar from "./storyblok/Navbar";
import Footer from "./storyblok/Footer";
import CartDrawer from "./CartDrawer";


interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [navbarData, setNavbarData] = useState<any>(null);
    const [footerData, setFooterData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGlobalData = async () => {
            try {
                // Create Storyblok client directly
                const storyblokApi = new StoryblokClient({
                    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN || 'YTUdrS7816o8CIAJACDpDQtt'
                });

                // Fetch global navbar data
                try {
                    const navbarResponse = await storyblokApi.get('cdn/stories/global-navbar', {
                        version: 'draft', // Changed to draft to get latest changes
                        cv: Date.now(), // Cache busting
                        _storyblok_tk: Date.now() // Additional cache busting
                    });
                    setNavbarData(navbarResponse.data.story.content);
                    console.log('✅ Navbar data loaded from Storyblok:', navbarResponse.data.story.content);
                } catch (navError) {
                    console.log('⚠️ Navbar story not found, using enhanced fallback. Error:', navError);
                    setNavbarData({
                        _uid: 'navbar_fallback',
                        component: 'Navbar',
                        logo: { filename: '/logo.jpg', alt: 'Glazed Gloss Creative Collective' },
                        nav_links: [
                            { _uid: 'nav_1', label: 'Home', url: '/', is_external: false },
                            { _uid: 'nav_2', label: 'About', url: '/about', is_external: false },
                            { _uid: 'nav_3', label: 'Services', url: '/services', is_external: false },
                            { _uid: 'nav_4', label: 'Work', url: '/work', is_external: false },
                            { _uid: 'nav_5', label: 'Products', url: '/products', is_external: false },
                            { _uid: 'nav_6', label: 'Contact', url: '/contact', is_external: false }
                        ],
                        phone: '858.353.3220',
                        cta_text: 'HIRE GLAZED GLOSS',
                        cta_url: '/contact'
                    });
                }

                // Fetch global footer data
                try {
                    const footerResponse = await storyblokApi.get('cdn/stories/global-footer', {
                        version: 'draft', // Changed to draft to get latest changes
                        cv: Date.now() // Cache busting
                    });

                    // Handle nested footer structure
                    let footerContent = footerResponse.data.story.content;
                    if (footerContent.component === 'Global' && footerContent.body && footerContent.body.length > 0) {
                        // Footer data is nested inside body[0]
                        footerContent = footerContent.body[0];
                        console.log('✅ Footer data loaded from Storyblok (nested structure):', footerContent);
                    } else {
                        console.log('✅ Footer data loaded from Storyblok (direct structure):', footerContent);
                    }

                    setFooterData(footerContent);
                } catch (footerError) {
                    console.log('⚠️ Footer story not found, using enhanced fallback. Error:', footerError);
                    setFooterData({
                        _uid: 'footer_fallback',
                        component: 'Footer',
                        logo: { filename: '/logo.jpg', alt: 'Glazed Gloss Creative Collective' },
                        newsletter_title: 'JOIN OUR NEWSLETTER',
                        newsletter_description: 'Download your Free Beauty Content Calendar when you sign up for exclusive industry insights.',
                        description: 'Join our movement and transform your beauty brand with industry-leading expertise and global reach.',
                        copyright_text: '2024 Glazed Gloss Creative Collective. All Rights Reserved.',
                        contact_info: {
                            address: 'Beverly Hills, CA 90210',
                            phone: '858.353.3220',
                            email: 'hello@glazedgloss.com'
                        },
                        footer_links: [
                            { _uid: 'link_1', title: 'About', url: '/about', is_external: false },
                            { _uid: 'link_2', title: 'Services', url: '/services', is_external: false },
                            { _uid: 'link_3', title: 'Work', url: '/work', is_external: false },
                            { _uid: 'link_4', title: 'Contact', url: '/contact', is_external: false },
                            { _uid: 'link_5', title: 'Privacy Policy', url: '/privacy', is_external: false },
                            { _uid: 'link_6', title: 'Terms', url: '/terms', is_external: false }
                        ],
                        social_links: [
                            { _uid: 'social_1', platform: 'Instagram', url: 'https://instagram.com/glazedgloss', handle: '@glazedgloss' },
                            { _uid: 'social_2', platform: 'Facebook', url: 'https://facebook.com/glazedgloss', handle: 'Glazed Gloss' },
                            { _uid: 'social_3', platform: 'TikTok', url: 'https://tiktok.com/@glazedgloss', handle: '@glazedgloss' },
                            { _uid: 'social_4', platform: 'Twitter', url: 'https://twitter.com/glazedgloss', handle: '@glazedgloss' },
                            { _uid: 'social_5', platform: 'YouTube', url: 'https://youtube.com/glazedgloss', handle: 'Glazed Gloss' },
                            { _uid: 'social_6', platform: 'LinkedIn', url: 'https://linkedin.com/company/glazedgloss', handle: 'Glazed Gloss' }
                        ]
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error('❌ Error fetching global data:', error);
                setLoading(false);
            }
        };

        fetchGlobalData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Global Navbar — always rendered inside CartProvider */}
            {!loading && <Navbar key={navbarData?.phone || 'fallback'} blok={navbarData} />}

            {/* Cart Drawer */}
            <CartDrawer />

            {/* Main Content */}
            <main className="flex-1 pt-[30px]">
                {loading ? (
                    <div className="min-h-screen flex items-center justify-center bg-white">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-yello rounded-full mx-auto mb-4 animate-pulse" />
                            <p className="font-termina text-gray-600">Loading Glazed Gloss...</p>
                        </div>
                    </div>
                ) : children}
            </main>

            {/* Global Footer */}
            {!loading && <Footer blok={footerData} />}
        </div>
    );
}