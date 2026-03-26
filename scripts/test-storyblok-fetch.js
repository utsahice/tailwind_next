const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function testStoryblokFetch() {
    try {
        console.log('🧪 Testing exact same API calls as Layout component...\n');

        // Test navbar fetch (same as Layout.tsx)
        console.log('📱 Testing navbar fetch...');
        try {
            const navbarResponse = await Storyblok.get('cdn/stories/global-navbar', {
                version: 'draft',
                cv: Date.now()
            });
            console.log('✅ Navbar fetch successful!');
            console.log('📋 Navbar content structure:');
            console.log(JSON.stringify(navbarResponse.data.story.content, null, 2));
        } catch (navError) {
            console.log('❌ Navbar fetch failed:', navError.message);
        }

        console.log('\n🦶 Testing footer fetch...');
        try {
            const footerResponse = await Storyblok.get('cdn/stories/global-footer', {
                version: 'draft',
                cv: Date.now()
            });
            console.log('✅ Footer fetch successful!');
            console.log('📋 Footer content structure:');
            console.log(JSON.stringify(footerResponse.data.story.content, null, 2));
        } catch (footerError) {
            console.log('❌ Footer fetch failed:', footerError.message);
        }

        console.log('\n🔍 Testing with different access token format...');
        
        // Test with different client setup
        const StoryblokPreview = new StoryblokClient({
            accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
            cache: {
                clear: 'auto',
                type: 'memory'
            }
        });

        try {
            const testResponse = await StoryblokPreview.get('cdn/stories/global-navbar', {
                version: 'draft'
            });
            console.log('✅ Alternative client works!');
            console.log(`Phone in navbar: ${testResponse.data.story.content.phone}`);
        } catch (error) {
            console.log('❌ Alternative client failed:', error.message);
        }

    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

testStoryblokFetch();