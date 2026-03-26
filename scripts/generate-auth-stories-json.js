const fs = require('fs');
const path = require('path');

function generateUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const stories = {
    contact: {
        name: 'contact',
        slug: 'contact',
        content: {
            component: 'page',
            _uid: generateUID(),
            body: [
                {
                    component: 'ContactForm',
                    _uid: generateUID(),
                    title: 'Contact Us',
                    subtitle: 'Get In Touch',
                    description: "Ready to transform your beauty brand? Let's start the conversation.",
                    form_title: 'Send us a message',
                    contact_info: [
                        {
                            component: 'contact_info_item',
                            _uid: generateUID(),
                            icon_type: 'location',
                            title: 'Office Location',
                            content: 'Beverly Hills, CA 90210'
                        },
                        {
                            component: 'contact_info_item',
                            _uid: generateUID(),
                            icon_type: 'email',
                            title: 'Email Us',
                            content: 'hello@glazedgloss.com'
                        },
                        {
                            component: 'contact_info_item',
                            _uid: generateUID(),
                            icon_type: 'phone',
                            title: 'Call Us',
                            content: '858.353.3220'
                        }
                    ],
                    business_hours: [
                        {
                            component: 'business_hour',
                            _uid: generateUID(),
                            day: 'Monday - Friday',
                            hours: '9:00 AM - 6:00 PM'
                        },
                        {
                            component: 'business_hour',
                            _uid: generateUID(),
                            day: 'Saturday',
                            hours: '10:00 AM - 4:00 PM'
                        },
                        {
                            component: 'business_hour',
                            _uid: generateUID(),
                            day: 'Sunday',
                            hours: 'Closed'
                        }
                    ]
                }
            ]
        }
    },

    login: {
        name: 'login',
        slug: 'login',
        content: {
            component: 'page',
            _uid: generateUID(),
            body: [
                {
                    component: 'LoginForm',
                    _uid: generateUID(),
                    title: 'Welcome Back',
                    subtitle: 'Sign in to your account',
                    register_link_text: "Don't have an account? Register here",
                    demo_credentials: [
                        {
                            component: 'demo_credential',
                            _uid: generateUID(),
                            label: 'Admin Account',
                            email: 'admin@glazedgloss.com',
                            password: 'admin123'
                        },
                        {
                            component: 'demo_credential',
                            _uid: generateUID(),
                            label: 'Demo User',
                            email: 'user@example.com',
                            password: 'user123'
                        }
                    ]
                }
            ]
        }
    },

    register: {
        name: 'register',
        slug: 'register',
        content: {
            component: 'page',
            _uid: generateUID(),
            body: [
                {
                    component: 'RegisterForm',
                    _uid: generateUID(),
                    title: 'Create Account',
                    subtitle: 'Join Glazed Gloss Beauty',
                    login_link_text: 'Already have an account? Sign in',
                    benefits: [
                        {
                            component: 'benefit_item',
                            _uid: generateUID(),
                            icon: '🎨',
                            title: 'Exclusive Access',
                            description: 'Get early access to new products and services'
                        },
                        {
                            component: 'benefit_item',
                            _uid: generateUID(),
                            icon: '💼',
                            title: 'Business Tools',
                            description: 'Access professional beauty brand resources'
                        },
                        {
                            component: 'benefit_item',
                            _uid: generateUID(),
                            icon: '📊',
                            title: 'Analytics Dashboard',
                            description: 'Track your brand growth and performance'
                        },
                        {
                            component: 'benefit_item',
                            _uid: generateUID(),
                            icon: '🤝',
                            title: 'Expert Support',
                            description: 'Connect with beauty industry professionals'
                        }
                    ]
                }
            ]
        }
    }
};

console.log('🚀 Generating Auth & Contact Stories JSON...\n');

// Create output directory
const outputDir = path.join(process.cwd(), 'storyblok-stories');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Save each story to a separate file
Object.keys(stories).forEach(key => {
    const filePath = path.join(outputDir, `${key}-story.json`);
    fs.writeFileSync(filePath, JSON.stringify(stories[key], null, 2));
    console.log(`✓ Created: ${filePath}`);
});

// Save all stories in one file
const allStoriesPath = path.join(outputDir, 'all-auth-stories.json');
fs.writeFileSync(allStoriesPath, JSON.stringify(stories, null, 2));
console.log(`✓ Created: ${allStoriesPath}`);

console.log('\n✅ JSON files generated successfully!\n');
console.log('📁 Files created in: storyblok-stories/\n');
console.log('📋 MANUAL IMPORT INSTRUCTIONS:\n');
console.log('Option 1: Copy-Paste in Storyblok UI');
console.log('─'.repeat(60));
console.log('1. Go to: https://app.storyblok.com');
console.log('2. Navigate to: Content → New Story');
console.log('3. Create story with name and slug from JSON');
console.log('4. Switch to "JSON" view in editor');
console.log('5. Copy content from the JSON file');
console.log('6. Paste into Storyblok');
console.log('7. Save & Publish\n');

console.log('Option 2: Use Storyblok CLI');
console.log('─'.repeat(60));
console.log('1. Install CLI: npm install -g storyblok');
console.log('2. Login: storyblok login');
console.log('3. Import: storyblok push-components storyblok-stories/\n');

console.log('Option 3: Use Management API');
console.log('─'.repeat(60));
console.log('1. Get token: https://app.storyblok.com/#/me/account?tab=token');
console.log('2. Add to .env.local: STORYBLOK_MANAGEMENT_TOKEN=your_token');
console.log('3. Run: node scripts/create-auth-stories-management.js\n');

console.log('📄 Story Files:');
console.log('  - contact-story.json');
console.log('  - login-story.json');
console.log('  - register-story.json');
console.log('  - all-auth-stories.json (combined)\n');

// Print summary
console.log('📊 Summary:');
console.log(`  Total Stories: ${Object.keys(stories).length}`);
console.log(`  Contact Info Items: ${stories.contact.content.body[0].contact_info.length}`);
console.log(`  Business Hours: ${stories.contact.content.body[0].business_hours.length}`);
console.log(`  Demo Credentials: ${stories.login.content.body[0].demo_credentials.length}`);
console.log(`  Registration Benefits: ${stories.register.content.body[0].benefits.length}\n`);

console.log('🎯 Next Steps:');
console.log('1. Open storyblok-stories/ folder');
console.log('2. Choose an import method above');
console.log('3. Create stories in Storyblok');
console.log('4. Test pages: /contact, /login, /register\n');
