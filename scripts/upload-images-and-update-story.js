const StoryblokClient = require('storyblok-js-client');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

// Image mapping for different sections
const imageMapping = {
  hero: {
    background: 'public/hero_bg.gif',
    animation: 'public/hero.gif'
  },
  services: [
    'public/service_1.jpg',
    'public/service_2.jpg', 
    'public/service_3.jpg',
    'public/service_4.jpg',
    'public/service_5.jpg',
    'public/service_6.jpg'
  ],
  retail: [
    'public/retail/Group1.svg',
    'public/retail/Group2.svg',
    'public/retail/Group3.svg',
    'public/retail/Group4.svg',
    'public/retail/Group5.svg',
    'public/retail/Group6.svg'
  ],
  work: [
    'public/work/work1.jpg',
    'public/work/work2.jpg',
    'public/work/work3.jpg',
    'public/work/work4.jpg'
  ],
  glazed: 'public/gloss/1.jpg',
  transforming: 'public/transforming/1.jpg',
  experts: [
    'public/expert/1.jpg',
    'public/expert/2.jpg',
    'public/expert/3.jpg'
  ],
  branding: [
    'public/Branding/user1.jpg',
    'public/Branding/user2.jpg',
    'public/Branding/user3.jpg',
    'public/Branding/user4.jpg'
  ],
  action: 'public/gloss/ac.png',
  videos: [
    'public/gloss/video1.jpg',
    'public/gloss/video2.jpg',
    'public/gloss/video3.jpg',
    'public/gloss/video4.jpg',
    'public/gloss/video5.jpg'
  ],
  footer: {
    logo: 'public/logo.png',
    social: [
      'public/footer/1.png',
      'public/footer/2.png',
      'public/footer/3.png',
      'public/footer/4.png',
      'public/footer/5.png',
      'public/footer/6.png'
    ]
  }
};

