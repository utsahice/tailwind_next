const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createWorkingHome() {
  try {
    console.log('🚀 Creating working home story...');
    
    // Create the story with complete content
    const homeContent = {
      component: "page",
      body: [
        {
          component: "hero",
          _uid: "hero_" + Date.now(),
          title: "Transform Your Beauty Brand",
          subtitle: "Professional beauty services that elevate your brand to new heights"
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
              description: "Expert guidance to define and refine your beauty brand identity"
            },
            {
              component: "service_item",
              _uid: "service_2_" + Date.now(),
              title: "Product Development", 
              description: "From concept to creation, we bring your beauty products to life"
            },
            {
              component: "service_item",
              _uid: "service_3_" + Date.now(),
              title: "Marketing Strategy",
              description: "Comprehensive marketing solutions to grow your beauty brand"
            },
            {
              component: "service_item",
              _uid: "service_4_" + Date.now(),
              title: "Digital Presence",
              description: "Build a strong online presence with our digital solutions"
            },
            {
              component: "service_item",
              _uid: "service_5_" + Date.now(),
              title: "Packaging Design",
              description: "Eye-catching packaging that makes your products stand out"
            },
            {
              component: "service_item",
              _uid: "service_6_" + Date.now(),
              title: "Retail Support",
              description: "Complete support for retail partnerships and distribution"
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
              name: "Sephora"
            },
            {
              component: "partner_item",
              _uid: "partner_2_" + Date.now(),
              name: "Ulta Beauty"
            },
            {
              component: "partner_item",
              _uid: "partner_3_" + Date.now(),
              name: "Target"
            },
            {
              component: "partner_item",
              _uid: "partner_4_" + Date.now(),
              name: "CVS"
            },
            {
              component: "partner_item",
              _uid: "partner_5_" + Date.now(),
              name: "Walgreens"
            },
            {
              component: "partner_item",
              _uid: "partner_6_" + Date.now(),
              name: "Amazon"
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
              category: "Skincare"
            },
            {
              component: "work_item",
              _uid: "work_2_" + Date.now(),
              title: "Organic Makeup Line",
              description: "Natural beauty brand development and launch",
              category: "Makeup"
            },
            {
              component: "work_item",
              _uid: "work_3_" + Date.now(),
              title: "Hair Care Revolution",
              description: "Innovative hair care product line creation",
              category: "Hair Care"
            },
            {
              component: "work_item",
              _uid: "work_4_" + Date.now(),
              title: "Fragrance Collection",
              description: "Exclusive fragrance line development",
              category: "Fragrance"
            }
          ]
        },
        {
          component: "glazed_gloss",
          _uid: "glazed_" + Date.now(),
          title: "Glazed Gloss Collection",
          subtitle: "The Future of Lip Beauty",
          description: "Our signature glazed gloss collection represents the pinnacle of lip beauty innovation. With long-lasting formula and stunning finish, these glosses are designed to make every lip look effortlessly beautiful.",
          background_color: "#f8f9fa"
        },
        {
          component: "transforming_brands",
          _uid: "transforming_" + Date.now(),
          title: "Transforming Brands",
          subtitle: "Beauty Innovation at Its Best",
          description: "We specialize in transforming beauty brands through innovative strategies, cutting-edge product development, and comprehensive market positioning. Our approach ensures your brand stands out in the competitive beauty landscape.",
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
              bio: "With over 15 years in the beauty industry, Sarah has led product development for major cosmetic brands and specializes in innovative formulations."
            },
            {
              component: "expert_item",
              _uid: "expert_2_" + Date.now(),
              name: "Michael Chen",
              title: "Brand Strategy Director",
              bio: "Michael brings expertise in brand positioning and market analysis, having worked with luxury beauty brands across Asia and North America."
            },
            {
              component: "expert_item",
              _uid: "expert_3_" + Date.now(),
              name: "Emma Rodriguez",
              title: "Creative Director",
              bio: "Emma's creative vision has shaped the visual identity of numerous successful beauty campaigns and product launches worldwide."
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
              description: "Distinctive logos that capture your brand essence"
            },
            {
              component: "branding_item",
              _uid: "brand_2_" + Date.now(),
              title: "Brand Guidelines",
              description: "Comprehensive brand standards and usage guidelines"
            },
            {
              component: "branding_item",
              _uid: "brand_3_" + Date.now(),
              title: "Visual Identity",
              description: "Complete visual identity systems for consistent branding"
            },
            {
              component: "branding_item",
              _uid: "brand_4_" + Date.now(),
              title: "Brand Messaging",
              description: "Compelling brand stories and messaging strategies"
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
          cta_link: "/contact"
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
              video_url: "https://example.com/video1"
            },
            {
              component: "video_item",
              _uid: "video_2_" + Date.now(),
              title: "Product Launch Success",
              video_url: "https://example.com/video2"
            },
            {
              component: "video_item",
              _uid: "video_3_" + Date.now(),
              title: "Client Testimonials",
              video_url: "https://example.com/video3"
            },
            {
              component: "video_item",
              _uid: "video_4_" + Date.now(),
              title: "Innovation Lab Tour",
              video_url: "https://example.com/video4"
            },
            {
              component: "video_item",
              _uid: "video_5_" + Date.now(),
              title: "Beauty Trends 2024",
              video_url: "https://example.com/video5"
            }
          ]
        }
      ]
    };
    
    // Create the story
    const response = await Storyblok.post(`spaces/${spaceId}/stories`, {
      story: {
        name: 'Home',
        slug: 'home',
        content: homeContent,
        is_startpage: true
      }
    });
    
    const storyId = response.data.story.id;
    console.log(`✅ Created home story (ID: ${storyId})`);
    
    // Publish the story
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}/publish`);
    console.log('✅ Published home story');
    
    console.log('\n🎉 Home story created successfully!');
    console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${storyId}`);
    
    console.log('\n📋 Created content:');
    console.log('✅ Hero section with title and subtitle');
    console.log('✅ Our Services with 6 service items');
    console.log('✅ Retail Partners with 6 partners');
    console.log('✅ Our Work with 4 portfolio items');
    console.log('✅ Glazed Gloss product section');
    console.log('✅ Transforming Brands with 4 statistics');
    console.log('✅ Beauty Experts with 3 expert profiles');
    console.log('✅ Branding with 4 service items');
    console.log('✅ Call-to-action section');
    console.log('✅ Video Slider with 5 videos');
    
    console.log('\n📝 Note: Images need to be added manually in Storyblok interface');
    console.log('\n🚀 Next steps:');
    console.log('1. Go to Storyblok and add images to each section');
    console.log('2. Customize content as needed');
    console.log('3. Run: npm run dev');
    console.log('4. Visit: http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Error creating home story:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Message:', error.message);
    }
  }
}

createWorkingHome();