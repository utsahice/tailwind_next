const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function fixFooterComponentName() {
    try {
        console.log('🔧 Fixing Footer component name...');

        // Get the footer story
        const footerResponse = await Storyblok.get(`spaces/${spaceId}/stories/140262112804879`);
        const story = footerResponse.data.story;
        
        console.log(`✅ Found Global Footer story with ID: ${story.id}`);
        console.log(`Current component name: ${story.content.component}`);

        // Fix the component name and add basic structure
        const fixedContent = {
            ...story.content,
            component: 'Footer', // Fix the component name
            logo: story.content.logo || {
                filename: '/logo.png',
                alt: 'Glazed Gloss Creative Collective'
            },
            newsletter_title: story.content.newsletter_title || 'JOIN OUR NEWSLETTER',
            newsletter_description: story.content.newsletter_description || 'Download your Free Beauty Content Calendar when you sign up for exclusive industry insights.',
            description: story.content.description || 'Join our movement and transform your beauty brand with industry-leading expertise and global reach.',
            copyright_text: story.content.copyright_text || '2024 Glazed Gloss Creative Collective. All Rights Reserved.',
            phone: story.content.phone || '858.353.3220',
            email: story.content.email || 'hello@glazedgloss.com',
            address: story.content.address || 'Beverly Hills, CA 90210'
        };

        await Storyblok.put(`spaces/${spaceId}/stories/${story.id}`, {
            story: {
                content: fixedContent
            }
        });

        console.log('✅ Footer component name fixed to "Footer"!');
        console.log('✅ Added basic footer content fields!');
        console.log('\n📋 Next Steps:');
        console.log('1. Refresh your browser (Ctrl+F5)');
        console.log('2. Check browser console - you should see "Footer data loaded from Storyblok"');
        console.log('3. Your navbar and footer should now show Storyblok data instead of fallback');
        console.log('4. Go to Storyblok and edit the Global Footer story to customize content');

    } catch (error) {
        console.error('❌ Error fixing footer component:', error);
    }
}

// Run the fix
fixFooterComponentName();