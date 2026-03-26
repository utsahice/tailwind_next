const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

// Check environment variables
if (!process.env.STORYBLOK_OAUTH_TOKEN) {
  console.error('❌ STORYBLOK_OAUTH_TOKEN is missing in .env.local');
  process.exit(1);
}

if (!process.env.STORYBLOK_SPACE_ID) {
  console.error('❌ STORYBLOK_SPACE_ID is missing in .env.local');
  process.exit(1);
}

// Initialize Storyblok Management API client
const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

// Sample content data for the home page
const homeStoryContent = {
  component: "page",
  body: [
    {
      component: "hero",
      _uid: "hero_" + Date.now(),
      title: "Transform Your Beauty Brand",
      subtitle: "Professional beauty services that elevate your brand to new heights",
      background_image: {
        filename: "https://via.placeholder.com/1920x1080/ff6b9d/ffffff?text=Hero+Background",
        alt: "Hero Background"
      },
      hero_gif: {
        filename: "https://via.placeholder.com/400x300/ff6b9d/ffffff?text=Hero+Animation",
        alt: "Hero Animation"
      }
    },
    {
      component: "our_services",
      _uid: "services_" + Date.now(),
      title: "Our Services",
      subtitle: "Comprehensive beauty solutions for your brand",
      services: [
        {
          component: "service_item",
          _uid: "service_1_" + Date.now(),
          title: "Brand Consultation",
          description: "Expert guidance to define and refine your beauty brand identity",
          image: {
            filename: "https://via.placeholder.com/400x300/c44569/ffffff?text=Brand+Consultation",
            alt: "Brand Consultation Service"
          }
        },
        {
          component: "service_item",
          _uid: "service_2_" + Date.now(),
          title: "Product Development",
          description: "From concept to creation, we bring your beauty products to life",
          image: {
            filename: "https://via.placeholder.com/400x300/f8b500/ffffff?text=Product+Development",
            alt: "Product Development Service"
          }
        },
        {
          component: "service_item",
          _uid: "service_3_" + Date.now(),
          title: "Marketing Strategy",
          description: "Comprehensive marketing solutions to grow your beauty brand",
          image: {
            filename: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=Marketing+Strategy",
            alt: "Marketing Strategy Service"
          }
        },
        {
          component: "service_item",
          _uid: "service_4_" + Date.now(),
          title: "Digital Presence",
          description: "Build a strong online presence with our digital solutions",
          image: {
            filename: "https://via.placeholder.com/400x300/00b894/ffffff?text=Digital+Presence",
            alt: "Digital Presence Service"
          }
        },
        {
          component: "service_item",
          _uid: "service_5_" + Date.now(),
          title: "Packaging Design",
          description: "Eye-catching packaging that makes your products stand out",
          image: {
            filename: "https://via.placeholder.com/400x300/e17055/ffffff?text=Packaging+Design",
            alt: "Packaging Design Service"
          }
        },
        {
          component: "service_item",
          _uid: "service_6_" + Date.now(),
          title: "Retail Support",
          description: "Complete support for retail partnerships and distribution",
          image: {
            filename: "https://via.placeholder.com/400x300/a29bfe/ffffff?text=Retail+Support",
            alt: "Retail Support Service"
          }
        }
      ]
    },
    {
      component: "retail_partners",
      _uid: "partners_" + Date.now(),
      title: "Our Retail Partners",
      subtitle: "Trusted by leading beauty retailers worldwide",
      partners: [
        {
          component: "partner_item",
          _uid: "partner_1_" + Date.now(),
          name: "Sephora",
          logo: {
            filename: "https://via.placeholder.com/120x80/000000/ffffff?text=Sephora",
            alt: "Sephora Logo"
          }
        },
        {
          component: "partner_item",
          _uid: "partner_2_" + Date.now(),
          name: "Ulta Beauty",
          logo: {
            filename: "https://via.placeholder.com/120x80/000000/ffffff?text=Ulta",
            alt: "Ulta Beauty Logo"
          }
        },
        {
          component: "partner_item",
          _uid: "partner_3_" + Date.now(),
          name: "Target",
          logo: {
            filename: "https://via.placeholder.com/120x80/000000/ffffff?text=Target",
            alt: "Target Logo"
          }
        },
        {
          component: "partner_item",
          _uid: "partner_4_" + Date.now(),
          name: "CVS",
          logo: {
            filename: "https://via.placeholder.com/120x80/000000/ffffff?text=CVS",
            alt: "CVS Logo"
          }
        },
        {
          component: "partner_item",
          _uid: "partner_5_" + Date.now(),
          name: "Walgreens",
          logo: {
            filename: "https://via.placeholder.com/120x80/000000/ffffff?text=Walgreens",
            alt: "Walgreens Logo"
          }
        },
        {
          component: "partner_item",
          _uid: "partner_6_" + Date.now(),
          name: "Amazon",
          logo: {
            filename: "https://via.placeholder.com/120x80/000000/ffffff?text=Amazon",
            alt: "Amazon Logo"
          }
        }
      ]
    },
    {
      component: "our_work",
      _uid: "work_" + Date.now(),
      title: "Our Work",
      subtitle: "Showcasing successful beauty brand transformations",
      work_items: [
        {
          component: "work_item",
          _uid: "work_1_" + Date.now(),
          title: "Luxury Skincare Brand",
          description: "Complete brand overhaul for premium skincare line",
          category: "Skincare",
          image: {
            filename: "https://via.placeholder.com/400x300/ff7675/ffffff?text=Luxury+Skincare",
            alt: "Luxury Skincare Brand Work"
          }
        },
        {
          component: "work_item",
          _uid: "work_2_" + Date.now(),
          title: "Organic Makeup Line",
          description: "Natural beauty brand development and launch",
          category: "Makeup",
          image: {
            filename: "https://via.placeholder.com/400x300/74b9ff/ffffff?text=Organic+Makeup",
            alt: "Organic Makeup Line Work"
          }
        },
        {
          component: "work_item",
          _uid: "work_3_" + Date.now(),
          title: "Hair Care Revolution",
          description: "Innovative hair care product line creation",
          category: "Hair Care",
          image: {
            filename: "https://via.placeholder.com/400x300/55a3ff/ffffff?text=Hair+Care",
            alt: "Hair Care Revolution Work"
          }
        },
        {
          component: "work_item",
          _uid: "work_4_" + Date.now(),
          title: "Fragrance Collection",
          description: "Exclusive fragrance line development",
          category: "Fragrance",
          image: {
            filename: "https://via.placeholder.com/400x300/fd79a8/ffffff?text=Fragrance",
            alt: "Fragrance Collection Work"
          }
        }
      ]
    },
    {
      component: "glazed_gloss",
      _uid: "glazed_" + Date.now(),
      title: "Glazed Gloss Collection",
      subtitle: "The Future of Lip Beauty",
      description: "Our signature glazed gloss collection represents the pinnacle of lip beauty innovation. With long-lasting formula and stunning finish, these glosses are designed to make every lip look effortlessly beautiful.",
      background_color: "#f8f9fa",
      main_image: {
        filename: "https://via.placeholder.com/600x400/ff6b9d/ffffff?text=Glazed+Gloss+Product",
        alt: "Glazed Gloss Collection"
      }
    },
    {
      component: "transforming_brands",
      _uid: "transforming_" + Date.now(),
      title: "Transforming Brands",
      subtitle: "Beauty Innovation at Its Best",
      description: "We specialize in transforming beauty brands through innovative strategies, cutting-edge product development, and comprehensive market positioning. Our approach ensures your brand stands out in the competitive beauty landscape.",
      main_image: {
        filename: "https://via.placeholder.com/600x400/2d3436/ffffff?text=Brand+Transformation",
        alt: "Brand Transformation Process"
      },
      stats: [
        {
          component: "stat_item",
          _uid: "stat_1_" + Date.now(),
          number: "500+",
          label: "Brands Transformed"
        },
        {
          component: "stat_item",
          _uid: "stat_2_" + Date.now(),
          number: "98%",
          label: "Success Rate"
        },
        {
          component: "stat_item",
          _uid: "stat_3_" + Date.now(),
          number: "50+",
          label: "Countries Reached"
        },
        {
          component: "stat_item",
          _uid: "stat_4_" + Date.now(),
          number: "10M+",
          label: "Products Sold"
        }
      ]
    },
    {
      component: "beauty_experts",
      _uid: "experts_" + Date.now(),
      title: "Meet Our Beauty Experts",
      subtitle: "Industry leaders with decades of combined experience",
      experts: [
        {
          component: "expert_item",
          _uid: "expert_1_" + Date.now(),
          name: "Sarah Johnson",
          title: "Chief Beauty Officer",
          bio: "With over 15 years in the beauty industry, Sarah has led product development for major cosmetic brands and specializes in innovative formulations.",
          image: {
            filename: "https://via.placeholder.com/300x300/ff7675/ffffff?text=Sarah+J",
            alt: "Sarah Johnson - Chief Beauty Officer"
          }
        },
        {
          component: "expert_item",
          _uid: "expert_2_" + Date.now(),
          name: "Michael Chen",
          title: "Brand Strategy Director",
          bio: "Michael brings expertise in brand positioning and market analysis, having worked with luxury beauty brands across Asia and North America.",
          image: {
            filename: "https://via.placeholder.com/300x300/74b9ff/ffffff?text=Michael+C",
            alt: "Michael Chen - Brand Strategy Director"
          }
        },
        {
          component: "expert_item",
          _uid: "expert_3_" + Date.now(),
          name: "Emma Rodriguez",
          title: "Creative Director",
          bio: "Emma's creative vision has shaped the visual identity of numerous successful beauty campaigns and product launches worldwide.",
          image: {
            filename: "https://via.placeholder.com/300x300/55a3ff/ffffff?text=Emma+R",
            alt: "Emma Rodriguez - Creative Director"
          }
        }
      ]
    },
    {
      component: "branding",
      _uid: "branding_" + Date.now(),
      title: "Branding Excellence",
      subtitle: "Creating Memorable Beauty Brands",
      description: "Our branding services encompass everything from logo design to complete brand identity systems. We create cohesive, memorable brands that resonate with your target audience and stand the test of time.",
      branding_items: [
        {
          component: "branding_item",
          _uid: "brand_1_" + Date.now(),
          title: "Logo Design",
          description: "Distinctive logos that capture your brand essence",
          image: {
            filename: "https://via.placeholder.com/400x300/e17055/ffffff?text=Logo+Design",
            alt: "Logo Design Service"
          }
        },
        {
          component: "branding_item",
          _uid: "brand_2_" + Date.now(),
          title: "Brand Guidelines",
          description: "Comprehensive brand standards and usage guidelines",
          image: {
            filename: "https://via.placeholder.com/400x300/00b894/ffffff?text=Brand+Guidelines",
            alt: "Brand Guidelines Service"
          }
        },
        {
          component: "branding_item",
          _uid: "brand_3_" + Date.now(),
          title: "Visual Identity",
          description: "Complete visual identity systems for consistent branding",
          image: {
            filename: "https://via.placeholder.com/400x300/6c5ce7/ffffff?text=Visual+Identity",
            alt: "Visual Identity Service"
          }
        },
        {
          component: "branding_item",
          _uid: "brand_4_" + Date.now(),
          title: "Brand Messaging",
          description: "Compelling brand stories and messaging strategies",
          image: {
            filename: "https://via.placeholder.com/400x300/a29bfe/ffffff?text=Brand+Messaging",
            alt: "Brand Messaging Service"
          }
        }
      ]
    },
    {
      component: "gloss_action",
      _uid: "action_" + Date.now(),
      title: "Ready to Transform Your Beauty Brand?",
      subtitle: "Let's Create Something Beautiful Together",
      description: "Join hundreds of successful beauty brands that have transformed their business with our expert guidance. From concept to market success, we're here to make your beauty brand dreams a reality.",
      cta_text: "Start Your Transformation",
      cta_link: "/contact",
      action_image: {
        filename: "https://via.placeholder.com/600x400/ff6b9d/ffffff?text=Transform+Your+Brand",
        alt: "Transform Your Beauty Brand"
      }
    },
    {
      component: "video_slider",
      _uid: "videos_" + Date.now(),
      title: "Behind the Scenes",
      subtitle: "See our beauty transformation process in action",
      videos: [
        {
          component: "video_item",
          _uid: "video_1_" + Date.now(),
          title: "Brand Development Process",
          video_url: "https://example.com/video1",
          thumbnail: {
            filename: "https://via.placeholder.com/400x300/ff7675/ffffff?text=Video+1",
            alt: "Brand Development Process Video"
          }
        },
        {
          component: "video_item",
          _uid: "video_2_" + Date.now(),
          title: "Product Launch Success",
          video_url: "https://example.com/video2",
          thumbnail: {
            filename: "https://via.placeholder.com/400x300/74b9ff/ffffff?text=Video+2",
            alt: "Product Launch Success Video"
          }
        },
        {
          component: "video_item",
          _uid: "video_3_" + Date.now(),
          title: "Client Testimonials",
          video_url: "https://example.com/video3",
          thumbnail: {
            filename: "https://via.placeholder.com/400x300/55a3ff/ffffff?text=Video+3",
            alt: "Client Testimonials Video"
          }
        },
        {
          component: "video_item",
          _uid: "video_4_" + Date.now(),
          title: "Innovation Lab Tour",
          video_url: "https://example.com/video4",
          thumbnail: {
            filename: "https://via.placeholder.com/400x300/fd79a8/ffffff?text=Video+4",
            alt: "Innovation Lab Tour Video"
          }
        },
        {
          component: "video_item",
          _uid: "video_5_" + Date.now(),
          title: "Beauty Trends 2024",
          video_url: "https://example.com/video5",
          thumbnail: {
            filename: "https://via.placeholder.com/400x300/fdcb6e/ffffff?text=Video+5",
            alt: "Beauty Trends 2024 Video"
          }
        }
      ]
    },
    {
      component: "footer",
      _uid: "footer_" + Date.now(),
      company_description: "Leading beauty brand transformation company helping businesses create memorable, successful beauty products and experiences.",
      copyright_text: "© 2024 Beauty Transform. All rights reserved.",
      logo: {
        filename: "https://via.placeholder.com/150x50/000000/ffffff?text=Beauty+Transform",
        alt: "Beauty Transform Logo"
      },
      footer_links: [
        {
          component: "footer_link",
          _uid: "link_1_" + Date.now(),
          label: "About Us",
          url: "/about"
        },
        {
          component: "footer_link",
          _uid: "link_2_" + Date.now(),
          label: "Services",
          url: "/services"
        },
        {
          component: "footer_link",
          _uid: "link_3_" + Date.now(),
          label: "Portfolio",
          url: "/portfolio"
        },
        {
          component: "footer_link",
          _uid: "link_4_" + Date.now(),
          label: "Contact",
          url: "/contact"
        },
        {
          component: "footer_link",
          _uid: "link_5_" + Date.now(),
          label: "Blog",
          url: "/blog"
        }
      ],
      social_links: [
        {
          component: "social_link",
          _uid: "social_1_" + Date.now(),
          platform: "Instagram",
          url: "https://instagram.com/beautytransform",
          icon: {
            filename: "https://via.placeholder.com/24x24/000000/ffffff?text=IG",
            alt: "Instagram Icon"
          }
        },
        {
          component: "social_link",
          _uid: "social_2_" + Date.now(),
          platform: "Facebook",
          url: "https://facebook.com/beautytransform",
          icon: {
            filename: "https://via.placeholder.com/24x24/000000/ffffff?text=FB",
            alt: "Facebook Icon"
          }
        },
        {
          component: "social_link",
          _uid: "social_3_" + Date.now(),
          platform: "Twitter",
          url: "https://twitter.com/beautytransform",
          icon: {
            filename: "https://via.placeholder.com/24x24/000000/ffffff?text=TW",
            alt: "Twitter Icon"
          }
        },
        {
          component: "social_link",
          _uid: "social_4_" + Date.now(),
          platform: "LinkedIn",
          url: "https://linkedin.com/company/beautytransform",
          icon: {
            filename: "https://via.placeholder.com/24x24/000000/ffffff?text=LI",
            alt: "LinkedIn Icon"
          }
        },
        {
          component: "social_link",
          _uid: "social_5_" + Date.now(),
          platform: "YouTube",
          url: "https://youtube.com/beautytransform",
          icon: {
            filename: "https://via.placeholder.com/24x24/000000/ffffff?text=YT",
            alt: "YouTube Icon"
          }
        },
        {
          component: "social_link",
          _uid: "social_6_" + Date.now(),
          platform: "TikTok",
          url: "https://tiktok.com/@beautytransform",
          icon: {
            filename: "https://via.placeholder.com/24x24/000000/ffffff?text=TT",
            alt: "TikTok Icon"
          }
        }
      ]
    }
  ]
};

