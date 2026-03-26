const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function checkExistingComponents() {
  try {
    console.log('🔍 Checking existing components in Storyblok...\n');
    
    const response = await Storyblok.get(`spaces/${spaceId}/components`);
    const components = response.data.components;
    
    console.log(`📦 Found ${components.length} existing components:\n`);
    
    components.forEach(component => {
      console.log(`✅ ${component.display_name} (${component.name})`);
      console.log(`   - Root: ${component.is_root}`);
      console.log(`   - Nestable: ${component.is_nestable}`);
      console.log(`   - Schema fields: ${Object.keys(component.schema).join(', ')}`);
      console.log('');
    });
    
    // Check which components we need
    const requiredComponents = [
      'Page', 'Hero', 'OurServices', 'RetailPartners', 'OurWork', 
      'GlazedGloss', 'TransformingBrands', 'BeautyExperts', 'Branding', 
      'GlossAction', 'VideoSlider', 'Footer',
      'service_item', 'partner_item', 'work_item', 'video_item', 
      'footer_link', 'social_link', 'statistic_item'
    ];
    
    const existingNames = components.map(c => c.name);
    const missingComponents = requiredComponents.filter(name => !existingNames.includes(name));
    
    console.log('📋 COMPONENT STATUS:');
    console.log(`✅ Existing: ${existingNames.length}`);
    console.log(`❌ Missing: ${missingComponents.length}`);
    
    if (missingComponents.length > 0) {
      console.log('\n🔧 Missing components:');
      missingComponents.forEach(name => {
        console.log(`   - ${name}`);
      });
    } else {
      console.log('\n🎉 All required components exist!');
    }
    
  } catch (error) {
    console.error('❌ Error checking components:', error.response?.data || error.message);
  }
}

checkExistingComponents();