const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const client = new StoryblokClient({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN
});

async function verifyStories() {
    console.log('🔍 Verifying Auth & Contact Stories...\n');

    const stories = ['contact', 'login', 'register', 'membership'];
    let allSuccess = true;

    for (const slug of stories) {
        try {
            const { data } = await client.get(`cdn/stories/${slug}`, {
                version: 'draft'
            });

            if (data && data.story) {
                console.log(`✅ ${slug.toUpperCase()} Story:`);
                console.log(`   ID: ${data.story.id}`);
                console.log(`   Name: ${data.story.name}`);
                console.log(`   Slug: ${data.story.slug}`);
                console.log(`   Published: ${data.story.published_at ? 'Yes' : 'No'}`);
                console.log(`   Components: ${data.story.content.body?.length || 0}`);
                
                if (data.story.content.body && data.story.content.body.length > 0) {
                    console.log(`   Main Component: ${data.story.content.body[0].component}`);
                }
                console.log('');
            } else {
                console.log(`❌ ${slug.toUpperCase()}: Story not found\n`);
                allSuccess = false;
            }
        } catch (error) {
            console.log(`❌ ${slug.toUpperCase()}: Error - ${error.message}\n`);
            allSuccess = false;
        }
    }

    if (allSuccess) {
        console.log('✅ All stories verified successfully!\n');
        console.log('📋 Next Steps:');
        console.log('1. Start dev server: npm run dev');
        console.log('2. Visit: http://localhost:3000/contact');
        console.log('3. Visit: http://localhost:3000/login');
        console.log('4. Visit: http://localhost:3000/register');
        console.log('5. Visit: http://localhost:3000/membership');
        console.log('\n🎨 Edit Content:');
        console.log('Go to: https://app.storyblok.com');
        console.log('Navigate to: Content → Stories');
        console.log('Edit any story and see changes immediately!\n');
    } else {
        console.log('⚠️  Some stories could not be verified.');
        console.log('Please check your Storyblok dashboard.\n');
    }
}

verifyStories().catch(error => {
    console.error('❌ Verification failed:', error.message);
});
