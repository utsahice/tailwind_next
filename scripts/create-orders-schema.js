const axios = require('axios');

const OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN || 'LEIcgorTpHHc7FxSsZbQ8Qtt-105887507743030-LZLvBTzkgjeyY4khBUqa';
const SPACE_ID = process.env.STORYBLOK_SPACE_ID || '288253207803581';

const api = axios.create({
    baseURL: 'https://mapi.storyblok.com/v1',
    headers: { Authorization: OAUTH_TOKEN, 'Content-Type': 'application/json' },
});

async function createOrderComponent() {
    console.log('Creating "order" component in Storyblok...');

    const schema = {
        component: {
            name: 'order',
            display_name: 'Order',
            schema: {
                order_id: {
                    type: 'text',
                    display_name: 'Order ID',
                    pos: 0,
                    required: true,
                },
                status: {
                    type: 'option',
                    display_name: 'Order Status',
                    pos: 1,
                    required: true,
                    default_value: 'pending',
                    options: [
                        { name: '🕐 Pending', value: 'pending' },
                        { name: '✅ Order Confirmed', value: 'confirmed' },
                        { name: '💳 Payment Received', value: 'payment_received' },
                        { name: '📦 Processing', value: 'processing' },
                        { name: '🚚 On The Way', value: 'on_the_way' },
                        { name: '✔️ Delivered', value: 'delivered' },
                        { name: '❌ Cancelled', value: 'cancelled' },
                        { name: '🔄 Refunded', value: 'refunded' },
                    ],
                },
                payment_received: {
                    type: 'boolean',
                    display_name: 'Payment Received',
                    pos: 2,
                    default_value: false,
                },
                customer_name: {
                    type: 'text',
                    display_name: 'Customer Name',
                    pos: 3,
                },
                customer_email: {
                    type: 'text',
                    display_name: 'Customer Email',
                    pos: 4,
                },
                customer_phone: {
                    type: 'text',
                    display_name: 'Customer Phone',
                    pos: 5,
                },
                shipping_address: {
                    type: 'textarea',
                    display_name: 'Shipping Address',
                    pos: 6,
                },
                items_summary: {
                    type: 'textarea',
                    display_name: 'Items Ordered',
                    pos: 7,
                },
                order_total: {
                    type: 'text',
                    display_name: 'Order Total ($)',
                    pos: 8,
                },
                order_notes: {
                    type: 'textarea',
                    display_name: 'Order Notes',
                    pos: 9,
                },
                order_date: {
                    type: 'text',
                    display_name: 'Order Date',
                    pos: 10,
                },
                tracking_number: {
                    type: 'text',
                    display_name: 'Tracking Number',
                    pos: 11,
                },
                admin_notes: {
                    type: 'textarea',
                    display_name: 'Admin Notes (internal)',
                    pos: 12,
                },
            },
            is_root: true,
            is_nestable: false,
            color: '#DFF624',
            icon: 'block-cart',
        },
    };

    try {
        // Check if component already exists
        const existing = await api.get(`/spaces/${SPACE_ID}/components`);
        const found = existing.data.components.find(c => c.name === 'order');

        if (found) {
            console.log(`Component "order" already exists (ID: ${found.id}), updating...`);
            await api.put(`/spaces/${SPACE_ID}/components/${found.id}`, schema);
            console.log('✅ Order component updated!');
        } else {
            const res = await api.post(`/spaces/${SPACE_ID}/components`, schema);
            console.log(`✅ Order component created! ID: ${res.data.component.id}`);
        }
    } catch (err) {
        console.error('❌ Error:', err.response?.data || err.message);
    }
}

async function createOrdersFolder() {
    console.log('\nCreating "orders" folder in Storyblok...');
    try {
        const res = await api.post(`/spaces/${SPACE_ID}/stories`, {
            story: {
                name: 'Orders',
                slug: 'orders',
                is_folder: true,
                parent_id: 0,
                default_root: 'order',
            },
        });
        console.log(`✅ Orders folder created! ID: ${res.data.story.id}`);
        return res.data.story.id;
    } catch (err) {
        if (err.response?.data?.slug) {
            console.log('⚠️  Orders folder already exists, fetching ID...');
            const stories = await api.get(`/spaces/${SPACE_ID}/stories?is_folder=true`);
            const folder = stories.data.stories.find(s => s.slug === 'orders');
            if (folder) {
                console.log(`   Found folder ID: ${folder.id}`);
                return folder.id;
            }
        }
        console.error('❌ Folder error:', err.response?.data || err.message);
        return null;
    }
}

async function main() {
    console.log('=== Setting up Storyblok Orders Schema ===\n');
    await createOrderComponent();
    await createOrdersFolder();
    console.log('\n=== Done! ===');
    console.log('You can now view and manage orders in Storyblok under the "Orders" folder.');
    console.log('Each order has status options: Pending → Confirmed → Payment Received → Processing → On The Way → Delivered');
}

main();
