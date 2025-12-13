import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

export default function Partners() {
  const { t } = useTranslation();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const partnershipBenefits = [
    { icon: Users, title: t("partnersPage.benefits.access"), description: t("partnersPage.benefits.accessDesc") },
    { icon: Building2, title: t("partnersPage.benefits.visibility"), description: t("partnersPage.benefits.visibilityDesc") },
    { icon: Globe, title: t("partnersPage.benefits.networking"), description: t("partnersPage.benefits.networkingDesc") },
    { icon: Handshake, title: t("partnersPage.benefits.collaborative"), description: t("partnersPage.benefits.collaborativeDesc") },
  ];

  const placeholderPartners: Partner[] = [
    { id: "1", name: "Kilimanjaro Expeditions", description: t("partnersPage.placeholders.tourOperator"), logo_url: null, website: "https://example.com", partner_type: t("partnersPage.types.tourOperator") },
    { id: "2", name: "Tanzania Tourism Board", description: t("partnersPage.placeholders.government"), logo_url: null, website: "https://example.com", partner_type: t("partnersPage.types.government") },
    { id: "3", name: "Mountain Health Initiative", description: t("partnersPage.placeholders.ngo"), logo_url: null, website: "https://example.com", partner_type: t("partnersPage.types.ngo") },
    { id: "4", name: "Adventure Gear Co.", description: t("partnersPage.placeholders.corporate"), logo_url: null, website: "https://example.com", partner_type: t("partnersPage.types.corporate") },
  ];

  useEffect(() => {
    async function fetchPartners() {
      const { data } = await supabase
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
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{t("partnersPage.title")}</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            {t("partnersPage.subtitle")}
          </p>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
              {t("partnersPage.ourPartners")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("partnersPage.ourPartnersDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-lg flex items-center justify-center">
                    {partner.logo_url ? (
                      <img src={partner.logo_url} alt={partner.name} className="w-full h-full object-contain p-2" />
                    ) : (
                      <Building2 className="h-10 w-10 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-secondary mb-1">{partner.name}</h3>
                  {partner.partner_type && <p className="text-xs text-primary mb-2">{partner.partner_type}</p>}
                  {partner.description && <p className="text-sm text-muted-foreground mb-3">{partner.description}</p>}
                  {partner.website && (
                    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-primary hover:underline">
                      {t("partnersPage.visitWebsite")}
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
              {t("partnersPage.whyPartner")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("partnersPage.whyPartnerDesc")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit) => (
              <Card key={benefit.title}>
                <CardContent className="p-6 text-center">
                  <benefit.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display font-semibold text-secondary mb-2">{benefit.title}</h3>
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
            {t("partnersPage.becomePartner")}
          </h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
            {t("partnersPage.becomePartnerDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/membership/corporate">
              <Button size="lg">{t("index.cta.corporateMembership")}</Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                {t("index.quickLinks.contactUs")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}