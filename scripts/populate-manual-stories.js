const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function populateManualStories() {
    try {
        console.log('🚀 Starting to populate manually created stories...');

        // 1. Populate Global Navbar Story
        await populateNavbarStory();
        
        // 2. Populate Global Footer Story  
        await populateFooterStory();
        
        // 3. Populate About Us Story
        await populateAboutStory();

        console.log('✅ All stories populated successfully!');
        console.log('\n📋 Next Steps:');
        console.log('1. Check your Storyblok dashboard to verify the data');
        console.log('2. Publish the stories if they look correct');
        console.log('3. Test your website to see navbar, footer, and about page');

    } catch (error) {
        console.error('❌ Error populating stories:', error);
    }
}

async function populateNavbarStory() {
    try {
        console.log('📝 Populating Global Navbar story...');

        // First, try to find the existing story
        const stories = await Storyblok.get(`spaces/${spaceId}/stories`, {
            with_slug: 'global-navbar'
        });

        let storyId;
        if (stories.data.stories.length > 0) {
            storyId = stories.data.stories[0].id;
            console.log(`✅ Found existing Global Navbar story with ID: ${storyId}`);
        } else {
            console.log('⚠️ Global Navbar story not found. Please create it manually first.');
            return;
        }

        const navbarContent = {
            component: 'Navbar',
            logo: {
                filename: '/logo.png',
                alt: 'Glazed Gloss Creative Collective'
            },
            nav_links: [
                {
                    _uid: 'nav_1',
                    component: 'nav_link',
                    label: 'Home',
                    url: '/',
                    is_external: false
                },
                {
                    _uid: 'nav_2', 
                    component: 'nav_link',
                    label: 'About',
                    url: '/about',
                    is_external: false
                },
                {
                    _uid: 'nav_3',
                    component: 'nav_link', 
                    label: 'Services',
                    url: '/services',
                    is_external: false
                },
                {
                    _uid: 'nav_4',
                    component: 'nav_link',
                    label: 'Work', 
                    url: '/work',
                    is_external: false
                },
                {
                    _uid: 'nav_5',
                    component: 'nav_link',
                    label: 'Contact',
                    url: '/contact',
                    is_external: false
                }
            ],
            phone: '858.353.3220',
            cta_text: 'HIRE GLAZED GLOSS',
            cta_url: '/contact'
        };

        await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
            story: {
                content: navbarContent
            }
        });

        console.log('✅ Global Navbar story populated successfully!');

    } catch (error) {
        console.error('❌ Error populating navbar story:', error);
    }
}

async function populateFooterStory() {
    try {
        console.log('📝 Populating Global Footer story...');

        // Check if story exists, if not create it
        let stories;
        try {
            stories = await Storyblok.get(`spaces/${spaceId}/stories`, {
                with_slug: 'global-footer'
            });
        } catch (error) {
            console.log('Creating Global Footer story...');
        }

        let storyId;
        if (stories && stories.data.stories.length > 0) {
            storyId = stories.data.stories[0].id;
            console.log(`✅ Found existing Global Footer story with ID: ${storyId}`);
        } else {
            // Create the story
            const newStory = await Storyblok.post(`spaces/${spaceId}/stories`, {
                story: {
                    name: 'Global Footer',
                    slug: 'global-footer',
                    content: { component: 'Footer' },
                    is_folder: false
                }
            });
            storyId = newStory.data.story.id;
            console.log(`✅ Created Global Footer story with ID: ${storyId}`);
        }

        const footerContent = {
            component: 'Footer',
            logo: {
                filename: '/logo.png',
                alt: 'Glazed Gloss Creative Collective'
            },
            newsletter_title: 'JOIN OUR NEWSLETTER',
            newsletter_description: 'Download your Free Beauty Content Calendar when you sign up for exclusive industry insights.',
            description: 'Join our movement and transform your beauty brand with industry-leading expertise and global reach.',
            copyright_text: '2024 Glazed Gloss Creative Collective. All Rights Reserved.',
            contact_info: {
                address: 'Beverly Hills, CA 90210',
                phone: '858.353.3220',
                email: 'hello@glazedgloss.com'
            },
            footer_links: [
                {
                    _uid: 'link_1',
                    component: 'footer_link',
                    title: 'About',
                    url: '/about',
                    is_external: false
                },
                {
                    _uid: 'link_2',
                    component: 'footer_link',
                    title: 'Services',
                    url: '/services',
                    is_external: false
                },
                {
                    _uid: 'link_3',
                    component: 'footer_link',
                    title: 'Work',
                    url: '/work',
                    is_external: false
                },
                {
                    _uid: 'link_4',
                    component: 'footer_link',
                    title: 'Contact',
                    url: '/contact',
                    is_external: false
                },
                {
                    _uid: 'link_5',
                    component: 'footer_link',
                    title: 'Privacy Policy',
                    url: '/privacy',
                    is_external: false
                },
                {
                    _uid: 'link_6',
                    component: 'footer_link',
                    title: 'Terms',
                    url: '/terms',
                    is_external: false
                }
            ],
            social_links: [
                {
                    _uid: 'social_1',
                    component: 'social_link',
                    platform: 'Instagram',
                    url: 'https://instagram.com/glazedgloss',
                    handle: '@glazedgloss'
                },
                {
                    _uid: 'social_2',
                    component: 'social_link',
                    platform: 'Facebook',
                    url: 'https://facebook.com/glazedgloss',
                    handle: 'Glazed Gloss'
                },
                {
                    _uid: 'social_3',
                    component: 'social_link',
                    platform: 'TikTok',
                    url: 'https://tiktok.com/@glazedgloss',
                    handle: '@glazedgloss'
                },
                {
                    _uid: 'social_4',
                    component: 'social_link',
                    platform: 'Twitter',
                    url: 'https://twitter.com/glazedgloss',
                    handle: '@glazedgloss'
                },
                {
                    _uid: 'social_5',
                    component: 'social_link',
                    platform: 'YouTube',
                    url: 'https://youtube.com/glazedgloss',
                    handle: 'Glazed Gloss'
                },
                {
                    _uid: 'social_6',
                    component: 'social_link',
                    platform: 'LinkedIn',
                    url: 'https://linkedin.com/company/glazedgloss',
                    handle: 'Glazed Gloss'
                }
            ]
        };

        await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
            story: {
                content: footerContent
            }
        });

        console.log('✅ Global Footer story populated successfully!');

    } catch (error) {
        console.error('❌ Error populating footer story:', error);
    }
}

