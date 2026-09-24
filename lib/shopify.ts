const PRODUCT_QUERY = `#graphql
  query Products($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      nodes {
        id
        title
        handle
        description
        featuredImage {
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

type ShopifyProduct = {
  id: string
  title: string
  handle: string
  description: string
  featuredImage: { url: string; altText: string | null; width: number; height: number } | null
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
}

export async function getProducts(): Promise<ShopifyProduct[]> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  if (!domain || !token) return []

  const response = await fetch(`https://${domain}/api/2026-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query: PRODUCT_QUERY, variables: { first: 8 } }),
    next: { revalidate: 60 },
  })

  if (!response.ok) return []
  const payload = await response.json()
  return payload.data?.products?.nodes ?? []
}

export type { ShopifyProduct }
export { PRODUCT_QUERY }

export const formatPrice = (amount: string, currencyCode: string) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(Number(amount))

export const placeholderProducts: ShopifyProduct[] = [
  { id: 'preview-1', title: 'Arc Pocket Charger', handle: 'everyday-tote', description: 'A compact power bank for commutes and last-minute saves.', featuredImage: { url: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85', altText: 'Natural canvas tote bag', width: 1000, height: 1250 }, priceRange: { minVariantPrice: { amount: '88', currencyCode: 'USD' } } },
  { id: 'preview-2', title: 'Loop Desk Speaker', handle: 'studio-glass', description: 'Small-format sound with a surprisingly full point of view.', featuredImage: { url: 'https://images.unsplash.com/photo-1572119865084-43c285814d63?auto=format&fit=crop&w=1000&q=85', altText: 'Handmade glass vessel', width: 1000, height: 1250 }, priceRange: { minVariantPrice: { amount: '42', currencyCode: 'USD' } } },
  { id: 'preview-3', title: 'Keyline Keyboard', handle: 'linen-throw', description: 'A low-profile mechanical keyboard for focused work.', featuredImage: { url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=85', altText: 'Textured linen throw', width: 1000, height: 1250 }, priceRange: { minVariantPrice: { amount: '120', currencyCode: 'USD' } } },
  { id: 'preview-4', title: 'Halo Smart Light', handle: 'field-notes', description: 'Ambient light that makes any corner feel intentional.', featuredImage: { url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=85', altText: 'Open notebook on a desk', width: 1000, height: 1250 }, priceRange: { minVariantPrice: { amount: '24', currencyCode: 'USD' } } },
]

export const isShopifyConnected = Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN)
