const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const client = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_ACCESS_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID || '312454'; // Replace with your space ID

async function createStories() {
    console.log('🚀 Creating Auth & Contact Stories in Storyblok...\n');

    const stories = [
        // Contact Page Story
        {
            name: 'contact',
            slug: 'contact',
            content: {
                component: 'page',
                body: [
                    {
                        component: 'ContactForm',
                        _uid: 'contact_form_1',
                        title: 'Contact Us',
                        subtitle: 'Get In Touch',
                        description: "Ready to transform your beauty brand? Let's start the conversation.",
                        form_title: 'Send us a message',
                        contact_info: [
                            {
                                component: 'contact_info_item',
                                _uid: 'contact_info_1',
                                icon_type: 'location',
                                title: 'Office Location',
                                content: 'Beverly Hills, CA 90210'
                            },
                            {
                                component: 'contact_info_item',
                                _uid: 'contact_info_2',
                                icon_type: 'email',
                                title: 'Email Us',
                                content: 'hello@glazedgloss.com'
                            },
                            {
                                component: 'contact_info_item',
                                _uid: 'contact_info_3',
                                icon_type: 'phone',
                                title: 'Call Us',
                                content: '858.353.3220'
                            }
                        ],
                        business_hours: [
                            {
                                component: 'business_hour',
                                _uid: 'bh_1',
                                day: 'Monday - Friday',
                                hours: '9:00 AM - 6:00 PM'
                            },
                            {
                                component: 'business_hour',
                                _uid: 'bh_2',
                                day: 'Saturday',
                                hours: '10:00 AM - 4:00 PM'
                            },
                            {
                                component: 'business_hour',
                                _uid: 'bh_3',
                                day: 'Sunday',
                                hours: 'Closed'
                            }
                        ]
                    }
                ]
            }
        },

        // Login Page Story
        {
            name: 'login',
            slug: 'login',
            content: {
                component: 'page',
                body: [
                    {
                        component: 'LoginForm',
                        _uid: 'login_form_1',
                        title: 'Welcome Back',
                        subtitle: 'Sign in to your account',
                        register_link_text: "Don't have an account? Register here",
                        demo_credentials: [
                            {
                                component: 'demo_credential',
                                _uid: 'demo_1',
                                label: 'Admin Account',
                                email: 'admin@glazedgloss.com',
                                password: 'admin123'
                            },
                            {
                                component: 'demo_credential',
                                _uid: 'demo_2',
                                label: 'Demo User',
                                email: 'user@example.com',
                                password: 'user123'
                            }
                        ]
                    }
                ]
            }
        },

        // Register Page Story
        {
            name: 'register',
            slug: 'register',
            content: {
                component: 'page',
                body: [
                    {
                        component: 'RegisterForm',
                        _uid: 'register_form_1',
                        title: 'Create Account',
                        subtitle: 'Join Glazed Gloss Beauty',
                        login_link_text: 'Already have an account? Sign in',
                        benefits: [
                            {
                                component: 'benefit_item',
                                _uid: 'benefit_1',
                                icon: '🎨',
                                title: 'Exclusive Access',
                                description: 'Get early access to new products and services'
                            },
                            {
                                component: 'benefit_item',
                                _uid: 'benefit_2',
                                icon: '💼',
                                title: 'Business Tools',
                                description: 'Access professional beauty brand resources'
                            },
                            {
                                component: 'benefit_item',
                                _uid: 'benefit_3',
                                icon: '📊',
                                title: 'Analytics Dashboard',
                                description: 'Track your brand growth and performance'
                            },
                            {
                                component: 'benefit_item',
                                _uid: 'benefit_4',
                                icon: '🤝',
                                title: 'Expert Support',
                                description: 'Connect with beauty industry professionals'
                            }
                        ]
                    }
                ]
            }
        }
    ];

    for (const storyData of stories) {
        try {
            console.log(`Creating story: ${storyData.name}...`);
            
            // Check if story exists
            try {
                const { data } = await client.get(`spaces/${spaceId}/stories`, {
                    with_slug: storyData.slug
                });
                
                if (data.stories && data.stories.length > 0) {
                    // Update existing story
                    const existingStory = data.stories[0];
                    await client.put(`spaces/${spaceId}/stories/${existingStory.id}`, {
                        story: {
                            name: storyData.name,
                            slug: storyData.slug,
                            content: storyData.content
                        },
                        publish: 1
                    });
                    console.log(`✓ Updated ${storyData.name}`);
                } else {
                    throw new Error('Story not found');
                }
            } catch (error) {
                // Create new story
                await client.post(`spaces/${spaceId}/stories`, {
                    story: {
                        name: storyData.name,
                        slug: storyData.slug,
                        content: storyData.content
                    },
                    publish: 1
                });
                console.log(`✓ Created ${storyData.name}`);
            }
        } catch (error) {
            console.error(`✗ Error with ${storyData.name}:`, error.message);
        }
    }

    console.log('\n✅ Stories creation complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Visit your Storyblok space');
    console.log('2. Check the stories: contact, login, register');
    console.log('3. Customize the content as needed');
    console.log('4. Test the pages in your Next.js app');
}

createStories().catch(console.error);
