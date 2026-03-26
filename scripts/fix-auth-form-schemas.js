const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function updateRegisterFormSchema() {
    try {
        console.log('Updating RegisterForm component schema...\n');

        // First, get the existing component
        const { data: components } = await Storyblok.get(`spaces/${spaceId}/components/`);
        const registerForm = components.components.find(c => c.name === 'RegisterForm' || c.name === 'register_form');

        if (!registerForm) {
            console.log('❌ RegisterForm component not found. Creating new one...');
            
            const newComponent = {
                name: 'RegisterForm',
                display_name: 'Register Form',
                schema: {
                    title: {
                        type: 'text',
                        pos: 0,
                        default_value: 'Create Account',
                        description: 'Form title'
                    },
                    subtitle: {
                        type: 'text',
                        pos: 1,
                        default_value: 'Join Glazed Gloss Beauty',
                        description: 'Form subtitle'
                    },
                    benefits: {
                        type: 'bloks',
                        restrict_components: true,
                        component_whitelist: ['benefit_point'],
                        pos: 2,
                        description: 'List of registration benefits'
                    },
                    login_link_text: {
                        type: 'text',
                        pos: 3,
                        default_value: 'Already have an account? Sign in',
                        description: 'Text for login link'
                    },
                    login_link_url: {
                        type: 'text',
                        pos: 4,
                        default_value: '/login',
                        description: 'URL for login link'
                    },
                    submit_button_text: {
                        type: 'text',
                        pos: 5,
                        default_value: 'CREATE ACCOUNT',
                        description: 'Submit button text'
                    },
                    background_image: {
                        type: 'asset',
                        pos: 6,
                        filetypes: ['images'],
                        description: 'Optional background image'
                    }
                },
                is_root: false,
                is_nestable: true
            };

            await Storyblok.post(`spaces/${spaceId}/components/`, {
                component: newComponent
            });
            console.log('✅ Created RegisterForm component with schema');
        } else {
            console.log('Found existing RegisterForm component. Updating schema...');
            
            const updatedSchema = {
                title: {
                    type: 'text',
                    pos: 0,
                    default_value: 'Create Account',
                    description: 'Form title'
                },
                subtitle: {
                    type: 'text',
                    pos: 1,
                    default_value: 'Join Glazed Gloss Beauty',
                    description: 'Form subtitle'
                },
                benefits: {
                    type: 'bloks',
                    restrict_components: true,
                    component_whitelist: ['benefit_point'],
                    pos: 2,
                    description: 'List of registration benefits'
                },
                login_link_text: {
                    type: 'text',
                    pos: 3,
                    default_value: 'Already have an account? Sign in',
                    description: 'Text for login link'
                },
                login_link_url: {
                    type: 'text',
                    pos: 4,
                    default_value: '/login',
                    description: 'URL for login link'
                },
                submit_button_text: {
                    type: 'text',
                    pos: 5,
                    default_value: 'CREATE ACCOUNT',
                    description: 'Submit button text'
                },
                background_image: {
                    type: 'asset',
                    pos: 6,
                    filetypes: ['images'],
                    description: 'Optional background image'
                }
            };

            await Storyblok.put(`spaces/${spaceId}/components/${registerForm.id}`, {
                component: {
                    ...registerForm,
                    schema: updatedSchema
                }
            });
            console.log('✅ Updated RegisterForm component schema');
        }
    } catch (error) {
        console.error('❌ Error updating RegisterForm:', error.response?.data || error.message);
        throw error;
    }
}

