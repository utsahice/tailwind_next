const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function checkComponents() {
  try {
    console.log('🔍 Checking available components...');
    
    const response = await Storyblok.get(`spaces/${spaceId}/components`);
    
    console.log(`📋 Found ${response.data.components.length} components:`);
    
    response.data.components.forEach(component => {
      console.log(`- ${component.display_name} (${component.name}) - ${component.is_root ? 'Content Type' : 'Nestable Block'}`);
    });
    
    // Check if page component exists and is a content type
    const pageComponent = response.data.components.find(c => c.name === 'page');
    if (pageComponent) {
      console.log(`\n📄 Page component found:`);
      console.log(`- Is root (content type): ${pageComponent.is_root}`);
      console.log(`- Is nestable: ${pageComponent.is_nestable}`);
    } else {
      console.log('\n❌ Page component not found!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

checkComponents();