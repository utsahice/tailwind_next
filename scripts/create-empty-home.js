const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createEmptyHome() {
  try {
    console.log('🚀 Creating empty home story...');
    
    // Create completely empty page
    const emptyContent = {
      component: "page",
      body: []
    };
    
    const response = await Storyblok.post(`spaces/${spaceId}/stories`, {
      story: {
        name: 'Home',
        slug: 'home',
        content: emptyContent,
        is_startpage: true
      }
    });
    
    const storyId = response.data.story.id;
    console.log(`✅ Created empty home story (ID: ${storyId})`);
    
    // Publish it
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}/publish`);
    console.log('✅ Published home story');
    
    console.log('\n🎉 Empty home story created successfully!');
    console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${storyId}`);
    console.log('\n📝 Now you can manually add blocks in the Storyblok interface');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Full error:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

createEmptyHome();