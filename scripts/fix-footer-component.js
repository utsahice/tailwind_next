const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function fixFooterComponent() {
    try {
        console.log('🔧 Fixing Global Footer component...');

        // Get the footer story
        const stories = await Storyblok.get(`spaces/${spaceId}/stories`, {
            with_slug: 'global-footer'
        });

        if (stories.data.stories.length === 0) {
            console.log('❌ Global Footer story not found');
            return;
        }

        const storyId = stories.data.stories[0].id;
        console.log(`✅ Found Global Footer story with ID: ${storyId}`);

        // Simple footer content with correct component name
        const footerContent = {
            component: 'Footer',
            logo: {
                filename: '/logo.png',
                alt: 'Glazed Gloss Creative Collective'
            },
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
                { title: 'About', url: '/about', is_external: false },
                { title: 'Services', url: '/services', is_external: false },
                { title: 'Work', url: '/work', is_external: false },
                { title: 'Contact', url: '/contact', is_external: false },
                { title: 'Privacy Policy', url: '/privacy', is_external: false },
                { title: 'Terms', url: '/terms', is_external: false }
            ],
            social_links: [
                { platform: 'Instagram', url: 'https://instagram.com/glazedgloss', handle: '@glazedgloss' },
                { platform: 'Facebook', url: 'https://facebook.com/glazedgloss', handle: 'Glazed Gloss' },
                { platform: 'TikTok', url: 'https://tiktok.com/@glazedgloss', handle: '@glazedgloss' },
                { platform: 'Twitter', url: 'https://twitter.com/glazedgloss', handle: '@glazedgloss' },
                { platform: 'YouTube', url: 'https://youtube.com/glazedgloss', handle: 'Glazed Gloss' },
                { platform: 'LinkedIn', url: 'https://linkedin.com/company/glazedgloss', handle: 'Glazed Gloss' }
            ]
        };

        await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
            story: {
                content: footerContent
            }
        });

        console.log('✅ Global Footer component fixed successfully!');
        console.log('📋 Please publish the story in Storyblok dashboard');

    } catch (error) {
        console.error('❌ Error fixing footer component:', error);
    }
}

// Run the fix
fixFooterComponent();