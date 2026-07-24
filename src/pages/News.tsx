import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowRight, ExternalLink, Globe } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { googleBusinessPosts } from "@/config/organization";

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

// Placeholder news for demo
const placeholderNews: NewsArticle[] = [
  {
    id: "1",
    title: "New Mountain Safety Cohort Certifies 60 Porters",
    slug: "safety-cohort-certifies-60-porters",
    excerpt: "TAP's latest first-aid and altitude-safety cohort completed training on the Machame route, bringing certified porters past the 1,200 mark this year.",
    featured_image_url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    category: "Training",
    published_at: "2026-06-20",
    created_at: "2026-06-20",
  },
  {
    id: "2",
    title: "Partnership Signed with Kilimanjaro Tour Operators Group",
    slug: "partnership-kilimanjaro-tour-operators",
    excerpt: "Twelve operators have joined TAP's Fair Porter Pledge, committing to published wage standards and the 20kg load limit on every trip.",
    featured_image_url: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800",
    category: "Partnerships",
    published_at: "2026-06-05",
    created_at: "2026-06-05",
  },
  {
    id: "3",
    title: "Gear Distribution Reaches Porters on Mount Meru Routes",
    slug: "gear-distribution-mount-meru",
    excerpt: "Our welfare team distributed cold-weather gear to 140 porters ahead of the wet season, funded entirely by individual donors.",
    featured_image_url: "https://images.unsplash.com/photo-1621414050946-1b936a78491d?w=800",
    category: "Welfare",
    published_at: "2026-05-18",
    created_at: "2026-05-18",
  },
  {
    id: "4",
    title: "Health Screening Campaign Reaches 1,000 Porters",
    slug: "health-screening-milestone",
    excerpt: "Our annual health screening campaign has successfully reached over 1,000 porters, providing free medical checkups and health education.",
    featured_image_url: "https://images.unsplash.com/photo-1650668302197-7f556c34cb91?w=800",
    category: "Welfare",
    published_at: "2026-04-02",
    created_at: "2026-04-02",
  },
];

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const { data, error } = await supabase
        .from("news_articles")
        .select("id, title, slug, excerpt, featured_image_url, category, published_at, created_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (data && data.length > 0) {
        setNews(data);
      } else {
        setNews(placeholderNews);
      }
      setLoading(false);
    }

    fetchNews();
  }, []);

  const featuredNews = news[0];
  const otherNews = news.slice(1);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">News & Updates</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Stay informed about TAP's latest programs, partnerships, official Google Business updates, and welfare initiatives.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featuredNews && (
        <section className="py-12">
          <div className="container">
            <Card className="overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {featuredNews.featured_image_url && (
                  <img
                    src={featuredNews.featured_image_url}
                    alt={featuredNews.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                )}
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    {featuredNews.category && (
                      <Badge variant="secondary">{featuredNews.category}</Badge>
                    )}
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(featuredNews.published_at || featuredNews.created_at), "MMMM d, yyyy")}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary mb-4">
                    {featuredNews.title}
                  </h2>
                  {featuredNews.excerpt && (
                    <p className="text-muted-foreground mb-4">{featuredNews.excerpt}</p>
                  )}
                  <Link
                    to={`/news/${featuredNews.slug}`}
                    className="inline-flex items-center text-primary hover:underline font-medium"
                    aria-label={`Read full article: ${featuredNews.title}`}
                  >
                    Read full article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Official Google Business Posts Section */}
      <section className="py-12 bg-secondary/5 border-y">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-5 w-5 text-primary" />
                <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold border-primary/40 text-primary">
                  Official Live Stream
                </Badge>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary">
                Google Business Updates
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Direct updates and announcements published from TAP's official Google Business Profile.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {googleBusinessPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all border border-border/80 flex flex-col justify-between">
                <div>
                  {post.imageUrl && (
                    <div className="w-full h-44 bg-muted overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader className="p-5 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-xs border-none font-medium">
                        {post.category}
                      </Badge>
                    </div>
                    <CardTitle className="font-display text-base line-clamp-2 leading-snug">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <CardDescription className="line-clamp-3 text-xs text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                </div>
                <div className="p-5 pt-0 mt-auto">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-primary hover:text-primary/80 pt-3 border-t transition-colors"
                  >
                    <span>View Google Post</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 bg-muted">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-secondary mb-8">Latest Articles & Reports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherNews.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {article.featured_image_url && (
                  <img
                    src={article.featured_image_url}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {article.category && (
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(article.published_at || article.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                  <CardTitle className="font-display text-lg line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {article.excerpt && (
                    <CardDescription className="line-clamp-3 mb-4">
                      {article.excerpt}
                    </CardDescription>
                  )}
                  <Link
                    to={`/news/${article.slug}`}
                    className="inline-flex items-center text-sm text-primary hover:underline"
                    aria-label={`Read full article: ${article.title}`}
                  >
                    Read full article
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}