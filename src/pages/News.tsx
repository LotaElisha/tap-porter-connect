import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

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
    title: "TAP Launches New Safety Training Program",
    slug: "tap-launches-new-safety-training",
    excerpt: "The Tanzania Association of Porters has launched a comprehensive new safety training program aimed at reducing altitude-related incidents on Mount Kilimanjaro.",
    featured_image_url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    category: "Programs",
    published_at: "2024-01-15",
    created_at: "2024-01-15",
  },
  {
    id: "2",
    title: "Partnership with International Mountain Guides Association",
    slug: "partnership-with-imga",
    excerpt: "TAP is proud to announce a new partnership with the International Mountain Guides Association to improve training standards and certification recognition.",
    featured_image_url: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800",
    category: "Partnerships",
    published_at: "2024-01-10",
    created_at: "2024-01-10",
  },
  {
    id: "3",
    title: "Annual Porter Appreciation Day Celebration",
    slug: "porter-appreciation-day-2024",
    excerpt: "Join us in celebrating the unsung heroes of Tanzania's mountains. This year's Porter Appreciation Day will feature special events and recognition ceremonies.",
    featured_image_url: "https://images.unsplash.com/photo-1621414050946-1b936a78491d?w=800",
    category: "Events",
    published_at: "2024-01-05",
    created_at: "2024-01-05",
  },
  {
    id: "4",
    title: "Health Screening Campaign Reaches 1,000 Porters",
    slug: "health-screening-milestone",
    excerpt: "Our annual health screening campaign has successfully reached over 1,000 porters, providing free medical checkups and health education.",
    featured_image_url: "https://images.unsplash.com/photo-1650668302197-7f556c34cb91?w=800",
    category: "Health",
    published_at: "2024-01-01",
    created_at: "2024-01-01",
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
            Stay informed about TAP's latest programs, partnerships, and initiatives supporting porter welfare.
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
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-12 bg-muted">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-secondary mb-8">Latest News</h2>
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
                  >
                    Read More
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