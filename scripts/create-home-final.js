const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createHomeFinal() {
  try {
    console.log('🚀 Creating home story step by step...');
    
    // Step 1: Create basic story first
    console.log('📝 Step 1: Creating basic story structure...');
    
    const basicContent = {
      component: "page",
      body: []
    };
    
    const createResponse = await Storyblok.post(`spaces/${spaceId}/stories`, {
      story: {
        name: 'Home',
        slug: 'home',
        content: basicContent,
        is_startpage: true
      }
    });
    
    const storyId = createResponse.data.story.id;
    console.log(`✅ Created basic story (ID: ${storyId})`);
    
    // Step 2: Add hero section
    console.log('📝 Step 2: Adding hero section...');
    
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
      story: {
        content: heroContent
      }
    });
    
    console.log('✅ Added hero section');
    
    // Step 3: Add services section
    console.log('📝 Step 3: Adding services section...');
    
    const servicesContent = {
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
            }
          ]
        }
      ]
    };
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: servicesContent
      }
    });
    
    console.log('✅ Added services section');
    
    // Step 4: Add retail partners
    console.log('📝 Step 4: Adding retail partners...');
    
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
      story: {
        content: partnersContent
      }
    });
    
    console.log('✅ Added retail partners');
    
    // Step 5: Add work section
    console.log('📝 Step 5: Adding work portfolio...');
    
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
      story: {
        content: workContent
      }
    });
    
    console.log('✅ Added work portfolio');
    
    // Step 6: Add remaining sections
    console.log('📝 Step 6: Adding remaining sections...');
    
    const finalContent = {
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
        },
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
        },
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
        },
        {
          component: "gloss_action",
          _uid: "action_" + Date.now(),
          title: "Ready to Transform Your Beauty Brand?",
          subtitle: "Let's Create Something Beautiful Together",
          description: "Join hundreds of successful beauty brands that have transformed their business with our expert guidance.",
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
            }
          ]
        },
        {
          component: "footer",
          _uid: "footer_" + Date.now(),
          company_description: "Leading beauty brand transformation company helping businesses create memorable, successful beauty products and experiences.",
          copyright_text: "© 2024 Beauty Transform. All rights reserved.",
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
              label: "Contact",
              url: "/contact"
            }
          ],
          social_links: [
            {
              component: "social_link",
              _uid: "social_1_" + Date.now(),
              platform: "Instagram",
              url: "https://instagram.com/beautytransform"
            },
            {
              component: "social_link",
              _uid: "social_2_" + Date.now(),
              platform: "Facebook",
              url: "https://facebook.com/beautytransform"
            },
            {
              component: "social_link",
              _uid: "social_3_" + Date.now(),
              platform: "Twitter",
              url: "https://twitter.com/beautytransform"
            }
          ]
        }
      ]
    };
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: {
        content: finalContent
      }
    });
    
    console.log('✅ Added all remaining sections');
    
    // Step 7: Publish the story
    console.log('📝 Step 7: Publishing story...');
    
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
    console.log('✅ Footer (3 links, 3 social links)');
    
    console.log('\n🚀 Next steps:');
    console.log('1. Go to Storyblok and add images to the blocks');
    console.log('2. Customize the content as needed');
    console.log('3. Run: npm run dev');
    console.log('4. Visit: http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Full error:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

createHomeFinal();