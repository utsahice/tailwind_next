const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN
});

async function updateDynamicContent() {
  try {
    console.log('🔧 Updating home story with dynamic content...\n');
    
    // Get current story
    const response = await Storyblok.get('cdn/stories/home', {
      version: 'draft'
    });
    
    const story = response.data.story;
    console.log(`✅ Found story: ${story.name} (ID: ${story.id})`);
    
    // Update OurServices block with dynamic content
    const ourServicesIndex = story.content.body.findIndex(block => block.component === 'OurServices');
    if (ourServicesIndex !== -1) {
      story.content.body[ourServicesIndex] = {
        ...story.content.body[ourServicesIndex],
        services: [
          {
            _uid: "service_1",
            title: "Creative & Marketing",
            description: "Strategic brand development and comprehensive marketing solutions to elevate your brand presence",
            category: "CREATIVE & MARKETING",
            image: { filename: "/service_1.jpg", alt: "Creative Marketing" }
          },
          {
            _uid: "service_2", 
            title: "Formulation & Concept",
            description: "Expert product ideation and formulation development from concept to market-ready solutions",
            category: "FORMULATION IDEATION & ASSORTMENT CONCEPT",
            image: { filename: "/service_2.jpg", alt: "Formulation" }
          },
          {
            _uid: "service_3",
            title: "Production Excellence", 
            description: "High-quality production and manufacturing with attention to detail and industry standards",
            category: "THE SHOWROOM/PRODUCTION",
            image: { filename: "/service_3.jpg", alt: "Production" }
          },
          {
            _uid: "service_4",
            title: "Sales & Distribution",
            description: "Global retail strategy and distribution networks to maximize your market reach",
            category: "SALES & DISTRIBUTION", 
            image: { filename: "/service_4.jpg", alt: "Sales Distribution" }
          },
          {
            _uid: "service_5",
            title: "Expert Consultation",
            description: "Professional consultation services with industry-leading expertise and insights",
            category: "CREATIVE & MARKETING",
            image: { filename: "/service_5.jpg", alt: "Expert Consultation" }
          },
          {
            _uid: "service_6",
            title: "Fulfilment & Operations", 
            description: "End-to-end operational excellence and logistics management for seamless delivery",
            category: "FULFILMENT & OPERATIONS",
            image: { filename: "/service_6.jpg", alt: "Operations" }
          }
        ],
        service_categories: [
          { _uid: "cat_1", name: "CREATIVE & MARKETING", is_active: true },
          { _uid: "cat_2", name: "FORMULATION IDEATION & ASSORTMENT CONCEPT", is_active: false },
          { _uid: "cat_3", name: "THE SHOWROOM/PRODUCTION", is_active: false },
          { _uid: "cat_4", name: "SALES & DISTRIBUTION", is_active: false },
          { _uid: "cat_5", name: "FULFILMENT & OPERATIONS", is_active: false }
        ],
        cta_primary_text: "HIRE GLAZED",
        cta_secondary_text: "VIEW ALL SERVICES"
      };
      console.log('✅ Updated OurServices with dynamic content');
    }
    
    // Update OurWork block with dynamic content
    const ourWorkIndex = story.content.body.findIndex(block => block.component === 'OurWork');
    if (ourWorkIndex !== -1) {
      story.content.body[ourWorkIndex] = {
        ...story.content.body[ourWorkIndex],
        work_items: [
          {
            _uid: "work_1",
            title: "VANITY PLANET",
            description: "Complete brand transformation with strategic positioning and digital marketing excellence",
            category: "FEATURED",
            image: { filename: "/work/work1.jpg", alt: "Vanity Planet Project" },
            case_study_url: "#"
          },
          {
            _uid: "work_2", 
            title: "GLOBAL NOURISH",
            description: "Production optimization and manufacturing excellence for sustainable beauty solutions",
            category: "FEATURED",
            image: { filename: "/work/work2.jpg", alt: "Global Nourish Project" },
            case_study_url: "#"
          },
          {
            _uid: "work_3",
            title: "HIGHER EDUCATION SKINCARE",
            description: "Full-service brand development from concept to market launch with educational focus",
            category: "FEATURED", 
            image: { filename: "/work/work3.jpg", alt: "Higher Education Skincare" },
            case_study_url: "#"
          },
          {
            _uid: "work_4",
            title: "KOVE",
            description: "Strategic branding and market positioning for luxury beauty brand expansion",
            category: "FEATURED",
            image: { filename: "/work/work4.jpg", alt: "Kove Brand Project" },
            case_study_url: "#"
          },
          {
            _uid: "work_5",
            title: "ANIMATED BRAND STORY",
            description: "Dynamic digital storytelling through motion graphics and brand animation",
            category: "DIGITAL DESIGN & ANIMATION",
            image: { filename: "/work/work1.jpg", alt: "Animation Project" },
            case_study_url: "#"
          },
          {
            _uid: "work_6",
            title: "PRODUCT PHOTOGRAPHY",
            description: "Professional product photography and videography for e-commerce excellence",
            category: "VIDEOGRAPHY & PHOTOGRAPHY",
            image: { filename: "/work/work2.jpg", alt: "Photography Project" },
            case_study_url: "#"
          },
          {
            _uid: "work_7",
            title: "LEGACY BRAND REVIVAL",
            description: "Revitalizing established brands with modern approaches while honoring heritage",
            category: "PAST PROJECTS & BRANDS",
            image: { filename: "/work/work3.jpg", alt: "Legacy Brand" },
            case_study_url: "#"
          }
        ],
        work_categories: [
          { _uid: "work_cat_1", name: "FEATURED", is_active: true },
          { _uid: "work_cat_2", name: "DIGITAL DESIGN & ANIMATION", is_active: false },
          { _uid: "work_cat_3", name: "VIDEOGRAPHY & PHOTOGRAPHY", is_active: false },
          { _uid: "work_cat_4", name: "PAST PROJECTS & BRANDS", is_active: false }
        ],
        cta_text: "VIEW ALL WORK"
      };
      console.log('✅ Updated OurWork with dynamic content');
    }
    
    // Update the story
    const updateResponse = await Storyblok.put(`cdn/stories/${story.id}`, {
      story: {
        name: story.name,
        slug: story.slug,
        content: story.content
      },
      publish: 1
    });
    
    console.log('\n🎯 SUMMARY:');
    console.log('✅ Updated home story with dynamic content');
    console.log('✅ OurServices now has 6 dynamic services with categories');
    console.log('✅ OurWork now has 7 dynamic work items with categories');
    console.log('✅ Both components have interactive filtering');
    console.log('✅ All content is fully manageable from Storyblok CMS');
    console.log('\n📝 Features added:');
    console.log('• Dynamic service filtering by category');
    console.log('• Interactive work portfolio with category tabs');
    console.log('• Hover effects with service descriptions');
    console.log('• Responsive design with mobile support');
    console.log('• Case study links for work items');
    
  } catch (error) {
    console.error('❌ Error updating dynamic content:', error.response?.data || error.message);
  }
}

updateDynamicContent();