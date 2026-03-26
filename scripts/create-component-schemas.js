const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createComponentSchemas() {
  try {
    console.log('🔧 Creating Storyblok component schemas...\n');

    const components = [
      // Page Component
      {
        name: 'Page',
        display_name: 'Page',
        schema: {
          body: {
            type: 'bloks',
            restrict_components: true,
            component_whitelist: ['Hero', 'OurServices', 'RetailPartners', 'OurWork', 'GlazedGloss', 'TransformingBrands', 'BeautyExperts', 'Branding', 'GlossAction', 'VideoSlider', 'Footer']
          }
        },
        is_root: true,
        is_nestable: false
      },

      // Hero Component
      {
        name: 'Hero',
        display_name: 'Hero Section',
        schema: {
          title: { type: 'text' },
          subtitle: { type: 'text' },
          description: { type: 'textarea' },
          background_image: { type: 'asset', filetypes: ['images', 'videos'] },
          cta_text: { type: 'text' },
          cta_link: { type: 'text' }
        },
        is_root: false,
        is_nestable: true
      },

      // Service Item Component
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

      // Our Services Component
      {
        name: 'OurServices',
        display_name: 'Our Services',
        schema: {
          title: { type: 'text' },
          subtitle: { type: 'textarea' },
          services: {
            type: 'bloks',
            restrict_components: true,
            component_whitelist: ['service_item']
          }
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
          logo: { type: 'asset', filetypes: ['images'] }
        },
        is_root: false,
        is_nestable: true
      },

      // Retail Partners Component
      {
        name: 'RetailPartners',
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

      // Work Item Component
      {
        name: 'work_item',
        display_name: 'Work Item',
        schema: {
          title: { type: 'text' },
          description: { type: 'textarea' },
          category: { type: 'text' },
          image: { type: 'asset', filetypes: ['images'] }
        },
        is_root: false,
        is_nestable: true
      },

      // Our Work Component
      {
        name: 'OurWork',
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

      // Glazed Gloss Component
      {
        name: 'GlazedGloss',
        display_name: 'Glazed Gloss',
        schema: {
          title: { type: 'text' },
          subtitle: { type: 'text' },
          description: { type: 'textarea' },
          main_image: { type: 'asset', filetypes: ['images'] },
          video_url: { type: 'text' },
          signature_image: { type: 'asset', filetypes: ['images'] },
          cta_text: { type: 'text' }
        },
        is_root: false,
        is_nestable: true
      },

      // Statistic Item Component
      {
        name: 'statistic_item',
        display_name: 'Statistic Item',
        schema: {
          number: { type: 'text' },
          label: { type: 'text' }
        },
        is_root: false,
        is_nestable: true
      },

      // Transforming Brands Component
      {
        name: 'TransformingBrands',
        display_name: 'Transforming Brands',
        schema: {
          title: { type: 'text' },
          subtitle: { type: 'text' },
          description: { type: 'textarea' },
          statistics: {
            type: 'bloks',
            restrict_components: true,
            component_whitelist: ['statistic_item']
          },
          background_image: { type: 'asset', filetypes: ['images'] }
        },
        is_root: false,
        is_nestable: true
      },

      // Beauty Experts Component
      {
        name: 'BeautyExperts',
        display_name: 'Beauty Experts',
        schema: {
          title: { type: 'text' },
          subtitle: { type: 'text' },
          description: { type: 'textarea' },
          features: { type: 'bloks' },
          expert_images: { type: 'bloks' },
          cta_text: { type: 'text' }
        },
        is_root: false,
        is_nestable: true
      },

      // Branding Component
      {
        name: 'Branding',
        display_name: 'Branding',
        schema: {
          title: { type: 'text' },
          subtitle: { type: 'text' },
          description: { type: 'textarea' },
          brand_images: { type: 'bloks' }
        },
        is_root: false,
        is_nestable: true
      },

      // Gloss Action Component
      {
        name: 'GlossAction',
        display_name: 'Gloss Action',
        schema: {
          title: { type: 'text' },
          subtitle: { type: 'text' },
          description: { type: 'textarea' },
          cta_text: { type: 'text' },
          cta_link: { type: 'text' },
          background_image: { type: 'asset', filetypes: ['images', 'videos'] }
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
          thumbnail: { type: 'asset', filetypes: ['images'] },
          video_url: { type: 'text' }
        },
        is_root: false,
        is_nestable: true
      },

      // Video Slider Component
      {
        name: 'VideoSlider',
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
          icon: { type: 'asset', filetypes: ['images'] }
        },
        is_root: false,
        is_nestable: true
      },

      // Footer Component
      {
        name: 'Footer',
        display_name: 'Footer',
        schema: {
          logo: { type: 'asset', filetypes: ['images'] },
          description: { type: 'textarea' },
          contact_info: { type: 'bloks' },
          footer_links: {
            type: 'bloks',
            restrict_components: true,
            component_whitelist: ['footer_link']
          },
          social_links: {
            type: 'bloks',
            restrict_components: true,
            component_whitelist: ['social_link']
          }
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
        await new Promise(resolve => setTimeout(resolve, 200));
        
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
      console.log(`\n🎉 All component schemas are ready!`);
      console.log(`📋 You can now use these components in your stories:`);
      components.forEach(comp => {
        console.log(`   - ${comp.display_name} (${comp.name})`);
      });
    }

  } catch (error) {
    console.error('❌ Error in component creation process:', error);
  }
}

createComponentSchemas();