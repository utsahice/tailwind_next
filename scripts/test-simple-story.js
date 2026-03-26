const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function testSimpleStory() {
  try {
    console.log('🧪 Testing simple story creation...');
    
    // Try creating with different approaches
    console.log('📝 Attempt 1: Minimal story...');
    
    try {
      const response1 = await Storyblok.post(`spaces/${spaceId}/stories`, {
        story: {
          name: 'Test Home',
          slug: 'test-home'
        }
      });
      console.log('✅ Minimal story created:', response1.data.story.id);
      
      // Delete it
      await Storyblok.delete(`spaces/${spaceId}/stories/${response1.data.story.id}`);
      console.log('🗑️ Deleted test story');
      
    } catch (error) {
      console.log('❌ Minimal story failed:', error.response?.data || error.message);
    }
    
    console.log('📝 Attempt 2: Story with content type...');
    
    try {
      const response2 = await Storyblok.post(`spaces/${spaceId}/stories`, {
        story: {
          name: 'Test Home 2',
          slug: 'test-home-2',
          content: {
            component: 'page'
          }
        }
      });
      console.log('✅ Story with content type created:', response2.data.story.id);
      
      // Delete it
      await Storyblok.delete(`spaces/${spaceId}/stories/${response2.data.story.id}`);
      console.log('🗑️ Deleted test story');
      
    } catch (error) {
      console.log('❌ Story with content type failed:', error.response?.data || error.message);
    }
    
    console.log('📝 Attempt 3: Story with page and empty body...');
    
    try {
      const response3 = await Storyblok.post(`spaces/${spaceId}/stories`, {
        story: {
          name: 'Home',
          slug: 'home',
          content: {
            component: 'page',
            body: []
          },
          is_startpage: true
        }
      });
      console.log('✅ HOME STORY CREATED:', response3.data.story.id);
      
      // Don't delete this one - it's our home story!
      return response3.data.story.id;
      
    } catch (error) {
      console.log('❌ Home story failed:', error.response?.data || error.message);
      if (error.response?.data) {
        console.log('Full error:', JSON.stringify(error.response.data, null, 2));
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testSimpleStory();