const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

// Check environment variables
if (!process.env.STORYBLOK_OAUTH_TOKEN) {
  console.error('❌ STORYBLOK_OAUTH_TOKEN is missing in .env.local');
  console.log('💡 Get it from: Settings → API-Keys → Create new token with management permissions');
  process.exit(1);
}

if (!process.env.STORYBLOK_SPACE_ID) {
  console.error('❌ STORYBLOK_SPACE_ID is missing in .env.local');
  console.log('💡 Find it in your Storyblok space URL: app.storyblok.com/#!/me/spaces/YOUR_SPACE_ID');
  process.exit(1);
}

// Initialize Storyblok Management API client
const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

console.log(`🚀 Setting up Storyblok space: ${spaceId}`);
console.log(`🔑 Using OAuth token: ${process.env.STORYBLOK_OAUTH_TOKEN.substring(0, 10)}...`);

// Block schemas
const blockSchemas = [
  {
    name: 'page',
    display_name: 'Page',
    schema: {
      body: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: [
          'hero',
          'our_services', 
          'retail_partners',
          'our_work',
          'glazed_gloss',
          'transforming_brands',
          'beauty_experts',
          'branding',
          'gloss_action',
          'video_slider',
          'footer'
        ]
      }
    },
    is_root: true,
    is_nestable: false
  },
  {
    name: 'hero',
    display_name: 'Hero Section',
    schema: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      background_image: { type: 'asset', filetypes: ['images'] },
      hero_gif: { type: 'asset', filetypes: ['images'] }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'service_item',
    display_name: 'Service Item',
    schema: {
      title: { type: 'text' },
      description: { type: 'textarea' },
      image: { type: 'asset', filetypes: ['images'] }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'our_services',
    display_name: 'Our Services',
    schema: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      services: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['service_item']
      }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'partner_item',
    display_name: 'Partner Item',
    schema: {
      name: { type: 'text' },
      logo: { type: 'asset', filetypes: ['images'] }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'retail_partners',
    display_name: 'Retail Partners',
    schema: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      partners: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['partner_item']
      }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'work_item',
    display_name: 'Work Item',
    schema: {
      title: { type: 'text' },
      description: { type: 'textarea' },
      image: { type: 'asset', filetypes: ['images'] },
      category: { type: 'text' }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'our_work',
    display_name: 'Our Work',
    schema: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      work_items: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['work_item']
      }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'glazed_gloss',
    display_name: 'Glazed Gloss',
    schema: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      description: { type: 'textarea' },
      main_image: { type: 'asset', filetypes: ['images'] },
      background_color: { type: 'text' }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'stat_item',
    display_name: 'Statistic Item',
    schema: {
      number: { type: 'text' },
      label: { type: 'text' }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'transforming_brands',
    display_name: 'Transforming Brands',
    schema: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      description: { type: 'textarea' },
      main_image: { type: 'asset', filetypes: ['images'] },
      stats: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['stat_item']
      }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'expert_item',
    display_name: 'Expert Item',
    schema: {
      name: { type: 'text' },
      title: { type: 'text' },
      bio: { type: 'textarea' },
      image: { type: 'asset', filetypes: ['images'] }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'beauty_experts',
    display_name: 'Beauty Experts',
    schema: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      experts: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['expert_item']
      }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'branding_item',
    display_name: 'Branding Item',
    schema: {
      title: { type: 'text' },
      description: { type: 'textarea' },
      image: { type: 'asset', filetypes: ['images'] }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'branding',
    display_name: 'Branding',
    schema: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      description: { type: 'textarea' },
      branding_items: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['branding_item']
      }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'gloss_action',
    display_name: 'Gloss Action',
    schema: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      description: { type: 'textarea' },
      action_image: { type: 'asset', filetypes: ['images'] },
      cta_text: { type: 'text' },
      cta_link: { type: 'link' }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'video_item',
    display_name: 'Video Item',
    schema: {
      title: { type: 'text' },
      thumbnail: { type: 'asset', filetypes: ['images'] },
      video_url: { type: 'text' }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'video_slider',
    display_name: 'Video Slider',
    schema: {
      title: { type: 'text' },
      subtitle: { type: 'text' },
      videos: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['video_item']
      }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'footer_link',
    display_name: 'Footer Link',
    schema: {
      label: { type: 'text' },
      url: { type: 'link' }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'social_link',
    display_name: 'Social Link',
    schema: {
      platform: { type: 'text' },
      url: { type: 'link' },
      icon: { type: 'asset', filetypes: ['images'] }
    },
    is_root: false,
    is_nestable: true
  },
  {
    name: 'footer',
    display_name: 'Footer',
    schema: {
      logo: { type: 'asset', filetypes: ['images'] },
      company_description: { type: 'textarea' },
      footer_links: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['footer_link']
      },
      social_links: {
        type: 'bloks',
        restrict_components: true,
        component_whitelist: ['social_link']
      },
      copyright_text: { type: 'text' }
    },
    is_root: false,
    is_nestable: true
  }
];

