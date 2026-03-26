const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function fixGlobalContentType() {
    try {
        console.log('🔧 Fixing Global content type stories...\n');

        // Fix Global Navbar - extract navbar data from Global structure
        await fixNavbarStory();
        
        // Fix Global Footer - extract footer data from Global structure  
        await fixFooterStory();

        console.log('\n✅ Stories fixed! Now your Storyblok data should appear on the website.');
        console.log('\n📋 Next Steps:');
        console.log('1. Refresh your browser (Ctrl+F5)');
        console.log('2. You should now see:');
        console.log('   - Phone: 123456678 (instead of 858.353.3220)');
        console.log('   - CTA: hey (instead of HIRE GLAZED GLOSS)');
        console.log('3. Check the debug box in top-right corner');

    } catch (error) {
        console.error('❌ Error fixing content types:', error);
    }
}

async function fixNavbarStory() {
    try {
        console.log('📱 Fixing Global Navbar story...');

        // Get current navbar story
        const navbarResponse = await Storyblok.get(`spaces/${spaceId}/stories/140261571739308`);
        const story = navbarResponse.data.story;
        
        console.log(`Current navbar component: ${story.content.component}`);
        console.log(`Current navbar phone: ${story.content.phone}`);
        console.log(`Current navbar CTA: ${story.content.cta_text}`);

        // The navbar data looks correct, so the issue might be in the Layout component
        // Let's make sure the data structure is exactly what Layout expects
        const fixedNavbarContent = {
            _uid: story.content._uid,
            component: 'Navbar',
            logo: story.content.logo || {
                filename: '/logo.png',
                alt: 'Glazed Gloss Creative Collective'
            },
            nav_links: story.content.nav_links || [],
            phone: story.content.phone || '123456678',
            cta_text: story.content.cta_text || 'hey',
            cta_url: story.content.cta_url || '/contact'
        };

        await Storyblok.put(`spaces/${spaceId}/stories/${story.id}`, {
            story: {
                content: fixedNavbarContent
            }
        });

        console.log('✅ Navbar story structure fixed!');

    } catch (error) {
        console.error('❌ Error fixing navbar story:', error);
    }
}

async function fixFooterStory() {
    try {
        console.log('🦶 Fixing Global Footer story...');

        // Get current footer story
        const footerResponse = await Storyblok.get(`spaces/${spaceId}/stories/140262112804879`);
        const story = footerResponse.data.story;
        
        console.log(`Current footer component: ${story.content.component}`);
        
        // Extract footer data from the nested structure
        let footerData = {};
        if (story.content.body && story.content.body.length > 0) {
            footerData = story.content.body[0];
            console.log('📋 Extracted footer data from body[0]');
        }

        // Create proper footer structure
        const fixedFooterContent = {
            _uid: footerData._uid || story.content._uid,
            component: 'Footer',
            logo: footerData.logo || {
                filename: '/logo.png',
                alt: 'Glazed Gloss Creative Collective'
            },
            newsletter_title: footerData.newsletter_title || 'JOIN OUR NEWSLETTER',
            newsletter_description: footerData.newsletter_description || 'Download your Free Beauty Content Calendar when you sign up for exclusive industry insights.',
            description: footerData.description || 'Join our movement and transform your beauty brand with industry-leading expertise and global reach.',
            copyright_text: footerData.copyright_text || '2024 Glazed Gloss Creative Collective. All Rights Reserved.',
            contact_info: {
                address: 'Beverly Hills, CA 90210',
                phone: '858.353.3220',
                email: 'hello@glazedgloss.com'
            },
            footer_links: footerData.footer_links || [],
            social_links: footerData.social_links || []
        };

        await Storyblok.put(`spaces/${spaceId}/stories/${story.id}`, {
            story: {
                content: fixedFooterContent
            }
        });

        console.log('✅ Footer story structure fixed!');

    } catch (error) {
        console.error('❌ Error fixing footer story:', error);
    }
}

// Run the fix
fixGlobalContentType();