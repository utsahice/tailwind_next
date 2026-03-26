const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN,
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function finalCreateHome() {
  try {
    console.log('🚀 Final attempt to create home story with content...');
    
    // Create the story with a unique slug first, then update it
    const uniqueSlug = 'home-' + Date.now();
    
    console.log('📝 Step 1: Creating story with unique slug...');
    
    