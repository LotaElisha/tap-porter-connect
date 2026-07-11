import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import {
  ArrowRight,
  Users,
  GraduationCap,
  Shield,
  Heart,
  Mountain,
  Award,
  Quote,
  ChevronRight,
  Handshake,
  Calendar,
} from "lucide-react";

interface NewsPreviewItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string;
}

const placeholderNews: NewsPreviewItem[] = [
  {
    id: "1",
    title: "New Mountain Safety Cohort Certifies 60 Porters",
    slug: "safety-cohort-certifies-60-porters",
    excerpt: "TAP's latest first-aid and altitude-safety cohort completed training on the Machame route, bringing certified porters past the 1,200 mark this year.",
    category: "Training",
    published_at: "2026-06-20",
    created_at: "2026-06-20",
  },
  {
    id: "2",
    title: "Partnership Signed with Kilimanjaro Tour Operators Group",
    slug: "partnership-kilimanjaro-tour-operators",
    excerpt: "Twelve operators have joined TAP's Fair Porter Pledge, committing to published wage standards and the 20kg load limit.",
    category: "Partnerships",
    published_at: "2026-06-05",
    created_at: "2026-06-05",
  },
  {
    id: "3",
    title: "Gear Distribution Reaches Porters on Mount Meru Routes",
    slug: "gear-distribution-mount-meru",
    excerpt: "Our welfare team distributed cold-weather gear to 140 porters ahead of the wet season, funded entirely by individual donors.",
    category: "Welfare",
    published_at: "2026-05-18",
    created_at: "2026-05-18",
  },
];

