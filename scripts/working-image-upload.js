const StoryblokClient = require('storyblok-js-client');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function uploadImageAndGetUrl(imagePath, filename) {
  try {
    console.log(`📤 Uploading: ${filename}...`);
    
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️ File not found: ${imagePath}`);
      return null;
    }
    
    // Get assets before upload to compare
    const assetsBefore = await Storyblok.get(`spaces/${spaceId}/assets`);
    const beforeCount = assetsBefore.data.assets.length;
    
    // Upload the image
    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));
    formData.append('filename', filename);
    
    await Storyblok.post(`spaces/${spaceId}/assets`, formData, {
      headers: formData.getHeaders()
    });
    
    // Wait a moment for processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get assets after upload
    const assetsAfter = await Storyblok.get(`spaces/${spaceId}/assets`);
    const afterCount = assetsAfter.data.assets.length;
    
    if (afterCount > beforeCount) {
      // Find the newly uploaded asset (should be the first one as they're sorted by creation date)
      const newAsset = assetsAfter.data.assets[0];
      
      console.log(`✅ Uploaded: ${filename} -> ${newAsset.filename}`);
      
      return {
        filename: newAsset.filename,
        alt: filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ')
      };
    } else {
      console.log(`⚠️ Upload may have failed for: ${filename}`);
      return null;
    }
    
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`, error.response?.data || error.message);
    return null;
  }
}

