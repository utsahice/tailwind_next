const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function checkStories() {
  try {
    console.log('🔍 Checking existing stories...');
    
    const response = await Storyblok.get(`spaces/${spaceId}/stories`);
    
    console.log(`📋 Found ${response.data.stories.length} stories:`);
    
    response.data.stories.forEach(story => {
      console.log(`- ${story.name} (slug: ${story.slug}, id: ${story.id})`);
    });
    
    // Check specifically for home story
    const homeStory = response.data.stories.find(s => s.slug === 'home');
    if (homeStory) {
      console.log(`\n🏠 Home story exists (ID: ${homeStory.id})`);
      console.log('Content type:', homeStory.content?.component || 'No component');
      console.log('Body blocks:', homeStory.content?.body?.length || 0);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

checkStories();