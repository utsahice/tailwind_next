const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

// You need to get your Management API token from:
// https://app.storyblok.com/#/me/account?tab=token
const MANAGEMENT_TOKEN = process.env.STORYBLOK_MANAGEMENT_TOKEN || process.env.STORYBLOK_ACCESS_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID || '312454'; // Replace with your space ID

const api = axios.create({
    baseURL: 'https://mapi.storyblok.com/v1',
    headers: {
        'Authorization': MANAGEMENT_TOKEN,
        'Content-Type': 'application/json'
    }
});

function generateUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

async function createOrUpdateStory(storyData) {
    try {
        // Try to find existing story
        const { data: stories } = await api.get(`/spaces/${SPACE_ID}/stories`, {
            params: { with_slug: storyData.slug }
        });

        if (stories.stories && stories.stories.length > 0) {
            // Update existing story
            const existingStory = stories.stories[0];
            console.log(`Updating existing story: ${storyData.name}...`);
            
            const { data } = await api.put(`/spaces/${SPACE_ID}/stories/${existingStory.id}`, {
                story: storyData,
                publish: 1
            });
            
            console.log(`✓ Updated: ${storyData.name}`);
            return data.story;
        } else {
            // Create new story
            console.log(`Creating new story: ${storyData.name}...`);
            
            const { data } = await api.post(`/spaces/${SPACE_ID}/stories`, {
                story: storyData,
                publish: 1
            });
            
            console.log(`✓ Created: ${storyData.name}`);
            return data.story;
        }
    } catch (error) {
        if (error.response) {
            console.error(`✗ Error with ${storyData.name}:`, error.response.data);
        } else {
            console.error(`✗ Error with ${storyData.name}:`, error.message);
        }
        return null;
    }
}

async function createStories() {
    console.log('🚀 Creating Auth & Contact Stories in Storyblok...\n');
    
    if (!MANAGEMENT_TOKEN || MANAGEMENT_TOKEN === 'your_token_here') {
        console.error('❌ ERROR: Management API token not found!');
        console.log('\n📝 To get your Management API token:');
        console.log('1. Go to: https://app.storyblok.com/#/me/account?tab=token');
        console.log('2. Generate a Personal Access Token');
        console.log('3. Add to .env.local: STORYBLOK_MANAGEMENT_TOKEN=your_token');
        console.log('\nOR run: node scripts/create-auth-contact-stories-simple.js');
        console.log('to see the JSON structure for manual creation.\n');
        return;
    }

    const stories = [
        // Contact Story
        {
            name: 'contact',
            slug: 'contact',
            content: {
                component: 'page',
                _uid: generateUID(),
                body: [
                    {
                        component: 'ContactForm',
                        _uid: generateUID(),
                        title: 'Contact Us',
                        subtitle: 'Get In Touch',
                        description: "Ready to transform your beauty brand? Let's start the conversation.",
                        form_title: 'Send us a message',
                        contact_info: [
                            {
                                component: 'contact_info_item',
                                _uid: generateUID(),
                                icon_type: 'location',
                                title: 'Office Location',
                                content: 'Beverly Hills, CA 90210'
                            },
                            {
                                component: 'contact_info_item',
                                _uid: generateUID(),
                                icon_type: 'email',
                                title: 'Email Us',
                                content: 'hello@glazedgloss.com'
                            },
                            {
                                component: 'contact_info_item',
                                _uid: generateUID(),
                                icon_type: 'phone',
                                title: 'Call Us',
                                content: '858.353.3220'
                            }
                        ],
                        business_hours: [
                            {
                                component: 'business_hour',
                                _uid: generateUID(),
                                day: 'Monday - Friday',
                                hours: '9:00 AM - 6:00 PM'
                            },
                            {
                                component: 'business_hour',
                                _uid: generateUID(),
                                day: 'Saturday',
                                hours: '10:00 AM - 4:00 PM'
                            },
                            {
                                component: 'business_hour',
                                _uid: generateUID(),
                                day: 'Sunday',
                                hours: 'Closed'
                            }
                        ]
                    }
                ]
            }
        },

        // Login Story
        {
            name: 'login',
            slug: 'login',
            content: {
                component: 'page',
                _uid: generateUID(),
                body: [
                    {
                        component: 'LoginForm',
                        _uid: generateUID(),
                        title: 'Welcome Back',
                        subtitle: 'Sign in to your account',
                        register_link_text: "Don't have an account? Register here",
                        demo_credentials: [
                            {
                                component: 'demo_credential',
                                _uid: generateUID(),
                                label: 'Admin Account',
                                email: 'admin@glazedgloss.com',
                                password: 'admin123'
                            },
                            {
                                component: 'demo_credential',
                                _uid: generateUID(),
                                label: 'Demo User',
                                email: 'user@example.com',
                                password: 'user123'
                            }
                        ]
                    }
                ]
            }
        },

        // Register Story
        {
            name: 'register',
            slug: 'register',
            content: {
                component: 'page',
                _uid: generateUID(),
                body: [
                    {
                        component: 'RegisterForm',
                        _uid: generateUID(),
                        title: 'Create Account',
                        subtitle: 'Join Glazed Gloss Beauty',
                        login_link_text: 'Already have an account? Sign in',
                        benefits: [
                            {
                                component: 'benefit_item',
                                _uid: generateUID(),
                                icon: '🎨',
                                title: 'Exclusive Access',
                                description: 'Get early access to new products and services'
                            },
                            {
                                component: 'benefit_item',
                                _uid: generateUID(),
                                icon: '💼',
                                title: 'Business Tools',
                                description: 'Access professional beauty brand resources'
                            },
                            {
                                component: 'benefit_item',
                                _uid: generateUID(),
                                icon: '📊',
                                title: 'Analytics Dashboard',
                                description: 'Track your brand growth and performance'
                            },
                            {
                                component: 'benefit_item',
                                _uid: generateUID(),
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

    console.log(`Using Space ID: ${SPACE_ID}\n`);

    for (const story of stories) {
        await createOrUpdateStory(story);
    }

    console.log('\n✅ Story creation complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Go to Storyblok: https://app.storyblok.com');
    console.log('2. Check Content → Stories');
    console.log('3. Verify: contact, login, register stories exist');
    console.log('4. Test pages: /contact, /login, /register\n');
}

createStories().catch(error => {
    console.error('❌ Fatal error:', error.message);
    console.log('\n💡 Try running: node scripts/create-auth-contact-stories-simple.js');
    console.log('   to see the JSON structure for manual creation.\n');
});
