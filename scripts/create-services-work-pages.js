const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createServicesWorkPages() {
    try {
        console.log('🚀 Creating Services and Work pages with schemas and data...\n');

        // 1. Create component schemas
        await createComponentSchemas();
        
        // 2. Create Services story
        await createServicesStory();
        
        // 3. Create Work story
        await createWorkStory();

        console.log('\n✅ Services and Work pages created successfully!');
        console.log('\n📋 Next Steps:');
        console.log('1. Visit http://localhost:3000/services');
        console.log('2. Visit http://localhost:3000/work');
        console.log('3. Both pages should display with full content from Storyblok');
        console.log('4. You can edit the content in Storyblok dashboard');

    } catch (error) {
        console.error('❌ Error creating pages:', error);
    }
}

async function createComponentSchemas() {
    console.log('📝 Creating component schemas...');

    // Service Item schema (nested component)
    const serviceItemSchema = {
        name: 'service_item',
        display_name: 'Service Item',
        schema: {
            title: {
                type: 'text',
                display_name: 'Title'
            },
            description: {
                type: 'textarea',
                display_name: 'Description'
            },
            image: {
                type: 'asset',
                display_name: 'Image',
                filetypes: ['images']
            },
            category: {
                type: 'text',
                display_name: 'Category'
            }
        },
        is_nestable: true
    };

    // Work Item schema (nested component)
    const workItemSchema = {
        name: 'work_item',
        display_name: 'Work Item',
        schema: {
            title: {
                type: 'text',
                display_name: 'Title'
            },
            description: {
                type: 'textarea',
                display_name: 'Description'
            },
            image: {
                type: 'asset',
                display_name: 'Image',
                filetypes: ['images']
            },
            category: {
                type: 'text',
                display_name: 'Category'
            },
            case_study_url: {
                type: 'text',
                display_name: 'Case Study URL'
            }
        },
        is_nestable: true
    };

    const schemas = [
        { name: 'service_item', schema: serviceItemSchema },
        { name: 'work_item', schema: workItemSchema }
    ];

    for (const { name, schema } of schemas) {
        try {
            await Storyblok.post(`spaces/${spaceId}/components`, {
                component: schema
            });
            console.log(`✅ ${name} schema created`);
        } catch (error) {
            if (error.message && error.message.includes('already exists')) {
                console.log(`✅ ${name} schema already exists`);
            } else {
                console.error(`❌ Error creating ${name} schema:`, error.message);
            }
        }
    }
}

async function createServicesStory() {
    try {
        console.log('\n📄 Creating Services story...');

        const servicesContent = {
            component: 'page',
            body: [
                {
                    _uid: 'services_section_1',
                    component: 'OurServices',
                    title: 'Our Services',
                    subtitle: 'What We Offer',
                    description: 'Comprehensive beauty brand solutions from concept to global distribution',
                    services: [
                        {
                            _uid: 'service_1',
                            component: 'service_item',
                            title: 'Brand Strategy & Development',
                            description: 'Complete brand identity creation, positioning, and market strategy for beauty brands',
                            image: {
                                filename: '/service_1.jpg',
                                alt: 'Brand Strategy'
                            },
                            category: 'Creative & Marketing'
                        },
                        {
                            _uid: 'service_2',
                            component: 'service_item',
                            title: 'Product Formulation',
                            description: 'Custom beauty product formulation with industry-leading chemists and labs',
                            image: {
                                filename: '/service_2.jpg',
                                alt: 'Product Formulation'
                            },
                            category: 'Product Development'
                        },
                        {
                            _uid: 'service_3',
                            component: 'service_item',
                            title: 'Packaging Design',
                            description: 'Stunning packaging design that captures your brand essence and stands out on shelves',
                            image: {
                                filename: '/service_3.jpg',
                                alt: 'Packaging Design'
                            },
                            category: 'Creative & Marketing'
                        },
                        {
                            _uid: 'service_4',
                            component: 'service_item',
                            title: 'Manufacturing & Production',
                            description: 'End-to-end production management with quality control and compliance',
                            image: {
                                filename: '/service_4.jpg',
                                alt: 'Manufacturing'
                            },
                            category: 'Production'
                        },
                        {
                            _uid: 'service_5',
                            component: 'service_item',
                            title: 'Retail Distribution',
                            description: 'Strategic retail partnerships and distribution across major beauty retailers',
                            image: {
                                filename: '/service_5.jpg',
                                alt: 'Retail Distribution'
                            },
                            category: 'Sales & Distribution'
                        },
                        {
                            _uid: 'service_6',
                            component: 'service_item',
                            title: 'Digital Marketing',
                            description: 'Comprehensive digital marketing strategies including social media, influencer partnerships, and e-commerce',
                            image: {
                                filename: '/service_6.jpg',
                                alt: 'Digital Marketing'
                            },
                            category: 'Creative & Marketing'
                        }
                    ],
                    categories: [
                        { _uid: 'cat_1', name: 'All Services' },
                        { _uid: 'cat_2', name: 'Creative & Marketing' },
                        { _uid: 'cat_3', name: 'Product Development' },
                        { _uid: 'cat_4', name: 'Production' },
                        { _uid: 'cat_5', name: 'Sales & Distribution' }
                    ]
                }
            ]
        };

        const newStory = await Storyblok.post(`spaces/${spaceId}/stories`, {
            story: {
                name: 'Services',
                slug: 'services',
                content: servicesContent,
                is_folder: false
            }
        });

        console.log(`✅ Services story created with ID: ${newStory.data.story.id}`);

    } catch (error) {
        if (error.message && error.message.includes('already exists')) {
            console.log('✅ Services story already exists');
        } else {
            console.error('❌ Error creating services story:', error.message);
        }
    }
}

