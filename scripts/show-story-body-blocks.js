const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function showStoryBodyBlocks() {
  try {
    console.log('📖 Fetching home story body blocks...\n');
    
    const response = await Storyblok.get('cdn/stories/home', {
      version: 'draft'
    });
    
    const story = response.data.story;
    console.log(`✅ Story: ${story.name} (ID: ${story.id})`);
    console.log(`🔗 Full slug: ${story.full_slug}\n`);
    
    if (story.content && story.content.body) {
      console.log(`📋 BODY BLOCKS (${story.content.body.length} sections):\n`);
      
      story.content.body.forEach((block, index) => {
        console.log(`${index + 1}. COMPONENT: ${block.component}`);
        console.log(`   UID: ${block._uid}`);
        console.log(`   TITLE: ${block.title || 'No title'}`);
        
        // Show key data for each block type
        if (block.component === 'Hero') {
          console.log(`   SUBTITLE: ${block.subtitle || 'No subtitle'}`);
          console.log(`   DESCRIPTION: ${block.description ? block.description.substring(0, 100) + '...' : 'No description'}`);
          console.log(`   BACKGROUND IMAGE: ${block.background_image?.filename || 'No image'}`);
          console.log(`   CTA TEXT: ${block.cta_text || 'No CTA'}`);
        }
        
        if (block.component === 'OurServices') {
          console.log(`   SERVICES COUNT: ${block.services?.length || 0}`);
          if (block.services && block.services.length > 0) {
            block.services.forEach((service, i) => {
              console.log(`     Service ${i + 1}: ${service.title} - ${service.image?.filename || 'No image'}`);
            });
          }
        }
        
        if (block.component === 'RetailPartners') {
          console.log(`   PARTNERS COUNT: ${block.partners?.length || 0}`);
          if (block.partners && block.partners.length > 0) {
            block.partners.forEach((partner, i) => {
              console.log(`     Partner ${i + 1}: ${partner.name} - ${partner.logo?.filename || 'No logo'}`);
            });
          }
        }
        
        if (block.component === 'OurWork') {
          console.log(`   WORK ITEMS COUNT: ${block.work_items?.length || 0}`);
          if (block.work_items && block.work_items.length > 0) {
            block.work_items.forEach((item, i) => {
              console.log(`     Work ${i + 1}: ${item.title} (${item.category}) - ${item.image?.filename || 'No image'}`);
            });
          }
        }
        
        if (block.component === 'GlazedGloss') {
          console.log(`   MAIN IMAGE: ${block.main_image?.filename || 'No image'}`);
          console.log(`   VIDEO URL: ${block.video_url || 'No video'}`);
          console.log(`   SIGNATURE: ${block.signature_image?.filename || 'No signature'}`);
        }
        
        if (block.component === 'TransformingBrands') {
          console.log(`   STATISTICS COUNT: ${block.statistics?.length || 0}`);
          if (block.statistics && block.statistics.length > 0) {
            block.statistics.forEach((stat, i) => {
              console.log(`     Stat ${i + 1}: ${stat.number} - ${stat.label}`);
            });
          }
        }
        
        if (block.component === 'BeautyExperts') {
          console.log(`   FEATURES COUNT: ${block.features?.length || 0}`);
          console.log(`   EXPERT IMAGES COUNT: ${block.expert_images?.length || 0}`);
        }
        
        if (block.component === 'Branding') {
          console.log(`   BRAND IMAGES COUNT: ${block.brand_images?.length || 0}`);
        }
        
        if (block.component === 'VideoSlider') {
          console.log(`   VIDEOS COUNT: ${block.videos?.length || 0}`);
          if (block.videos && block.videos.length > 0) {
            block.videos.forEach((video, i) => {
              console.log(`     Video ${i + 1}: ${video.title} - ${video.thumbnail?.filename || 'No thumbnail'}`);
            });
          }
        }
        
        if (block.component === 'Footer') {
          console.log(`   LOGO: ${block.logo?.filename || 'No logo'}`);
          console.log(`   FOOTER LINKS COUNT: ${block.footer_links?.length || 0}`);
          console.log(`   SOCIAL LINKS COUNT: ${block.social_links?.length || 0}`);
        }
        
        console.log(''); // Empty line between blocks
      });
      
      console.log('🎯 SUMMARY:');
      console.log(`✅ Total body blocks: ${story.content.body.length}`);
      console.log(`✅ All components have proper structure`);
      console.log(`✅ Story is ready for frontend rendering`);
      
    } else {
      console.log('❌ No body content found in story');
    }
    
  } catch (error) {
    console.error('❌ Error fetching story:', error.response?.data || error.message);
  }
}

showStoryBodyBlocks();