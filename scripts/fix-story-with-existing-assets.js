const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function getExistingAssets() {
  try {
    console.log('📁 Fetching existing assets from Storyblok...');
    const response = await Storyblok.get(`spaces/${spaceId}/assets`);
    const assets = {};
    
    response.data.assets.forEach(asset => {
      const filename = asset.filename.split('/').pop();
      assets[filename] = `https://a.storyblok.com${asset.public_url}`;
    });
    
    console.log(`📸 Found ${Object.keys(assets).length} existing assets`);
    return assets;
  } catch (error) {
    console.error('❌ Error fetching assets:', error.response?.data || error.message);
    return {};
  }
}

async function updateHomeStoryWithCorrectComponents() {
  try {
    const assets = await getExistingAssets();
    
    console.log('\n📖 Fetching home story...');
    const storyResponse = await Storyblok.get(`spaces/${spaceId}/stories`, {
      with_slug: 'home'
    });
    
    if (!storyResponse.data.stories || storyResponse.data.stories.length === 0) {
      console.error('❌ Home story not found');
      return;
    }

    const homeStory = storyResponse.data.stories[0];
    console.log(`✅ Found home story with ID: ${homeStory.id}`);

    // Helper function to find asset URL
    const getAssetUrl = (filename, fallback) => {
      return assets[filename] || fallback;
    };

    // Create story content with correct component names and existing assets
    const storyContent = {
      component: "Page",
      body: [
        // Hero Section - Fixed component name
        {
          component: "Hero",
          _uid: "hero_" + Date.now(),
          title: "GLAZED GLOSS CREATIVE COLLECTIVE",
          subtitle: "Brand building. Amplified.",
          description: "Transforming brands into global icons. We leverage our capabilities and proprietary technology to design, market, distribute, scale, and accelerate brands on a global scale.",
          background_image: {
            filename: getAssetUrl("hero.gif", "https://a.storyblok.com/f/288253207803581/1920x622/ba14a95d52/hero.gif"),
            alt: "Hero Background"
          },
          cta_text: "GET STARTED",
          cta_link: "#contact"
        },
        
        // Our Services Section
        {
          component: "OurServices",
          _uid: "services_" + Date.now(),
          title: "OUR SERVICES",
          subtitle: "Comprehensive beauty brand solutions",
          services: [
            {
              _uid: "service_1_" + Date.now(),
              component: "service_item",
              title: "BRANDING & IDENTITY",
              description: "Complete brand development from concept to execution",
              image: {
                filename: getAssetUrl("service_1.jpg", "https://a.storyblok.com/f/288253207803581/3024x4032/0a1e9a4a6d/service_1.jpg"),
                alt: "Branding Service"
              }
            },
            {
              _uid: "service_2_" + Date.now(),
              component: "service_item", 
              title: "DIGITAL MARKETING",
              description: "Strategic digital campaigns that drive results",
              image: {
                filename: getAssetUrl("service_2.jpg", "https://a.storyblok.com/f/288253207803581/1024x1533/7c8927612f/service_2.jpg"),
                alt: "Digital Marketing Service"
              }
            },
            {
              _uid: "service_3_" + Date.now(),
              component: "service_item",
              title: "PRODUCT DEVELOPMENT", 
              description: "From ideation to market-ready products",
              image: {
                filename: getAssetUrl("service_3.jpg", "https://a.storyblok.com/f/288253207803581/3024x4032/d198d146ee/service_3.jpg"),
                alt: "Product Development Service"
              }
            },
            {
              _uid: "service_4_" + Date.now(),
              component: "service_item",
              title: "RETAIL STRATEGY",
              description: "Comprehensive retail planning and execution",
              image: {
                filename: getAssetUrl("service_4.jpg", "https://a.storyblok.com/f/288253207803581/4096x2731/593db879f3/service_4.jpg"), 
                alt: "Retail Strategy Service"
              }
            },
            {
              _uid: "service_5_" + Date.now(),
              component: "service_item",
              title: "CONTENT CREATION",
              description: "Engaging content that tells your brand story",
              image: {
                filename: getAssetUrl("service_5.jpg", "https://a.storyblok.com/f/288253207803581/4096x2731/005f6ca553/service_5.jpg"),
                alt: "Content Creation Service"
              }
            },
            {
              _uid: "service_6_" + Date.now(),
              component: "service_item",
              title: "GLOBAL DISTRIBUTION",
              description: "Worldwide reach for your beauty brand",
              image: {
                filename: getAssetUrl("service_6.jpg", "https://a.storyblok.com/f/288253207803581/2496x3744/a1f4a71942/service_6.jpg"),
                alt: "Global Distribution Service"
              }
            }
          ]
        },

        // Retail Partners Section
        {
          component: "RetailPartners",
          _uid: "partners_" + Date.now(),
          title: "OUR RETAIL PARTNERS",
          subtitle: "Trusted by leading beauty retailers worldwide",
          partners: [
            {
              _uid: "partner_1_" + Date.now(),
              component: "partner_item",
              name: "Partner 1",
              logo: {
                filename: getAssetUrl("group6.svg", "https://a.storyblok.com/f/288253207803581/324x35/58482623b4/group6.svg"),
                alt: "Partner 1 Logo"
              }
            },
            {
              _uid: "partner_2_" + Date.now(),
              component: "partner_item", 
              name: "Partner 2",
              logo: {
                filename: getAssetUrl("group9.svg", "https://a.storyblok.com/f/288253207803581/174x40/aa143eed76/group9.svg"),
                alt: "Partner 2 Logo"
              }
            },
            {
              _uid: "partner_3_" + Date.now(),
              component: "partner_item",
              name: "Partner 3",
              logo: {
                filename: getAssetUrl("group11.svg", "https://a.storyblok.com/f/288253207803581/143x40/a248b92500/group11.svg"), 
                alt: "Partner 3 Logo"
              }
            },
            {
              _uid: "partner_4_" + Date.now(),
              component: "partner_item",
              name: "Partner 4",
              logo: {
                filename: getAssetUrl("group14.svg", "https://a.storyblok.com/f/288253207803581/172x40/b8a724993f/group14.svg"), 
                alt: "Partner 4 Logo"
              }
            },
            {
              _uid: "partner_5_" + Date.now(),
              component: "partner_item",
              name: "Partner 5",
              logo: {
                filename: getAssetUrl("group15.svg", "https://a.storyblok.com/f/288253207803581/418x26/051297d41f/group15.svg"), 
                alt: "Partner 5 Logo"
              }
            },
            {
              _uid: "partner_6_" + Date.now(),
              component: "partner_item",
              name: "Partner 6",
              logo: {
                filename: getAssetUrl("group16.svg", "https://a.storyblok.com/f/288253207803581/263x40/0a30b21e56/group16.svg"), 
                alt: "Partner 6 Logo"
              }
            }
          ]
        },

        // Our Work Section
        {
          component: "OurWork",
          _uid: "work_" + Date.now(),
          title: "OUR WORK",
          subtitle: "Featured projects and success stories",
          work_items: [
            {
              _uid: "work_1_" + Date.now(),
              component: "work_item",
              title: "VANITY PLANET",
              description: "Complete brand transformation and global launch",
              category: "BRANDING",
              image: {
                filename: getAssetUrl("work1.jpg", "/work/work1.jpg"),
                alt: "Vanity Planet Project"
              }
            },
            {
              _uid: "work_2_" + Date.now(),
              component: "work_item",
              title: "GLOBAL NOURISH", 
              description: "Product development and market strategy",
              category: "PRODUCTION",
              image: {
                filename: getAssetUrl("work2.jpg", "https://a.storyblok.com/f/288253207803581/2160x3240/38c6973c00/work2.jpg"),
                alt: "Global Nourish Project"
              }
            },
            {
              _uid: "work_3_" + Date.now(),
              component: "work_item",
              title: "HIGHER EDUCATION SKINCARE",
              description: "Full-service brand development",
              category: "FULL SERVICE",
              image: {
                filename: getAssetUrl("work3.jpg", "https://a.storyblok.com/f/288253207803581/1633x2449/e84df005d7/work3.jpg"),
                alt: "Higher Education Skincare Project"
              }
            },
            {
              _uid: "work_4_" + Date.now(),
              component: "work_item",
              title: "KOVE",
              description: "Brand identity and digital presence",
              category: "BRANDING", 
              image: {
                filename: getAssetUrl("work4.jpg", "https://a.storyblok.com/f/288253207803581/2704x3380/76ec03d8d6/work4.jpg"),
                alt: "Kove Project"
              }
            }
          ]
        },

        // Glazed Gloss Section
        {
          component: "GlazedGloss",
          _uid: "glazed_" + Date.now(),
          title: "We're Glazed Gloss",
          subtitle: "Who We Are",
          description: "Based in Beverly Hills, CA, the hub of the film and commercial industry, the executive team of GLAZED GLOSS CREATIVE COLLECTIVE brings a wealth of historical expertise in retail sales and execution. Each C-Suite executive has over 25 years of experience within the core retail team.",
          main_image: {
            filename: getAssetUrl("1.jpg", "https://a.storyblok.com/f/288253207803581/3024x4032/a084f823fa/1.jpg"),
            alt: "Glazed Gloss Founder"
          },
          video_url: getAssetUrl("2.mp4", "/gloss/2.mp4"),
          signature_image: {
            filename: getAssetUrl("sign.png", "/gloss/sign.png"),
            alt: "Signature"
          },
          cta_text: "MORE ABOUT GLAZED GLOSS CREATIVE"
        },

        // Transforming Brands Section
        {
          component: "TransformingBrands",
          _uid: "transforming_" + Date.now(),
          title: "TRUSTED BY GLOBAL BRAND EXPERTS",
          subtitle: "Transforming Brands Into Global Icons",
          description: "We leverage our capabilities and proprietary technology to design, market, distribute, scale, and accelerate brands on a global scale.",
          statistics: [
            {
              _uid: "stat_1_" + Date.now(),
              component: "statistic_item",
              number: "25",
              label: "YEARS IN GGC INDUSTRY"
            },
            {
              _uid: "stat_2_" + Date.now(),
              component: "statistic_item", 
              number: "200%",
              label: "INCREASE IN SALES"
            },
            {
              _uid: "stat_3_" + Date.now(),
              component: "statistic_item",
              number: "5X",
              label: "FASTER PRODUCTION & ASSET DELIVERY"
            },
            {
              _uid: "stat_4_" + Date.now(),
              component: "statistic_item",
              number: "3X",
              label: "OPTIMIZED RETAIL STRATEGY & GLOBAL DISTRIBUTION"
            }
          ],
          background_image: {
            filename: getAssetUrl("1.jpg", "/transforming/1.jpg"),
            alt: "Transforming Brands Background"
          }
        },

        // Beauty Experts Section
        {
          component: "BeautyExperts",
          _uid: "experts_" + Date.now(),
          title: "Hub for Beauty Experts",
          subtitle: "The Ultimate Content Toolkit",
          description: "Access our comprehensive library of beauty content, templates, and resources designed specifically for beauty professionals.",
          features: [
            {
              _uid: "feature_1_" + Date.now(),
              number: "1.",
              title: "Saves Time",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            },
            {
              _uid: "feature_2_" + Date.now(),
              number: "2.", 
              title: "Boosts Engagement",
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            },
            {
              _uid: "feature_3_" + Date.now(),
              number: "3.",
              title: "Gloss Up Your Feed", 
              description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            }
          ],
          expert_images: [
            {
              _uid: "expert_img_1_" + Date.now(),
              image: {
                filename: getAssetUrl("1.jpg", "/expert/1.jpg"),
                alt: "Beauty Expert 1"
              }
            },
            {
              _uid: "expert_img_2_" + Date.now(),
              image: {
                filename: getAssetUrl("2.jpg", "/expert/2.jpg"), 
                alt: "Beauty Expert 2"
              }
            },
            {
              _uid: "expert_img_3_" + Date.now(),
              image: {
                filename: getAssetUrl("3.jpg", "/expert/3.jpg"),
                alt: "Beauty Expert 3"
              }
            }
          ],
          cta_text: "SUBSCRIBE AND GET ACCESS"
        },

        // Branding Section
        {
          component: "Branding",
          _uid: "branding_" + Date.now(),
          title: "Branding and Sales is in our DNA",
          subtitle: "See what global leading brands are saying about us",
          description: "With thousands of retail partnerships—niche boutiques, spas, lifestyle destinations, and big-box retailers—our team is ready to build and optimize your business Globally.",
          brand_images: [
            {
              _uid: "brand_1_" + Date.now(),
              image: {
                filename: getAssetUrl("user1.jpg", "/Branding/user1.jpg"),
                alt: "Brand Example 1"
              }
            },
            {
              _uid: "brand_2_" + Date.now(),
              image: {
                filename: getAssetUrl("user2.jpg", "/Branding/user2.jpg"),
                alt: "Brand Example 2"
              }
            },
            {
              _uid: "brand_3_" + Date.now(),
              image: {
                filename: getAssetUrl("user3.jpg", "/Branding/user3.jpg"),
                alt: "Brand Example 3"
              }
            },
            {
              _uid: "brand_4_" + Date.now(),
              image: {
                filename: getAssetUrl("user4.jpg", "/Branding/user4.jpg"),
                alt: "Brand Example 4"
              }
            }
          ]
        },

        // Gloss Action Section
        {
          component: "GlossAction",
          _uid: "action_" + Date.now(),
          title: "Experience Glazed Gloss in Action",
          subtitle: "Let's Create Something Amazing Together",
          description: "A glimpse into our creative process, impact, passion and strategic creativity for transforming brands",
          cta_text: "Your Brand: Elevated",
          cta_link: "#contact",
          background_image: {
            filename: getAssetUrl("action.mp4", "/gloss/action.mp4"),
            alt: "Call to Action Background"
          }
        },

        // Video Slider Section
        {
          component: "VideoSlider",
          _uid: "videos_" + Date.now(),
          title: "BEHIND THE SCENES",
          subtitle: "See Our Work in Action",
          videos: [
            {
              _uid: "video_1_" + Date.now(),
              component: "video_item",
              title: "Brand Launch Campaign",
              thumbnail: {
                filename: getAssetUrl("video1.jpg", "/gloss/video1.jpg"),
                alt: "Video 1 Thumbnail"
              },
              video_url: getAssetUrl("action.mp4", "/gloss/action.mp4")
            },
            {
              _uid: "video_2_" + Date.now(),
              component: "video_item",
              title: "Product Development Process",
              thumbnail: {
                filename: getAssetUrl("video2.jpg", "/gloss/video2.jpg"),
                alt: "Video 2 Thumbnail"
              },
              video_url: getAssetUrl("2.mp4", "/gloss/2.mp4")
            },
            {
              _uid: "video_3_" + Date.now(),
              component: "video_item",
              title: "Client Success Story",
              thumbnail: {
                filename: getAssetUrl("video3.jpg", "/gloss/video3.jpg"),
                alt: "Video 3 Thumbnail"
              },
              video_url: getAssetUrl("action.mp4", "/gloss/action.mp4")
            }
          ]
        },

        // Footer Section
        {
          component: "Footer",
          _uid: "footer_" + Date.now(),
          logo: {
            filename: getAssetUrl("logo.png", "https://a.storyblok.com/f/288253207803581/447x420/571c997bcd/logo.png"),
            alt: "Glazed Gloss Logo"
          },
          description: "Transforming brands into global icons through innovative beauty solutions and strategic partnerships.",
          contact_info: {
            address: "Beverly Hills, CA 90210",
            phone: "+1 (555) 123-4567",
            email: "hello@glazedgloss.com"
          },
          footer_links: [
            {
              _uid: "link_1_" + Date.now(),
              component: "footer_link",
              title: "Services",
              url: "/services"
            },
            {
              _uid: "link_2_" + Date.now(),
              component: "footer_link", 
              title: "Work",
              url: "/work"
            },
            {
              _uid: "link_3_" + Date.now(),
              component: "footer_link",
              title: "About",
              url: "/about"
            },
            {
              _uid: "link_4_" + Date.now(),
              component: "footer_link",
              title: "Contact",
              url: "/contact"
            }
          ],
          social_links: [
            {
              _uid: "social_1_" + Date.now(),
              component: "social_link",
              platform: "Instagram",
              url: "https://instagram.com/glazedgloss",
              icon: {
                filename: getAssetUrl("1.png", "/footer/1.png"),
                alt: "Instagram"
              }
            },
            {
              _uid: "social_2_" + Date.now(),
              component: "social_link",
              platform: "LinkedIn",
              url: "https://linkedin.com/company/glazedgloss",
              icon: {
                filename: getAssetUrl("2.png", "/footer/2.png"),
                alt: "LinkedIn"
              }
            }
          ]
        }
      ]
    };

    // Update the story
    console.log('\n🔄 Updating home story with correct components and existing assets...');
    const updateResponse = await Storyblok.put(`spaces/${spaceId}/stories/${homeStory.id}`, {
      story: {
        name: homeStory.name,
        slug: homeStory.slug,
        content: storyContent,
        is_folder: false,
        parent_id: homeStory.parent_id
      },
      publish: 1
    });

    console.log('✅ Home story updated successfully!');
    console.log(`📖 Story ID: ${updateResponse.data.story.id}`);
    console.log(`🔗 Preview URL: https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${updateResponse.data.story.id}`);
    
    // Log sections added
    console.log('\n📋 Sections updated in home story:');
    storyContent.body.forEach((section, index) => {
      console.log(`${index + 1}. ${section.component} - ${section.title || 'No title'}`);
    });

  } catch (error) {
    console.error('❌ Error updating home story:', error.response?.data || error.message);
  }
}

updateHomeStoryWithCorrectComponents();