async function uploadKeyImagesWorking() {
  console.log('🚀 Uploading images with working method...');
  
  const imagesToUpload = [
    { path: 'public/hero.gif', name: 'hero-animation.gif', section: 'hero' },
    { path: 'public/hero_bg.gif', name: 'hero-background.gif', section: 'hero' },
    { path: 'public/service_1.jpg', name: 'service-1.jpg', section: 'services' },
    { path: 'public/service_2.jpg', name: 'service-2.jpg', section: 'services' },
    { path: 'public/service_3.jpg', name: 'service-3.jpg', section: 'services' },
    { path: 'public/gloss/1.jpg', name: 'glazed-gloss.jpg', section: 'glazed' },
    { path: 'public/transforming/1.jpg', name: 'transforming-brands.jpg', section: 'transforming' },
    { path: 'public/expert/1.jpg', name: 'expert-1.jpg', section: 'experts' },
    { path: 'public/expert/2.jpg', name: 'expert-2.jpg', section: 'experts' },
    { path: 'public/expert/3.jpg', name: 'expert-3.jpg', section: 'experts' },
    { path: 'public/work/work1.jpg', name: 'work-1.jpg', section: 'work' },
    { path: 'public/work/work2.jpg', name: 'work-2.jpg', section: 'work' },
    { path: 'public/logo.png', name: 'company-logo.png', section: 'footer' }
  ];
  
  const uploadedImages = {};
  
  for (const img of imagesToUpload) {
    const result = await uploadImageAndGetUrl(img.path, img.name);
    if (result) {
      if (!uploadedImages[img.section]) {
        uploadedImages[img.section] = [];
      }
      uploadedImages[img.section].push(result);
    }
    // Rate limiting delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📋 Upload Summary:');
  Object.keys(uploadedImages).forEach(section => {
    console.log(`${section}: ${uploadedImages[section].length} images`);
  });
  
  return uploadedImages;
}

async function updateStoryWithWorkingImages(uploadedImages) {
  try {
    console.log('\n🔄 Updating home story with uploaded images...');
    
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
          background_image: uploadedImages.hero?.[1] || null, // hero-background.gif
          hero_gif: uploadedImages.hero?.[0] || null // hero-animation.gif
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
              image: uploadedImages.services?.[0] || null
            },
            {
              component: "service_item",
              _uid: "service_2_" + Date.now(),
              title: "Product Development",
              description: "From concept to creation, we bring your beauty products to life",
              image: uploadedImages.services?.[1] || null
            },
            {
              component: "service_item",
              _uid: "service_3_" + Date.now(),
              title: "Marketing Strategy",
              description: "Comprehensive marketing solutions to grow your beauty brand",
              image: uploadedImages.services?.[2] || null
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
        
        // Retail Partners (no images for now)
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
              image: uploadedImages.work?.[0] || null
            },
            {
              component: "work_item",
              _uid: "work_2_" + Date.now(),
              title: "Organic Makeup Line",
              description: "Natural beauty brand development and successful retail launch",
              category: "Makeup",
              image: uploadedImages.work?.[1] || null
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
        },
        
        // Glazed Gloss
        {
          component: "glazed_gloss",
          _uid: "glazed_" + Date.now(),
          title: "Glazed Gloss Collection",
          subtitle: "The Future of Lip Beauty",
          description: "Our signature glazed gloss collection represents the pinnacle of lip beauty innovation. With long-lasting formula, stunning finish, and nourishing ingredients, these glosses are designed to make every lip look effortlessly beautiful and feel incredibly smooth.",
          background_color: "#f8f9fa",
          main_image: uploadedImages.glazed?.[0] || null
        },
        
        // Transforming Brands
        {
          component: "transforming_brands",
          _uid: "transforming_" + Date.now(),
          title: "Transforming Brands",
          subtitle: "Beauty Innovation at Its Best",
          description: "We specialize in transforming beauty brands through innovative strategies, cutting-edge product development, and comprehensive market positioning. Our approach ensures your brand stands out in the competitive beauty landscape and achieves sustainable growth.",
          main_image: uploadedImages.transforming?.[0] || null,
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
              image: uploadedImages.experts?.[0] || null
            },
            {
              component: "expert_item",
              _uid: "expert_2_" + Date.now(),
              name: "Michael Chen",
              title: "Brand Strategy Director",
              bio: "Michael brings expertise in brand positioning and market analysis, having worked with luxury beauty brands across Asia and North America to achieve remarkable growth and market penetration.",
              image: uploadedImages.experts?.[1] || null
            },
            {
              component: "expert_item",
              _uid: "expert_3_" + Date.now(),
              name: "Emma Rodriguez",
              title: "Creative Director",
              bio: "Emma's creative vision has shaped the visual identity of numerous successful beauty campaigns and product launches worldwide, earning multiple industry awards for design excellence.",
              image: uploadedImages.experts?.[2] || null
            }
          ]
        },
        
        // Branding (no images for now)
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
        },
        
        // Call to Action (no image for now)
        {
          component: "gloss_action",
          _uid: "action_" + Date.now(),
          title: "Ready to Transform Your Beauty Brand?",
          subtitle: "Let's Create Something Beautiful Together",
          description: "Join hundreds of successful beauty brands that have transformed their business with our expert guidance. From concept to market success, we're here to make your beauty brand dreams a reality. Contact us today for a free consultation.",
          cta_text: "Start Your Transformation",
          cta_link: "/contact"
        },
        
        // Video Slider (no thumbnails for now)
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
        }
      ]
    };
    
    // Update the story
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: updatedContent }
    });
    
    console.log('✅ Story updated with images');
    
    // Try to publish
    try {
      await Storyblok.put(`spaces/${spaceId}/stories/${storyId}/publish`);
      console.log('✅ Story published');
    } catch (publishError) {
      console.log('⚠️ Publishing failed, but story is updated');
    }
    
    console.log(`🌐 Story URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${storyId}`);
    
  } catch (error) {
    console.error('❌ Error updating story:', error.response?.data || error.message);
  }
}

async function main() {
  console.log('🚀 WORKING IMAGE UPLOAD SCRIPT');
  console.log('===============================\n');
  
  // Upload images
  const uploadedImages = await uploadKeyImagesWorking();
  
  // Update story with images
  if (Object.keys(uploadedImages).length > 0) {
    await updateStoryWithWorkingImages(uploadedImages);
    
    console.log('\n🎉 SUCCESS!');
    console.log('✅ Images uploaded and story updated');
    console.log('🚀 Visit http://localhost:3000 to see your website with images!');
  } else {
    console.log('\n❌ No images were uploaded successfully');
  }
}

main();