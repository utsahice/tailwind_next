const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function useExistingImages() {
  try {
    console.log('🚀 Using existing uploaded images from Storyblok...');
    
    // Get all existing assets
    const assetsResponse = await Storyblok.get(`spaces/${spaceId}/assets`);
    const assets = assetsResponse.data.assets;
    
    console.log(`📋 Found ${assets.length} existing assets:`);
    assets.forEach((asset, index) => {
      console.log(`${index + 1}. ${asset.short_filename} - ${asset.filename}`);
    });
    
    // Map assets to sections based on filename or use them in order
    const imageMap = {
      hero_bg: assets.find(a => a.short_filename.includes('hero') || a.short_filename.includes('banner')) || assets[2], // herobanner.png
      logo: assets.find(a => a.short_filename.includes('logo')) || assets[0], // logo.png
      service1: assets[0], // Use logo as placeholder for service
      service2: assets[1], // Use whiteicon as placeholder
      service3: assets[2], // Use herobanner as placeholder
      glazed: assets[2], // Use herobanner for glazed gloss
      transforming: assets[2], // Use herobanner for transforming
      expert1: assets[0], // Use available images as placeholders
      expert2: assets[1],
      expert3: assets[2],
      work1: assets[2],
      work2: assets[0]
    };
    
    console.log('\n🔄 Updating home story with existing images...');
    
    // Get home story
    const storiesResponse = await Storyblok.get(`spaces/${spaceId}/stories`, {
      with_slug: 'home'
    });
    
    if (storiesResponse.data.stories.length === 0) {
      console.error('❌ Home story not found');
      return;
    }
    
    const homeStory = storiesResponse.data.stories[0];
    const storyId = homeStory.id;
    
    console.log(`✅ Found home story (ID: ${storyId})`);
    
    // Create updated content with existing images
    const updatedContent = {
      component: "page",
      body: [
        // Hero Section
        {
          component: "hero",
          _uid: "hero_" + Date.now(),
          title: "Transform Your Beauty Brand",
          subtitle: "Professional beauty services that elevate your brand to new heights",
          background_image: {
            filename: imageMap.hero_bg.filename,
            alt: "Hero Background"
          },
          hero_gif: {
            filename: imageMap.logo.filename,
            alt: "Hero Animation"
          }
        },
        
        // Our Services
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
                filename: imageMap.service1.filename,
                alt: "Brand Consultation Service"
              }
            },
            {
              component: "service_item",
              _uid: "service_2_" + Date.now(),
              title: "Product Development",
              description: "From concept to creation, we bring your beauty products to life",
              image: {
                filename: imageMap.service2.filename,
                alt: "Product Development Service"
              }
            },
            {
              component: "service_item",
              _uid: "service_3_" + Date.now(),
              title: "Marketing Strategy",
              description: "Comprehensive marketing solutions to grow your beauty brand",
              image: {
                filename: imageMap.service3.filename,
                alt: "Marketing Strategy Service"
              }
            },
            {
              component: "service_item",
              _uid: "service_4_" + Date.now(),
              title: "Digital Presence",
              description: "Build a strong online presence with our digital solutions",
              image: {
                filename: imageMap.service1.filename,
                alt: "Digital Presence Service"
              }
            },
            {
              component: "service_item",
              _uid: "service_5_" + Date.now(),
              title: "Packaging Design",
              description: "Eye-catching packaging that makes your products stand out",
              image: {
                filename: imageMap.service2.filename,
                alt: "Packaging Design Service"
              }
            },
            {
              component: "service_item",
              _uid: "service_6_" + Date.now(),
              title: "Retail Support",
              description: "Complete support for retail partnerships and distribution",
              image: {
                filename: imageMap.service3.filename,
                alt: "Retail Support Service"
              }
            }
          ]
        },
        
        // Retail Partners
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
                filename: imageMap.logo.filename,
                alt: "Sephora Logo"
              }
            },
            {
              component: "partner_item",
              _uid: "partner_2_" + Date.now(),
              name: "Ulta Beauty",
              logo: {
                filename: imageMap.logo.filename,
                alt: "Ulta Beauty Logo"
              }
            },
            {
              component: "partner_item",
              _uid: "partner_3_" + Date.now(),
              name: "Target",
              logo: {
                filename: imageMap.logo.filename,
                alt: "Target Logo"
              }
            },
            {
              component: "partner_item",
              _uid: "partner_4_" + Date.now(),
              name: "CVS Pharmacy",
              logo: {
                filename: imageMap.logo.filename,
                alt: "CVS Logo"
              }
            },
            {
              component: "partner_item",
              _uid: "partner_5_" + Date.now(),
              name: "Walgreens",
              logo: {
                filename: imageMap.logo.filename,
                alt: "Walgreens Logo"
              }
            },
            {
              component: "partner_item",
              _uid: "partner_6_" + Date.now(),
              name: "Amazon Beauty",
              logo: {
                filename: imageMap.logo.filename,
                alt: "Amazon Logo"
              }
            }
          ]
        },
        
        // Our Work
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
              description: "Complete brand overhaul for premium skincare line targeting millennials",
              category: "Skincare",
              image: {
                filename: imageMap.work1.filename,
                alt: "Luxury Skincare Brand Work"
              }
            },
            {
              component: "work_item",
              _uid: "work_2_" + Date.now(),
              title: "Organic Makeup Line",
              description: "Natural beauty brand development and successful retail launch",
              category: "Makeup",
              image: {
                filename: imageMap.work2.filename,
                alt: "Organic Makeup Line Work"
              }
            },
            {
              component: "work_item",
              _uid: "work_3_" + Date.now(),
              title: "Hair Care Revolution",
              description: "Innovative hair care product line with sustainable packaging",
              category: "Hair Care",
              image: {
                filename: imageMap.work1.filename,
                alt: "Hair Care Revolution Work"
              }
            },
            {
              component: "work_item",
              _uid: "work_4_" + Date.now(),
              title: "Fragrance Collection",
              description: "Exclusive fragrance line with celebrity endorsement",
              category: "Fragrance",
              image: {
                filename: imageMap.work2.filename,
                alt: "Fragrance Collection Work"
              }
            }
          ]
        },
        
        // Glazed Gloss
        {
          component: "glazed_gloss",
          _uid: "glazed_" + Date.now(),
          title: "Glazed Gloss Collection",
          subtitle: "The Future of Lip Beauty",
          description: "Our signature glazed gloss collection represents the pinnacle of lip beauty innovation. With long-lasting formula, stunning finish, and nourishing ingredients, these glosses are designed to make every lip look effortlessly beautiful and feel incredibly smooth.",
          background_color: "#f8f9fa",
          main_image: {
            filename: imageMap.glazed.filename,
            alt: "Glazed Gloss Collection"
          }
        },
        
        // Transforming Brands
        {
          component: "transforming_brands",
          _uid: "transforming_" + Date.now(),
          title: "Transforming Brands",
          subtitle: "Beauty Innovation at Its Best",
          description: "We specialize in transforming beauty brands through innovative strategies, cutting-edge product development, and comprehensive market positioning. Our approach ensures your brand stands out in the competitive beauty landscape and achieves sustainable growth.",
          main_image: {
            filename: imageMap.transforming.filename,
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
        
        // Beauty Experts
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
              bio: "With over 15 years in the beauty industry, Sarah has led product development for major cosmetic brands and specializes in innovative formulations that combine efficacy with sustainability.",
              image: {
                filename: imageMap.expert1.filename,
                alt: "Sarah Johnson - Chief Beauty Officer"
              }
            },
            {
              component: "expert_item",
              _uid: "expert_2_" + Date.now(),
              name: "Michael Chen",
              title: "Brand Strategy Director",
              bio: "Michael brings expertise in brand positioning and market analysis, having worked with luxury beauty brands across Asia and North America to achieve remarkable growth and market penetration.",
              image: {
                filename: imageMap.expert2.filename,
                alt: "Michael Chen - Brand Strategy Director"
              }
            },
            {
              component: "expert_item",
              _uid: "expert_3_" + Date.now(),
              name: "Emma Rodriguez",
              title: "Creative Director",
              bio: "Emma's creative vision has shaped the visual identity of numerous successful beauty campaigns and product launches worldwide, earning multiple industry awards for design excellence.",
              image: {
                filename: imageMap.expert3.filename,
                alt: "Emma Rodriguez - Creative Director"
              }
            }
          ]
        },
        
        // Branding
        {
          component: "branding",
          _uid: "branding_" + Date.now(),
          title: "Branding Excellence",
          subtitle: "Creating Memorable Beauty Brands",
          description: "Our branding services encompass everything from logo design to complete brand identity systems. We create cohesive, memorable brands that resonate with your target audience and stand the test of time in the competitive beauty market.",
          branding_items: [
            {
              component: "branding_item",
              _uid: "brand_1_" + Date.now(),
              title: "Logo Design",
              description: "Distinctive logos that capture your brand essence and create instant recognition",
              image: {
                filename: imageMap.service1.filename,
                alt: "Logo Design Service"
              }
            },
            {
              component: "branding_item",
              _uid: "brand_2_" + Date.now(),
              title: "Brand Guidelines",
              description: "Comprehensive brand standards and usage guidelines for consistent application",
              image: {
                filename: imageMap.service2.filename,
                alt: "Brand Guidelines Service"
              }
            },
            {
              component: "branding_item",
              _uid: "brand_3_" + Date.now(),
              title: "Visual Identity",
              description: "Complete visual identity systems including colors, typography, and imagery",
              image: {
                filename: imageMap.service3.filename,
                alt: "Visual Identity Service"
              }
            },
            {
              component: "branding_item",
              _uid: "brand_4_" + Date.now(),
              title: "Brand Messaging",
              description: "Compelling brand stories and messaging strategies that connect with customers",
              image: {
                filename: imageMap.service1.filename,
                alt: "Brand Messaging Service"
              }
            }
          ]
        },
        
        // Call to Action
        {
          component: "gloss_action",
          _uid: "action_" + Date.now(),
          title: "Ready to Transform Your Beauty Brand?",
          subtitle: "Let's Create Something Beautiful Together",
          description: "Join hundreds of successful beauty brands that have transformed their business with our expert guidance. From concept to market success, we're here to make your beauty brand dreams a reality. Contact us today for a free consultation.",
          cta_text: "Start Your Transformation",
          cta_link: "/contact",
          action_image: {
            filename: imageMap.hero_bg.filename,
            alt: "Transform Your Beauty Brand"
          }
        },
        
        // Video Slider
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
                filename: imageMap.work1.filename,
                alt: "Brand Development Process Video"
              }
            },
            {
              component: "video_item",
              _uid: "video_2_" + Date.now(),
              title: "Product Launch Success Story",
              video_url: "https://example.com/video2",
              thumbnail: {
                filename: imageMap.work2.filename,
                alt: "Product Launch Success Video"
              }
            },
            {
              component: "video_item",
              _uid: "video_3_" + Date.now(),
              title: "Client Testimonials",
              video_url: "https://example.com/video3",
              thumbnail: {
                filename: imageMap.service1.filename,
                alt: "Client Testimonials Video"
              }
            },
            {
              component: "video_item",
              _uid: "video_4_" + Date.now(),
              title: "Innovation Lab Tour",
              video_url: "https://example.com/video4",
              thumbnail: {
                filename: imageMap.service2.filename,
                alt: "Innovation Lab Tour Video"
              }
            },
            {
              component: "video_item",
              _uid: "video_5_" + Date.now(),
              title: "Beauty Trends 2024",
              video_url: "https://example.com/video5",
              thumbnail: {
                filename: imageMap.service3.filename,
                alt: "Beauty Trends 2024 Video"
              }
            }
          ]
        }
      ]
    };
    
    // Update the story
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: updatedContent }
    });
    
    console.log('✅ Story updated with existing images');
    
    // Try to publish
    try {
      await Storyblok.put(`spaces/${spaceId}/stories/${storyId}/publish`);
      console.log('✅ Story published');
    } catch (publishError) {
      console.log('⚠️ Publishing failed, but story is updated');
    }
    
    console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${storyId}`);
    
    console.log('\n🎉 SUCCESS!');
    console.log('✅ Home story updated with existing Storyblok images');
    console.log('✅ All sections now have images assigned');
    console.log('🚀 Visit http://localhost:3000 to see your website with images!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

useExistingImages();