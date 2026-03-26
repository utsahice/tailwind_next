const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function verifyManualStories() {
    try {
        console.log('🔍 Verifying manually created stories...\n');

        // Check Global Navbar
        await checkStory('global-navbar', 'Global Navbar');
        
        // Check Global Footer
        await checkStory('global-footer', 'Global Footer');
        
        // Check About Us
        await checkStory('about', 'About Us');

        console.log('\n✅ Verification complete!');
        console.log('\n📋 Next Steps:');
        console.log('1. If stories are found, your Layout component should work');
        console.log('2. Test your website at http://localhost:3000');
        console.log('3. Check navbar and footer appear on all pages');
        console.log('4. Visit /about to see the about page');

    } catch (error) {
        console.error('❌ Error during verification:', error);
    }
}

async function checkStory(slug, name) {
    try {
        const response = await Storyblok.get(`cdn/stories/${slug}`, {
            version: 'draft'
        });

        if (response.data && response.data.story) {
            console.log(`✅ ${name} story found:`);
            console.log(`   - ID: ${response.data.story.id}`);
            console.log(`   - Slug: ${response.data.story.slug}`);
            console.log(`   - Component: ${response.data.story.content.component}`);
            console.log(`   - Published: ${response.data.story.published_at ? 'Yes' : 'No (Draft only)'}`);
            
            if (slug === 'about' && response.data.story.content.body) {
                console.log(`   - Sections: ${response.data.story.content.body.length} components`);
                response.data.story.content.body.forEach((section, i) => {
                    console.log(`     ${i + 1}. ${section.component}`);
                });
            }
        } else {
            console.log(`❌ ${name} story not found`);
        }
        console.log('');

    } catch (error) {
        console.log(`❌ ${name} story not found or error: ${error.message}`);
        console.log('');
    }
}

// Run the verification
verifyManualStories();