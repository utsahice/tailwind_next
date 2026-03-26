const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createSimpleFooterSchema() {
    try {
        console.log('🚀 Creating simplified Footer component schema...');

        const componentSchema = {
            name: 'Footer',
            display_name: 'Footer',
            schema: {
                logo: {
                    type: 'asset',
                    display_name: 'Logo',
                    filetypes: ['images']
                },
                newsletter_title: {
                    type: 'text',
                    display_name: 'Newsletter Title'
                },
                newsletter_description: {
                    type: 'textarea',
                    display_name: 'Newsletter Description'
                },
                description: {
                    type: 'textarea',
                    display_name: 'Company Description'
                },
                copyright_text: {
                    type: 'text',
                    display_name: 'Copyright Text'
                },
                address: {
                    type: 'text',
                    display_name: 'Address'
                },
                phone: {
                    type: 'text',
                    display_name: 'Phone'
                },
                email: {
                    type: 'text',
                    display_name: 'Email'
                },
                footer_links: {
                    type: 'textarea',
                    display_name: 'Footer Links (JSON format)'
                },
                social_links: {
                    type: 'textarea',
                    display_name: 'Social Links (JSON format)'
                }
            },
            image: null,
            preview_field: 'newsletter_title',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'Footer',
            component_group_uuid: null
        };

        await Storyblok.post(`spaces/${spaceId}/components`, {
            component: componentSchema
        });

        console.log('✅ Footer component schema created successfully!');
        console.log('\n📋 Next Steps:');
        console.log('1. Refresh your Storyblok editor');
        console.log('2. Go to your Global Footer story');
        console.log('3. Fill in the basic fields (logo, newsletter title, etc.)');
        console.log('4. For footer_links, use this JSON format:');
        console.log(`[
  {"title": "About", "url": "/about", "is_external": false},
  {"title": "Services", "url": "/services", "is_external": false},
  {"title": "Work", "url": "/work", "is_external": false},
  {"title": "Contact", "url": "/contact", "is_external": false}
]`);
        console.log('5. For social_links, use this JSON format:');
        console.log(`[
  {"platform": "Instagram", "url": "https://instagram.com/glazedgloss", "handle": "@glazedgloss"},
  {"platform": "Facebook", "url": "https://facebook.com/glazedgloss", "handle": "Glazed Gloss"}
]`);

    } catch (error) {
        if (error.message && error.message.includes('already exists')) {
            console.log('✅ Footer component already exists - updating...');
            
            // Try to update existing component
            try {
                const components = await Storyblok.get(`spaces/${spaceId}/components`);
                const footerComponent = components.data.components.find(c => c.name === 'Footer');
                
                if (footerComponent) {
                    await Storyblok.put(`spaces/${spaceId}/components/${footerComponent.id}`, {
                        component: componentSchema
                    });
                    console.log('✅ Footer component updated successfully!');
                }
            } catch (updateError) {
                console.error('❌ Error updating Footer component:', updateError);
            }
        } else {
            console.error('❌ Error creating Footer schema:', error);
        }
    }
}

// Run the script
createSimpleFooterSchema();