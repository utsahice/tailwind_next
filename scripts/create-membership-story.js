const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createMembershipStory() {
    try {
        console.log('Creating membership story...');

        const membershipStory = {
            name: 'membership',
            slug: 'membership',
            content: {
                component: 'page',
                body: [
                    {
                        component: 'hero',
                        _uid: 'membership-hero',
                        title: 'Membership',
                        subtitle: 'Join our exclusive community',
                        description: 'Get access to premium content, exclusive products, and special offers.',
                        background_image: {
                            filename: '',
                            alt: 'Membership Hero'
                        },
                        cta_text: 'Join Now',
                        cta_url: '/register'
                    },
                    {
                        component: 'membership_tiers',
                        _uid: 'membership-tiers',
                        title: 'Choose Your Plan',
                        tiers: [
                            {
                                _uid: 'tier-1',
                                name: 'Basic',
                                price: '9.99',
                                period: 'month',
                                features: [
                                    'Access to exclusive content',
                                    '10% discount on products',
                                    'Monthly newsletter',
                                    'Community access'
                                ],
                                cta_text: 'Get Started',
                                cta_url: '/register?plan=basic',
                                featured: false
                            },
                            {
                                _uid: 'tier-2',
                                name: 'Premium',
                                price: '19.99',
                                period: 'month',
                                features: [
                                    'All Basic features',
                                    '20% discount on products',
                                    'Priority support',
                                    'Early access to new products',
                                    'Exclusive events'
                                ],
                                cta_text: 'Go Premium',
                                cta_url: '/register?plan=premium',
                                featured: true
                            },
                            {
                                _uid: 'tier-3',
                                name: 'VIP',
                                price: '49.99',
                                period: 'month',
                                features: [
                                    'All Premium features',
                                    '30% discount on products',
                                    'Personal beauty consultant',
                                    'Free shipping',
                                    'VIP events and workshops',
                                    'Custom product recommendations'
                                ],
                                cta_text: 'Become VIP',
                                cta_url: '/register?plan=vip',
                                featured: false
                            }
                        ]
                    },
                    {
                        component: 'membership_benefits',
                        _uid: 'membership-benefits',
                        title: 'Member Benefits',
                        benefits: [
                            {
                                _uid: 'benefit-1',
                                icon: 'star',
                                title: 'Exclusive Products',
                                description: 'Access to limited edition and member-only products'
                            },
                            {
                                _uid: 'benefit-2',
                                icon: 'discount',
                                title: 'Special Discounts',
                                description: 'Save on every purchase with member pricing'
                            },
                            {
                                _uid: 'benefit-3',
                                icon: 'community',
                                title: 'Community Access',
                                description: 'Connect with beauty enthusiasts and experts'
                            },
                            {
                                _uid: 'benefit-4',
                                icon: 'support',
                                title: 'Priority Support',
                                description: 'Get help when you need it from our team'
                            }
                        ]
                    }
                ]
            },
            is_startpage: false,
            parent_id: 0
        };

        const response = await Storyblok.post(`spaces/${spaceId}/stories/`, {
            story: membershipStory,
            publish: 1
        });

        console.log('✅ Membership story created successfully!');
        console.log('Story ID:', response.data.story.id);
        console.log('Story URL:', `https://app.storyblok.com/#/me/spaces/${spaceId}/stories/0/0/${response.data.story.id}`);
        
        return response.data.story;
    } catch (error) {
        if (error.response?.status === 422 && error.response?.data?.error?.includes('already been taken')) {
            console.log('ℹ️  Membership story already exists. Updating instead...');
            
            try {
                // Get existing story
                const existingStory = await Storyblok.get(`spaces/${spaceId}/stories/`, {
                    with_slug: 'membership'
                });

                if (existingStory.data.stories.length > 0) {
                    const storyId = existingStory.data.stories[0].id;
                    console.log('Found existing story with ID:', storyId);
                    console.log('✅ Membership story already exists at: /membership');
                    return existingStory.data.stories[0];
                }
            } catch (updateError) {
                console.error('Error checking existing story:', updateError.message);
            }
        } else {
            console.error('Error creating membership story:', error.response?.data || error.message);
        }
        throw error;
    }
}

async function createMembershipComponents() {
    try {
        console.log('\nCreating membership component schemas...');

        const components = [
            {
                name: 'membership_tiers',
                display_name: 'Membership Tiers',
                schema: {
                    title: {
                        type: 'text',
                        pos: 0
                    },
                    tiers: {
                        type: 'bloks',
                        restrict_components: true,
                        component_whitelist: ['membership_tier'],
                        pos: 1
                    }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: 'membership_tier',
                display_name: 'Membership Tier',
                schema: {
                    name: {
                        type: 'text',
                        pos: 0
                    },
                    price: {
                        type: 'text',
                        pos: 1
                    },
                    period: {
                        type: 'text',
                        default_value: 'month',
                        pos: 2
                    },
                    features: {
                        type: 'textarea',
                        description: 'One feature per line',
                        pos: 3
                    },
                    cta_text: {
                        type: 'text',
                        pos: 4
                    },
                    cta_url: {
                        type: 'text',
                        pos: 5
                    },
                    featured: {
                        type: 'boolean',
                        default_value: false,
                        pos: 6
                    }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: 'membership_benefits',
                display_name: 'Membership Benefits',
                schema: {
                    title: {
                        type: 'text',
                        pos: 0
                    },
                    benefits: {
                        type: 'bloks',
                        restrict_components: true,
                        component_whitelist: ['benefit_item'],
                        pos: 1
                    }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: 'benefit_item',
                display_name: 'Benefit Item',
                schema: {
                    icon: {
                        type: 'text',
                        pos: 0
                    },
                    title: {
                        type: 'text',
                        pos: 1
                    },
                    description: {
                        type: 'textarea',
                        pos: 2
                    }
                },
                is_root: false,
                is_nestable: true
            }
        ];

        for (const component of components) {
            try {
                await Storyblok.post(`spaces/${spaceId}/components/`, {
                    component
                });
                console.log(`✅ Created component: ${component.name}`);
            } catch (error) {
                if (error.response?.status === 422) {
                    console.log(`ℹ️  Component ${component.name} already exists`);
                } else {
                    console.error(`Error creating component ${component.name}:`, error.message);
                }
            }
        }

        console.log('\n✅ All membership components processed!');
    } catch (error) {
        console.error('Error creating membership components:', error.message);
    }
}

async function main() {
    console.log('🚀 Setting up Membership Page\n');
    console.log('Space ID:', spaceId);
    
    if (!process.env.STORYBLOK_OAUTH_TOKEN || !spaceId) {
        console.error('❌ Missing required environment variables:');
        console.error('   - STORYBLOK_OAUTH_TOKEN');
        console.error('   - STORYBLOK_SPACE_ID');
        process.exit(1);
    }

    try {
        // Create component schemas first
        await createMembershipComponents();
        
        // Then create the story
        await createMembershipStory();
        
        console.log('\n✅ Membership page setup complete!');
        console.log('\nNext steps:');
        console.log('1. Visit http://localhost:3000/membership to view the page');
        console.log('2. Customize content in Storyblok dashboard');
        console.log('3. Add images and adjust styling as needed');
    } catch (error) {
        console.error('\n❌ Setup failed:', error.message);
        process.exit(1);
    }
}

main();
