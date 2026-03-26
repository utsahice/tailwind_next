const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createMinimalHome() {
  try {
    console.log('🚀 Creating minimal home story...');
    
    // Start with just hero section
    const minimalContent = {
      component: "page",
      body: [
        {
          component: "hero",
          _uid: "hero_" + Date.now(),
          title: "Transform Your Beauty Brand",
          subtitle: "Professional beauty services that elevate your brand to new heights"
        }
      ]
    };
    
    console.log('📝 Creating story with hero section...');
    
    const response = await Storyblok.post(`spaces/${spaceId}/stories`, {
      story: {
        name: 'Home',
        slug: 'home',
        content: minimalContent,
        is_startpage: true
      }
    });
    
    const storyId = response.data.story.id;
    console.log(`✅ Created home story (ID: ${storyId})`);
    
    // Now add services section
    console.log('📝 Adding services section...');
    
    const withServices = {
      component: "page",
      body: [
        ...minimalContent.body,
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
            }
          ]
        }
      ]
    };
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: withServices
      }
    });
    
    console.log('✅ Added services section');
    
    // Add retail partners
    console.log('📝 Adding retail partners...');
    
    const withPartners = {
      component: "page",
      body: [
        ...withServices.body,
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
            }
          ]
        }
      ]
    };
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: withPartners
      }
    });
    
    console.log('✅ Added retail partners');
    
    // Add work section
    console.log('📝 Adding work section...');
    
    const withWork = {
      component: "page",
      body: [
        ...withPartners.body,
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
            }
          ]
        }
      ]
    };
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: withWork
      }
    });
    
    console.log('✅ Added work section');
    
    // Add glazed gloss
    console.log('📝 Adding glazed gloss...');
    
    const withGlazed = {
      component: "page",
      body: [
        ...withWork.body,
        {
          component: "glazed_gloss",
          _uid: "glazed_" + Date.now(),
          title: "Glazed Gloss Collection",
          subtitle: "The Future of Lip Beauty",
          description: "Our signature glazed gloss collection represents the pinnacle of lip beauty innovation.",
          background_color: "#f8f9fa"
        }
      ]
    };
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: withGlazed
      }
    });
    
    console.log('✅ Added glazed gloss');
    
    // Add transforming brands
    console.log('📝 Adding transforming brands...');
    
    const withTransforming = {
      component: "page",
      body: [
        ...withGlazed.body,
        {
          component: "transforming_brands",
          _uid: "transforming_" + Date.now(),
          title: "Transforming Brands",
          subtitle: "Beauty Innovation at Its Best",
          description: "We specialize in transforming beauty brands through innovative strategies.",
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
            }
          ]
        }
      ]
    };
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: withTransforming
      }
    });
    
    console.log('✅ Added transforming brands');
    
    // Add beauty experts
    console.log('📝 Adding beauty experts...');
    
    const withExperts = {
      component: "page",
      body: [
        ...withTransforming.body,
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
              bio: "With over 15 years in the beauty industry, Sarah has led product development for major cosmetic brands."
            },
            {
              component: "expert_item",
              _uid: "expert_2_" + Date.now(),
              name: "Michael Chen",
              title: "Brand Strategy Director",
              bio: "Michael brings expertise in brand positioning and market analysis."
            }
          ]
        }
      ]
    };
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: withExperts
      }
    });
    
    console.log('✅ Added beauty experts');
    
    // Add branding
    console.log('📝 Adding branding section...');
    
    const withBranding = {
      component: "page",
      body: [
        ...withExperts.body,
        {
          component: "branding",
          _uid: "branding_" + Date.now(),
          title: "Branding Excellence",
          subtitle: "Creating Memorable Beauty Brands",
          description: "Our branding services encompass everything from logo design to complete brand identity systems.",
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
            }
          ]
        }
      ]
    };
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: withBranding
      }
    });
    
    console.log('✅ Added branding section');
    
    // Add call to action
    console.log('📝 Adding call to action...');
    
    const withCTA = {
      component: "page",
      body: [
        ...withBranding.body,
        {
          component: "gloss_action",
          _uid: "action_" + Date.now(),
          title: "Ready to Transform Your Beauty Brand?",
          subtitle: "Let's Create Something Beautiful Together",
          description: "Join hundreds of successful beauty brands that have transformed their business with our expert guidance.",
          cta_text: "Start Your Transformation",
          cta_link: "/contact"
        }
      ]
    };
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: withCTA
      }
    });
    
    console.log('✅ Added call to action');
    
    // Add video slider
    console.log('📝 Adding video slider...');
    
    const withVideos = {
      component: "page",
      body: [
        ...withCTA.body,
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
            }
          ]
        }
      ]
    };
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: withVideos
      }
    });
    
    console.log('✅ Added video slider');
    
    // Publish the story
    console.log('📝 Publishing story...');
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}/publish`);
    console.log('✅ Published home story');
    
    console.log('\n🎉 Home story created successfully!');
    console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${storyId}`);
    
    console.log('\n📋 Created sections:');
    console.log('✅ Hero section');
    console.log('✅ Our Services (3 service items)');
    console.log('✅ Retail Partners (3 partners)');
    console.log('✅ Our Work (2 work items)');
    console.log('✅ Glazed Gloss');
    console.log('✅ Transforming Brands (2 stats)');
    console.log('✅ Beauty Experts (2 experts)');
    console.log('✅ Branding (2 branding items)');
    console.log('✅ Call-to-Action');
    console.log('✅ Video Slider (2 videos)');
    
    console.log('\n📝 Note: Images need to be added manually in Storyblok');
    console.log('\n🚀 Next steps:');
    console.log('1. Go to Storyblok and add images to each section');
    console.log('2. Add more content items as needed');
    console.log('3. Run: npm run dev');
    console.log('4. Visit: http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Full error:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

createMinimalHome();