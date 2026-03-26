const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createHomeWorking() {
  try {
    console.log('🚀 Creating home story (working approach)...');
    
    // Step 1: Create basic story
    const response = await Storyblok.post(`spaces/${spaceId}/stories`, {
      story: {
        name: 'Home',
        slug: 'home',
        content: {
          component: 'page'
        }
      }
    });
    
    const storyId = response.data.story.id;
    console.log(`✅ Created home story (ID: ${storyId})`);
    
    // Step 2: Update with body field
    console.log('📝 Adding body field...');
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: {
          component: 'page',
          body: []
        }
      }
    });
    
    console.log('✅ Added empty body field');
    
    // Step 3: Set as startpage
    console.log('📝 Setting as start page...');
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        is_startpage: true
      }
    });
    
    console.log('✅ Set as start page');
    
    // Step 4: Publish
    await Storyblok.put(`spaces/${storyId}/stories/${storyId}/publish`);
    console.log('✅ Published story');
    
    console.log('\n🎉 Home story created successfully!');
    console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${storyId}`);
    console.log(`📋 Story ID: ${storyId}`);
    
    return storyId;
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Full error:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

createHomeWorking();