const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const client = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_ACCESS_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID || '312454'; // Replace with your space ID

async function createComponentSchemas() {
    console.log('🚀 Creating Auth & Contact Component Schemas...\n');

    const components = [
        // Contact Form Component
        {
            name: 'ContactForm',
            display_name: 'Contact Form',
            schema: {
                title: {
                    type: 'text',
                    pos: 0,
                    display_name: 'Title'
                },
                subtitle: {
                    type: 'text',
                    pos: 1,
                    display_name: 'Subtitle'
                },
                description: {
                    type: 'textarea',
                    pos: 2,
                    display_name: 'Description'
                },
                form_title: {
                    type: 'text',
                    pos: 3,
                    display_name: 'Form Title',
                    default_value: 'Send us a message'
                },
                contact_info: {
                    type: 'bloks',
                    pos: 4,
                    display_name: 'Contact Information',
                    restrict_components: true,
                    component_whitelist: ['contact_info_item']
                },
                business_hours: {
                    type: 'bloks',
                    pos: 5,
                    display_name: 'Business Hours',
                    restrict_components: true,
                    component_whitelist: ['business_hour']
                }
            },
            is_root: false,
            is_nestable: true,
            component_group_uuid: null
        },

        // Contact Info Item (nested)
        {
            name: 'contact_info_item',
            display_name: 'Contact Info Item',
            schema: {
                icon_type: {
                    type: 'option',
                    pos: 0,
                    display_name: 'Icon Type',
                    options: [
                        { name: 'Location', value: 'location' },
                        { name: 'Email', value: 'email' },
                        { name: 'Phone', value: 'phone' }
                    ]
                },
                title: {
                    type: 'text',
                    pos: 1,
                    display_name: 'Title'
                },
                content: {
                    type: 'text',
                    pos: 2,
                    display_name: 'Content'
                }
            },
            is_root: false,
            is_nestable: true
        },

        // Business Hour (nested)
        {
            name: 'business_hour',
            display_name: 'Business Hour',
            schema: {
                day: {
                    type: 'text',
                    pos: 0,
                    display_name: 'Day'
                },
                hours: {
                    type: 'text',
                    pos: 1,
                    display_name: 'Hours'
                }
            },
            is_root: false,
            is_nestable: true
        },

        // Login Form Component
        {
            name: 'LoginForm',
            display_name: 'Login Form',
            schema: {
                title: {
                    type: 'text',
                    pos: 0,
                    display_name: 'Title',
                    default_value: 'Welcome Back'
                },
                subtitle: {
                    type: 'text',
                    pos: 1,
                    display_name: 'Subtitle',
                    default_value: 'Sign in to your account'
                },
                register_link_text: {
                    type: 'text',
                    pos: 2,
                    display_name: 'Register Link Text',
                    default_value: "Don't have an account? Register here"
                },
                demo_credentials: {
                    type: 'bloks',
                    pos: 3,
                    display_name: 'Demo Credentials',
                    restrict_components: true,
                    component_whitelist: ['demo_credential']
                }
            },
            is_root: false,
            is_nestable: true
        },

        // Demo Credential (nested)
        {
            name: 'demo_credential',
            display_name: 'Demo Credential',
            schema: {
                label: {
                    type: 'text',
                    pos: 0,
                    display_name: 'Label'
                },
                email: {
                    type: 'text',
                    pos: 1,
                    display_name: 'Email'
                },
                password: {
                    type: 'text',
                    pos: 2,
                    display_name: 'Password'
                }
            },
            is_root: false,
            is_nestable: true
        },

        // Register Form Component
        {
            name: 'RegisterForm',
            display_name: 'Register Form',
            schema: {
                title: {
                    type: 'text',
                    pos: 0,
                    display_name: 'Title',
                    default_value: 'Create Account'
                },
                subtitle: {
                    type: 'text',
                    pos: 1,
                    display_name: 'Subtitle',
                    default_value: 'Join Glazed Gloss Beauty'
                },
                login_link_text: {
                    type: 'text',
                    pos: 2,
                    display_name: 'Login Link Text',
                    default_value: 'Already have an account? Sign in'
                },
                benefits: {
                    type: 'bloks',
                    pos: 3,
                    display_name: 'Membership Benefits',
                    restrict_components: true,
                    component_whitelist: ['benefit_item']
                }
            },
            is_root: false,
            is_nestable: true
        },

        // Benefit Item (nested)
        {
            name: 'benefit_item',
            display_name: 'Benefit Item',
            schema: {
                icon: {
                    type: 'text',
                    pos: 0,
                    display_name: 'Icon (emoji or text)'
                },
                title: {
                    type: 'text',
                    pos: 1,
                    display_name: 'Title'
                },
                description: {
                    type: 'text',
                    pos: 2,
                    display_name: 'Description'
                }
            },
            is_root: false,
            is_nestable: true
        }
    ];

    for (const component of components) {
        try {
            console.log(`Creating component: ${component.display_name}...`);
            await client.post(`spaces/${spaceId}/components`, {
                component: component
            });
            console.log(`✓ Created ${component.display_name}`);
        } catch (error) {
            if (error.response?.status === 422) {
                console.log(`⚠ ${component.display_name} already exists, skipping...`);
            } else {
                console.error(`✗ Error creating ${component.display_name}:`, error.message);
            }
        }
    }

    console.log('\n✅ Component schemas creation complete!');
}

createComponentSchemas().catch(console.error);
