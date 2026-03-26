import { NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const shopifyQuery = `
  query {
    products(first: 20) {
      edges {
        node {
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
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
    try {
        // Check if Shopify credentials are configured
        if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
            console.warn('Shopify credentials not configured');
            return NextResponse.json({
                products: [],
                message: 'Shopify integration not configured'
            });
        }

        const response = await fetch(
            `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
                },
                body: JSON.stringify({ query: shopifyQuery }),
            }
        );

        if (!response.ok) {
            throw new Error(`Shopify API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.errors) {
            console.error('Shopify GraphQL errors:', data.errors);
            throw new Error('Failed to fetch products from Shopify');
        }

        const products = data.data.products.edges.map((edge: any) => ({
            id: edge.node.id,
            title: edge.node.title,
            description: edge.node.description,
            handle: edge.node.handle,
            price: parseFloat(edge.node.priceRange.minVariantPrice.amount).toFixed(2),
            currency: edge.node.priceRange.minVariantPrice.currencyCode,
            image: edge.node.images.edges[0]?.node.url || null,
            imageAlt: edge.node.images.edges[0]?.node.altText || edge.node.title,
        }));

        return NextResponse.json({ products });
    } catch (error) {
        console.error('Error fetching Shopify products:', error);
        return NextResponse.json(
            { 
                products: [],
                error: 'Failed to fetch products',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
