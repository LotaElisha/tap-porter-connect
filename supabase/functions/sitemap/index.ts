import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml',
}

const SITE_URL = 'https://tap.or.tz'
const SUPPORTED_LANGUAGES = ['en', 'sw', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'ko', 'ru', 'ar', 'zh']

interface PageConfig {
  path: string
  priority: string
  changefreq: string
  includeHreflang: boolean
}

const STATIC_PAGES: PageConfig[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly', includeHreflang: true },
  { path: '/about', priority: '0.9', changefreq: 'monthly', includeHreflang: true },
  { path: '/membership', priority: '0.9', changefreq: 'monthly', includeHreflang: true },
  { path: '/programs', priority: '0.8', changefreq: 'monthly', includeHreflang: true },
  { path: '/contact', priority: '0.8', changefreq: 'monthly', includeHreflang: true },
  { path: '/porters', priority: '0.8', changefreq: 'weekly', includeHreflang: true },
  { path: '/partners', priority: '0.7', changefreq: 'monthly', includeHreflang: true },
  { path: '/news', priority: '0.7', changefreq: 'weekly', includeHreflang: true },
  { path: '/stories', priority: '0.7', changefreq: 'weekly', includeHreflang: true },
  { path: '/gallery', priority: '0.6', changefreq: 'weekly', includeHreflang: true },
  { path: '/history', priority: '0.6', changefreq: 'yearly', includeHreflang: true },
  { path: '/podcast', priority: '0.6', changefreq: 'weekly', includeHreflang: true },
  { path: '/porter-chat', priority: '0.5', changefreq: 'daily', includeHreflang: true },
  { path: '/membership/porter', priority: '0.5', changefreq: 'monthly', includeHreflang: false },
  { path: '/membership/corporate', priority: '0.5', changefreq: 'monthly', includeHreflang: false },
  { path: '/membership/honorary', priority: '0.5', changefreq: 'monthly', includeHreflang: false },
  { path: '/member-auth', priority: '0.3', changefreq: 'yearly', includeHreflang: false },
]

function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toISOString().split('T')[0]
}

function generateHreflangTags(path: string): string {
  let tags = ''
  SUPPORTED_LANGUAGES.forEach(lang => {
    const url = lang === 'en' ? `${SITE_URL}${path}` : `${SITE_URL}${path}?lang=${lang}`
    tags += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}"/>\n`
  })
  tags += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${path}"/>\n`
  return tags
}

function generateUrlEntry(path: string, lastmod: string, changefreq: string, priority: string, includeHreflang: boolean): string {
  let entry = `  <url>\n`
  entry += `    <loc>${SITE_URL}${path}</loc>\n`
  entry += `    <lastmod>${lastmod}</lastmod>\n`
  entry += `    <changefreq>${changefreq}</changefreq>\n`
  entry += `    <priority>${priority}</priority>\n`
  if (includeHreflang) {
    entry += generateHreflangTags(path)
  }
  entry += `  </url>\n`
  return entry
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Generating dynamic sitemap...')
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch latest content modification dates from database
    const [newsResult, storiesResult, galleryResult, portersResult, messagesResult] = await Promise.all([
      supabase.from('news_articles').select('updated_at').order('updated_at', { ascending: false }).limit(1),
      supabase.from('porter_stories').select('updated_at').order('updated_at', { ascending: false }).limit(1),
      supabase.from('gallery_items').select('created_at').order('created_at', { ascending: false }).limit(1),
      supabase.from('members_porters').select('updated_at').order('updated_at', { ascending: false }).limit(1),
      supabase.from('porter_messages').select('created_at').order('created_at', { ascending: false }).limit(1),
    ])

    const now = formatDate(new Date())
    
    // Get latest dates for dynamic content pages
    const latestDates: Record<string, string> = {
      '/': now,
      '/news': newsResult.data?.[0]?.updated_at ? formatDate(newsResult.data[0].updated_at) : now,
      '/stories': storiesResult.data?.[0]?.updated_at ? formatDate(storiesResult.data[0].updated_at) : now,
      '/gallery': galleryResult.data?.[0]?.created_at ? formatDate(galleryResult.data[0].created_at) : now,
      '/porters': portersResult.data?.[0]?.updated_at ? formatDate(portersResult.data[0].updated_at) : now,
      '/porter-chat': messagesResult.data?.[0]?.created_at ? formatDate(messagesResult.data[0].created_at) : now,
    }

    console.log('Latest dates from database:', latestDates)

    // Generate sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`
    sitemap += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`

    // Add static pages with dynamic lastmod dates
    for (const page of STATIC_PAGES) {
      const lastmod = latestDates[page.path] || now
      sitemap += generateUrlEntry(page.path, lastmod, page.changefreq, page.priority, page.includeHreflang)
    }

    // Add individual porter profiles (published porters only)
    const portersListResult = await supabase
      .from('members_porters')
      .select('id, updated_at')
      .eq('status', 'active')
      .limit(500)

    if (portersListResult.data && portersListResult.data.length > 0) {
      console.log(`Adding ${portersListResult.data.length} porter profiles to sitemap`)
      for (const porter of portersListResult.data) {
        const lastmod = porter.updated_at ? formatDate(porter.updated_at) : now
        sitemap += generateUrlEntry(`/porters/${porter.id}`, lastmod, 'weekly', '0.5', false)
      }
    }

    sitemap += `</urlset>`

    console.log('Sitemap generated successfully')

    return new Response(sitemap, {
      headers: corsHeaders,
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(`Error generating sitemap: ${errorMessage}`, {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' },
    })
  }
})
