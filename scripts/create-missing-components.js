const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createMissingComponents() {
  try {
    console.log('🔧 Creating missing component schemas...\n');

    const components = [
      // Page Component (Root)
      {
        name: 'Page',
        display_name: 'Page',
        schema: {
          body: {
            type: 'bloks'
          }
        },
        is_root: true,
        is_nestable: false
      },

      // Service Item Component
      {
        name: 'service_item',
        display_name: 'Service Item',
        schema: {
          title: { type: 'text' },
          description: { type: 'textarea' },
          image: { type: 'asset' }
        },
        is_root: false,
        is_nestable: true
      },

      // Partner Item Component
      {
        name: 'partner_item',
        display_name: 'Partner Item',
        schema: {
          name: { type: 'text' },
          logo: { type: 'asset' }
        },
        is_root: false,
        is_nestable: true
      },

      // Work Item Component
      {
        name: 'work_item',
        display_name: 'Work Item',
        schema: {
          title: { type: 'text' },
          description: { type: 'textarea' },
          category: { type: 'text' },
          image: { type: 'asset' }
        },
        is_root: false,
        is_nestable: true
      },

      // Video Item Component
      {
        name: 'video_item',
        display_name: 'Video Item',
        schema: {
          title: { type: 'text' },
          thumbnail: { type: 'asset' },
          video_url: { type: 'text' }
        },
        is_root: false,
        is_nestable: true
      },

      // Footer Link Component
      {
        name: 'footer_link',
        display_name: 'Footer Link',
        schema: {
          title: { type: 'text' },
          url: { type: 'text' }
        },
        is_root: false,
        is_nestable: true
      },

      // Social Link Component
      {
        name: 'social_link',
        display_name: 'Social Link',
        schema: {
          platform: { type: 'text' },
          url: { type: 'text' },
          icon: { type: 'asset' }
        },
        is_root: false,
        is_nestable: true
      }
    ];

    let successCount = 0;
    let errorCount = 0;

    for (const component of components) {
      try {
        console.log(`📦 Creating component: ${component.display_name}...`);
        
        await Storyblok.post(`spaces/${spaceId}/components`, {
          component: component
        });
        
        console.log(`✅ Created: ${component.display_name}`);
        successCount++;
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (error) {
        if (error.response?.status === 422 && error.response?.data?.error?.includes('already exists')) {
          console.log(`⚠️  Already exists: ${component.display_name}`);
          successCount++;
        } else {
          console.error(`❌ Error creating ${component.display_name}:`, error.response?.data || error.message);
          errorCount++;
        }
      }
    }

    console.log(`\n🎯 SUMMARY:`);
    console.log(`✅ Successfully created/verified: ${successCount} components`);
    console.log(`❌ Errors: ${errorCount} components`);
    
    if (errorCount === 0) {
      console.log(`\n🎉 All missing component schemas are ready!`);
    }

  } catch (error) {
    console.error('❌ Error in component creation process:', error);
  }
}

createMissingComponents();