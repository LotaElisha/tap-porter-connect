import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, GraduationCap, Shield, Heart, Mountain, Award, Quote, ChevronRight } from "lucide-react";

const stats = [
  { label: "Registered Porters", value: "5,000+", icon: Users },
  { label: "Training Programs", value: "12", icon: GraduationCap },
  { label: "Partner Organizations", value: "50+", icon: Shield },
  { label: "Years of Service", value: "15+", icon: Award },
];

const programs = [
  {
    title: "Safety & Health Training",
    description: "Comprehensive training on altitude sickness prevention, first aid, and mountain safety protocols.",
    icon: Shield,
  },
  {
    title: "Skills Development",
    description: "Professional development programs including language skills, customer service, and leadership.",
    icon: GraduationCap,
  },
  {
    title: "Welfare Programs",
    description: "Healthcare support, insurance schemes, and emergency assistance for porters and their families.",
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

export default function Index() {
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
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-8 backdrop-blur-sm">
              <Mountain className="h-4 w-4 text-primary" />
              <span>Tanzania Association of Porters</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Honoring the
              <span className="block text-primary">Unsung Heroes</span>
              of Kilimanjaro
            </h1>
            
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/80 leading-relaxed">
              Dedicated to the welfare, professional development, and recognition of the brave men and women who carry dreams to the Roof of Africa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/membership/porter">
                <Button size="lg" className="text-lg px-8 h-14 shadow-lg shadow-primary/25">
                  Join as a Porter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 h-14 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  Learn About TAP
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
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
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center group"
              >
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
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Who We Are</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-3 mb-6">
                Elevating Porters,
                <span className="block text-primary">Preserving Legacy</span>
              </h2>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                The Tanzania Association of Porters represents and advocates for the interests of mountain porters across Tanzania. We ensure that the backbone of Tanzania's trekking industry receives the recognition, training, and support they deserve.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our mission is to elevate the status of porters through professional training, health and safety programs, and creating sustainable livelihoods for our members and their families.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Our Story
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/history">
                  <Button variant="ghost" size="lg">
                    History & Legacy
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1621414050946-1b936a78491d?q=80&w=2070"
                  alt="Porters on Mount Kilimanjaro"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-8 -left-8 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
                  <Mountain className="h-8 w-8 mb-2" />
                  <p className="font-display text-3xl font-bold">15+</p>
                  <p className="text-sm opacity-90">Years of Service</p>
                </div>
              </div>
              {/* Decorative */}
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
            <span className="text-primary font-medium text-sm tracking-wider uppercase">What We Offer</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-3 mb-4">
              Our Programs
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive programs designed to support, train, and empower porters at every stage of their careers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card
                key={program.title}
                className="bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none"
              >
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
                Explore All Programs
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
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Porter Voices</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary mt-3 mb-4">
              Stories from the Summit
            </h2>
            <p className="text-muted-foreground text-lg">
              Hear from the porters whose lives have been transformed through TAP.
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
                      alt={testimonial.name}
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
                Read More Stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Join the TAP Community
            </h2>
            <p className="text-secondary-foreground/80 text-lg mb-10 leading-relaxed">
              Whether you're a porter, tour operator, or supporter of our cause, there's a place for you. Together, we can build a better future for Tanzania's mountain porters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/membership/porter">
                <Button size="lg" className="text-lg h-14 px-8">
                  Porter Registration
                </Button>
              </Link>
              <Link to="/membership/corporate">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg h-14 px-8 bg-transparent border-2 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                >
                  Corporate Membership
                </Button>
              </Link>
              <Link to="/membership/honorary">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg h-14 px-8 bg-transparent border-2 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
                >
                  Support Us
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
                    Latest News
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Stay updated with TAP announcements and initiatives.
                  </p>
                  <span className="text-primary text-sm font-medium inline-flex items-center">
                    Read News <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/gallery" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-none bg-muted/50 group-hover:bg-muted">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    Photo Gallery
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    See the beauty of our mountains and community.
                  </p>
                  <span className="text-primary text-sm font-medium inline-flex items-center">
                    View Gallery <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/partners" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-none bg-muted/50 group-hover:bg-muted">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    Our Partners
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Meet the organizations supporting our mission.
                  </p>
                  <span className="text-primary text-sm font-medium inline-flex items-center">
                    View Partners <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/contact" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-none bg-muted/50 group-hover:bg-muted">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-secondary mb-2 group-hover:text-primary transition-colors">
                    Contact Us
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get in touch with our team for inquiries.
                  </p>
                  <span className="text-primary text-sm font-medium inline-flex items-center">
                    Get in Touch <ChevronRight className="h-4 w-4 ml-1" />
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