async function createHomeStory() {
  try {
    console.log('🚀 Creating home story with complete content...');
    
    // Test API connection first
    try {
      const spaceInfo = await Storyblok.get(`spaces/${spaceId}`);
      console.log(`✅ Connected to space: ${spaceInfo.data.space.name}`);
    } catch (error) {
      console.error('❌ Failed to connect to Storyblok API');
      console.error('Error details:', {
        status: error.response?.status,
        message: error.response?.data?.error || error.message
      });
      return;
    }
    
    // Check if home story already exists
    try {
      const existingStory = await Storyblok.get(`spaces/${spaceId}/stories`, {
        with_slug: 'home'
      });
      
      if (existingStory.data.stories.length > 0) {
        console.log('📝 Home story already exists, updating content...');
        const storyId = existingStory.data.stories[0].id;
        
        const updateResponse = await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
          story: {
            name: 'Home',
            slug: 'home',
            content: homeStoryContent,
            is_startpage: true,
            published: true
          },
          publish: 1
        });
        
        console.log(`✅ Updated home story (ID: ${storyId})`);
        console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${storyId}`);
        return;
      }
    } catch (error) {
      console.log('📝 Home story does not exist, creating new one...');
    }
    
    // Create new home story
    console.log('📝 Creating new home story...');
    
    const storyData = {
      story: {
        name: 'Home',
        slug: 'home',
        content: homeStoryContent,
        is_startpage: true,
        published: true
      },
      publish: 1
    };
    
    console.log('📋 Story data prepared, sending to Storyblok...');
    
    const response = await Storyblok.post(`spaces/${spaceId}/stories`, storyData);
    
    console.log(`✅ Created home story (ID: ${response.data.story.id})`);
    console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${response.data.story.id}`);
    
    console.log('\n🎉 Home story created successfully with complete content!');
    console.log('\n📋 What was created:');
    console.log('✅ Hero section with title and subtitle');
    console.log('✅ 6 service items in Our Services');
    console.log('✅ 6 retail partners');
    console.log('✅ 4 work portfolio items');
    console.log('✅ Glazed Gloss product section');
    console.log('✅ Transforming Brands with 4 statistics');
    console.log('✅ 3 beauty expert profiles');
    console.log('✅ 4 branding service items');
    console.log('✅ Call-to-action section');
    console.log('✅ 5 video items in slider');
    console.log('✅ Footer with 5 links and 6 social media links');
    
    console.log('\n🖼️ Note: All images are placeholder images. You can replace them with your actual images in Storyblok.');
    console.log('\n🚀 Next steps:');
    console.log('1. Go to your Storyblok space and review the content');
    console.log('2. Replace placeholder images with your actual images');
    console.log('3. Customize the text content as needed');
    console.log('4. Run: npm run dev');
    console.log('5. Visit: http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Failed to create home story');
    
    // More detailed error logging
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    console.error('Full error object:', error);
    
    if (error.response?.status === 422) {
      console.log('💡 Validation error - check that all components exist in Storyblok');
      if (error.response?.data?.errors) {
        console.log('Validation errors:', JSON.stringify(error.response.data.errors, null, 2));
      }
    }
    
    if (error.response?.status === 401) {
      console.log('💡 Authentication error - check your OAuth token');
    }
    
    if (error.response?.status === 404) {
      console.log('💡 Not found error - check your space ID');
    }
  }
}

// Run the script
if (require.main === module) {
  createHomeStory();
}

module.exports = { createHomeStory };