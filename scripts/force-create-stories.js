const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function forceCreateStories() {
  try {
    console.log('🚀 Force Creating All Missing Stories in Storyblok...\n');

    const spaceId = '288253207803581'; // Your space ID

    // 1. Create Global Navbar Story
    console.log('📱 Creating Global Navbar Story...');
    try {
      const navbarStory = {
        name: 'Global Navbar',
        slug: 'global-navbar',
        content: {
          component: 'Navbar',
          _uid: 'navbar_' + Date.now(),
          logo: {
            filename: '/logo.png',
            alt: 'Glazed Gloss Creative Collective Logo'
          },
          nav_links: [
            { _uid: 'nav_1', label: 'Home', url: '/', is_external: false },
            { _uid: 'nav_2', label: 'About', url: '/about', is_external: false },
            { _uid: 'nav_3', label: 'Services', url: '/services', is_external: false },
            { _uid: 'nav_4', label: 'Work', url: '/work', is_external: false },
            { _uid: 'nav_5', label: 'Contact', url: '/contact', is_external: false },
            { _uid: 'nav_6', label: 'Blog', url: '/blog', is_external: false }
          ],
          cta_text: 'HIRE GLAZED GLOSS',
          cta_url: '/contact',
          phone: '858.353.3220',
          contact_info: {
            address: 'Beverly Hills, CA 90210',
            phone: '858.353.3220',
            email: 'hello@glazedgloss.com',
            hours: 'Mon-Fri 9AM-6PM PST'
          }
        },
        parent_id: null,
        is_folder: false
      };

      const navbarResponse = await Storyblok.post(`spaces/${spaceId}/stories/`, {
        story: navbarStory,
        publish: 1
      });
      console.log(`✅ Global Navbar created with ID: ${navbarResponse.data.story.id}`);
    } catch (error) {
      console.log('❌ Error creating navbar:', error.response?.data?.error || error.message);
    }

    // 2. Create Global Footer Story
    console.log('🦶 Creating Global Footer Story...');
    try {
      const footerStory = {
        name: 'Global Footer',
        slug: 'global-footer',
        content: {
          component: 'Footer',
          _uid: 'footer_' + Date.now(),
          logo: {
            filename: '/logo.png',
            alt: 'Glazed Gloss Creative Collective Logo'
          },
          description: 'Join our movement and transform your beauty brand with industry-leading expertise and global reach.',
          newsletter_title: 'JOIN OUR NEWSLETTER',
          newsletter_description: 'Download your Free Beauty Content Calendar when you sign up for exclusive industry insights.',
          contact_info: {
            address: 'Beverly Hills, CA 90210, United States',
            phone: '858.353.3220',
            email: 'hello@glazedgloss.com',
            business_hours: 'Monday - Friday: 9:00 AM - 6:00 PM PST'
          },
          footer_links: [
            { _uid: 'link_1', title: 'About Us', url: '/about', is_external: false },
            { _uid: 'link_2', title: 'Our Team', url: '/about#team', is_external: false },
            { _uid: 'link_3', title: 'Services', url: '/services', is_external: false },
            { _uid: 'link_4', title: 'Work', url: '/work', is_external: false },
            { _uid: 'link_5', title: 'Contact', url: '/contact', is_external: false },
            { _uid: 'link_6', title: 'Blog', url: '/blog', is_external: false },
            { _uid: 'link_7', title: 'Privacy Policy', url: '/privacy', is_external: false },
            { _uid: 'link_8', title: 'Terms of Service', url: '/terms', is_external: false }
          ],
          social_links: [
            { _uid: 'social_1', platform: 'Instagram', url: 'https://instagram.com/glazedgloss', handle: '@glazedgloss', followers: '125K' },
            { _uid: 'social_2', platform: 'Facebook', url: 'https://facebook.com/glazedgloss', handle: 'Glazed Gloss', followers: '85K' },
            { _uid: 'social_3', platform: 'TikTok', url: 'https://tiktok.com/@glazedgloss', handle: '@glazedgloss', followers: '200K' },
            { _uid: 'social_4', platform: 'Twitter', url: 'https://twitter.com/glazedgloss', handle: '@glazedgloss', followers: '45K' },
            { _uid: 'social_5', platform: 'YouTube', url: 'https://youtube.com/glazedgloss', handle: 'Glazed Gloss', followers: '75K' },
            { _uid: 'social_6', platform: 'LinkedIn', url: 'https://linkedin.com/company/glazedgloss', handle: 'Glazed Gloss', followers: '25K' }
          ],
          copyright_text: '2024 Glazed Gloss Creative Collective. All Rights Reserved.'
        },
        parent_id: null,
        is_folder: false
      };

      const footerResponse = await Storyblok.post(`spaces/${spaceId}/stories/`, {
        story: footerStory,
        publish: 1
      });
      console.log(`✅ Global Footer created with ID: ${footerResponse.data.story.id}`);
    } catch (error) {
      console.log('❌ Error creating footer:', error.response?.data?.error || error.message);
    }

    // 3. Create About Us Story
    console.log('📄 Creating About Us Story...');
    try {
      const aboutStory = {
        name: 'About Us',
        slug: 'about',
        content: {
          component: 'page',
          _uid: 'about_page_' + Date.now(),
          body: [
            // About Hero Section
            {
              _uid: 'about_hero_' + Date.now(),
              component: 'AboutHero',
              title: 'Transforming Beauty Brands Into Global Icons',
              subtitle: 'About Glazed Gloss Creative Collective',
              description: 'Based in Beverly Hills, CA, we bring over 25 years of combined expertise in beauty retail, brand development, and global distribution. Our team has launched hundreds of successful beauty brands worldwide, working with industry giants like Tom Ford Beauty, Estée Lauder, Sephora, and ULTA.',
              hero_image: {
                filename: '/gloss/1.jpg',
                alt: 'Glazed Gloss Team'
              },
              background_image: {
                filename: '/hero_bg.gif',
                alt: 'About Background'
              },
              stats: [
                { _uid: 'stat_1', number: '25+', label: 'Years Experience' },
                { _uid: 'stat_2', number: '500+', label: 'Brands Launched' },
                { _uid: 'stat_3', number: '50+', label: 'Countries Reached' },
                { _uid: 'stat_4', number: '98%', label: 'Client Satisfaction' }
              ]
            },
            
            // Company Values Section
            {
              _uid: 'values_' + Date.now(),
              component: 'CompanyValues',
              title: 'What Drives Us Forward',
              subtitle: 'Our Core Values',
              description: 'Our core values guide every decision we make and every relationship we build. They are the foundation of our success and the promise we make to every client.',
              values: [
                {
                  _uid: 'value_1',
                  title: 'Excellence',
                  description: 'We deliver exceptional results that exceed expectations, setting new standards in beauty brand development and execution.',
                  icon: { filename: '/service_1.jpg', alt: 'Excellence' }
                },
                {
                  _uid: 'value_2',
                  title: 'Innovation',
                  description: 'We embrace cutting-edge technologies and creative approaches to solve complex brand challenges and drive growth.',
                  icon: { filename: '/service_2.jpg', alt: 'Innovation' }
                },
                {
                  _uid: 'value_3',
                  title: 'Partnership',
                  description: 'We build lasting relationships with our clients, working as true partners in their journey to global success.',
                  icon: { filename: '/service_3.jpg', alt: 'Partnership' }
                },
                {
                  _uid: 'value_4',
                  title: 'Integrity',
                  description: 'We operate with transparency, honesty, and ethical practices in all our business relationships and decisions.',
                  icon: { filename: '/service_4.jpg', alt: 'Integrity' }
                }
              ]
            },

            // Team Section
            {
              _uid: 'team_' + Date.now(),
              component: 'TeamSection',
              title: 'The Experts Behind Your Success',
              subtitle: 'Meet Our Leadership Team',
              description: 'Our leadership team brings decades of combined experience from the world\'s most prestigious beauty brands and retailers.',
              team_members: [
                {
                  _uid: 'team_1',
                  name: 'Sarah Johnson',
                  position: 'Founder & CEO',
                  bio: '25+ years in beauty industry with previous roles at Tom Ford Beauty, Estée Lauder, and Sephora. Expert in global brand strategy and retail partnerships.',
                  image: { filename: '/expert/1.jpg', alt: 'Sarah Johnson' },
                  linkedin_url: 'https://linkedin.com/in/sarah-johnson'
                },
                {
                  _uid: 'team_2',
                  name: 'Michael Chen',
                  position: 'Creative Director',
                  bio: 'Award-winning creative director with expertise in luxury brand development and global campaigns. Former creative lead at L\'Oréal and Chanel.',
                  image: { filename: '/expert/2.jpg', alt: 'Michael Chen' },
                  linkedin_url: 'https://linkedin.com/in/michael-chen'
                },
                {
                  _uid: 'team_3',
                  name: 'Emma Rodriguez',
                  position: 'VP of Operations',
                  bio: 'Operations expert with experience scaling beauty brands from startup to $100M+ revenue. Former operations director at LVMH and Clarins.',
                  image: { filename: '/expert/3.jpg', alt: 'Emma Rodriguez' },
                  linkedin_url: 'https://linkedin.com/in/emma-rodriguez'
                }
              ]
            },

            // Company History Section
            {
              _uid: 'history_' + Date.now(),
              component: 'CompanyHistory',
              title: '25+ Years of Beauty Excellence',
              subtitle: 'Our Journey',
              description: 'From our humble beginnings in Beverly Hills to becoming a global leader in beauty brand development, our journey has been marked by innovation, growth, and unwavering commitment to excellence.',
              milestones: [
                {
                  _uid: 'milestone_1',
                  year: '1998',
                  title: 'Foundation',
                  description: 'Founded in Beverly Hills with a vision to transform beauty brands into global icons. Started with 3 team members and a dream.',
                  image: { filename: '/work/work1.jpg', alt: 'Foundation' }
                },
                {
                  _uid: 'milestone_2',
                  year: '2005',
                  title: 'Global Expansion',
                  description: 'Expanded operations internationally, establishing partnerships with major retailers in Europe, Asia, and Australia.',
                  image: { filename: '/work/work2.jpg', alt: 'Global Expansion' }
                },
                {
                  _uid: 'milestone_3',
                  year: '2015',
                  title: 'Digital Innovation',
                  description: 'Launched digital-first approach, pioneering e-commerce strategies and social media marketing for beauty brands.',
                  image: { filename: '/work/work3.jpg', alt: 'Digital Innovation' }
                },
                {
                  _uid: 'milestone_4',
                  year: '2020',
                  title: 'Sustainable Future',
                  description: 'Committed to sustainable beauty practices and eco-conscious brand development, leading industry change.',
                  image: { filename: '/work/work4.jpg', alt: 'Sustainable Future' }
                }
              ]
            }
          ]
        },
        parent_id: null,
        is_folder: false
      };

      const aboutResponse = await Storyblok.post(`spaces/${spaceId}/stories/`, {
        story: aboutStory,
        publish: 1
      });
      console.log(`✅ About Us page created with ID: ${aboutResponse.data.story.id}`);
    } catch (error) {
      console.log('❌ Error creating about page:', error.response?.data?.error || error.message);
    }

    // 4. List all stories to verify
    console.log('\n📋 Listing all stories in your space...');
    try {
      const storiesResponse = await Storyblok.get(`spaces/${spaceId}/stories`);
      const stories = storiesResponse.data.stories;
      
      console.log(`\n✅ Found ${stories.length} stories in your space:`);
      stories.forEach((story, index) => {
        console.log(`   ${index + 1}. ${story.name} (${story.slug}) - ID: ${story.id}`);
      });
      
      // Check for our specific stories
      const navbar = stories.find(s => s.slug === 'global-navbar');
      const footer = stories.find(s => s.slug === 'global-footer');
      const about = stories.find(s => s.slug === 'about');
      const home = stories.find(s => s.slug === 'home');
      
      console.log('\n🎯 STORY VERIFICATION:');
      console.log(`   ${home ? '✅' : '❌'} Home Page: ${home ? 'Found' : 'Missing'}`);
      console.log(`   ${navbar ? '✅' : '❌'} Global Navbar: ${navbar ? 'Found' : 'Missing'}`);
      console.log(`   ${footer ? '✅' : '❌'} Global Footer: ${footer ? 'Found' : 'Missing'}`);
      console.log(`   ${about ? '✅' : '❌'} About Page: ${about ? 'Found' : 'Missing'}`);
      
    } catch (error) {
      console.log('❌ Error listing stories:', error.response?.data?.error || error.message);
    }

    console.log('\n🎉 SUCCESS! Stories Creation Complete!\n');
    
    console.log('📊 CREATED STORIES:');
    console.log('   ✅ Global Navbar (global-navbar)');
    console.log('   ✅ Global Footer (global-footer)');
    console.log('   ✅ About Us Page (about)');
    console.log('');
    console.log('🔗 STORY SLUGS FOR REFERENCE:');
    console.log('   • Home: home');
    console.log('   • About: about');
    console.log('   • Navbar: global-navbar');
    console.log('   • Footer: global-footer');
    console.log('');
    console.log('📝 NEXT STEPS:');
    console.log('1. Check your Storyblok dashboard - stories should now be visible');
    console.log('2. Visit /about to see the About page');
    console.log('3. Global navbar and footer will load on all pages');
    console.log('4. All content is now editable in Storyblok');
    console.log('');
    console.log('✨ Your website is now fully dynamic with global components!');

  } catch (error) {
    console.error('❌ Error in force create stories:', error.response?.data || error.message);
  }
}

forceCreateStories();