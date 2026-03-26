const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const client = new StoryblokClient({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN
});

async function createStories() {
    console.log('🚀 Creating Auth & Contact Stories in Storyblok...\n');
    console.log('⚠️  Note: This script creates stories using the Management API.');
    console.log('    You need to manually create component schemas first.\n');

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
                        _uid: 'contact_form_' + Date.now(),
                        title: 'Contact Us',
                        subtitle: 'Get In Touch',
                        description: "Ready to transform your beauty brand? Let's start the conversation.",
                        form_title: 'Send us a message',
                        contact_info: [
                            {
                                component: 'contact_info_item',
                                _uid: 'ci_1_' + Date.now(),
                                icon_type: 'location',
                                title: 'Office Location',
                                content: 'Beverly Hills, CA 90210'
                            },
                            {
                                component: 'contact_info_item',
                                _uid: 'ci_2_' + Date.now(),
                                icon_type: 'email',
                                title: 'Email Us',
                                content: 'hello@glazedgloss.com'
                            },
                            {
                                component: 'contact_info_item',
                                _uid: 'ci_3_' + Date.now(),
                                icon_type: 'phone',
                                title: 'Call Us',
                                content: '858.353.3220'
                            }
                        ],
                        business_hours: [
                            {
                                component: 'business_hour',
                                _uid: 'bh_1_' + Date.now(),
                                day: 'Monday - Friday',
                                hours: '9:00 AM - 6:00 PM'
                            },
                            {
                                component: 'business_hour',
                                _uid: 'bh_2_' + Date.now(),
                                day: 'Saturday',
                                hours: '10:00 AM - 4:00 PM'
                            },
                            {
                                component: 'business_hour',
                                _uid: 'bh_3_' + Date.now(),
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
                        _uid: 'login_form_' + Date.now(),
                        title: 'Welcome Back',
                        subtitle: 'Sign in to your account',
                        register_link_text: "Don't have an account? Register here",
                        demo_credentials: [
                            {
                                component: 'demo_credential',
                                _uid: 'dc_1_' + Date.now(),
                                label: 'Admin Account',
                                email: 'admin@glazedgloss.com',
                                password: 'admin123'
                            },
                            {
                                component: 'demo_credential',
                                _uid: 'dc_2_' + Date.now(),
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
                        _uid: 'register_form_' + Date.now(),
                        title: 'Create Account',
                        subtitle: 'Join Glazed Gloss Beauty',
                        login_link_text: 'Already have an account? Sign in',
                        benefits: [
                            {
                                component: 'benefit_item',
                                _uid: 'bi_1_' + Date.now(),
                                icon: '🎨',
                                title: 'Exclusive Access',
                                description: 'Get early access to new products and services'
                            },
                            {
                                component: 'benefit_item',
                                _uid: 'bi_2_' + Date.now(),
                                icon: '💼',
                                title: 'Business Tools',
                                description: 'Access professional beauty brand resources'
                            },
                            {
                                component: 'benefit_item',
                                _uid: 'bi_3_' + Date.now(),
                                icon: '📊',
                                title: 'Analytics Dashboard',
                                description: 'Track your brand growth and performance'
                            },
                            {
                                component: 'benefit_item',
                                _uid: 'bi_4_' + Date.now(),
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

    console.log('📝 Story Data Generated:\n');
    
    for (const story of stories) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`Story: ${story.name}`);
        console.log(`${'='.repeat(60)}`);
        console.log(JSON.stringify(story, null, 2));
    }

    console.log('\n\n📋 MANUAL SETUP INSTRUCTIONS:\n');
    console.log('Since we need Management API token to create stories automatically,');
    console.log('please follow these steps to create stories manually:\n');
    
    console.log('1. Go to Storyblok: https://app.storyblok.com');
    console.log('2. Navigate to Content → New Story');
    console.log('3. For each story above, create a new story with:');
    console.log('   - Name and Slug as shown');
    console.log('   - Content type: page');
    console.log('   - Add the components as shown in the JSON');
    console.log('4. Save and Publish each story\n');

    console.log('OR use the Storyblok CLI:');
    console.log('npm install -g storyblok');
    console.log('storyblok login');
    console.log('Then use the Management API with OAuth token\n');

    console.log('✅ Story data has been generated and displayed above!');
    console.log('📄 Copy the JSON structure to create stories manually in Storyblok.\n');
}

createStories().catch(console.error);
