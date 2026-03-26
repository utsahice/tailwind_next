const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createNavbarFooterSchemas() {
    try {
        console.log('🚀 Creating Navbar and Footer component schemas in Block Library...');

        // 1. Create nested components first
        await createNestedSchemas();
        
        // 2. Create Navbar component schema
        await createNavbarSchema();
        
        // 3. Create Footer component schema
        await createFooterSchema();

        console.log('✅ All Navbar and Footer component schemas created successfully!');
        console.log('\n📋 Next Steps:');
        console.log('1. Refresh your Storyblok editor');
        console.log('2. Go to your Global Navbar story - it should now show all fields');
        console.log('3. Go to your Global Footer story - it should now show all fields');
        console.log('4. Fill in the content for each field');
        console.log('5. Save and publish both stories');

    } catch (error) {
        console.error('❌ Error creating component schemas:', error);
    }
}

async function createNestedSchemas() {
    try {
        console.log('📝 Creating nested component schemas...');

        // Nav Link component
        const navLinkSchema = {
            name: 'nav_link',
            display_name: 'Navigation Link',
            schema: {
                label: {
                    type: 'text',
                    display_name: 'Label'
                },
                url: {
                    type: 'text',
                    display_name: 'URL'
                },
                is_external: {
                    type: 'boolean',
                    display_name: 'Is External Link'
                }
            },
            image: null,
            preview_field: 'label',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'nav_link',
            component_group_uuid: null
        };

        // Footer Link component
        const footerLinkSchema = {
            name: 'footer_link',
            display_name: 'Footer Link',
            schema: {
                title: {
                    type: 'text',
                    display_name: 'Title'
                },
                url: {
                    type: 'text',
                    display_name: 'URL'
                },
                is_external: {
                    type: 'boolean',
                    display_name: 'Is External Link'
                }
            },
            image: null,
            preview_field: 'title',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'footer_link',
            component_group_uuid: null
        };

        // Social Link component
        const socialLinkSchema = {
            name: 'social_link',
            display_name: 'Social Link',
            schema: {
                platform: {
                    type: 'text',
                    display_name: 'Platform'
                },
                url: {
                    type: 'text',
                    display_name: 'URL'
                },
                handle: {
                    type: 'text',
                    display_name: 'Handle'
                },
                icon: {
                    type: 'asset',
                    display_name: 'Icon (Optional)',
                    filetypes: ['images']
                }
            },
            image: null,
            preview_field: 'platform',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'social_link',
            component_group_uuid: null
        };

        // Contact Info component
        const contactInfoSchema = {
            name: 'contact_info',
            display_name: 'Contact Info',
            schema: {
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
                }
            },
            image: null,
            preview_field: 'phone',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'contact_info',
            component_group_uuid: null
        };

        // Create all nested schemas
        const schemas = [
            { name: 'nav_link', schema: navLinkSchema },
            { name: 'footer_link', schema: footerLinkSchema },
            { name: 'social_link', schema: socialLinkSchema },
            { name: 'contact_info', schema: contactInfoSchema }
        ];

        for (const { name, schema } of schemas) {
            try {
                await Storyblok.post(`spaces/${spaceId}/components`, {
                    component: schema
                });
                console.log(`✅ ${name} component schema created!`);
            } catch (error) {
                if (error.message && error.message.includes('already exists')) {
                    console.log(`✅ ${name} component already exists`);
                } else {
                    console.error(`❌ Error creating ${name} schema:`, error);
                }
            }
        }

    } catch (error) {
        console.error('❌ Error creating nested schemas:', error);
    }
}

async function createNavbarSchema() {
    try {
        console.log('📝 Creating Navbar component schema...');

        const componentSchema = {
            name: 'Navbar',
            display_name: 'Navigation Bar',
            schema: {
                logo: {
                    type: 'asset',
                    display_name: 'Logo',
                    filetypes: ['images']
                },
                nav_links: {
                    type: 'bloks',
                    display_name: 'Navigation Links',
                    restrict_components: true,
                    component_whitelist: ['nav_link']
                },
                phone: {
                    type: 'text',
                    display_name: 'Phone Number'
                },
                cta_text: {
                    type: 'text',
                    display_name: 'CTA Button Text'
                },
                cta_url: {
                    type: 'text',
                    display_name: 'CTA Button URL'
                }
            },
            image: null,
            preview_field: 'cta_text',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'Navbar',
            component_group_uuid: null
        };

        await Storyblok.post(`spaces/${spaceId}/components`, {
            component: componentSchema
        });

        console.log('✅ Navbar component schema created!');

    } catch (error) {
        if (error.message && error.message.includes('already exists')) {
            console.log('✅ Navbar component already exists');
        } else {
            console.error('❌ Error creating Navbar schema:', error);
        }
    }
}

async function createFooterSchema() {
    try {
        console.log('📝 Creating Footer component schema...');

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
                contact_info: {
                    type: 'bloks',
                    display_name: 'Contact Information',
                    restrict_components: true,
                    component_whitelist: ['contact_info'],
                    maximum: 1
                },
                footer_links: {
                    type: 'bloks',
                    display_name: 'Footer Links',
                    restrict_components: true,
                    component_whitelist: ['footer_link']
                },
                social_links: {
                    type: 'bloks',
                    display_name: 'Social Media Links',
                    restrict_components: true,
                    component_whitelist: ['social_link']
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

        console.log('✅ Footer component schema created!');

    } catch (error) {
        if (error.message && error.message.includes('already exists')) {
            console.log('✅ Footer component already exists');
        } else {
            console.error('❌ Error creating Footer schema:', error);
        }
    }
}

// Run the script
createNavbarFooterSchemas();