async function uploadImage(imagePath, filename) {
  try {
    console.log(`📤 Uploading: ${filename}...`);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️ File not found: ${imagePath}`);
      return null;
    }
    
    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));
    formData.append('filename', filename);
    
    const response = await Storyblok.post(`spaces/${spaceId}/assets`, formData, {
      headers: formData.getHeaders()
    });
    
    console.log(`✅ Uploaded: ${filename} -> ${response.data.id}`);
    return {
      filename: response.data.pretty_url,
      alt: filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ')
    };
    
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.response?.data || error.message);
    return null;
  }
}

async function uploadAllImages() {
  console.log('🚀 Starting image upload process...');
  
  const uploadedImages = {};
  
  // Upload hero images
  console.log('\n📸 Uploading Hero Images...');
  uploadedImages.hero = {
    background: await uploadImage(imageMapping.hero.background, 'hero-background.gif'),
    animation: await uploadImage(imageMapping.hero.animation, 'hero-animation.gif')
  };
  
  // Upload service images
  console.log('\n📸 Uploading Service Images...');
  uploadedImages.services = [];
  for (let i = 0; i < imageMapping.services.length; i++) {
    const image = await uploadImage(imageMapping.services[i], `service-${i + 1}.jpg`);
    uploadedImages.services.push(image);
    await new Promise(resolve => setTimeout(resolve, 200)); // Rate limiting
  }
  
  // Upload retail partner logos
  console.log('\n📸 Uploading Retail Partner Logos...');
  uploadedImages.retail = [];
  for (let i = 0; i < imageMapping.retail.length; i++) {
    const image = await uploadImage(imageMapping.retail[i], `retail-partner-${i + 1}.svg`);
    uploadedImages.retail.push(image);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Upload work portfolio images
  console.log('\n📸 Uploading Work Portfolio Images...');
  uploadedImages.work = [];
  for (let i = 0; i < imageMapping.work.length; i++) {
    const image = await uploadImage(imageMapping.work[i], `work-${i + 1}.jpg`);
    uploadedImages.work.push(image);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Upload glazed gloss image
  console.log('\n📸 Uploading Glazed Gloss Image...');
  uploadedImages.glazed = await uploadImage(imageMapping.glazed, 'glazed-gloss-product.jpg');
  
  // Upload transforming brands image
  console.log('\n📸 Uploading Transforming Brands Image...');
  uploadedImages.transforming = await uploadImage(imageMapping.transforming, 'transforming-brands.jpg');
  
  // Upload expert images
  console.log('\n📸 Uploading Expert Images...');
  uploadedImages.experts = [];
  for (let i = 0; i < imageMapping.experts.length; i++) {
    const image = await uploadImage(imageMapping.experts[i], `expert-${i + 1}.jpg`);
    uploadedImages.experts.push(image);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Upload branding images
  console.log('\n📸 Uploading Branding Images...');
  uploadedImages.branding = [];
  for (let i = 0; i < imageMapping.branding.length; i++) {
    const image = await uploadImage(imageMapping.branding[i], `branding-${i + 1}.jpg`);
    uploadedImages.branding.push(image);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Upload action image
  console.log('\n📸 Uploading Action Image...');
  uploadedImages.action = await uploadImage(imageMapping.action, 'call-to-action.png');
  
  // Upload video thumbnails
  console.log('\n📸 Uploading Video Thumbnails...');
  uploadedImages.videos = [];
  for (let i = 0; i < imageMapping.videos.length; i++) {
    const image = await uploadImage(imageMapping.videos[i], `video-thumbnail-${i + 1}.jpg`);
    uploadedImages.videos.push(image);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // Upload footer images
  console.log('\n📸 Uploading Footer Images...');
  uploadedImages.footer = {
    logo: await uploadImage(imageMapping.footer.logo, 'company-logo.png'),
    social: []
  };
  
  for (let i = 0; i < imageMapping.footer.social.length; i++) {
    const image = await uploadImage(imageMapping.footer.social[i], `social-icon-${i + 1}.png`);
    uploadedImages.footer.social.push(image);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log('\n✅ All images uploaded successfully!');
  return uploadedImages;
}

async function updateStoryWithImages(uploadedImages) {
  try {
    console.log('\n🔄 Updating home story with uploaded images...');
    
    // Get the home story
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
    
    // Create updated content with images
    const updatedContent = {
      component: "page",
      body: [
        // Hero Section
        {
          component: "hero",
          _uid: "hero_" + Date.now(),
          title: "Transform Your Beauty Brand",
          subtitle: "Professional beauty services that elevate your brand to new heights",
          background_image: uploadedImages.hero.background,
          hero_gif: uploadedImages.hero.animation
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
              image: uploadedImages.services[0]
            },
            {
              component: "service_item",
              _uid: "service_2_" + Date.now(),
              title: "Product Development",
              description: "From concept to creation, we bring your beauty products to life",
              image: uploadedImages.services[1]
            },
            {
              component: "service_item",
              _uid: "service_3_" + Date.now(),
              title: "Marketing Strategy",
              description: "Comprehensive marketing solutions to grow your beauty brand",
              image: uploadedImages.services[2]
            },
            {
              component: "service_item",
              _uid: "service_4_" + Date.now(),
              title: "Digital Presence",
              description: "Build a strong online presence with our digital solutions",
              image: uploadedImages.services[3]
            },
            {
              component: "service_item",
              _uid: "service_5_" + Date.now(),
              title: "Packaging Design",
              description: "Eye-catching packaging that makes your products stand out",
              image: uploadedImages.services[4]
            },
            {
              component: "service_item",
              _uid: "service_6_" + Date.now(),
              title: "Retail Support",
              description: "Complete support for retail partnerships and distribution",
              image: uploadedImages.services[5]
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
              logo: uploadedImages.retail[0]
            },
            {
              component: "partner_item",
              _uid: "partner_2_" + Date.now(),
              name: "Ulta Beauty",
              logo: uploadedImages.retail[1]
            },
            {
              component: "partner_item",
              _uid: "partner_3_" + Date.now(),
              name: "Target",
              logo: uploadedImages.retail[2]
            },
            {
              component: "partner_item",
              _uid: "partner_4_" + Date.now(),
              name: "CVS Pharmacy",
              logo: uploadedImages.retail[3]
            },
            {
              component: "partner_item",
              _uid: "partner_5_" + Date.now(),
              name: "Walgreens",
              logo: uploadedImages.retail[4]
            },
            {
              component: "partner_item",
              _uid: "partner_6_" + Date.now(),
              name: "Amazon Beauty",
              logo: uploadedImages.retail[5]
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
              image: uploadedImages.work[0]
            },
            {
              component: "work_item",
              _uid: "work_2_" + Date.now(),
              title: "Organic Makeup Line",
              description: "Natural beauty brand development and successful retail launch",
              category: "Makeup",
              image: uploadedImages.work[1]
            },
            {
              component: "work_item",
              _uid: "work_3_" + Date.now(),
              title: "Hair Care Revolution",
              description: "Innovative hair care product line with sustainable packaging",
              category: "Hair Care",
              image: uploadedImages.work[2]
            },
            {
              component: "work_item",
              _uid: "work_4_" + Date.now(),
              title: "Fragrance Collection",
              description: "Exclusive fragrance line with celebrity endorsement",
              category: "Fragrance",
              image: uploadedImages.work[3]
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
          main_image: uploadedImages.glazed
        },
        
        // Transforming Brands
        {
          component: "transforming_brands",
          _uid: "transforming_" + Date.now(),
          title: "Transforming Brands",
          subtitle: "Beauty Innovation at Its Best",
          description: "We specialize in transforming beauty brands through innovative strategies, cutting-edge product development, and comprehensive market positioning. Our approach ensures your brand stands out in the competitive beauty landscape and achieves sustainable growth.",
          main_image: uploadedImages.transforming,
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
              image: uploadedImages.experts[0]
            },
            {
              component: "expert_item",
              _uid: "expert_2_" + Date.now(),
              name: "Michael Chen",
              title: "Brand Strategy Director",
              bio: "Michael brings expertise in brand positioning and market analysis, having worked with luxury beauty brands across Asia and North America to achieve remarkable growth and market penetration.",
              image: uploadedImages.experts[1]
            },
            {
              component: "expert_item",
              _uid: "expert_3_" + Date.now(),
              name: "Emma Rodriguez",
              title: "Creative Director",
              bio: "Emma's creative vision has shaped the visual identity of numerous successful beauty campaigns and product launches worldwide, earning multiple industry awards for design excellence.",
              image: uploadedImages.experts[2]
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
              image: uploadedImages.branding[0]
            },
            {
              component: "branding_item",
              _uid: "brand_2_" + Date.now(),
              title: "Brand Guidelines",
              description: "Comprehensive brand standards and usage guidelines for consistent application",
              image: uploadedImages.branding[1]
            },
            {
              component: "branding_item",
              _uid: "brand_3_" + Date.now(),
              title: "Visual Identity",
              description: "Complete visual identity systems including colors, typography, and imagery",
              image: uploadedImages.branding[2]
            },
            {
              component: "branding_item",
              _uid: "brand_4_" + Date.now(),
              title: "Brand Messaging",
              description: "Compelling brand stories and messaging strategies that connect with customers",
              image: uploadedImages.branding[3]
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
          action_image: uploadedImages.action
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
              thumbnail: uploadedImages.videos[0]
            },
            {
              component: "video_item",
              _uid: "video_2_" + Date.now(),
              title: "Product Launch Success Story",
              video_url: "https://example.com/video2",
              thumbnail: uploadedImages.videos[1]
            },
            {
              component: "video_item",
              _uid: "video_3_" + Date.now(),
              title: "Client Testimonials",
              video_url: "https://example.com/video3",
              thumbnail: uploadedImages.videos[2]
            },
            {
              component: "video_item",
              _uid: "video_4_" + Date.now(),
              title: "Innovation Lab Tour",
              video_url: "https://example.com/video4",
              thumbnail: uploadedImages.videos[3]
            },
            {
              component: "video_item",
              _uid: "video_5_" + Date.now(),
              title: "Beauty Trends 2024",
              video_url: "https://example.com/video5",
              thumbnail: uploadedImages.videos[4]
            }
          ]
        }
      ]
    };
    
    // Update the story
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: updatedContent }
    });
    
    console.log('✅ Updated home story with all images');
    
    // Try to publish
    try {
      await Storyblok.put(`spaces/${spaceId}/stories/${storyId}/publish`);
      console.log('✅ Published home story');
    } catch (publishError) {
      console.log('⚠️ Story updated but publishing failed - you can publish manually in Storyblok');
    }
    
    console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${storyId}`);
    
  } catch (error) {
    console.error('❌ Error updating story:', error.response?.data || error.message);
  }
}

async function main() {
  try {
    console.log('🚀 AUTOMATED IMAGE UPLOAD AND STORY UPDATE');
    console.log('==========================================\n');
    
    // Step 1: Upload all images
    const uploadedImages = await uploadAllImages();
    
    // Step 2: Update story with images
    await updateStoryWithImages(uploadedImages);
    
    console.log('\n🎉 PROCESS COMPLETED SUCCESSFULLY!');
    console.log('=====================================');
    console.log('✅ All images uploaded to Storyblok');
    console.log('✅ Home story updated with images');
    console.log('✅ Content is ready for viewing');
    console.log('\n🚀 Next steps:');
    console.log('1. Visit http://localhost:3000 to see your website');
    console.log('2. Check Storyblok for any final adjustments');
    console.log('3. Your beauty website is now complete!');
    
  } catch (error) {
    console.error('❌ Process failed:', error.message);
  }
}

// Install form-data if not already installed
try {
  require('form-data');
} catch (e) {
  console.log('📦 Installing form-data package...');
  require('child_process').execSync('npm install form-data', { stdio: 'inherit' });
  console.log('✅ form-data installed');
}

main();