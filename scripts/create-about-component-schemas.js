const StoryblokClient = require('storyblok-js-client');
require('dotenv').config({ path: '.env.local' });

const Storyblok = new StoryblokClient({
    oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
});

const spaceId = process.env.STORYBLOK_SPACE_ID;

async function createAboutComponentSchemas() {
    try {
        console.log('🚀 Creating About page component schemas in Block Library...');

        // 1. Create AboutHero component schema
        await createAboutHeroSchema();
        
        // 2. Create TeamSection component schema
        await createTeamSectionSchema();
        
        // 3. Create CompanyValues component schema
        await createCompanyValuesSchema();
        
        // 4. Create CompanyHistory component schema
        await createCompanyHistorySchema();

        console.log('✅ All About page component schemas created successfully!');
        console.log('\n📋 Next Steps:');
        console.log('1. Refresh your Storyblok editor');
        console.log('2. The AboutHero component should now show all fields');
        console.log('3. Fill in the content for each field');
        console.log('4. Save and publish your About story');

    } catch (error) {
        console.error('❌ Error creating component schemas:', error);
    }
}

async function createAboutHeroSchema() {
    try {
        console.log('📝 Creating AboutHero component schema...');

        const componentSchema = {
            name: 'AboutHero',
            display_name: 'About Hero',
            schema: {
                title: {
                    type: 'text',
                    display_name: 'Title'
                },
                subtitle: {
                    type: 'text',
                    display_name: 'Subtitle'
                },
                description: {
                    type: 'textarea',
                    display_name: 'Description'
                },
                hero_image: {
                    type: 'asset',
                    display_name: 'Hero Image',
                    filetypes: ['images']
                },
                background_image: {
                    type: 'asset',
                    display_name: 'Background Image',
                    filetypes: ['images']
                },
                stats: {
                    type: 'bloks',
                    display_name: 'Statistics',
                    restrict_components: true,
                    component_whitelist: ['stat']
                }
            },
            image: null,
            preview_field: 'title',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'AboutHero',
            component_group_uuid: null
        };

        await Storyblok.post(`spaces/${spaceId}/components`, {
            component: componentSchema
        });

        console.log('✅ AboutHero component schema created!');

    } catch (error) {
        if (error.message && error.message.includes('already exists')) {
            console.log('✅ AboutHero component already exists');
        } else {
            console.error('❌ Error creating AboutHero schema:', error);
        }
    }
}

async function createTeamSectionSchema() {
    try {
        console.log('📝 Creating TeamSection component schema...');

        const componentSchema = {
            name: 'TeamSection',
            display_name: 'Team Section',
            schema: {
                title: {
                    type: 'text',
                    display_name: 'Title'
                },
                subtitle: {
                    type: 'text',
                    display_name: 'Subtitle'
                },
                description: {
                    type: 'textarea',
                    display_name: 'Description'
                },
                team_members: {
                    type: 'bloks',
                    display_name: 'Team Members',
                    restrict_components: true,
                    component_whitelist: ['team_member']
                }
            },
            image: null,
            preview_field: 'title',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'TeamSection',
            component_group_uuid: null
        };

        await Storyblok.post(`spaces/${spaceId}/components`, {
            component: componentSchema
        });

        console.log('✅ TeamSection component schema created!');

    } catch (error) {
        if (error.message && error.message.includes('already exists')) {
            console.log('✅ TeamSection component already exists');
        } else {
            console.error('❌ Error creating TeamSection schema:', error);
        }
    }
}

async function createCompanyValuesSchema() {
    try {
        console.log('📝 Creating CompanyValues component schema...');

        const componentSchema = {
            name: 'CompanyValues',
            display_name: 'Company Values',
            schema: {
                title: {
                    type: 'text',
                    display_name: 'Title'
                },
                subtitle: {
                    type: 'text',
                    display_name: 'Subtitle'
                },
                description: {
                    type: 'textarea',
                    display_name: 'Description'
                },
                background_image: {
                    type: 'asset',
                    display_name: 'Background Image',
                    filetypes: ['images']
                },
                values: {
                    type: 'bloks',
                    display_name: 'Values',
                    restrict_components: true,
                    component_whitelist: ['value']
                }
            },
            image: null,
            preview_field: 'title',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'CompanyValues',
            component_group_uuid: null
        };

        await Storyblok.post(`spaces/${spaceId}/components`, {
            component: componentSchema
        });

        console.log('✅ CompanyValues component schema created!');

    } catch (error) {
        if (error.message && error.message.includes('already exists')) {
            console.log('✅ CompanyValues component already exists');
        } else {
            console.error('❌ Error creating CompanyValues schema:', error);
        }
    }
}

