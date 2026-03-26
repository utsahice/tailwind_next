const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function debugPageComponent() {
  try {
    console.log('🔍 Debugging page component...');
    
    // Get the page component details
    const componentsResponse = await Storyblok.get(`spaces/${spaceId}/components`);
    const pageComponent = componentsResponse.data.components.find(c => c.name === 'page');
    
    if (pageComponent) {
      console.log('📄 Page component found:');
      console.log('- ID:', pageComponent.id);
      console.log('- Name:', pageComponent.name);
      console.log('- Display Name:', pageComponent.display_name);
      console.log('- Is Root:', pageComponent.is_root);
      console.log('- Is Nestable:', pageComponent.is_nestable);
      console.log('- Schema:', JSON.stringify(pageComponent.schema, null, 2));
      
      // Try to create a story with this component
      console.log('\n📝 Testing story creation...');
      
      const testContent = {
        component: "page",
        body: []
      };
      
      try {
        const response = await Storyblok.post(`spaces/${spaceId}/stories`, {
          story: {
            name: 'Test Home',
            slug: 'test-home-' + Date.now(),
            content: testContent
          }
        });
        
        console.log('✅ Test story created successfully!');
        console.log('Story ID:', response.data.story.id);
        
        // Clean up - delete the test story
        await Storyblok.delete(`spaces/${spaceId}/stories/${response.data.story.id}`);
        console.log('✅ Test story deleted');
        
      } catch (error) {
        console.error('❌ Test story creation failed:');
        console.error('Status:', error.response?.status);
        console.error('Data:', JSON.stringify(error.response?.data, null, 2));
      }
      
    } else {
      console.error('❌ Page component not found!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

debugPageComponent();