async function createWorkStory() {
    try {
        console.log('\n📄 Creating Work story...');

        const workContent = {
            component: 'page',
            body: [
                {
                    _uid: 'work_section_1',
                    component: 'OurWork',
                    title: 'Our Work',
                    subtitle: 'Portfolio',
                    description: 'Explore our successful beauty brand launches and transformations',
                    work_items: [
                        {
                            _uid: 'work_1',
                            component: 'work_item',
                            title: 'Luxury Skincare Launch',
                            description: 'Complete brand development and launch for premium anti-aging skincare line',
                            image: {
                                filename: '/work/work1.jpg',
                                alt: 'Luxury Skincare'
                            },
                            category: 'Skincare',
                            case_study_url: '#'
                        },
                        {
                            _uid: 'work_2',
                            component: 'work_item',
                            title: 'Color Cosmetics Brand',
                            description: 'Full-spectrum makeup line with innovative formulations and packaging',
                            image: {
                                filename: '/work/work2.jpg',
                                alt: 'Color Cosmetics'
                            },
                            category: 'Makeup',
                            case_study_url: '#'
                        },
                        {
                            _uid: 'work_3',
                            component: 'work_item',
                            title: 'Natural Beauty Brand',
                            description: 'Organic beauty brand with sustainable packaging and clean formulations',
                            image: {
                                filename: '/work/work3.jpg',
                                alt: 'Natural Beauty'
                            },
                            category: 'Skincare',
                            case_study_url: '#'
                        },
                        {
                            _uid: 'work_4',
                            component: 'work_item',
                            title: 'Haircare Innovation',
                            description: 'Revolutionary haircare system with patented technology',
                            image: {
                                filename: '/work/work4.jpg',
                                alt: 'Haircare'
                            },
                            category: 'Haircare',
                            case_study_url: '#'
                        },
                        {
                            _uid: 'work_5',
                            component: 'work_item',
                            title: 'Fragrance Collection',
                            description: 'Luxury fragrance line with unique scent profiles',
                            image: {
                                filename: '/gloss/1.jpg',
                                alt: 'Fragrance'
                            },
                            category: 'Fragrance',
                            case_study_url: '#'
                        },
                        {
                            _uid: 'work_6',
                            component: 'work_item',
                            title: 'Men\'s Grooming Line',
                            description: 'Complete men\'s grooming brand with modern aesthetic',
                            image: {
                                filename: '/service_1.jpg',
                                alt: 'Men\'s Grooming'
                            },
                            category: 'Skincare',
                            case_study_url: '#'
                        },
                        {
                            _uid: 'work_7',
                            component: 'work_item',
                            title: 'K-Beauty Brand',
                            description: 'Korean beauty brand adaptation for Western markets',
                            image: {
                                filename: '/service_2.jpg',
                                alt: 'K-Beauty'
                            },
                            category: 'Skincare',
                            case_study_url: '#'
                        },
                        {
                            _uid: 'work_8',
                            component: 'work_item',
                            title: 'Wellness Beauty',
                            description: 'Beauty-wellness hybrid brand with holistic approach',
                            image: {
                                filename: '/service_3.jpg',
                                alt: 'Wellness Beauty'
                            },
                            category: 'Skincare',
                            case_study_url: '#'
                        }
                    ],
                    categories: [
                        { _uid: 'cat_1', name: 'All Work' },
                        { _uid: 'cat_2', name: 'Skincare' },
                        { _uid: 'cat_3', name: 'Makeup' },
                        { _uid: 'cat_4', name: 'Haircare' },
                        { _uid: 'cat_5', name: 'Fragrance' }
                    ]
                }
            ]
        };

        const newStory = await Storyblok.post(`spaces/${spaceId}/stories`, {
            story: {
                name: 'Work',
                slug: 'work',
                content: workContent,
                is_folder: false
            }
        });

        console.log(`✅ Work story created with ID: ${newStory.data.story.id}`);

    } catch (error) {
        if (error.message && error.message.includes('already exists')) {
            console.log('✅ Work story already exists');
        } else {
            console.error('❌ Error creating work story:', error.message);
        }
    }
}

// Run the script
createServicesWorkPages();