async function updateLoginFormSchema() {
    try {
        console.log('\nUpdating LoginForm component schema...\n');

        const { data: components } = await Storyblok.get(`spaces/${spaceId}/components/`);
        const loginForm = components.components.find(c => c.name === 'LoginForm' || c.name === 'login_form');

        if (!loginForm) {
            console.log('❌ LoginForm component not found. Creating new one...');
            
            const newComponent = {
                name: 'LoginForm',
                display_name: 'Login Form',
                schema: {
                    title: {
                        type: 'text',
                        pos: 0,
                        default_value: 'Welcome Back',
                        description: 'Form title'
                    },
                    subtitle: {
                        type: 'text',
                        pos: 1,
                        default_value: 'Sign in to your account',
                        description: 'Form subtitle'
                    },
                    register_link_text: {
                        type: 'text',
                        pos: 2,
                        default_value: "Don't have an account? Register",
                        description: 'Text for register link'
                    },
                    register_link_url: {
                        type: 'text',
                        pos: 3,
                        default_value: '/register',
                        description: 'URL for register link'
                    },
                    forgot_password_text: {
                        type: 'text',
                        pos: 4,
                        default_value: 'Forgot password?',
                        description: 'Forgot password link text'
                    },
                    submit_button_text: {
                        type: 'text',
                        pos: 5,
                        default_value: 'SIGN IN',
                        description: 'Submit button text'
                    },
                    background_image: {
                        type: 'asset',
                        pos: 6,
                        filetypes: ['images'],
                        description: 'Optional background image'
                    }
                },
                is_root: false,
                is_nestable: true
            };

            await Storyblok.post(`spaces/${spaceId}/components/`, {
                component: newComponent
            });
            console.log('✅ Created LoginForm component with schema');
        } else {
            console.log('Found existing LoginForm component. Updating schema...');
            
            const updatedSchema = {
                title: {
                    type: 'text',
                    pos: 0,
                    default_value: 'Welcome Back',
                    description: 'Form title'
                },
                subtitle: {
                    type: 'text',
                    pos: 1,
                    default_value: 'Sign in to your account',
                    description: 'Form subtitle'
                },
                register_link_text: {
                    type: 'text',
                    pos: 2,
                    default_value: "Don't have an account? Register",
                    description: 'Text for register link'
                },
                register_link_url: {
                    type: 'text',
                    pos: 3,
                    default_value: '/register',
                    description: 'URL for register link'
                },
                forgot_password_text: {
                    type: 'text',
                    pos: 4,
                    default_value: 'Forgot password?',
                    description: 'Forgot password link text'
                },
                submit_button_text: {
                    type: 'text',
                    pos: 5,
                    default_value: 'SIGN IN',
                    description: 'Submit button text'
                },
                background_image: {
                    type: 'asset',
                    pos: 6,
                    filetypes: ['images'],
                    description: 'Optional background image'
                }
            };

            await Storyblok.put(`spaces/${spaceId}/components/${loginForm.id}`, {
                component: {
                    ...loginForm,
                    schema: updatedSchema
                }
            });
            console.log('✅ Updated LoginForm component schema');
        }
    } catch (error) {
        console.error('❌ Error updating LoginForm:', error.response?.data || error.message);
        throw error;
    }
}

async function createBenefitPointComponent() {
    try {
        console.log('\nCreating BenefitPoint component...\n');

        const { data: components } = await Storyblok.get(`spaces/${spaceId}/components/`);
        const benefitPoint = components.components.find(c => c.name === 'benefit_point');

        if (benefitPoint) {
            console.log('ℹ️  BenefitPoint component already exists');
            return;
        }

        const newComponent = {
            name: 'benefit_point',
            display_name: 'Benefit Point',
            schema: {
                icon: {
                    type: 'option',
                    pos: 0,
                    options: [
                        { name: 'Check', value: 'check' },
                        { name: 'Star', value: 'star' },
                        { name: 'Heart', value: 'heart' },
                        { name: 'Gift', value: 'gift' },
                        { name: 'Sparkles', value: 'sparkles' }
                    ],
                    default_value: 'check',
                    description: 'Icon type'
                },
                text: {
                    type: 'text',
                    pos: 1,
                    required: true,
                    description: 'Benefit text'
                }
            },
            is_root: false,
            is_nestable: true
        };

        await Storyblok.post(`spaces/${spaceId}/components/`, {
            component: newComponent
        });
        console.log('✅ Created BenefitPoint component');
    } catch (error) {
        console.error('❌ Error creating BenefitPoint:', error.response?.data || error.message);
        throw error;
    }
}

async function main() {
    console.log('🚀 Fixing Auth Form Schemas in Storyblok\n');
    console.log('Space ID:', spaceId);
    console.log('');
    
    if (!process.env.STORYBLOK_OAUTH_TOKEN || !spaceId) {
        console.error('❌ Missing required environment variables:');
        console.error('   - STORYBLOK_OAUTH_TOKEN');
        console.error('   - STORYBLOK_SPACE_ID');
        process.exit(1);
    }

    try {
        // Create benefit point component first (needed for register form)
        await createBenefitPointComponent();
        
        // Update register form schema
        await updateRegisterFormSchema();
        
        // Update login form schema
        await updateLoginFormSchema();
        
        console.log('\n✅ All auth form schemas updated successfully!\n');
        console.log('Next steps:');
        console.log('1. Go to Storyblok dashboard');
        console.log('2. Edit your login and register stories');
        console.log('3. You should now see all the schema fields');
        console.log('4. Customize the content as needed');
    } catch (error) {
        console.error('\n❌ Setup failed:', error.message);
        process.exit(1);
    }
}

main();
