const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function debugAboutStory() {
    try {
        console.log('🔍 Debugging About story structure...\n');

        const aboutResponse = await Storyblok.get('cdn/stories/about', {
            version: 'draft'
        });

        const story = aboutResponse.data.story;
        
        console.log('📄 About Story Details:');
        console.log(`- ID: ${story.id}`);
        console.log(`- Name: ${story.name}`);
        console.log(`- Slug: ${story.slug}`);
        console.log(`- Root Component: ${story.content.component}`);
        console.log('');

        if (story.content.body && story.content.body.length > 0) {
            console.log('📋 Body Sections:');
            story.content.body.forEach((section, i) => {
                console.log(`${i + 1}. ${section.component} (${section._uid})`);
                if (section.title) {
                    console.log(`   Title: ${section.title}`);
                }
            });
        } else {
            console.log('❌ No body sections found!');
        }

        console.log('\n🔧 Full Story Content Structure:');
        console.log(JSON.stringify(story.content, null, 2));

    } catch (error) {
        console.error('❌ Error debugging about story:', error);
    }
}

debugAboutStory();