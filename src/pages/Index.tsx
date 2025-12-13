import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, GraduationCap, Shield, Heart, Mountain, Award, Quote, ChevronRight } from "lucide-react";

export default function Index() {
  const { t } = useTranslation();

  const stats = [
    { label: t("index.stats.registeredPorters"), value: "5,000+", icon: Users },
    { label: t("index.stats.trainingPrograms"), value: "12", icon: GraduationCap },
    { label: t("index.stats.partnerOrganizations"), value: "50+", icon: Shield },
    { label: t("index.stats.yearsOfService"), value: "15+", icon: Award },
  ];

  const programs = [
    {
      title: t("index.programs.safetyHealth"),
      description: t("index.programs.safetyHealthDesc"),
      icon: Shield,
    },
    {
      title: t("index.programs.skillsDevelopment"),
      description: t("index.programs.skillsDesc"),
      icon: GraduationCap,
    },
    {
      title: t("index.programs.welfarePrograms"),
      description: t("index.programs.welfareDesc"),
      icon: Heart,
    },
  ];

  const testimonials = [
    {
      quote: "TAP gave me the training and confidence to provide the best service. Now I can support my family and send my children to school.",
      name: "Emmanuel Kimaro",
      role: "Porter, 20 years experience",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      quote: "The health screenings saved my life. They found a condition I didn't know I had. I'm grateful for TAP's welfare programs.",
      name: "Grace Mwanga",
      role: "Porter, 8 years experience",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
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
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t("index.heroTitle1")}
              <span className="block text-primary">{t("index.heroTitle2")}</span>
              {t("index.heroTitle3")}
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/80 leading-relaxed">
              {t("index.heroSubtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/membership/porter">
                <Button size="lg" className="text-lg px-8 h-14 shadow-lg shadow-primary/25">
                  {t("index.joinAsPorter")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 h-14 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  {t("index.learnAboutTap")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
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
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                {t("index.about.description1")}
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {t("index.about.description2")}
              </p>
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

      {/* Programs Section */}
      <section className="py-24 bg-muted">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">{t("index.programs.whatWeOffer")}</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-3 mb-4">
              {t("index.programs.ourPrograms")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("index.programs.programsDescription")}
            </p>
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
            <p className="text-muted-foreground text-lg">
              {t("index.testimonials.testimonialsDesc")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-gradient-to-br from-card to-muted/50 border-none">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />
                  <p className="text-foreground text-lg mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
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

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t("index.cta.joinCommunity")}
            </h2>
            <p className="text-secondary-foreground/80 text-lg mb-10 leading-relaxed">
              {t("index.cta.ctaDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/membership/porter">
                <Button size="lg" className="text-lg h-14 px-8">
                  {t("index.cta.porterRegistration")}
                </Button>
              </Link>
              <Link to="/membership/corporate">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg h-14 px-8 bg-transparent border-2 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                >
                  {t("index.cta.corporateMembership")}
                </Button>
              </Link>
              <Link to="/membership/honorary">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg h-14 px-8 bg-transparent border-2 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                >
                  {t("index.cta.supportUs")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-card border-t">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <Link to="/news" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-none bg-muted/50 group-hover:bg-muted">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {t("index.quickLinks.latestNews")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("index.quickLinks.newsDesc")}
                  </p>
                  <span className="text-primary text-sm font-medium inline-flex items-center">
                    {t("index.quickLinks.readNews")} <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/gallery" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-none bg-muted/50 group-hover:bg-muted">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    {t("index.quickLinks.photoGallery")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("index.quickLinks.galleryDesc")}
                  </p>
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
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("index.quickLinks.partnersDesc")}
                  </p>
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
                  <p className="text-sm text-muted-foreground mb-4">
                    {t("index.quickLinks.contactDesc")}
                  </p>
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