async function createComponents() {
  try {
    console.log('🔍 Testing API connection...');
    
    // Test API connection first
    try {
      const spaceInfo = await Storyblok.get(`spaces/${spaceId}`);
      console.log(`✅ Connected to space: ${spaceInfo.data.space.name}`);
    } catch (error) {
      console.error('❌ Failed to connect to Storyblok API');
      console.error('Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.response?.data?.error || error.message,
        url: error.config?.url
      });
      
      if (error.response?.status === 401) {
        console.log('\n💡 Authentication failed. Check:');
        console.log('1. Your STORYBLOK_OAUTH_TOKEN is correct');
        console.log('2. The token has management permissions');
        console.log('3. The token is not expired');
      }
      
      if (error.response?.status === 404) {
        console.log('\n💡 Space not found. Check:');
        console.log('1. Your STORYBLOK_SPACE_ID is correct');
        console.log('2. You have access to this space');
      }
      
      return;
    }
    
    // Get existing components
    console.log('🔍 Checking existing components...');
    let existingComponents = [];
    try {
      const componentsResponse = await Storyblok.get(`spaces/${spaceId}/components`);
      existingComponents = componentsResponse.data.components.map(c => c.name);
      console.log(`📋 Found ${existingComponents.length} existing components`);
    } catch (error) {
      console.log('⚠️ Could not fetch existing components, will try to create all');
    }
    
    console.log('\n📦 Creating Storyblok components...');
    
    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;
    
    for (const block of blockSchemas) {
      try {
        // Check if component already exists
        if (existingComponents.includes(block.name)) {
          console.log(`⏭️ Skipped: ${block.display_name} (already exists)`);
          skippedCount++;
          continue;
        }
        
        console.log(`⏳ Creating: ${block.display_name}...`);
        
        const response = await Storyblok.post(`spaces/${spaceId}/components`, {
          component: block
        });
        
        console.log(`✅ Created: ${block.display_name} (ID: ${response.data.component.id})`);
        successCount++;
        
        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        errorCount++;
        console.error(`❌ Failed to create: ${block.display_name}`);
        
        const errorDetails = {
          status: error.response?.status,
          statusText: error.response?.statusText,
          message: error.response?.data?.error || error.message,
          details: error.response?.data
        };
        
        console.error('Error details:', errorDetails);
        
        // Specific error handling
        if (error.response?.status === 422) {
          console.log('💡 Validation error - check field types and names');
          if (error.response?.data?.errors) {
            console.log('Validation errors:', error.response.data.errors);
          }
        }
        
        if (error.response?.status === 409) {
          console.log('💡 Component already exists - this should have been caught earlier');
          skippedCount++;
          errorCount--; // Don't count as error
        }
        
        if (error.response?.status === 429) {
          console.log('💡 Rate limited - waiting 3 seconds...');
          await new Promise(resolve => setTimeout(resolve, 3000));
          // Retry this component
          try {
            const retryResponse = await Storyblok.post(`spaces/${spaceId}/components`, {
              component: block
            });
            console.log(`✅ Created (retry): ${block.display_name}`);
            successCount++;
            errorCount--;
          } catch (retryError) {
            console.log(`❌ Retry failed for: ${block.display_name}`);
          }
        }
      }
    }
    
    console.log('\n📊 Summary:');
    console.log(`✅ Successfully created: ${successCount} components`);
    console.log(`⏭️ Skipped (already exist): ${skippedCount} components`);
    console.log(`❌ Failed to create: ${errorCount} components`);
    
    if (successCount > 0 || skippedCount > 0) {
      console.log('\n🎉 Setup completed! You can now:');
      console.log('1. Go to your Storyblok space');
      console.log('2. Create a new story called "home"');
      console.log('3. Set content type to "page"');
      console.log('4. Add blocks to the body field');
      console.log('5. Run: npm run dev');
    }
    
  } catch (error) {
    console.error('❌ Setup failed with unexpected error:', error.message);
    console.error('Full error:', error);
  }
}

// Run the setup
if (require.main === module) {
  createComponents();
}

module.exports = { createComponents, blockSchemas };