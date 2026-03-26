const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function getAssets() {
  try {
    console.log('📁 Fetching assets from Storyblok...');
    const response = await Storyblok.get(`spaces/${spaceId}/assets`);
    return response.data.assets;
  } catch (error) {
    console.error('❌ Error fetching assets:', error.response?.data || error.message);
    return [];
  }
}

async function updateHomeStory() {
  try {
    // Get all assets
    const assets = await getAssets();
    console.log(`📸 Found ${assets.length} assets in Storyblok`);
    
    // Log available assets
    assets.forEach(asset => {
      console.log(`- ${asset.filename} (${asset.content_type})`);
    });

    // Find specific images by filename
    const findAsset = (filename) => {
      const asset = assets.find(a => a.filename.includes(filename) || a.name === filename);
      return asset ? `https://a.storyblok.com${asset.public_url}` : null;
    };

    // Get the home story first
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

    // Create comprehensive story content with all sections and images
    const storyContent = {
      component: "page",
      body: [
        // Hero Section
        {
          component: "hero_section",
          _uid: "hero_" + Date.now(),
          title: "GLAZED GLOSS CREATIVE COLLECTIVE",
          subtitle: "Brand building. Amplified.",
          description: "Transforming brands into global icons. We leverage our capabilities and proprietary technology to design, market, distribute, scale, and accelerate brands on a global scale.",
          background_image: {
            filename: findAsset("hero") || findAsset("herobanner") || "https://a.storyblok.com/f/288253207803581/2880x836/c3ea154d54/herobanner.png",
            alt: "Hero Background"
          },
          cta_text: "GET STARTED",
          cta_link: "#contact"
        },
        
        // Our Services Section
        {
          component: "our_services",
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
                filename: findAsset("service_1") || "https://a.storyblok.com/f/288253207803581/400x300/placeholder1.jpg",
                alt: "Branding Service"
              }
            },
            {
              _uid: "service_2_" + Date.now(),
              component: "service_item", 
              title: "DIGITAL MARKETING",
              description: "Strategic digital campaigns that drive results",
              image: {
                filename: findAsset("service_2") || "https://a.storyblok.com/f/288253207803581/400x300/placeholder2.jpg",
                alt: "Digital Marketing Service"
              }
            },
            {
              _uid: "service_3_" + Date.now(),
              component: "service_item",
              title: "PRODUCT DEVELOPMENT", 
              description: "From ideation to market-ready products",
              image: {
                filename: findAsset("service_3") || "https://a.storyblok.com/f/288253207803581/400x300/placeholder3.jpg",
                alt: "Product Development Service"
              }
            },
            {
              _uid: "service_4_" + Date.now(),
              component: "service_item",
              title: "RETAIL STRATEGY",
              description: "Comprehensive retail planning and execution",
              image: {
                filename: findAsset("service_4") || "https://a.storyblok.com/f/288253207803581/400x300/placeholder4.jpg", 
                alt: "Retail Strategy Service"
              }
            },
            {
              _uid: "service_5_" + Date.now(),
              component: "service_item",
              title: "CONTENT CREATION",
              description: "Engaging content that tells your brand story",
              image: {
                filename: findAsset("service_5") || "https://a.storyblok.com/f/288253207803581/400x300/placeholder5.jpg",
                alt: "Content Creation Service"
              }
            },
            {
              _uid: "service_6_" + Date.now(),
              component: "service_item",
              title: "GLOBAL DISTRIBUTION",
              description: "Worldwide reach for your beauty brand",
              image: {
                filename: findAsset("service_6") || "https://a.storyblok.com/f/288253207803581/400x300/placeholder6.jpg",
                alt: "Global Distribution Service"
              }
            }
          ]
        },

        // Retail Partners Section
        {
          component: "retail_partners",
          _uid: "partners_" + Date.now(),
          title: "OUR RETAIL PARTNERS",
          subtitle: "Trusted by leading beauty retailers worldwide",
          partners: [
            {
              _uid: "partner_1_" + Date.now(),
              component: "partner_item",
              name: "Sephora",
              logo: {
                filename: findAsset("Group1") || "https://a.storyblok.com/f/288253207803581/150x60/group1.svg",
                alt: "Sephora Logo"
              }
            },
            {
              _uid: "partner_2_" + Date.now(),
              component: "partner_item", 
              name: "ULTA Beauty",
              logo: {
                filename: findAsset("Group2") || "https://a.storyblok.com/f/288253207803581/150x60/group2.svg",
                alt: "ULTA Beauty Logo"
              }
            },
            {
              _uid: "partner_3_" + Date.now(),
              component: "partner_item",
              name: "Nordstrom",
              logo: {
                filename: findAsset("Group3") || "https://a.storyblok.com/f/288253207803581/150x60/group3.svg", 
                alt: "Nordstrom Logo"
              }
            },
            {
              _uid: "partner_4_" + Date.now(),
              component: "partner_item",
              name: "Macy's",
              logo: {
                filename: findAsset("Group4") || "https://a.storyblok.com/f/288253207803581/150x60/group4.svg",
                alt: "Macy's Logo"
              }
            },
            {
              _uid: "partner_5_" + Date.now(),
              component: "partner_item",
              name: "Target",
              logo: {
                filename: findAsset("Group5") || "https://a.storyblok.com/f/288253207803581/150x60/group5.svg",
                alt: "Target Logo"
              }
            },
            {
              _uid: "partner_6_" + Date.now(),
              component: "partner_item",
              name: "CVS",
              logo: {
                filename: findAsset("Group6") || "https://a.storyblok.com/f/288253207803581/150x60/group6.svg",
                alt: "CVS Logo"
              }
            }
          ]
        },

        // Our Work Section
        {
          component: "our_work",
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
                filename: findAsset("work1") || "https://a.storyblok.com/f/288253207803581/400x500/work1.jpg",
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
                filename: findAsset("work2") || "https://a.storyblok.com/f/288253207803581/400x500/work2.jpg",
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
                filename: findAsset("work3") || "https://a.storyblok.com/f/288253207803581/400x500/work3.jpg",
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
                filename: findAsset("work4") || "https://a.storyblok.com/f/288253207803581/400x500/work4.jpg",
                alt: "Kove Project"
              }
            }
          ]
        },

        // Glazed Gloss Section
        {
          component: "glazed_gloss",
          _uid: "glazed_" + Date.now(),
          title: "We're Glazed Gloss",
          subtitle: "Who We Are",
          description: "Based in Beverly Hills, CA, the hub of the film and commercial industry, the executive team of GLAZED GLOSS CREATIVE COLLECTIVE brings a wealth of historical expertise in retail sales and execution. Each C-Suite executive has over 25 years of experience within the core retail team.",
          main_image: {
            filename: findAsset("1.jpg") || "https://a.storyblok.com/f/288253207803581/800x650/glazed-founder.jpg",
            alt: "Glazed Gloss Founder"
          },
          video_url: findAsset("2.mp4") || "https://a.storyblok.com/f/288253207803581/video/glazed-video.mp4",
          signature_image: {
            filename: findAsset("sign") || "https://a.storyblok.com/f/288253207803581/260x80/signature.png",
            alt: "Signature"
          },
          cta_text: "MORE ABOUT GLAZED GLOSS CREATIVE"
        },

        // Transforming Brands Section
        {
          component: "transforming_brands",
          _uid: "transforming_" + Date.now(),
          title: "TRANSFORMING BRANDS",
          subtitle: "Into Global Icons",
          description: "We leverage our capabilities and proprietary technology to design, market, distribute, scale, and accelerate brands on a global scale.",
          statistics: [
            {
              _uid: "stat_1_" + Date.now(),
              component: "statistic_item",
              number: "500+",
              label: "Brands Launched"
            },
            {
              _uid: "stat_2_" + Date.now(),
              component: "statistic_item", 
              number: "50+",
              label: "Countries Reached"
            },
            {
              _uid: "stat_3_" + Date.now(),
              component: "statistic_item",
              number: "$2B+",
              label: "Revenue Generated"
            }
          ],
          background_image: {
            filename: findAsset("transforming") || "https://a.storyblok.com/f/288253207803581/1200x600/transforming-bg.jpg",
            alt: "Transforming Brands Background"
          }
        },

        // Beauty Experts Section
        {
          component: "beauty_experts",
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
                filename: findAsset("expert/1") || "https://a.storyblok.com/f/288253207803581/300x400/expert1.jpg",
                alt: "Beauty Expert 1"
              }
            },
            {
              _uid: "expert_img_2_" + Date.now(),
              image: {
                filename: findAsset("expert/2") || "https://a.storyblok.com/f/288253207803581/300x400/expert2.jpg", 
                alt: "Beauty Expert 2"
              }
            },
            {
              _uid: "expert_img_3_" + Date.now(),
              image: {
                filename: findAsset("expert/3") || "https://a.storyblok.com/f/288253207803581/300x400/expert3.jpg",
                alt: "Beauty Expert 3"
              }
            }
          ],
          cta_text: "SUBSCRIBE AND GET ACCESS"
        },

        // Branding Section
        {
          component: "branding",
          _uid: "branding_" + Date.now(),
          title: "BRANDING EXCELLENCE",
          subtitle: "Creating Memorable Brand Experiences",
          description: "Our branding expertise helps beauty brands stand out in a competitive market with distinctive visual identity and compelling storytelling.",
          brand_images: [
            {
              _uid: "brand_1_" + Date.now(),
              image: {
                filename: findAsset("user1") || "https://a.storyblok.com/f/288253207803581/300x300/brand1.jpg",
                alt: "Brand Example 1"
              }
            },
            {
              _uid: "brand_2_" + Date.now(),
              image: {
                filename: findAsset("user2") || "https://a.storyblok.com/f/288253207803581/300x300/brand2.jpg",
                alt: "Brand Example 2"
              }
            },
            {
              _uid: "brand_3_" + Date.now(),
              image: {
                filename: findAsset("user3") || "https://a.storyblok.com/f/288253207803581/300x300/brand3.jpg",
                alt: "Brand Example 3"
              }
            },
            {
              _uid: "brand_4_" + Date.now(),
              image: {
                filename: findAsset("user4") || "https://a.storyblok.com/f/288253207803581/300x300/brand4.jpg",
                alt: "Brand Example 4"
              }
            }
          ]
        },

        // Gloss Action Section
        {
          component: "gloss_action",
          _uid: "action_" + Date.now(),
          title: "READY TO TRANSFORM YOUR BRAND?",
          subtitle: "Let's Create Something Amazing Together",
          description: "Contact us today to discuss how we can help elevate your beauty brand to new heights.",
          cta_text: "GET STARTED NOW",
          cta_link: "#contact",
          background_image: {
            filename: findAsset("action") || "https://a.storyblok.com/f/288253207803581/1200x600/cta-bg.jpg",
            alt: "Call to Action Background"
          }
        },

        // Video Slider Section
        {
          component: "video_slider",
          _uid: "videos_" + Date.now(),
          title: "BEHIND THE SCENES",
          subtitle: "See Our Work in Action",
          videos: [
            {
              _uid: "video_1_" + Date.now(),
              component: "video_item",
              title: "Brand Launch Campaign",
              thumbnail: {
                filename: findAsset("video1") || "https://a.storyblok.com/f/288253207803581/400x300/video1.jpg",
                alt: "Video 1 Thumbnail"
              },
              video_url: "https://a.storyblok.com/f/288253207803581/video/campaign.mp4"
            },
            {
              _uid: "video_2_" + Date.now(),
              component: "video_item",
              title: "Product Development Process",
              thumbnail: {
                filename: findAsset("video2") || "https://a.storyblok.com/f/288253207803581/400x300/video2.jpg",
                alt: "Video 2 Thumbnail"
              },
              video_url: "https://a.storyblok.com/f/288253207803581/video/development.mp4"
            },
            {
              _uid: "video_3_" + Date.now(),
              component: "video_item",
              title: "Client Success Story",
              thumbnail: {
                filename: findAsset("video3") || "https://a.storyblok.com/f/288253207803581/400x300/video3.jpg",
                alt: "Video 3 Thumbnail"
              },
              video_url: "https://a.storyblok.com/f/288253207803581/video/success.mp4"
            },
            {
              _uid: "video_4_" + Date.now(),
              component: "video_item",
              title: "Global Expansion",
              thumbnail: {
                filename: findAsset("video4") || "https://a.storyblok.com/f/288253207803581/400x300/video4.jpg",
                alt: "Video 4 Thumbnail"
              },
              video_url: "https://a.storyblok.com/f/288253207803581/video/expansion.mp4"
            },
            {
              _uid: "video_5_" + Date.now(),
              component: "video_item",
              title: "Innovation Showcase",
              thumbnail: {
                filename: findAsset("video5") || "https://a.storyblok.com/f/288253207803581/400x300/video5.jpg",
                alt: "Video 5 Thumbnail"
              },
              video_url: "https://a.storyblok.com/f/288253207803581/video/innovation.mp4"
            }
          ]
        },

        // Footer Section
        {
          component: "footer",
          _uid: "footer_" + Date.now(),
          logo: {
            filename: findAsset("logo") || "https://a.storyblok.com/f/288253207803581/200x60/logo.png",
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
                filename: findAsset("1.png") || "https://a.storyblok.com/f/288253207803581/24x24/instagram.png",
                alt: "Instagram"
              }
            },
            {
              _uid: "social_2_" + Date.now(),
              component: "social_link",
              platform: "LinkedIn",
              url: "https://linkedin.com/company/glazedgloss",
              icon: {
                filename: findAsset("2.png") || "https://a.storyblok.com/f/288253207803581/24x24/linkedin.png",
                alt: "LinkedIn"
              }
            },
            {
              _uid: "social_3_" + Date.now(),
              component: "social_link",
              platform: "Twitter",
              url: "https://twitter.com/glazedgloss",
              icon: {
                filename: findAsset("3.png") || "https://a.storyblok.com/f/288253207803581/24x24/twitter.png",
                alt: "Twitter"
              }
            }
          ]
        }
      ]
    };

    // Update the story
    console.log('\n🔄 Updating home story with all sections and images...');
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
    console.log('\n📋 Sections added to home story:');
    storyContent.body.forEach((section, index) => {
      console.log(`${index + 1}. ${section.component} - ${section.title || 'No title'}`);
    });

  } catch (error) {
    console.error('❌ Error updating home story:', error.response?.data || error.message);
  }
}

updateHomeStory();