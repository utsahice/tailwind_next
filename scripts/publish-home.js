const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function publishHome() {
  try {
    console.log('📝 Publishing home story...');
    
    // Get home story
    const storiesResponse = await Storyblok.get(`spaces/${spaceId}/stories`, {
      with_slug: 'home'
    });
    
    if (storiesResponse.data.stories.length === 0) {
      console.error('❌ Home story not found');
      return;
    }
    
    const homeStory = storiesResponse.data.stories[0];
    const storyId = homeStory.id;
    
    console.log(`✅ Found home story (ID: ${storyId})`);
    
    // Publish it
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}/publish`);
    
    console.log('✅ Home story published successfully!');
    console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${storyId}`);
    console.log('🚀 Visit http://localhost:3000 to see your website!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

publishHome();