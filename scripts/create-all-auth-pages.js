const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

function generateUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

async function createAllAuthPages() {
    try {
        console.log('🚀 Creating Contact, Login, Register, and Membership pages...\n');

        if (!process.env.STORYBLOK_OAUTH_TOKEN) {
            console.error('❌ ERROR: STORYBLOK_OAUTH_TOKEN not found in .env.local');
            console.log('\n📝 To get your OAuth token:');
            console.log('1. Go to: https://app.storyblok.com/#/me/account?tab=token');
            console.log('2. Generate a Personal Access Token');
            console.log('3. Add to .env.local: STORYBLOK_OAUTH_TOKEN=your_token\n');
            return;
        }

        // Create stories
        await createContactStory();
        await createLoginStory();
        await createRegisterStory();
        await createMembershipStory();

        console.log('\n✅ All pages created successfully!');
        console.log('\n📋 Next Steps:');
        console.log('1. Visit http://localhost:3000/contact');
        console.log('2. Visit http://localhost:3000/login');
        console.log('3. Visit http://localhost:3000/register');
        console.log('4. Visit http://localhost:3000/membership');
        console.log('5. All pages should display with content from Storyblok');
        console.log('6. You can edit the content in Storyblok dashboard\n');

    } catch (error) {
        console.error('❌ Error creating pages:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    }
}

async function createContactStory() {
    try {
        console.log('📄 Creating Contact story...');

        const contactContent = {
            component: 'page',
            _uid: generateUID(),
            body: [
                {
                    _uid: generateUID(),
                    component: 'ContactForm',
                    title: 'Contact Us',
                    subtitle: 'Get In Touch',
                    description: "Ready to transform your beauty brand? Let's start the conversation.",
                    form_title: 'Send us a message',
                    contact_info: [
                        {
                            _uid: generateUID(),
                            component: 'contact_info_item',
                            icon_type: 'location',
                            title: 'Office Location',
                            content: 'Beverly Hills, CA 90210'
                        },
                        {
                            _uid: generateUID(),
                            component: 'contact_info_item',
                            icon_type: 'email',
                            title: 'Email Us',
                            content: 'hello@glazedgloss.com'
                        },
                        {
                            _uid: generateUID(),
                            component: 'contact_info_item',
                            icon_type: 'phone',
                            title: 'Call Us',
                            content: '858.353.3220'
                        }
                    ],
                    business_hours: [
                        {
                            _uid: generateUID(),
                            component: 'business_hour',
                            day: 'Monday - Friday',
                            hours: '9:00 AM - 6:00 PM'
                        },
                        {
                            _uid: generateUID(),
                            component: 'business_hour',
                            day: 'Saturday',
                            hours: '10:00 AM - 4:00 PM'
                        },
                        {
                            _uid: generateUID(),
                            component: 'business_hour',
                            day: 'Sunday',
                            hours: 'Closed'
                        }
                    ]
                }
            ]
        };

        const newStory = await Storyblok.post(`spaces/${spaceId}/stories`, {
            story: {
                name: 'Contact',
                slug: 'contact',
                content: contactContent,
                is_folder: false
            },
            publish: 1
        });

        console.log(`✅ Contact story created with ID: ${newStory.data.story.id}`);

    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.log('⚠️  Contact story already exists, updating...');
            await updateStory('contact', {
                component: 'page',
                _uid: generateUID(),
                body: [
                    {
                        _uid: generateUID(),
                        component: 'ContactForm',
                        title: 'Contact Us',
                        subtitle: 'Get In Touch',
                        description: "Ready to transform your beauty brand? Let's start the conversation.",
                        form_title: 'Send us a message',
                        contact_info: [
                            {
                                _uid: generateUID(),
                                component: 'contact_info_item',
                                icon_type: 'location',
                                title: 'Office Location',
                                content: 'Beverly Hills, CA 90210'
                            },
                            {
                                _uid: generateUID(),
                                component: 'contact_info_item',
                                icon_type: 'email',
                                title: 'Email Us',
                                content: 'hello@glazedgloss.com'
                            },
                            {
                                _uid: generateUID(),
                                component: 'contact_info_item',
                                icon_type: 'phone',
                                title: 'Call Us',
                                content: '858.353.3220'
                            }
                        ],
                        business_hours: [
                            {
                                _uid: generateUID(),
                                component: 'business_hour',
                                day: 'Monday - Friday',
                                hours: '9:00 AM - 6:00 PM'
                            },
                            {
                                _uid: generateUID(),
                                component: 'business_hour',
                                day: 'Saturday',
                                hours: '10:00 AM - 4:00 PM'
                            },
                            {
                                _uid: generateUID(),
                                component: 'business_hour',
                                day: 'Sunday',
                                hours: 'Closed'
                            }
                        ]
                    }
                ]
            });
        } else {
            console.error('❌ Error creating contact story:', error.message);
        }
    }
}

async function createLoginStory() {
    try {
        console.log('\n📄 Creating Login story...');

        const loginContent = {
            component: 'page',
            _uid: generateUID(),
            body: [
                {
                    _uid: generateUID(),
                    component: 'LoginForm',
                    title: 'Welcome Back',
                    subtitle: 'Sign in to your account',
                    register_link_text: "Don't have an account? Register here",
                    demo_credentials: [
                        {
                            _uid: generateUID(),
                            component: 'demo_credential',
                            label: 'Admin Account',
                            email: 'admin@glazedgloss.com',
                            password: 'admin123'
                        },
                        {
                            _uid: generateUID(),
                            component: 'demo_credential',
                            label: 'Demo User',
                            email: 'user@example.com',
                            password: 'user123'
                        }
                    ]
                }
            ]
        };

        const newStory = await Storyblok.post(`spaces/${spaceId}/stories`, {
            story: {
                name: 'Login',
                slug: 'login',
                content: loginContent,
                is_folder: false
            },
            publish: 1
        });

        console.log(`✅ Login story created with ID: ${newStory.data.story.id}`);

    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.log('⚠️  Login story already exists, updating...');
            await updateStory('login', {
                component: 'page',
                _uid: generateUID(),
                body: [
                    {
                        _uid: generateUID(),
                        component: 'LoginForm',
                        title: 'Welcome Back',
                        subtitle: 'Sign in to your account',
                        register_link_text: "Don't have an account? Register here",
                        demo_credentials: [
                            {
                                _uid: generateUID(),
                                component: 'demo_credential',
                                label: 'Admin Account',
                                email: 'admin@glazedgloss.com',
                                password: 'admin123'
                            },
                            {
                                _uid: generateUID(),
                                component: 'demo_credential',
                                label: 'Demo User',
                                email: 'user@example.com',
                                password: 'user123'
                            }
                        ]
                    }
                ]
            });
        } else {
            console.error('❌ Error creating login story:', error.message);
        }
    }
}

