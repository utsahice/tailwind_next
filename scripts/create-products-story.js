const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createProductComponents() {
    try {
        console.log('Creating product component schemas...\n');

        const components = [
            {
                name: 'product_grid',
                display_name: 'Product Grid',
                schema: {
                    title: {
                        type: 'text',
                        pos: 0,
                        description: 'Grid section title'
                    },
                    subtitle: {
                        type: 'textarea',
                        pos: 1,
                        description: 'Grid section subtitle'
                    },
                    products: {
                        type: 'bloks',
                        restrict_components: true,
                        component_whitelist: ['product_item'],
                        pos: 2
                    }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: 'product_item',
                display_name: 'Product Item',
                schema: {
                    name: {
                        type: 'text',
                        pos: 0,
                        required: true
                    },
                    description: {
                        type: 'textarea',
                        pos: 1
                    },
                    price: {
                        type: 'text',
                        pos: 2,
                        description: 'Product price (e.g., 29.99)'
                    },
                    image: {
                        type: 'asset',
                        pos: 3,
                        filetypes: ['images']
                    },
                    shopify_handle: {
                        type: 'text',
                        pos: 4,
                        description: 'Shopify product handle (URL slug)'
                    },
                    featured: {
                        type: 'boolean',
                        default_value: false,
                        pos: 5
                    },
                    in_stock: {
                        type: 'boolean',
                        default_value: true,
                        pos: 6
                    }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: 'product_hero',
                display_name: 'Product Hero',
                schema: {
                    title: {
                        type: 'text',
                        pos: 0,
                        default_value: 'Our Products'
                    },
                    subtitle: {
                        type: 'textarea',
                        pos: 1
                    },
                    background_image: {
                        type: 'asset',
                        pos: 2,
                        filetypes: ['images']
                    },
                    cta_text: {
                        type: 'text',
                        pos: 3
                    },
                    cta_url: {
                        type: 'text',
                        pos: 4
                    }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: 'product_categories',
                display_name: 'Product Categories',
                schema: {
                    title: {
                        type: 'text',
                        pos: 0,
                        default_value: 'Shop by Category'
                    },
                    categories: {
                        type: 'bloks',
                        restrict_components: true,
                        component_whitelist: ['category_item'],
                        pos: 1
                    }
                },
                is_root: false,
                is_nestable: true
            },
            {
                name: 'category_item',
                display_name: 'Category Item',
                schema: {
                    name: {
                        type: 'text',
                        pos: 0,
                        required: true
                    },
                    description: {
                        type: 'textarea',
                        pos: 1
                    },
                    image: {
                        type: 'asset',
                        pos: 2,
                        filetypes: ['images']
                    },
                    link: {
                        type: 'text',
                        pos: 3,
                        description: 'Category link URL'
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
                    console.error(`❌ Error creating component ${component.name}:`, error.message);
                }
            }
        }

        console.log('\n✅ All product components processed!\n');
    } catch (error) {
        console.error('Error creating product components:', error.message);
        throw error;
    }
}

async function createProductsStory() {
    try {
        console.log('Creating products story...\n');

        const productsStory = {
            name: 'products',
            slug: 'products',
            content: {
                component: 'page',
                body: [
                    {
                        component: 'product_hero',
                        _uid: 'product-hero-1',
                        title: 'Our Products',
                        subtitle: 'Discover our curated collection of premium beauty products, carefully selected to enhance your natural beauty.',
                        background_image: {
                            filename: '',
                            alt: 'Products Hero'
                        },
                        cta_text: 'Shop Now',
                        cta_url: '#products'
                    },
                    {
                        component: 'product_categories',
                        _uid: 'product-categories-1',
                        title: 'Shop by Category',
                        categories: [
                            {
                                _uid: 'cat-1',
                                component: 'category_item',
                                name: 'Lip Care',
                                description: 'Premium lip glosses and treatments',
                                image: {
                                    filename: '',
                                    alt: 'Lip Care'
                                },
                                link: '/products?category=lip-care'
                            },
                            {
                                _uid: 'cat-2',
                                component: 'category_item',
                                name: 'Skincare',
                                description: 'Nourishing skincare essentials',
                                image: {
                                    filename: '',
                                    alt: 'Skincare'
                                },
                                link: '/products?category=skincare'
                            },
                            {
                                _uid: 'cat-3',
                                component: 'category_item',
                                name: 'Makeup',
                                description: 'Professional makeup products',
                                image: {
                                    filename: '',
                                    alt: 'Makeup'
                                },
                                link: '/products?category=makeup'
                            },
                            {
                                _uid: 'cat-4',
                                component: 'category_item',
                                name: 'Gift Sets',
                                description: 'Curated beauty gift collections',
                                image: {
                                    filename: '',
                                    alt: 'Gift Sets'
                                },
                                link: '/products?category=gift-sets'
                            }
                        ]
                    },
                    {
                        component: 'product_grid',
                        _uid: 'product-grid-1',
                        title: 'Featured Products',
                        subtitle: 'Our most popular products, loved by beauty enthusiasts worldwide',
                        products: [
                            {
                                _uid: 'prod-1',
                                component: 'product_item',
                                name: 'Glazed Gloss - Signature',
                                description: 'Our signature high-shine lip gloss with nourishing ingredients',
                                price: '24.99',
                                image: {
                                    filename: '',
                                    alt: 'Glazed Gloss Signature'
                                },
                                shopify_handle: 'glazed-gloss-signature',
                                featured: true,
                                in_stock: true
                            },
                            {
                                _uid: 'prod-2',
                                component: 'product_item',
                                name: 'Hydrating Lip Treatment',
                                description: 'Intensive overnight lip treatment with vitamin E',
                                price: '18.99',
                                image: {
                                    filename: '',
                                    alt: 'Hydrating Lip Treatment'
                                },
                                shopify_handle: 'hydrating-lip-treatment',
                                featured: true,
                                in_stock: true
                            },
                            {
                                _uid: 'prod-3',
                                component: 'product_item',
                                name: 'Plumping Lip Serum',
                                description: 'Natural lip plumping serum with hyaluronic acid',
                                price: '32.99',
                                image: {
                                    filename: '',
                                    alt: 'Plumping Lip Serum'
                                },
                                shopify_handle: 'plumping-lip-serum',
                                featured: true,
                                in_stock: true
                            },
                            {
                                _uid: 'prod-4',
                                component: 'product_item',
                                name: 'Lip Gloss Trio Set',
                                description: 'Three bestselling shades in one perfect set',
                                price: '59.99',
                                image: {
                                    filename: '',
                                    alt: 'Lip Gloss Trio Set'
                                },
                                shopify_handle: 'lip-gloss-trio-set',
                                featured: false,
                                in_stock: true
                            },
                            {
                                _uid: 'prod-5',
                                component: 'product_item',
                                name: 'Matte Lip Cream',
                                description: 'Long-lasting matte finish with comfortable wear',
                                price: '22.99',
                                image: {
                                    filename: '',
                                    alt: 'Matte Lip Cream'
                                },
                                shopify_handle: 'matte-lip-cream',
                                featured: false,
                                in_stock: true
                            },
                            {
                                _uid: 'prod-6',
                                component: 'product_item',
                                name: 'Lip Scrub',
                                description: 'Gentle exfoliating lip scrub with sugar crystals',
                                price: '14.99',
                                image: {
                                    filename: '',
                                    alt: 'Lip Scrub'
                                },
                                shopify_handle: 'lip-scrub',
                                featured: false,
                                in_stock: true
                            }
                        ]
                    }
                ]
            },
            is_startpage: false,
            parent_id: 0
        };

        const response = await Storyblok.post(`spaces/${spaceId}/stories/`, {
            story: productsStory,
            publish: 1
        });

        console.log('✅ Products story created successfully!');
        console.log('Story ID:', response.data.story.id);
        console.log('Story URL:', `https://app.storyblok.com/#/me/spaces/${spaceId}/stories/0/0/${response.data.story.id}`);
        console.log('\n📝 Note: You can now edit this story in Storyblok to add images and customize content.\n');
        
        return response.data.story;
    } catch (error) {
        if (error.response?.status === 422 && error.response?.data?.error?.includes('already been taken')) {
            console.log('ℹ️  Products story already exists.');
            
            try {
                const existingStory = await Storyblok.get(`spaces/${spaceId}/stories/`, {
                    with_slug: 'products'
                });

                if (existingStory.data.stories.length > 0) {
                    const storyId = existingStory.data.stories[0].id;
                    console.log('Found existing story with ID:', storyId);
                    console.log('✅ Products story already exists at: /products');
                    return existingStory.data.stories[0];
                }
            } catch (updateError) {
                console.error('Error checking existing story:', updateError.message);
            }
        } else {
            console.error('❌ Error creating products story:', error.response?.data || error.message);
            throw error;
        }
    }
}

async function main() {
    console.log('🚀 Setting up Products Page in Storyblok\n');
    console.log('Space ID:', spaceId);
    console.log('');
    
    if (!process.env.STORYBLOK_OAUTH_TOKEN || !spaceId) {
        console.error('❌ Missing required environment variables:');
        console.error('   - STORYBLOK_OAUTH_TOKEN');
        console.error('   - STORYBLOK_SPACE_ID');
        console.error('\nPlease add these to your .env.local file.');
        process.exit(1);
    }

    try {
        // Create component schemas first
        await createProductComponents();
        
        // Then create the story
        await createProductsStory();
        
        console.log('✅ Products page setup complete!\n');
        console.log('Next steps:');
        console.log('1. Visit Storyblok dashboard to add product images');
        console.log('2. Customize product details and pricing');
        console.log('3. Add more products as needed');
        console.log('4. Configure Shopify integration for live products');
        console.log('\nFor Shopify integration, see: SHOPIFY_INTEGRATION_GUIDE.md');
    } catch (error) {
        console.error('\n❌ Setup failed:', error.message);
        process.exit(1);
    }
}

main();
