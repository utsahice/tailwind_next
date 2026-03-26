const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createAndPopulateHome() {
  try {
    console.log('🚀 Creating and populating home story...');
    
    // Step 1: Create the story with minimal content first
    console.log('📝 Step 1: Creating basic home story...');
    
    const basicContent = {
      component: "page",
      body: []
    };
    
    let storyId;
    
    try {
      const createResponse = await Storyblok.post(`spaces/${spaceId}/stories`, {
        story: {
          name: 'Home',
          slug: 'home',
          content: basicContent,
          is_startpage: true
        }
      });
      
      storyId = createResponse.data.story.id;
      console.log(`✅ Created home story (ID: ${storyId})`);
    } catch (error) {
      if (error.response?.data?.includes && error.response.data.includes('already taken')) {
        console.log('📝 Home story already exists, finding it...');
        const storiesResponse = await Storyblok.get(`spaces/${spaceId}/stories`);
        const homeStory = storiesResponse.data.stories.find(s => s.slug === 'home');
        if (homeStory) {
          storyId = homeStory.id;
          console.log(`✅ Found existing home story (ID: ${storyId})`);
        } else {
          throw new Error('Could not find or create home story');
        }
      } else {
        throw error;
      }
    }
    
    // Step 2: Add content step by step
    console.log('📝 Step 2: Adding Hero section...');
    
    const heroContent = {
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
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: heroContent }
    });
    console.log('✅ Added Hero section');
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 3: Adding Our Services...');
    
    const servicesContent = {
      component: "page",
      body: [
        ...heroContent.body,
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
      story: { content: servicesContent }
    });
    console.log('✅ Added Our Services (3 items)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 4: Adding Retail Partners...');
    
    const partnersContent = {
      component: "page",
      body: [
        ...servicesContent.body,
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
      story: { content: partnersContent }
    });
    console.log('✅ Added Retail Partners (3 partners)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 5: Adding Our Work...');
    
    const workContent = {
      component: "page",
      body: [
        ...partnersContent.body,
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
      story: { content: workContent }
    });
    console.log('✅ Added Our Work (2 portfolio items)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 6: Adding Glazed Gloss...');
    
    const glazedContent = {
      component: "page",
      body: [
        ...workContent.body,
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
      story: { content: glazedContent }
    });
    console.log('✅ Added Glazed Gloss');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 7: Adding Transforming Brands...');
    
    const transformingContent = {
      component: "page",
      body: [
        ...glazedContent.body,
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
      story: { content: transformingContent }
    });
    console.log('✅ Added Transforming Brands (2 stats)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 8: Adding Beauty Experts...');
    
    const expertsContent = {
      component: "page",
      body: [
        ...transformingContent.body,
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
      story: { content: expertsContent }
    });
    console.log('✅ Added Beauty Experts (2 experts)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 9: Adding Branding...');
    
    const brandingContent = {
      component: "page",
      body: [
        ...expertsContent.body,
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
      story: { content: brandingContent }
    });
    console.log('✅ Added Branding (2 items)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 10: Adding Call-to-Action...');
    
    const ctaContent = {
      component: "page",
      body: [
        ...brandingContent.body,
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
      story: { content: ctaContent }
    });
    console.log('✅ Added Call-to-Action');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 11: Adding Video Slider...');
    
    const finalContent = {
      component: "page",
      body: [
        ...ctaContent.body,
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
      story: { content: finalContent }
    });
    console.log('✅ Added Video Slider (2 videos)');
    
    // Final step: Publish
    console.log('📝 Final Step: Publishing story...');
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}/publish`);
    console.log('✅ Published home story');
    
    console.log('\n🎉 AUTOMATION COMPLETE! Home story created and populated!');
    console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${storyId}`);
    
    console.log('\n📋 Content Successfully Added:');
    console.log('✅ Hero Section - Transform Your Beauty Brand');
    console.log('✅ Our Services - 3 service items');
    console.log('✅ Retail Partners - 3 major retailers');
    console.log('✅ Our Work - 2 portfolio items');
    console.log('✅ Glazed Gloss - Product showcase');
    console.log('✅ Transforming Brands - 2 key statistics');
    console.log('✅ Beauty Experts - 2 team member profiles');
    console.log('✅ Branding Services - 2 branding offerings');
    console.log('✅ Call-to-Action - Contact section');
    console.log('✅ Video Slider - 2 video items');
    
    console.log('\n🚀 Your automated beauty website is now live!');
    console.log('Visit: http://localhost:3000');
    console.log('\n📝 Note: You can add images and expand content in Storyblok interface');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Full error:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

createAndPopulateHome();