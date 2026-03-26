const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function addGlobalToHome() {
  try {
    console.log('🏠 Adding Global Components to Home Story...\n');
    
    // Get current home story
    const response = await Storyblok.get('cdn/stories/home', {
      version: 'draft'
    });
    
    const story = response.data.story;
    console.log(`✅ Found home story: ${story.name} (ID: ${story.id})`);
    
    // Add navbar data to the story content
    story.content.navbar = {
      _uid: 'navbar_' + Date.now(),
      component: 'Navbar',
      logo: {
        filename: '/logo.png',
        alt: 'Glazed Gloss Creative Collective Logo'
      },
      nav_links: [
        { _uid: 'nav_1', label: 'Home', url: '/', is_external: false },
        { _uid: 'nav_2', label: 'About', url: '/about', is_external: false },
        { _uid: 'nav_3', label: 'Services', url: '/services', is_external: false },
        { _uid: 'nav_4', label: 'Work', url: '/work', is_external: false },
        { _uid: 'nav_5', label: 'Contact', url: '/contact', is_external: false }
      ],
      cta_text: 'HIRE GLAZED GLOSS',
      cta_url: '/contact',
      phone: '858.353.3220',
      contact_info: {
        address: 'Beverly Hills, CA 90210',
        phone: '858.353.3220',
        email: 'hello@glazedgloss.com'
      }
    };
    
    // Add footer data to the story content
    story.content.footer = {
      _uid: 'footer_' + Date.now(),
      component: 'Footer',
      logo: {
        filename: '/logo.png',
        alt: 'Glazed Gloss Creative Collective Logo'
      },
      description: 'Join our movement and transform your beauty brand with industry-leading expertise and global reach.',
      newsletter_title: 'JOIN OUR NEWSLETTER',
      newsletter_description: 'Download your Free Beauty Content Calendar when you sign up for exclusive industry insights.',
      copyright_text: '2024 Glazed Gloss Creative Collective. All Rights Reserved.',
      contact_info: {
        address: 'Beverly Hills, CA 90210',
        phone: '858.353.3220',
        email: 'hello@glazedgloss.com'
      },
      footer_links: [
        { _uid: 'link_1', title: 'About Us', url: '/about', is_external: false },
        { _uid: 'link_2', title: 'Services', url: '/services', is_external: false },
        { _uid: 'link_3', title: 'Work', url: '/work', is_external: false },
        { _uid: 'link_4', title: 'Contact', url: '/contact', is_external: false },
        { _uid: 'link_5', title: 'Privacy Policy', url: '/privacy', is_external: false },
        { _uid: 'link_6', title: 'Terms', url: '/terms', is_external: false }
      ],
      social_links: [
        { _uid: 'social_1', platform: 'Instagram', url: 'https://instagram.com/glazedgloss', handle: '@glazedgloss' },
        { _uid: 'social_2', platform: 'Facebook', url: 'https://facebook.com/glazedgloss', handle: 'Glazed Gloss' },
        { _uid: 'social_3', platform: 'TikTok', url: 'https://tiktok.com/@glazedgloss', handle: '@glazedgloss' },
        { _uid: 'social_4', platform: 'Twitter', url: 'https://twitter.com/glazedgloss', handle: '@glazedgloss' },
        { _uid: 'social_5', platform: 'YouTube', url: 'https://youtube.com/glazedgloss', handle: 'Glazed Gloss' },
        { _uid: 'social_6', platform: 'LinkedIn', url: 'https://linkedin.com/company/glazedgloss', handle: 'Glazed Gloss' }
      ]
    };
    
    // Update the story
    console.log('🔄 Updating home story with global data...');
    const updateResponse = await Storyblok.put(`cdn/stories/${story.id}`, {
      story: {
        name: story.name,
        slug: story.slug,
        content: story.content
      },
      publish: 1
    });
    
    console.log('\n🎉 SUCCESS! Global data added to Home story!\n');
    
    console.log('📊 ADDED TO HOME STORY:');
    console.log('   ✅ Navbar data with navigation links');
    console.log('   ✅ Footer data with social media links');
    console.log('   ✅ Contact information');
    console.log('   ✅ All existing home content preserved');
    console.log('');
    console.log('🔧 HOW TO ACCESS:');
    console.log('   • Navbar data: story.content.navbar');
    console.log('   • Footer data: story.content.footer');
    console.log('   • Home sections: story.content.body');
    console.log('');
    console.log('📝 NEXT STEPS:');
    console.log('1. Check your Storyblok home story - it now has navbar and footer data');
    console.log('2. The Layout component will use this data');
    console.log('3. All content is editable in the home story');
    console.log('4. No separate stories needed - everything in one place!');
    
  } catch (error) {
    console.error('❌ Error adding global data to home:', error.response?.data || error.message);
  }
}

addGlobalToHome();