const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function updateStoryblokSchemas() {
  try {
    console.log('🔧 Updating Storyblok component schemas and adding dynamic blocks...\n');

    // First, let's get the space info to find component IDs
    const spaceResponse = await Storyblok.get('spaces/me');
    const spaceId = spaceResponse.data.space.id;
    console.log(`📍 Working with space ID: ${spaceId}`);

    // Get all components to find existing ones
    const componentsResponse = await Storyblok.get(`spaces/${spaceId}/components`);
    const existingComponents = componentsResponse.data.components;
    
    console.log(`📋 Found ${existingComponents.length} existing components`);

    // Find OurServices and OurWork component IDs
    const ourServicesComponent = existingComponents.find(c => c.name === 'OurServices');
    const ourWorkComponent = existingComponents.find(c => c.name === 'OurWork');

    console.log(`🔍 OurServices component ID: ${ourServicesComponent?.id || 'Not found'}`);
    console.log(`🔍 OurWork component ID: ${ourWorkComponent?.id || 'Not found'}`);

    // 1. Update OurServices Component Schema
    if (ourServicesComponent) {
      console.log('\n🔧 Updating OurServices component schema...');
      try {
        const ourServicesSchema = {
          title: {
            type: 'text',
            display_name: 'Section Title',
            default_value: 'OUR SERVICES'
          },
          subtitle: {
            type: 'textarea',
            display_name: 'Section Subtitle',
            default_value: 'Glazed Gloss Creative Collective was founded by a seasoned brand builder driven by a singular purpose: to accelerate your brand vision from inception to fruition and to accelerate brand growth.'
          },
          services: {
            type: 'bloks',
            display_name: 'Services List',
            description: 'Add service items with images, titles, descriptions and categories'
          },
          service_categories: {
            type: 'bloks', 
            display_name: 'Service Categories',
            description: 'Add categories for filtering services'
          },
          cta_primary_text: {
            type: 'text',
            display_name: 'Primary CTA Text',
            default_value: 'HIRE GLAZED'
          },
          cta_secondary_text: {
            type: 'text',
            display_name: 'Secondary CTA Text', 
            default_value: 'VIEW ALL SERVICES'
          }
        };

        await Storyblok.put(`spaces/${spaceId}/components/${ourServicesComponent.id}`, {
          component: {
            name: 'OurServices',
            display_name: 'Our Services',
            schema: ourServicesSchema,
            is_root: false,
            is_nestable: true
          }
        });
        console.log('✅ Updated OurServices component schema');
      } catch (error) {
        console.error('❌ Error updating OurServices:', error.response?.data || error.message);
      }
    }

    // 2. Update OurWork Component Schema  
    if (ourWorkComponent) {
      console.log('\n🔧 Updating OurWork component schema...');
      try {
        const ourWorkSchema = {
          title: {
            type: 'text',
            display_name: 'Section Title',
            default_value: 'OUR WORK'
          },
          subtitle: {
            type: 'textarea',
            display_name: 'Section Subtitle'
          },
          work_items: {
            type: 'bloks',
            display_name: 'Work Portfolio',
            description: 'Add work/project items with images, titles, descriptions and categories'
          },
          work_categories: {
            type: 'bloks',
            display_name: 'Work Categories', 
            description: 'Add categories for filtering work items'
          },
          cta_text: {
            type: 'text',
            display_name: 'CTA Button Text',
            default_value: 'VIEW ALL'
          }
        };

        await Storyblok.put(`spaces/${spaceId}/components/${ourWorkComponent.id}`, {
          component: {
            name: 'OurWork',
            display_name: 'Our Work',
            schema: ourWorkSchema,
            is_root: false,
            is_nestable: true
          }
        });
        console.log('✅ Updated OurWork component schema');
      } catch (error) {
        console.error('❌ Error updating OurWork:', error.response?.data || error.message);
      }
    }

    // 3. Create Service Item Block
    console.log('\n🔧 Creating Service Item block...');
    try {
      const serviceItemBlock = {
        name: 'ServiceItem',
        display_name: 'Service Item',
        schema: {
          title: {
            type: 'text',
            required: true,
            display_name: 'Service Title'
          },
          description: {
            type: 'textarea',
            display_name: 'Service Description'
          },
          image: {
            type: 'asset',
            filetypes: ['images'],
            display_name: 'Service Image'
          },
          category: {
            type: 'text',
            display_name: 'Service Category'
          }
        },
        is_root: false,
        is_nestable: true
      };

      await Storyblok.post(`spaces/${spaceId}/components/`, {
        component: serviceItemBlock
      });
      console.log('✅ Created ServiceItem block');
    } catch (error) {
      if (error.response?.status === 422) {
        console.log('⚠️  ServiceItem block already exists, skipping...');
      } else {
        console.error('❌ Error creating ServiceItem:', error.response?.data || error.message);
      }
    }

    // 4. Create Service Category Block
    console.log('\n🔧 Creating Service Category block...');
    try {
      const serviceCategoryBlock = {
        name: 'ServiceCategory',
        display_name: 'Service Category',
        schema: {
          name: {
            type: 'text',
            required: true,
            display_name: 'Category Name'
          },
          is_active: {
            type: 'boolean',
            default_value: false,
            display_name: 'Is Active Tab'
          }
        },
        is_root: false,
        is_nestable: true
      };

      await Storyblok.post(`spaces/${spaceId}/components/`, {
        component: serviceCategoryBlock
      });
      console.log('✅ Created ServiceCategory block');
    } catch (error) {
      if (error.response?.status === 422) {
        console.log('⚠️  ServiceCategory block already exists, skipping...');
      } else {
        console.error('❌ Error creating ServiceCategory:', error.response?.data || error.message);
      }
    }

    // 5. Create Work Item Block
    console.log('\n🔧 Creating Work Item block...');
    try {
      const workItemBlock = {
        name: 'WorkItem',
        display_name: 'Work Item',
        schema: {
          title: {
            type: 'text',
            required: true,
            display_name: 'Project Title'
          },
          description: {
            type: 'textarea',
            display_name: 'Project Description'
          },
          image: {
            type: 'asset',
            filetypes: ['images'],
            display_name: 'Project Image'
          },
          category: {
            type: 'text',
            required: true,
            display_name: 'Project Category'
          },
          case_study_url: {
            type: 'text',
            display_name: 'Case Study URL'
          }
        },
        is_root: false,
        is_nestable: true
      };

      await Storyblok.post(`spaces/${spaceId}/components/`, {
        component: workItemBlock
      });
      console.log('✅ Created WorkItem block');
    } catch (error) {
      if (error.response?.status === 422) {
        console.log('⚠️  WorkItem block already exists, skipping...');
      } else {
        console.error('❌ Error creating WorkItem:', error.response?.data || error.message);
      }
    }

    // 6. Create Work Category Block
    console.log('\n🔧 Creating Work Category block...');
    try {
      const workCategoryBlock = {
        name: 'WorkCategory',
        display_name: 'Work Category',
        schema: {
          name: {
            type: 'text',
            required: true,
            display_name: 'Category Name'
          },
          is_active: {
            type: 'boolean',
            default_value: false,
            display_name: 'Is Active Tab'
          }
        },
        is_root: false,
        is_nestable: true
      };

      await Storyblok.post(`spaces/${spaceId}/components/`, {
        component: workCategoryBlock
      });
      console.log('✅ Created WorkCategory block');
    } catch (error) {
      if (error.response?.status === 422) {
        console.log('⚠️  WorkCategory block already exists, skipping...');
      } else {
        console.error('❌ Error creating WorkCategory:', error.response?.data || error.message);
      }
    }

    console.log('\n🎯 SUMMARY:');
    console.log('✅ Updated OurServices and OurWork component schemas');
    console.log('✅ Created ServiceItem, ServiceCategory, WorkItem, WorkCategory blocks');
    console.log('✅ Components are now ready for dynamic content management');
    console.log('\n📝 Next steps:');
    console.log('1. Run the content update script to populate with sample data');
    console.log('2. Go to Storyblok to manage your dynamic content');
    console.log('3. Add your own images and content through the CMS');

  } catch (error) {
    console.error('❌ Error updating Storyblok schemas:', error.response?.data || error.message);
  }
}

updateStoryblokSchemas();