async function createRegisterStory() {
    try {
        console.log('\n📄 Creating Register story...');

        const registerContent = {
            component: 'page',
            _uid: generateUID(),
            body: [
                {
                    _uid: generateUID(),
                    component: 'RegisterForm',
                    title: 'Create Account',
                    subtitle: 'Join Glazed Gloss Beauty',
                    login_link_text: 'Already have an account? Sign in',
                    benefits: [
                        {
                            _uid: generateUID(),
                            component: 'benefit_item',
                            icon: '🎨',
                            title: 'Exclusive Access',
                            description: 'Get early access to new products and services'
                        },
                        {
                            _uid: generateUID(),
                            component: 'benefit_item',
                            icon: '💼',
                            title: 'Business Tools',
                            description: 'Access professional beauty brand resources'
                        },
                        {
                            _uid: generateUID(),
                            component: 'benefit_item',
                            icon: '📊',
                            title: 'Analytics Dashboard',
                            description: 'Track your brand growth and performance'
                        },
                        {
                            _uid: generateUID(),
                            component: 'benefit_item',
                            icon: '🤝',
                            title: 'Expert Support',
                            description: 'Connect with beauty industry professionals'
                        }
                    ]
                }
            ]
        };

        const newStory = await Storyblok.post(`spaces/${spaceId}/stories`, {
            story: {
                name: 'Register',
                slug: 'register',
                content: registerContent,
                is_folder: false
            },
            publish: 1
        });

        console.log(`✅ Register story created with ID: ${newStory.data.story.id}`);

    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.log('⚠️  Register story already exists, updating...');
            await updateStory('register', {
                component: 'page',
                _uid: generateUID(),
                body: [
                    {
                        _uid: generateUID(),
                        component: 'RegisterForm',
                        title: 'Create Account',
                        subtitle: 'Join Glazed Gloss Beauty',
                        login_link_text: 'Already have an account? Sign in',
                        benefits: [
                            {
                                _uid: generateUID(),
                                component: 'benefit_item',
                                icon: '🎨',
                                title: 'Exclusive Access',
                                description: 'Get early access to new products and services'
                            },
                            {
                                _uid: generateUID(),
                                component: 'benefit_item',
                                icon: '💼',
                                title: 'Business Tools',
                                description: 'Access professional beauty brand resources'
                            },
                            {
                                _uid: generateUID(),
                                component: 'benefit_item',
                                icon: '📊',
                                title: 'Analytics Dashboard',
                                description: 'Track your brand growth and performance'
                            },
                            {
                                _uid: generateUID(),
                                component: 'benefit_item',
                                icon: '🤝',
                                title: 'Expert Support',
                                description: 'Connect with beauty industry professionals'
                            }
                        ]
                    }
                ]
            });
        } else {
            console.error('❌ Error creating register story:', error.message);
        }
    }
}

async function createMembershipStory() {
    try {
        console.log('\n📄 Creating Membership story...');

        const membershipContent = {
            component: 'page',
            _uid: generateUID(),
            body: [
                {
                    _uid: generateUID(),
                    component: 'Hero',
                    title: 'Membership Plans',
                    subtitle: 'Choose Your Plan',
                    description: 'Select the perfect membership tier for your beauty brand journey',
                    background_image: {
                        filename: '/hero_bg.gif',
                        alt: 'Membership'
                    }
                }
            ]
        };

        const newStory = await Storyblok.post(`spaces/${spaceId}/stories`, {
            story: {
                name: 'Membership',
                slug: 'membership',
                content: membershipContent,
                is_folder: false
            },
            publish: 1
        });

        console.log(`✅ Membership story created with ID: ${newStory.data.story.id}`);

    } catch (error) {
        if (error.response && error.response.status === 422) {
            console.log('⚠️  Membership story already exists');
        } else {
            console.error('❌ Error creating membership story:', error.message);
        }
    }
}

async function updateStory(slug, content) {
    try {
        // Get existing story
        const { data } = await Storyblok.get(`spaces/${spaceId}/stories`, {
            with_slug: slug
        });

        if (data.stories && data.stories.length > 0) {
            const story = data.stories[0];
            await Storyblok.put(`spaces/${spaceId}/stories/${story.id}`, {
                story: {
                    content: content
                },
                publish: 1
            });
            console.log(`✅ ${slug} story updated`);
        }
    } catch (error) {
        console.error(`❌ Error updating ${slug} story:`, error.message);
    }
}

// Run the script
createAllAuthPages();
