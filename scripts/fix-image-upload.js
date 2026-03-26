const StoryblokClient = require('storyblok-js-client');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function testImageUpload() {
  try {
    console.log('🧪 Testing image upload with debugging...');
    
    const testImagePath = 'public/hero.gif';
    
    if (!fs.existsSync(testImagePath)) {
      console.error('❌ Test image not found:', testImagePath);
      return;
    }
    
    console.log('📤 Uploading test image...');
    
    const formData = new FormData();
    formData.append('file', fs.createReadStream(testImagePath));
    formData.append('filename', 'test-hero.gif');
    
    console.log('📋 FormData prepared, sending request...');
    
    const response = await Storyblok.post(`spaces/${spaceId}/assets`, formData, {
      headers: formData.getHeaders()
    });
    
    console.log('✅ Upload successful!');
    console.log('Response structure:', JSON.stringify(response.data, null, 2));
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Upload failed:');
    console.error('Error message:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

async function uploadSingleImage(imagePath, filename) {
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
    
    console.log(`✅ Uploaded: ${filename}`);
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    // Return the correct image object based on actual response structure
    return {
      filename: response.data.pretty_url || response.data.filename,
      alt: filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ')
    };
    
  } catch (error) {
    console.error(`❌ Failed to upload ${filename}:`);
    console.error('Error:', error.response?.data || error.message);
    return null;
  }
}

async function uploadKeyImages() {
  console.log('🚀 Uploading key images for testing...');
  
  const keyImages = [
    { path: 'public/hero.gif', name: 'hero-animation.gif' },
    { path: 'public/hero_bg.gif', name: 'hero-background.gif' },
    { path: 'public/service_1.jpg', name: 'service-1.jpg' },
    { path: 'public/logo.png', name: 'company-logo.png' },
    { path: 'public/gloss/1.jpg', name: 'glazed-gloss.jpg' }
  ];
  
  const uploadedImages = {};
  
  for (const img of keyImages) {
    const result = await uploadSingleImage(img.path, img.name);
    if (result) {
      uploadedImages[img.name] = result;
    }
    // Add delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📋 Upload Summary:');
  console.log('Uploaded images:', Object.keys(uploadedImages));
  
  return uploadedImages;
}

async function updateStoryWithTestImages(uploadedImages) {
  try {
    console.log('\n🔄 Updating story with uploaded images...');
    
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
    
    // Get current content
    const currentContent = homeStory.content;
    
    // Update hero section with images if available
    if (currentContent.body && currentContent.body.length > 0) {
      const heroSection = currentContent.body.find(block => block.component === 'hero');
      if (heroSection && uploadedImages['hero-animation.gif']) {
        heroSection.hero_gif = uploadedImages['hero-animation.gif'];
        console.log('✅ Added hero animation');
      }
      if (heroSection && uploadedImages['hero-background.gif']) {
        heroSection.background_image = uploadedImages['hero-background.gif'];
        console.log('✅ Added hero background');
      }
      
      // Update glazed gloss section
      const glazedSection = currentContent.body.find(block => block.component === 'glazed_gloss');
      if (glazedSection && uploadedImages['glazed-gloss.jpg']) {
        glazedSection.main_image = uploadedImages['glazed-gloss.jpg'];
        console.log('✅ Added glazed gloss image');
      }
      
      // Update service section
      const servicesSection = currentContent.body.find(block => block.component === 'our_services');
      if (servicesSection && servicesSection.services && uploadedImages['service-1.jpg']) {
        servicesSection.services[0].image = uploadedImages['service-1.jpg'];
        console.log('✅ Added service image');
      }
    }
    
    // Update the story
    await Storyblok.put(`spaces/${spaceId}/stories/${storyId}`, {
      story: { content: currentContent }
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
  console.log('🚀 FIXED IMAGE UPLOAD SCRIPT');
  console.log('============================\n');
  
  // Step 1: Test single upload
  await testImageUpload();
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Step 2: Upload key images
  const uploadedImages = await uploadKeyImages();
  
  // Step 3: Update story
  if (Object.keys(uploadedImages).length > 0) {
    await updateStoryWithTestImages(uploadedImages);
    
    console.log('\n🎉 SUCCESS!');
    console.log('✅ Images uploaded and story updated');
    console.log('🚀 Visit http://localhost:3000 to see your website');
  } else {
    console.log('\n❌ No images were uploaded successfully');
  }
}

main();