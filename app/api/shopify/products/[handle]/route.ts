import { NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function GET(
    request: Request,
    { params }: { params: Promise<{ handle: string }> }
) {
    try {
        const { handle } = await params;

        if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
            return NextResponse.json(
                { error: 'Shopify integration not configured' },
                { status: 503 }
            );
        }

        const shopifyQuery = `
            query getProduct($handle: String!) {
                product(handle: $handle) {
                    id
                    title
                    description
                    handle
                    priceRange {
                        minVariantPrice {
                            amount
                            currencyCode
                        }
                    }
                    images(first: 10) {
                        edges {
                            node {
                                url
                                altText
                            }
                        }
                    }
                    variants(first: 10) {
                        edges {
                            node {
                                id
                                title
                                price {
                                    amount
                                    currencyCode
                                }
                                availableForSale
                            }
                        }
                    }
                }
            }
        `;

        const response = await fetch(
            `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
                },
                body: JSON.stringify({
                    query: shopifyQuery,
                    variables: { handle },
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Shopify API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.errors) {
            console.error('Shopify GraphQL errors:', data.errors);
            throw new Error('Failed to fetch product from Shopify');
        }

        if (!data.data.product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        const product = {
            id: data.data.product.id,
            title: data.data.product.title,
            description: data.data.product.description,
            handle: data.data.product.handle,
            price: parseFloat(data.data.product.priceRange.minVariantPrice.amount).toFixed(2),
            currency: data.data.product.priceRange.minVariantPrice.currencyCode,
            images: data.data.product.images.edges.map((edge: { node: { url: string } }) => edge.node.url),
            variants: data.data.product.variants.edges.map((edge: { node: { id: string; title: string; price: { amount: string }; availableForSale: boolean } }) => ({
                id: edge.node.id,
                title: edge.node.title,
                price: parseFloat(edge.node.price.amount).toFixed(2),
                available: edge.node.availableForSale,
            })),
        };

        return NextResponse.json({ product });
    } catch (error) {
        console.error('Error fetching Shopify product:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch product',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
