const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function verifyHomeStory() {
  try {
    console.log('🔍 Verifying home story...');
    
    // Get the home story
    const response = await Storyblok.get(`cdn/stories/home`, {
      version: 'draft'
    });
    
    const story = response.data.story;
    console.log(`✅ Found home story: ${story.name}`);
    console.log(`📖 Story ID: ${story.id}`);
    console.log(`🔗 Full slug: ${story.full_slug}`);
    
    // Check sections
    if (story.content && story.content.body) {
      console.log(`\n📋 Story has ${story.content.body.length} sections:`);
      story.content.body.forEach((section, index) => {
        console.log(`${index + 1}. ${section.component} - ${section.title || 'No title'}`);
      });
    } else {
      console.log('❌ No content body found in story');
    }
    
    console.log('\n✅ Home story verification complete!');
    console.log(`🌐 Preview URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${story.id}`);
    
  } catch (error) {
    console.error('❌ Error verifying home story:', error.response?.data || error.message);
  }
}

verifyHomeStory();