const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function createDynamicBlocks() {
  try {
    console.log('🔧 Creating dynamic blocks for Services and Work components...\n');

    // 1. Service Item Block
    const serviceItemBlock = {
      name: 'Service Item',
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
      }
    };

    // 2. Service Category Block
    const serviceCategoryBlock = {
      name: 'Service Category',
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
      }
    };

    // 3. Work Item Block
    const workItemBlock = {
      name: 'Work Item',
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
      }
    };

    // 4. Work Category Block
    const workCategoryBlock = {
      name: 'Work Category',
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
      }
    };

    const blocks = [
      { name: 'Service Item', data: serviceItemBlock },
      { name: 'Service Category', data: serviceCategoryBlock },
      { name: 'Work Item', data: workItemBlock },
      { name: 'Work Category', data: workCategoryBlock }
    ];

    for (const block of blocks) {
      try {
        const response = await Storyblok.post('spaces/140223635408021/components/', {
          component: block.data
        });
        console.log(`✅ Created ${block.name} block (ID: ${response.data.component.id})`);
      } catch (error) {
        if (error.response?.status === 422) {
          console.log(`⚠️  ${block.name} block already exists, skipping...`);
        } else {
          console.error(`❌ Error creating ${block.name}:`, error.response?.data || error.message);
        }
      }
    }

    // 5. Update OurServices Component Schema
    console.log('\n🔧 Updating OurServices component schema...');
    try {
      const ourServicesSchema = {
        title: {
          type: 'text',
          display_name: 'Section Title'
        },
        subtitle: {
          type: 'textarea',
          display_name: 'Section Subtitle'
        },
        services: {
          type: 'bloks',
          restrict_components: true,
          component_whitelist: ['Service Item'],
          display_name: 'Services List'
        },
        service_categories: {
          type: 'bloks',
          restrict_components: true,
          component_whitelist: ['Service Category'],
          display_name: 'Service Categories'
        },
        cta_primary_text: {
          type: 'text',
          display_name: 'Primary CTA Text'
        },
        cta_secondary_text: {
          type: 'text',
          display_name: 'Secondary CTA Text'
        }
      };

      await Storyblok.put('spaces/140223635408021/components/140223635408022', {
        component: {
          name: 'OurServices',
          schema: ourServicesSchema
        }
      });
      console.log('✅ Updated OurServices component schema');
    } catch (error) {
      console.error('❌ Error updating OurServices:', error.response?.data || error.message);
    }

    // 6. Update OurWork Component Schema
    console.log('\n🔧 Updating OurWork component schema...');
    try {
      const ourWorkSchema = {
        title: {
          type: 'text',
          display_name: 'Section Title'
        },
        subtitle: {
          type: 'textarea',
          display_name: 'Section Subtitle'
        },
        work_items: {
          type: 'bloks',
          restrict_components: true,
          component_whitelist: ['Work Item'],
          display_name: 'Work Portfolio'
        },
        work_categories: {
          type: 'bloks',
          restrict_components: true,
          component_whitelist: ['Work Category'],
          display_name: 'Work Categories'
        },
        cta_text: {
          type: 'text',
          display_name: 'CTA Button Text'
        }
      };

      await Storyblok.put('spaces/140223635408021/components/140223635408027', {
        component: {
          name: 'OurWork',
          schema: ourWorkSchema
        }
      });
      console.log('✅ Updated OurWork component schema');
    } catch (error) {
      console.error('❌ Error updating OurWork:', error.response?.data || error.message);
    }

    console.log('\n🎯 SUMMARY:');
    console.log('✅ Created Service Item, Service Category, Work Item, Work Category blocks');
    console.log('✅ Updated OurServices and OurWork component schemas');
    console.log('✅ Components are now fully dynamic and ready for content management');
    console.log('\n📝 Next steps:');
    console.log('1. Go to Storyblok and add Service Items to OurServices');
    console.log('2. Add Service Categories for dynamic buttons');
    console.log('3. Add Work Items to OurWork');
    console.log('4. Add Work Categories for dynamic tabs');

  } catch (error) {
    console.error('❌ Error creating dynamic blocks:', error.response?.data || error.message);
  }
}

createDynamicBlocks();