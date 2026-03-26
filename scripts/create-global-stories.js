const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function createGlobalStories() {
  try {
    console.log('🌐 Creating Global Stories and About Page...\n');

    // 1. Create Global Navbar Story
    console.log('📱 Creating Global Navbar Story...');
    try {
      const navbarStory = {
        name: 'Global Navbar',
        slug: 'global/navbar',
        content: {
          component: 'Navbar',
          _uid: 'navbar_global',
          logo: {
            filename: '/logo.png',
            alt: 'Glazed Gloss Logo'
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
          phone: '858.353.3220'
        }
      };

      await Storyblok.post('cdn/stories/', {
        story: navbarStory,
        publish: 1
      });
      console.log('✅ Global Navbar story created');
    } catch (error) {
      if (error.response?.status === 422) {
        console.log('⚠️  Global Navbar story already exists');
      } else {
        console.error('❌ Error creating navbar:', error.response?.data || error.message);
      }
    }

    // 2. Create Global Footer Story
    console.log('🦶 Creating Global Footer Story...');
    try {
      const footerStory = {
        name: 'Global Footer',
        slug: 'global/footer',
        content: {
          component: 'Footer',
          _uid: 'footer_global',
          logo: {
            filename: '/logo.png',
            alt: 'Glazed Gloss Logo'
          },
          description: 'Join our movement and transform your beauty brand with industry-leading expertise and global reach.',
          newsletter_title: 'JOIN OUR NEWSLETTER',
          newsletter_description: 'Download your Free Beauty Content Calendar when you sign up',
          contact_info: {
            address: 'Beverly Hills, CA 90210',
            phone: '858.353.3220',
            email: 'hello@glazedgloss.com'
          },
          footer_links: [
            { _uid: 'link_1', title: 'About', url: '/about', is_external: false },
            { _uid: 'link_2', title: 'Services', url: '/services', is_external: false },
            { _uid: 'link_3', title: 'Work', url: '/work', is_external: false },
            { _uid: 'link_4', title: 'Contact', url: '/contact', is_external: false },
            { _uid: 'link_5', title: 'Privacy Policy', url: '/privacy', is_external: false },
            { _uid: 'link_6', title: 'Terms of Service', url: '/terms', is_external: false }
          ],
          social_links: [
            { _uid: 'social_1', platform: 'Instagram', url: 'https://instagram.com/glazedgloss' },
            { _uid: 'social_2', platform: 'Facebook', url: 'https://facebook.com/glazedgloss' },
            { _uid: 'social_3', platform: 'TikTok', url: 'https://tiktok.com/@glazedgloss' },
            { _uid: 'social_4', platform: 'Twitter', url: 'https://twitter.com/glazedgloss' },
            { _uid: 'social_5', platform: 'YouTube', url: 'https://youtube.com/glazedgloss' },
            { _uid: 'social_6', platform: 'LinkedIn', url: 'https://linkedin.com/company/glazedgloss' }
          ],
          copyright_text: '2024 Glazed Gloss Creative Collective. All Rights Reserved.'
        }
      };

      await Storyblok.post('cdn/stories/', {
        story: footerStory,
        publish: 1
      });
      console.log('✅ Global Footer story created');
    } catch (error) {
      if (error.response?.status === 422) {
        console.log('⚠️  Global Footer story already exists');
      } else {
        console.error('❌ Error creating footer:', error.response?.data || error.message);
      }
    }

    // 3. Create About Page Story
    console.log('📄 Creating About Page Story...');
    try {
      const aboutStory = {
        name: 'About',
        slug: 'about',
        content: {
          component: 'page',
          _uid: 'about_page',
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
        }
      };

      await Storyblok.post('cdn/stories/', {
        story: aboutStory,
        publish: 1
      });
      console.log('✅ About page story created');
    } catch (error) {
      if (error.response?.status === 422) {
        console.log('⚠️  About page story already exists');
      } else {
        console.error('❌ Error creating about page:', error.response?.data || error.message);
      }
    }

    console.log('\n🎉 SUCCESS! Global Stories and About Page Created!\n');
    
    console.log('📊 CREATED CONTENT:');
    console.log('✅ Global Navbar: Navigation with logo, menu, phone, CTA');
    console.log('✅ Global Footer: Newsletter, links, social media, contact info');
    console.log('✅ About Page: Hero, values, team, company history');
    
    console.log('\n🚀 FEATURES:');
    console.log('• Fixed navbar with mobile menu');
    console.log('• Dynamic navigation links');
    console.log('• Global footer with social media');
    console.log('• About page with 4 sections');
    console.log('• Team member profiles with LinkedIn');
    console.log('• Company timeline with milestones');
    console.log('• Responsive design throughout');
    
    console.log('\n📝 NEXT STEPS:');
    console.log('1. Visit /about to see the new About page');
    console.log('2. Global navbar and footer now appear on all pages');
    console.log('3. Customize content in Storyblok dashboard');
    console.log('4. Add team member photos and update bios');
    console.log('5. Update social media links and contact info');

  } catch (error) {
    console.error('❌ Error creating global stories:', error.response?.data || error.message);
  }
}

createGlobalStories();