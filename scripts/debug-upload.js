const StoryblokClient = require('storyblok-js-client');
const fs = require('fs');
const FormData = require('form-data');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function debugUpload() {
  try {
    console.log('🔍 Debugging upload response...');
    
    const testImagePath = 'public/hero.gif';
    
    const formData = new FormData();
    formData.append('file', fs.createReadStream(testImagePath));
    formData.append('filename', 'debug-test.gif');
    
    const response = await Storyblok.post(`spaces/${spaceId}/assets`, formData, {
      headers: formData.getHeaders()
    });
    
    console.log('✅ Upload successful!');
    console.log('Full response object:');
    console.log('- response keys:', Object.keys(response));
    console.log('- response.data:', response.data);
    console.log('- response.data type:', typeof response.data);
    
    if (response.data) {
      console.log('- response.data keys:', Object.keys(response.data));
    }
    
    // Check if it's in a different property
    console.log('- response.body:', response.body);
    console.log('- response.result:', response.result);
    
    // Try to get assets to see the uploaded file
    console.log('\n🔍 Checking uploaded assets...');
    const assetsResponse = await Storyblok.get(`spaces/${spaceId}/assets`);
    console.log('Assets response:', assetsResponse.data);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  }
}

debugUpload();