const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function debugStoryblokConnection() {
    try {
        console.log('🔍 Debugging Storyblok connection and data...\n');

        // Check environment variables
        console.log('📋 Environment Check:');
        console.log(`STORYBLOK_ACCESS_TOKEN: ${process.env.STORYBLOK_ACCESS_TOKEN ? '✅ Set' : '❌ Missing'}`);
        console.log(`STORYBLOK_SPACE_ID: ${process.env.STORYBLOK_SPACE_ID ? '✅ Set' : '❌ Missing'}`);
        console.log('');

        // Test basic connection
        console.log('🌐 Testing Storyblok API connection...');
        const spaceInfo = await Storyblok.get('cdn/spaces/me');
        console.log(`✅ Connected to space: ${spaceInfo.data.space.name} (ID: ${spaceInfo.data.space.id})`);
        console.log('');

        // Check Global Navbar story
        console.log('📱 Checking Global Navbar story...');
        try {
            const navbarStory = await Storyblok.get('cdn/stories/global-navbar', {
                version: 'draft'
            });
            console.log('✅ Global Navbar story found:');
            console.log(`   - ID: ${navbarStory.data.story.id}`);
            console.log(`   - Name: ${navbarStory.data.story.name}`);
            console.log(`   - Slug: ${navbarStory.data.story.slug}`);
            console.log(`   - Component: ${navbarStory.data.story.content.component}`);
            console.log(`   - Published: ${navbarStory.data.story.published_at ? 'Yes' : 'No (Draft only)'}`);
            console.log(`   - Content keys: ${Object.keys(navbarStory.data.story.content).join(', ')}`);
            
            if (navbarStory.data.story.content.nav_links) {
                console.log(`   - Nav links count: ${navbarStory.data.story.content.nav_links.length}`);
            }
            if (navbarStory.data.story.content.phone) {
                console.log(`   - Phone: ${navbarStory.data.story.content.phone}`);
            }
        } catch (error) {
            console.log('❌ Global Navbar story not found or error:', error.message);
        }
        console.log('');

        // Check Global Footer story
        console.log('🦶 Checking Global Footer story...');
        try {
            const footerStory = await Storyblok.get('cdn/stories/global-footer', {
                version: 'draft'
            });
            console.log('✅ Global Footer story found:');
            console.log(`   - ID: ${footerStory.data.story.id}`);
            console.log(`   - Name: ${footerStory.data.story.name}`);
            console.log(`   - Slug: ${footerStory.data.story.slug}`);
            console.log(`   - Component: ${footerStory.data.story.content.component}`);
            console.log(`   - Published: ${footerStory.data.story.published_at ? 'Yes' : 'No (Draft only)'}`);
            console.log(`   - Content keys: ${Object.keys(footerStory.data.story.content).join(', ')}`);
        } catch (error) {
            console.log('❌ Global Footer story not found or error:', error.message);
        }
        console.log('');

        // Check About story
        console.log('📄 Checking About story...');
        try {
            const aboutStory = await Storyblok.get('cdn/stories/about', {
                version: 'draft'
            });
            console.log('✅ About story found:');
            console.log(`   - ID: ${aboutStory.data.story.id}`);
            console.log(`   - Name: ${aboutStory.data.story.name}`);
            console.log(`   - Slug: ${aboutStory.data.story.slug}`);
            console.log(`   - Component: ${aboutStory.data.story.content.component}`);
            console.log(`   - Published: ${aboutStory.data.story.published_at ? 'Yes' : 'No (Draft only)'}`);
            
            if (aboutStory.data.story.content.body) {
                console.log(`   - Body sections: ${aboutStory.data.story.content.body.length}`);
                aboutStory.data.story.content.body.forEach((section, i) => {
                    console.log(`     ${i + 1}. ${section.component}`);
                });
            }
        } catch (error) {
            console.log('❌ About story not found or error:', error.message);
        }
        console.log('');

        // List all stories
        console.log('📚 All stories in your space:');
        const allStories = await Storyblok.get('cdn/stories', {
            version: 'draft',
            per_page: 100
        });
        
        allStories.data.stories.forEach(story => {
            console.log(`   - ${story.name} (${story.slug}) - Component: ${story.content.component || 'N/A'}`);
        });

        console.log('\n🎯 DIAGNOSIS:');
        console.log('If you see "Global Navbar story found" and "Global Footer story found" above,');
        console.log('but your website is still showing fallback data, then:');
        console.log('1. Make sure you refresh your browser (Ctrl+F5)');
        console.log('2. Check browser console for any errors');
        console.log('3. The Layout component should now use draft version');
        console.log('4. If still not working, there might be a caching issue');

    } catch (error) {
        console.error('❌ Error during debug:', error);
    }
}

// Run the debug
debugStoryblokConnection();