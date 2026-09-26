import Image from 'next/image'
import { ArrowUpRight, Check, Menu, Search, ShoppingBag, Star } from 'lucide-react'
import { formatPrice, getProducts, isShopifyConnected, placeholderProducts } from '@/lib/shopify'

export default async function Home() {
  const liveProducts = await getProducts()
  const products = liveProducts.length ? liveProducts : placeholderProducts

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <div className="border-b-2 border-foreground bg-secondary px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-foreground">
        TRENDING TECH, HANDPICKED FOR EVERYDAY LIFE
      </div>
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <button className="flex items-center gap-2 text-sm md:hidden" aria-label="Open menu"><Menu className="size-5" /></button>
        <nav className="hidden items-center gap-7 text-sm md:flex"><a href="#shop">Shop tech</a><a href="#story">Why Scottney</a><a href="#journal">The signal</a></nav>
        <a href="#top" className="flex items-center" aria-label="Scottney and Co. home"><Image src="/images/scottney-logo.webp" alt="Scottney & Co." width={140} height={140} priority className="h-12 w-auto rounded-md sm:h-14" /></a>
        <div className="flex items-center gap-5"><button aria-label="Search"><Search className="size-[18px]" /></button><button aria-label="Shopping bag"><ShoppingBag className="size-[18px]" /></button></div>
      </header>

      <section aria-label="Error 404 storefront" className="mb-10 border-y-2 border-foreground bg-foreground lg:mb-16">
        <Image src="/images/error-404-banner.png" alt="Error 404 — a neon retro electronics storefront at sunset with palm trees, a cassette, floppy disk, and a smiling vintage computer" width={1983} height={793} priority sizes="100vw" className="block h-auto w-full" />
      </section>

      <section id="top" className="mx-auto grid max-w-7xl gap-3 px-5 pb-14 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-24">
        <div className="flex min-h-[470px] flex-col justify-between border-2 border-foreground bg-accent p-7 shadow-[8px_8px_0_var(--foreground)] sm:p-12 lg:min-h-[620px] lg:p-16">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">The everyday tech edit</p>
          <div className="max-w-xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" /> Curated weekly</div><h1 className="font-serif text-6xl leading-[.92] tracking-[-.04em] sm:text-8xl lg:text-[7.6rem]">Error 404: <em className="font-normal text-primary">Boring Gadgets Not Found.</em></h1><p className="mt-8 max-w-sm text-sm leading-6 text-muted-foreground">Trending electronics and smart accessories, handpicked by Scottney & Co. to make everyday life easier. Because struggling with basic tasks is very 404.</p><div className="mt-8 flex flex-wrap items-center gap-5"><a href="#shop" className="inline-flex items-center gap-2 rounded-none border-2 border-foreground bg-primary px-5 py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-[4px_4px_0_var(--foreground)] transition-transform hover:-translate-y-0.5">Shop what&apos;s new <ArrowUpRight className="size-4" /></a><a href="#story" className="text-sm font-medium underline underline-offset-4">Our point of view</a></div></div>
        </div>
        <div className="relative min-h-[470px] overflow-hidden border-2 border-foreground bg-muted lg:min-h-[620px]"><div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full bg-background/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground"><Star className="size-3 fill-primary text-primary" /> Staff favorite</div><Image src="/images/error-404-portrait.png" alt="Error 404 neon retro electronics shopfront with a glowing sign, cassette tape, thumbs-up vintage computer, and an open storefront window full of games" fill className="object-cover object-[center_35%]" priority sizes="(max-width: 1024px) 100vw, 50vw" /></div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-32"><div className="mb-8 flex items-end justify-between"><div><p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">The edit</p><h2 className="font-serif text-4xl tracking-tight sm:text-5xl">What&apos;s moving now</h2><p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">The pieces people are saving, sharing, and adding to cart right now.</p></div><a href="#shop" className="hidden items-center gap-2 text-sm font-medium underline underline-offset-4 md:flex">View all <ArrowUpRight className="size-4" /></a></div><div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">{products.map((product, index) => <article key={product.id} className="group"><div className="relative aspect-[4/5] overflow-hidden bg-muted">{index < 2 && <span className="absolute left-3 top-3 z-10 rounded-full bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">Trending</span>}{product.featuredImage && <Image src={product.featuredImage.url} alt={product.featuredImage.altText ?? product.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />}</div><div className="flex items-start justify-between gap-3 pt-4"><div><h3 className="text-sm font-semibold">{product.title}</h3><p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">{product.description}</p><p className="mt-3 inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground"><Check className="size-3 text-primary" /> Ready to ship</p></div><p className="shrink-0 text-sm font-medium">{formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}</p></div></article>)}</div><p className="mt-8 text-xs text-muted-foreground">{isShopifyConnected ? 'Live catalog from Shopify' : 'Preview catalog — connect Shopify to show your products'}</p></section>

      <section id="story" className="border-y border-border bg-primary px-5 py-20 text-primary-foreground lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1fr] lg:items-end"><p className="text-xs uppercase tracking-[0.2em] opacity-70">Why Scottney & Co.</p><div><p className="max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-6xl">Better tech should disappear into the way you live.</p><p className="mt-8 max-w-md text-sm leading-6 opacity-75">We cut through the noise to find useful, well-designed electronics that earn their place on your desk, in your bag, and at home.</p></div></div></section>

      <footer id="journal" className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 text-sm lg:flex-row lg:items-center lg:justify-between lg:px-8"><Image src="/images/scottney-logo.webp" alt="Scottney & Co." width={160} height={160} className="h-16 w-16 shrink-0 self-start rounded-md object-contain" /><div className="flex gap-6 text-muted-foreground"><a href="#shop">Shop</a><a href="#story">About</a><a href="#journal">Contact</a></div><p className="text-xs text-muted-foreground">© 2026 Scottney & Co. All signal, no noise.</p></footer>
    </main>
  )
}

export const revalidate = 60

export const metadata = { title: 'Scottney & Co. — Trending tech, handpicked', description: 'Trending electronics and useful tech, handpicked by Scottney & Co.' }

// Shopify Storefront API query used by the server-side catalog:
// query Products($first: Int!) { products(first: $first) { nodes { id title handle } } }
// Cart mutations can be added from the product detail flow using cartCreate.