export default function Index() {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsPreviewItem[]>(placeholderNews);

  useEffect(() => {
    async function fetchNews() {
      const { data } = await supabase
        .from("news_articles")
        .select("id, title, slug, excerpt, category, published_at, created_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (data && data.length > 0) {
        setNews(data);
      }
    }
    fetchNews();
  }, []);

  const pillars = [
    { icon: Shield, title: t("index.pillars.welfare"), description: t("index.pillars.welfareDesc") },
    { icon: GraduationCap, title: t("index.pillars.training"), description: t("index.pillars.trainingDesc") },
    { icon: Award, title: t("index.pillars.advocacy"), description: t("index.pillars.advocacyDesc") },
    { icon: Handshake, title: t("index.pillars.partnership"), description: t("index.pillars.partnershipDesc") },
  ];

  const stats = [
    { label: t("index.stats.registeredPorters"), value: "5,000+", icon: Users },
    { label: t("index.stats.trainingPrograms"), value: "12", icon: GraduationCap },
    { label: t("index.stats.partnerOrganizations"), value: "50+", icon: Shield },
    { label: t("index.stats.yearsOfService"), value: "15+", icon: Award },
  ];

  const programs = [
    { title: t("index.programs.safetyHealth"), description: t("index.programs.safetyHealthDesc"), icon: Shield },
    { title: t("index.programs.skillsDevelopment"), description: t("index.programs.skillsDesc"), icon: GraduationCap },
    { title: t("index.programs.welfarePrograms"), description: t("index.programs.welfareDesc"), icon: Award },
  ];

  const testimonials = [
    {
      quote: "TAP's training gave me the certification I needed to work with international operators. Now I'm paid on time, every time.",
      name: "Emmanuel Kimaro",
      role: "Porter, 20 years experience",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      quote: "The annual health screening found a condition early. TAP's welfare program covered my treatment.",
      name: "Grace Mwanga",
      role: "Porter, 8 years experience",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?q=80&w=2070')`,
          }}
        />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-8 backdrop-blur-sm">
              <Mountain className="h-4 w-4 text-primary" />
              <span>{t("index.tagline")}</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-balance">
              {t("index.heroTitle")}
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/80 leading-relaxed">
              {t("index.heroSubtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate">
                <Button size="lg" className="text-lg px-8 h-14 shadow-lg shadow-primary/25 gap-2">
                  <Heart className="h-5 w-5" />
                  {t("index.donateNow")}
                </Button>
              </Link>
              <Link to="/programs">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 h-14 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  {t("index.seeOurPrograms")}
                </Button>
              </Link>
            </div>

            <Link
              to="/membership/porter"
              className="inline-block mt-6 text-sm text-white/70 hover:text-white underline underline-offset-4 transition-colors"
            >
              {t("index.joinAsPorter")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="h-7 w-7 text-primary" />
                </div>
                <p className="font-display text-3xl md:text-4xl font-bold text-secondary">{stat.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">{t("index.about.whoWeAre")}</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-3 mb-6">
                {t("index.about.elevatingPorters")}
                <span className="block text-primary">{t("index.about.preservingLegacy")}</span>
              </h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{t("index.about.description1")}</p>
              <p className="text-muted-foreground mb-8 leading-relaxed">{t("index.about.description2")}</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    {t("index.about.ourStory")}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/history">
                  <Button variant="ghost" size="lg">
                    {t("index.about.historyLegacy")}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1621414050946-1b936a78491d?q=80&w=2070"
                  alt="Porters carrying supplies on Mount Kilimanjaro trek - Tanzania Association of Porters"
                  loading="lazy"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
                  <Mountain className="h-8 w-8 mb-2" />
                  <p className="font-display text-3xl font-bold">15+</p>
                  <p className="text-sm opacity-90">{t("index.stats.yearsOfService")}</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
              <div className="absolute -bottom-4 right-12 w-16 h-16 bg-primary/20 rounded-xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">{t("index.pillars.sectionLabel")}</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
              {t("index.pillars.sectionTitle")}
            </h2>
            <p className="text-secondary-foreground/80 text-lg">{t("index.pillars.sectionDesc")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="p-8 rounded-2xl bg-secondary-foreground/5 border border-secondary-foreground/10 hover:bg-secondary-foreground/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <pillar.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{pillar.title}</h3>
                <p className="text-secondary-foreground/70 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">{t("index.programs.whatWeOffer")}</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-3 mb-4">
              {t("index.programs.ourPrograms")}
            </h2>
            <p className="text-muted-foreground text-lg">{t("index.programs.programsDescription")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.title} className="bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none">
                <CardHeader className="pb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <program.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="font-display text-xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{program.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/programs">
              <Button size="lg" className="shadow-lg">
                {t("index.programs.exploreAllPrograms")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">{t("index.testimonials.porterVoices")}</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-3 mb-4">
              {t("index.testimonials.storiesFromSummit")}
            </h2>
            <p className="text-muted-foreground text-lg">{t("index.testimonials.testimonialsDesc")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-gradient-to-br from-card to-muted/50 border-none">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />
                  <p className="text-foreground text-lg mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name} - ${testimonial.role} | TAP Porter Testimonial`}
                      loading="lazy"
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <p className="font-display font-semibold text-secondary">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/stories">
              <Button variant="outline" size="lg">
                {t("index.testimonials.readMoreStories")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                {t("index.newsPreview.sectionLabel")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mt-3 mb-2">
                {t("index.newsPreview.sectionTitle")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">{t("index.newsPreview.sectionDesc")}</p>
            </div>
            <Link to="/news">
              <Button variant="outline">
                {t("index.newsPreview.viewAllNews")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {news.map((article) => (
              <Card key={article.id} className="bg-card hover:shadow-lg transition-shadow border-none">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {article.category && <Badge variant="secondary" className="text-xs">{article.category}</Badge>}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(article.published_at || article.created_at), "MMM d, yyyy")}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-secondary mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                  )}
                  <Link to="/news" className="inline-flex items-center text-sm text-primary hover:underline font-medium">
                    {t("index.newsPreview.readMore")}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA Band */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-10 w-10 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t("index.donateCta.title")}
            </h2>
            <p className="text-secondary-foreground/80 text-lg mb-10 leading-relaxed">
              {t("index.donateCta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/donate">
                <Button size="lg" className="text-lg h-14 px-8">
                  {t("index.donateCta.donateNow")}
                </Button>
              </Link>
              <Link to="/donate">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg h-14 px-8 bg-transparent border-2 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                >
                  {t("index.donateCta.waysToGive")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-card border-t">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/gallery" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-none bg-muted/50 group-hover:bg-muted">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {t("index.quickLinks.photoGallery")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("index.quickLinks.galleryDesc")}</p>
                  <span className="text-primary text-sm font-medium inline-flex items-center">
                    {t("index.quickLinks.viewGallery")} <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/partners" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-none bg-muted/50 group-hover:bg-muted">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {t("index.quickLinks.ourPartners")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("index.quickLinks.partnersDesc")}</p>
                  <span className="text-primary text-sm font-medium inline-flex items-center">
                    {t("index.quickLinks.viewPartners")} <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/contact" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-none bg-muted/50 group-hover:bg-muted">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {t("index.quickLinks.contactUs")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("index.quickLinks.contactDesc")}</p>
                  <span className="text-primary text-sm font-medium inline-flex items-center">
                    {t("index.quickLinks.getInTouch")} <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