async function createCompanyHistorySchema() {
    try {
        console.log('📝 Creating CompanyHistory component schema...');

        const componentSchema = {
            name: 'CompanyHistory',
            display_name: 'Company History',
            schema: {
                title: {
                    type: 'text',
                    display_name: 'Title'
                },
                subtitle: {
                    type: 'text',
                    display_name: 'Subtitle'
                },
                description: {
                    type: 'textarea',
                    display_name: 'Description'
                },
                milestones: {
                    type: 'bloks',
                    display_name: 'Milestones',
                    restrict_components: true,
                    component_whitelist: ['milestone']
                }
            },
            image: null,
            preview_field: 'title',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'CompanyHistory',
            component_group_uuid: null
        };

        await Storyblok.post(`spaces/${spaceId}/components`, {
            component: componentSchema
        });

        console.log('✅ CompanyHistory component schema created!');

    } catch (error) {
        if (error.message && error.message.includes('already exists')) {
            console.log('✅ CompanyHistory component already exists');
        } else {
            console.error('❌ Error creating CompanyHistory schema:', error);
        }
    }
}

// Also create the nested component schemas
async function createNestedSchemas() {
    try {
        console.log('📝 Creating nested component schemas...');

        // Stat component
        const statSchema = {
            name: 'stat',
            display_name: 'Statistic',
            schema: {
                number: {
                    type: 'text',
                    display_name: 'Number'
                },
                label: {
                    type: 'text',
                    display_name: 'Label'
                }
            },
            image: null,
            preview_field: 'label',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'stat',
            component_group_uuid: null
        };

        // Team Member component
        const teamMemberSchema = {
            name: 'team_member',
            display_name: 'Team Member',
            schema: {
                name: {
                    type: 'text',
                    display_name: 'Name'
                },
                position: {
                    type: 'text',
                    display_name: 'Position'
                },
                bio: {
                    type: 'textarea',
                    display_name: 'Bio'
                },
                image: {
                    type: 'asset',
                    display_name: 'Image',
                    filetypes: ['images']
                },
                linkedin_url: {
                    type: 'text',
                    display_name: 'LinkedIn URL'
                }
            },
            image: null,
            preview_field: 'name',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'team_member',
            component_group_uuid: null
        };

        // Value component
        const valueSchema = {
            name: 'value',
            display_name: 'Value',
            schema: {
                title: {
                    type: 'text',
                    display_name: 'Title'
                },
                description: {
                    type: 'textarea',
                    display_name: 'Description'
                },
                icon: {
                    type: 'asset',
                    display_name: 'Icon',
                    filetypes: ['images']
                }
            },
            image: null,
            preview_field: 'title',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'value',
            component_group_uuid: null
        };

        // Milestone component
        const milestoneSchema = {
            name: 'milestone',
            display_name: 'Milestone',
            schema: {
                year: {
                    type: 'text',
                    display_name: 'Year'
                },
                title: {
                    type: 'text',
                    display_name: 'Title'
                },
                description: {
                    type: 'textarea',
                    display_name: 'Description'
                },
                image: {
                    type: 'asset',
                    display_name: 'Image',
                    filetypes: ['images']
                }
            },
            image: null,
            preview_field: 'title',
            is_root: false,
            preview_tmpl: null,
            is_nestable: true,
            all_presets: [],
            preset_id: null,
            real_name: 'milestone',
            component_group_uuid: null
        };

        // Create all nested schemas
        const schemas = [
            { name: 'stat', schema: statSchema },
            { name: 'team_member', schema: teamMemberSchema },
            { name: 'value', schema: valueSchema },
            { name: 'milestone', schema: milestoneSchema }
        ];

        for (const { name, schema } of schemas) {
            try {
                await Storyblok.post(`spaces/${spaceId}/components`, {
                    component: schema
                });
                console.log(`✅ ${name} component schema created!`);
            } catch (error) {
                if (error.message && error.message.includes('already exists')) {
                    console.log(`✅ ${name} component already exists`);
                } else {
                    console.error(`❌ Error creating ${name} schema:`, error);
                }
            }
        }

    } catch (error) {
        console.error('❌ Error creating nested schemas:', error);
    }
}

// Run both main and nested schemas
async function runAll() {
    await createNestedSchemas();
    await createAboutComponentSchemas();
}

runAll();