async function populateAboutStory() {
    try {
        console.log('📝 Populating About Us story...');

        // Check if story exists, if not create it
        let stories;
        try {
            stories = await Storyblok.get(`spaces/${spaceId}/stories`, {
                with_slug: 'about'
            });
        } catch (error) {
            console.log('Creating About Us story...');
        }

        let storyId;
        if (stories && stories.data.stories.length > 0) {
            storyId = stories.data.stories[0].id;
            console.log(`✅ Found existing About Us story with ID: ${storyId}`);
        } else {
            // Create the story
            const newStory = await Storyblok.post(`spaces/${spaceId}/stories`, {
                story: {
                    name: 'About Us',
                    slug: 'about',
                    content: { component: 'page' },
                    is_folder: false
                }
            });
            storyId = newStory.data.story.id;
            console.log(`✅ Created About Us story with ID: ${storyId}`);
        }

        const aboutContent = {
            component: 'page',
            body: [
                {
                    _uid: 'about_hero_1',
                    component: 'AboutHero',
                    title: 'Transforming Beauty Brands Into Global Icons',
                    subtitle: 'About Glazed Gloss',
                    description: 'Based in Beverly Hills, CA, we bring over 25 years of combined expertise in beauty retail, brand development, and global distribution. Our team has launched hundreds of successful beauty brands worldwide.',
                    hero_image: {
                        filename: '/gloss/1.jpg',
                        alt: 'About Glazed Gloss'
                    },
                    background_image: {
                        filename: '/hero_bg.gif',
                        alt: 'About Background'
                    },
                    stats: [
                        {
                            _uid: 'stat_1',
                            component: 'stat',
                            number: '25+',
                            label: 'Years Experience'
                        },
                        {
                            _uid: 'stat_2',
                            component: 'stat',
                            number: '500+',
                            label: 'Brands Launched'
                        },
                        {
                            _uid: 'stat_3',
                            component: 'stat',
                            number: '50+',
                            label: 'Countries Reached'
                        },
                        {
                            _uid: 'stat_4',
                            component: 'stat',
                            number: '98%',
                            label: 'Client Satisfaction'
                        }
                    ]
                },
                {
                    _uid: 'team_section_1',
                    component: 'TeamSection',
                    title: 'The Experts Behind Your Success',
                    subtitle: 'Meet Our Team',
                    description: 'Our leadership team brings decades of combined experience from the world\'s most prestigious beauty brands and retailers.',
                    team_members: [
                        {
                            _uid: 'team_1',
                            component: 'team_member',
                            name: 'Sarah Johnson',
                            position: 'Founder & CEO',
                            bio: '25+ years in beauty industry with previous roles at Tom Ford Beauty, Estée Lauder, and Sephora.',
                            image: {
                                filename: '/expert/1.jpg',
                                alt: 'Sarah Johnson'
                            },
                            linkedin_url: '#'
                        },
                        {
                            _uid: 'team_2',
                            component: 'team_member',
                            name: 'Michael Chen',
                            position: 'Creative Director',
                            bio: 'Award-winning creative director with expertise in luxury brand development and global campaigns.',
                            image: {
                                filename: '/expert/2.jpg',
                                alt: 'Michael Chen'
                            },
                            linkedin_url: '#'
                        },
                        {
                            _uid: 'team_3',
                            component: 'team_member',
                            name: 'Emma Rodriguez',
                            position: 'VP of Operations',
                            bio: 'Operations expert with experience scaling beauty brands from startup to $100M+ revenue.',
                            image: {
                                filename: '/expert/3.jpg',
                                alt: 'Emma Rodriguez'
                            },
                            linkedin_url: '#'
                        }
                    ]
                },
                {
                    _uid: 'company_values_1',
                    component: 'CompanyValues',
                    title: 'What Drives Us Forward',
                    subtitle: 'Our Values',
                    description: 'Our core values guide every decision we make and every relationship we build. They are the foundation of our success and the promise we make to every client.',
                    values: [
                        {
                            _uid: 'value_1',
                            component: 'value',
                            title: 'Excellence',
                            description: 'We deliver exceptional results that exceed expectations, setting new standards in beauty brand development and execution.',
                            icon: {
                                filename: '/service_1.jpg',
                                alt: 'Excellence'
                            }
                        },
                        {
                            _uid: 'value_2',
                            component: 'value',
                            title: 'Innovation',
                            description: 'We embrace cutting-edge technologies and creative approaches to solve complex brand challenges and drive growth.',
                            icon: {
                                filename: '/service_2.jpg',
                                alt: 'Innovation'
                            }
                        },
                        {
                            _uid: 'value_3',
                            component: 'value',
                            title: 'Partnership',
                            description: 'We build lasting relationships with our clients, working as true partners in their journey to global success.',
                            icon: {
                                filename: '/service_3.jpg',
                                alt: 'Partnership'
                            }
                        },
                        {
                            _uid: 'value_4',
                            component: 'value',
                            title: 'Integrity',
                            description: 'We operate with transparency, honesty, and ethical practices in all our business relationships and decisions.',
                            icon: {
                                filename: '/service_4.jpg',
                                alt: 'Integrity'
                            }
                        }
                    ]
                },
                {
                    _uid: 'company_history_1',
                    component: 'CompanyHistory',
                    title: '25+ Years of Beauty Excellence',
                    subtitle: 'Our Journey',
                    description: 'From our humble beginnings in Beverly Hills to becoming a global leader in beauty brand development, our journey has been marked by innovation, growth, and unwavering commitment to excellence.',
                    milestones: [
                        {
                            _uid: 'milestone_1',
                            component: 'milestone',
                            year: '1998',
                            title: 'Foundation',
                            description: 'Founded in Beverly Hills with a vision to transform beauty brands into global icons.',
                            image: {
                                filename: '/work/work1.jpg',
                                alt: 'Foundation'
                            }
                        },
                        {
                            _uid: 'milestone_2',
                            component: 'milestone',
                            year: '2005',
                            title: 'Global Expansion',
                            description: 'Expanded operations internationally, establishing partnerships with major retailers worldwide.',
                            image: {
                                filename: '/work/work2.jpg',
                                alt: 'Global Expansion'
                            }
                        },
                        {
                            _uid: 'milestone_3',
                            component: 'milestone',
                            year: '2015',
                            title: 'Digital Innovation',
                            description: 'Launched digital-first approach, pioneering e-commerce strategies for beauty brands.',
                            image: {
                                filename: '/work/work3.jpg',
                                alt: 'Digital Innovation'
                            }
                        },
                        {
                            _uid: 'milestone_4',
                            component: 'milestone',
                            year: '2020',
                            title: 'Sustainable Future',
                            description: 'Committed to sustainable beauty practices and eco-conscious brand development.',
                            image: {
                                filename: '/work/work4.jpg',
                                alt: 'Sustainable Future'
                            }
                        }
                    ]
                }
            ]
        };

        await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
            story: {
                content: aboutContent
            }
        });

        console.log('✅ About Us story populated successfully!');

    } catch (error) {
        console.error('❌ Error populating about story:', error);
    }
}

// Run the script
populateManualStories();