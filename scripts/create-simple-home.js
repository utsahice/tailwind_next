const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

// Simple content with just one hero block
const simpleContent = {
  component: "page",
  body: [
    {
      component: "hero",
      _uid: "hero_" + Date.now(),
      title: "Welcome to Beauty Transform",
      subtitle: "Your beauty brand transformation starts here"
    }
  ]
};

async function createSimpleHome() {
  try {
    console.log('🚀 Creating simple home story...');
    
    const response = await Storyblok.post(`spaces/${spaceId}/stories`, {
      story: {
        name: 'Home',
        slug: 'home',
        content: simpleContent,
        is_startpage: true
      }
    });
    
    console.log(`✅ Created simple home story (ID: ${response.data.story.id})`);
    
    // Now publish it
    await Storyblok.put(`spaces/${spaceId}/stories/${response.data.story.id}/publish`);
    console.log('✅ Published home story');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

createSimpleHome();