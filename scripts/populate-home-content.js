const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function populateHomeContent() {
  try {
    console.log('🚀 Populating home story with content...');
    
    // First, get the existing home story
    const storiesResponse = await Storyblok.get(`spaces/${spaceId}/stories`, {
      with_slug: 'home'
    });
    
    if (storiesResponse.data.stories.length === 0) {
      console.error('❌ Home story not found. Please create it first.');
      return;
    }
    
    const homeStory = storiesResponse.data.stories[0];
    const storyId = homeStory.id;
    
    console.log(`✅ Found home story (ID: ${storyId})`);
    
    // Create content step by step
    console.log('📝 Step 1: Adding Hero section...');
    
    let currentContent = {
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
      story: { content: currentContent }
    });
    console.log('✅ Added Hero section');
    
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 2: Adding Our Services...');
    
    currentContent.body.push({
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
    });
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: currentContent }
    });
    console.log('✅ Added Our Services (6 items)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 3: Adding Retail Partners...');
    
    currentContent.body.push({
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
          name: "CVS Pharmacy"
        },
        {
          component: "partner_item",
          _uid: "partner_5_" + Date.now(),
          name: "Walgreens"
        },
        {
          component: "partner_item",
          _uid: "partner_6_" + Date.now(),
          name: "Amazon Beauty"
        }
      ]
    });
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: currentContent }
    });
    console.log('✅ Added Retail Partners (6 partners)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 4: Adding Our Work...');
    
    currentContent.body.push({
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
          category: "Skincare"
        },
        {
          component: "work_item",
          _uid: "work_2_" + Date.now(),
          title: "Organic Makeup Line",
          description: "Natural beauty brand development and successful retail launch",
          category: "Makeup"
        },
        {
          component: "work_item",
          _uid: "work_3_" + Date.now(),
          title: "Hair Care Revolution",
          description: "Innovative hair care product line with sustainable packaging",
          category: "Hair Care"
        },
        {
          component: "work_item",
          _uid: "work_4_" + Date.now(),
          title: "Fragrance Collection",
          description: "Exclusive fragrance line with celebrity endorsement",
          category: "Fragrance"
        }
      ]
    });
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: currentContent }
    });
    console.log('✅ Added Our Work (4 portfolio items)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 5: Adding Glazed Gloss...');
    
    currentContent.body.push({
      component: "glazed_gloss",
      _uid: "glazed_" + Date.now(),
      title: "Glazed Gloss Collection",
      subtitle: "The Future of Lip Beauty",
      description: "Our signature glazed gloss collection represents the pinnacle of lip beauty innovation. With long-lasting formula, stunning finish, and nourishing ingredients, these glosses are designed to make every lip look effortlessly beautiful and feel incredibly smooth.",
      background_color: "#f8f9fa"
    });
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: currentContent }
    });
    console.log('✅ Added Glazed Gloss');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 6: Adding Transforming Brands...');
    
    currentContent.body.push({
      component: "transforming_brands",
      _uid: "transforming_" + Date.now(),
      title: "Transforming Brands",
      subtitle: "Beauty Innovation at Its Best",
      description: "We specialize in transforming beauty brands through innovative strategies, cutting-edge product development, and comprehensive market positioning. Our approach ensures your brand stands out in the competitive beauty landscape and achieves sustainable growth.",
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
    });
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: currentContent }
    });
    console.log('✅ Added Transforming Brands (4 statistics)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 7: Adding Beauty Experts...');
    
    currentContent.body.push({
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
          bio: "With over 15 years in the beauty industry, Sarah has led product development for major cosmetic brands and specializes in innovative formulations that combine efficacy with sustainability."
        },
        {
          component: "expert_item",
          _uid: "expert_2_" + Date.now(),
          name: "Michael Chen",
          title: "Brand Strategy Director",
          bio: "Michael brings expertise in brand positioning and market analysis, having worked with luxury beauty brands across Asia and North America to achieve remarkable growth and market penetration."
        },
        {
          component: "expert_item",
          _uid: "expert_3_" + Date.now(),
          name: "Emma Rodriguez",
          title: "Creative Director",
          bio: "Emma's creative vision has shaped the visual identity of numerous successful beauty campaigns and product launches worldwide, earning multiple industry awards for design excellence."
        }
      ]
    });
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: currentContent }
    });
    console.log('✅ Added Beauty Experts (3 expert profiles)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 8: Adding Branding...');
    
    currentContent.body.push({
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
          description: "Distinctive logos that capture your brand essence and create instant recognition"
        },
        {
          component: "branding_item",
          _uid: "brand_2_" + Date.now(),
          title: "Brand Guidelines",
          description: "Comprehensive brand standards and usage guidelines for consistent application"
        },
        {
          component: "branding_item",
          _uid: "brand_3_" + Date.now(),
          title: "Visual Identity",
          description: "Complete visual identity systems including colors, typography, and imagery"
        },
        {
          component: "branding_item",
          _uid: "brand_4_" + Date.now(),
          title: "Brand Messaging",
          description: "Compelling brand stories and messaging strategies that connect with customers"
        }
      ]
    });
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: currentContent }
    });
    console.log('✅ Added Branding (4 branding services)');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 9: Adding Call-to-Action...');
    
    currentContent.body.push({
      component: "gloss_action",
      _uid: "action_" + Date.now(),
      title: "Ready to Transform Your Beauty Brand?",
      subtitle: "Let's Create Something Beautiful Together",
      description: "Join hundreds of successful beauty brands that have transformed their business with our expert guidance. From concept to market success, we're here to make your beauty brand dreams a reality. Contact us today for a free consultation.",
      cta_text: "Start Your Transformation",
      cta_link: "/contact"
    });
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: currentContent }
    });
    console.log('✅ Added Call-to-Action');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📝 Step 10: Adding Video Slider...');
    
    currentContent.body.push({
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
          title: "Product Launch Success Story",
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
    });
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: currentContent }
    });
    console.log('✅ Added Video Slider (5 videos)');
    
    // Publish the story
    console.log('📝 Step 11: Publishing story...');
    
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}/publish`);
    console.log('✅ Published home story');
    
    console.log('\n🎉 HOME STORY POPULATED SUCCESSFULLY!');
    console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${storyId}`);
    
    console.log('\n📋 CONTENT ADDED:');
    console.log('✅ Hero Section - "Transform Your Beauty Brand"');
    console.log('✅ Our Services - 6 service items');
    console.log('✅ Retail Partners - 6 major retailers');
    console.log('✅ Our Work - 4 portfolio items');
    console.log('✅ Glazed Gloss - Product showcase');
    console.log('✅ Transforming Brands - 4 key statistics');
    console.log('✅ Beauty Experts - 3 team member profiles');
    console.log('✅ Branding - 4 branding services');
    console.log('✅ Call-to-Action - Contact section');
    console.log('✅ Video Slider - 5 video items');
    
    console.log('\n🖼️ NEXT STEPS:');
    console.log('1. Visit http://localhost:3000 to see your website');
    console.log('2. Go to Storyblok to add images to each section');
    console.log('3. Customize the content text as needed');
    console.log('4. Add your actual images and videos');
    console.log('5. Update contact information and links');
    
    console.log('\n🚀 YOUR BEAUTY WEBSITE IS READY!');
    
  } catch (error) {
    console.error('❌ Error populating content:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Full error:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

populateHomeContent();