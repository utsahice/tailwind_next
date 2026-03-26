const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function debugHeroData() {
  try {
    console.log('🔍 Debugging Hero component data...\n');
    
    const response = await Storyblok.get('cdn/stories/home', {
      version: 'draft'
    });
    
    const story = response.data.story;
    console.log(`✅ Story: ${story.name}`);
    
    if (story.content && story.content.body) {
      const heroBlock = story.content.body.find(block => block.component === 'Hero');
      
      if (heroBlock) {
        console.log('\n📦 HERO BLOCK DATA:');
        console.log(`Component: ${heroBlock.component}`);
        console.log(`UID: ${heroBlock._uid}`);
        console.log(`Title: ${heroBlock.title || 'NOT SET'}`);
        console.log(`Subtitle: ${heroBlock.subtitle || 'NOT SET'}`);
        console.log(`Description: ${heroBlock.description ? heroBlock.description.substring(0, 100) + '...' : 'NOT SET'}`);
        console.log(`Background Image: ${heroBlock.background_image?.filename || 'NOT SET'}`);
        console.log(`CTA Text: ${heroBlock.cta_text || 'NOT SET'}`);
        console.log(`CTA Link: ${heroBlock.cta_link || 'NOT SET'}`);
        
        console.log('\n🔧 FULL HERO BLOCK STRUCTURE:');
        console.log(JSON.stringify(heroBlock, null, 2));
        
        console.log('\n✅ Hero block found and has data!');
        
        // Check if background image path is valid
        if (heroBlock.background_image?.filename) {
          console.log(`\n🖼️  Background image path: ${heroBlock.background_image.filename}`);
          if (heroBlock.background_image.filename.startsWith('/')) {
            console.log('✅ Using local image path - make sure file exists in public folder');
          } else if (heroBlock.background_image.filename.startsWith('http')) {
            console.log('✅ Using remote image URL');
          } else {
            console.log('⚠️  Image path format might be incorrect');
          }
        } else {
          console.log('❌ No background image set');
        }
        
      } else {
        console.log('❌ No Hero block found in story body');
        console.log('\n📋 Available blocks:');
        story.content.body.forEach((block, index) => {
          console.log(`${index + 1}. ${block.component}`);
        });
      }
    } else {
      console.log('❌ No body content found in story');
    }
    
  } catch (error) {
    console.error('❌ Error debugging hero data:', error.response?.data || error.message);
  }
}

debugHeroData();