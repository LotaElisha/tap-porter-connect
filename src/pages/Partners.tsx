import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, Handshake, Building2, Users, Globe } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  description: string | null;
  logo_url: string | null;
  website: string | null;
  partner_type: string | null;
}

const partnershipBenefits = [
  {
    icon: Users,
    title: "Access to Certified Porters",
    description: "Connect with our network of trained and certified professional porters.",
  },
  {
    icon: Building2,
    title: "Brand Visibility",
    description: "Showcase your commitment to ethical tourism on our platforms.",
  },
  {
    icon: Globe,
    title: "Industry Networking",
    description: "Join a community of like-minded organizations working for sustainable tourism.",
  },
  {
    icon: Handshake,
    title: "Collaborative Programs",
    description: "Partner on training, research, and community development initiatives.",
  },
];

// Placeholder partners for demo
const placeholderPartners: Partner[] = [
  {
    id: "1",
    name: "Kilimanjaro Expeditions",
    description: "Leading tour operator committed to ethical porter practices.",
    logo_url: null,
    website: "https://example.com",
    partner_type: "Tour Operator",
  },
  {
    id: "2",
    name: "Tanzania Tourism Board",
    description: "Government body promoting sustainable tourism in Tanzania.",
    logo_url: null,
    website: "https://example.com",
    partner_type: "Government",
  },
  {
    id: "3",
    name: "Mountain Health Initiative",
    description: "NGO focused on healthcare for mountain communities.",
    logo_url: null,
    website: "https://example.com",
    partner_type: "NGO",
  },
  {
    id: "4",
    name: "Adventure Gear Co.",
    description: "Equipment supplier supporting porter welfare programs.",
    logo_url: null,
    website: "https://example.com",
    partner_type: "Corporate",
  },
];

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("display_order", { ascending: true });

      if (data && data.length > 0) {
        setPartners(data);
      } else {
        setPartners(placeholderPartners);
      }
      setLoading(false);
    }

    fetchPartners();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Partners & Collaborators</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            We work with tour operators, NGOs, government bodies, and international organizations to promote ethical tourism and porter welfare.
          </p>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
              Our Partners
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These organizations share our commitment to improving the lives of mountain porters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                    {partner.logo_url ? (
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <Building2 className="h-10 w-10 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-secondary mb-1">
                    {partner.name}
                  </h3>
                  {partner.partner_type && (
                    <p className="text-xs text-primary mb-2">{partner.partner_type}</p>
                  )}
                  {partner.description && (
                    <p className="text-sm text-muted-foreground mb-3">{partner.description}</p>
                  )}
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:underline"
                    >
                      Visit Website
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Partnering with TAP offers numerous benefits while making a real difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="p-6 text-center">
                  <benefit.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-secondary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Become a Partner
          </h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
            Join our network of partners committed to ethical tourism and porter welfare. Whether you're a tour operator, NGO, or corporate sponsor, there's a way for you to contribute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/membership/corporate">
              <Button size="lg">
                Corporate Membership
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}