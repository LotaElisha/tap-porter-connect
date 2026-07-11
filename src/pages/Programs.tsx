import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Shield,
  GraduationCap,
  Heart,
  Languages,
  Users,
  Award,
  ArrowRight,
  Package,
  Stethoscope,
  LifeBuoy,
  Banknote,
  Scale,
  Gavel,
  ClipboardCheck,
  Loader2,
} from "lucide-react";

export default function Programs() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [pledgeForm, setPledgeForm] = useState({ company: "", contact: "", email: "", website: "" });
  const [submitting, setSubmitting] = useState(false);

  const trainingPrograms = [
    {
      icon: Shield,
      title: t("programsPage.mountainSafety.title"),
      description: t("programsPage.mountainSafety.desc"),
      features: t("programsPage.mountainSafety.features", { returnObjects: true }) as string[],
      duration: t("programsPage.mountainSafety.duration"),
      certification: t("programsPage.mountainSafety.cert"),
    },
    {
      icon: Heart,
      title: t("programsPage.health.title"),
      description: t("programsPage.health.desc"),
      features: t("programsPage.health.features", { returnObjects: true }) as string[],
      duration: t("programsPage.health.duration"),
      certification: t("programsPage.health.cert"),
    },
    {
      icon: GraduationCap,
      title: t("programsPage.professional.title"),
      description: t("programsPage.professional.desc"),
      features: t("programsPage.professional.features", { returnObjects: true }) as string[],
      duration: t("programsPage.professional.duration"),
      certification: t("programsPage.professional.cert"),
    },
    {
      icon: Languages,
      title: t("programsPage.language.title"),
      description: t("programsPage.language.desc"),
      features: t("programsPage.language.features", { returnObjects: true }) as string[],
      duration: t("programsPage.language.duration"),
      certification: t("programsPage.language.cert"),
    },
    {
      icon: Users,
      title: t("programsPage.guide.title"),
      description: t("programsPage.guide.desc"),
      features: t("programsPage.guide.features", { returnObjects: true }) as string[],
      duration: t("programsPage.guide.duration"),
      certification: t("programsPage.guide.cert"),
    },
    {
      icon: Award,
      title: t("programsPage.certificationProgram.title"),
      description: t("programsPage.certificationProgram.desc"),
      features: t("programsPage.certificationProgram.features", { returnObjects: true }) as string[],
      duration: t("programsPage.certificationProgram.duration"),
      certification: t("programsPage.certificationProgram.cert"),
    },
  ];

  const welfareItems = [
    { icon: Package, key: "gear" },
    { icon: Stethoscope, key: "medical" },
    { icon: LifeBuoy, key: "rescue" },
  ] as const;

  const advocacyItems = [
    { icon: Banknote, key: "wages" },
    { icon: Scale, key: "loadLimits" },
    { icon: Gavel, key: "policy" },
  ] as const;

  const pledgeCommitments = t("programsPage.pledge.commitments", { returnObjects: true }) as string[];

  const handlePledgeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeForm.company || !pledgeForm.contact || !pledgeForm.email) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: `${pledgeForm.contact} (${pledgeForm.company})`,
        email: pledgeForm.email,
        subject: "Fair Porter Pledge",
        message: `Company: ${pledgeForm.company}\nWebsite: ${pledgeForm.website || "N/A"}\n\nThis operator commits to TAP's Fair Porter Pledge standards.`,
      });

      if (error) throw error;

      toast({
        title: t("programsPage.pledge.successTitle"),
        description: t("programsPage.pledge.successDesc"),
      });
      setPledgeForm({ company: "", contact: "", email: "", website: "" });
    } catch (error) {
      toast({
        title: t("programsPage.pledge.errorTitle"),
        description: t("programsPage.pledge.errorDesc"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{t("programsPage.title")}</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">{t("programsPage.subtitle")}</p>
        </div>
      </section>

      {/* Welfare Section */}
      <section id="welfare" className="py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              {t("programsPage.sections.welfare.label")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mt-3 mb-4">
              {t("programsPage.sections.welfare.title")}
            </h2>
            <p className="text-muted-foreground text-lg">{t("programsPage.sections.welfare.desc")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {welfareItems.map((item) => (
              <Card key={item.key} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="font-display text-xl">
                    {t(`programsPage.welfareItems.${item.key}.title`)}
                  </CardTitle>
                  <CardDescription>{t(`programsPage.welfareItems.${item.key}.desc`)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {(t(`programsPage.welfareItems.${item.key}.features`, { returnObjects: true }) as string[]).map(
                      (feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-20 bg-muted scroll-mt-20">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              {t("programsPage.sections.training.label")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mt-3 mb-4">
              {t("programsPage.sections.training.title")}
            </h2>
            <p className="text-muted-foreground text-lg">{t("programsPage.sections.training.desc")}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {trainingPrograms.map((program) => (
              <Card key={program.title} className="overflow-hidden hover:shadow-lg transition-shadow bg-card">
                <CardHeader className="bg-muted">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <program.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-xl">{program.title}</CardTitle>
                      <CardDescription className="mt-1">{program.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold text-secondary mb-2">{t("programsPage.whatYouLearn")}</h3>
                    <ul className="space-y-1">
                      {program.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">{t("programsPage.duration")}:</span>{" "}
                      <span className="font-medium text-secondary">{program.duration}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">{t("programsPage.certification")}:</span>{" "}
                      <span className="font-medium text-secondary">{program.certification}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advocacy Section */}
      <section id="advocacy" className="py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              {t("programsPage.sections.advocacy.label")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mt-3 mb-4">
              {t("programsPage.sections.advocacy.title")}
            </h2>
            <p className="text-muted-foreground text-lg">{t("programsPage.sections.advocacy.desc")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {advocacyItems.map((item) => (
              <Card key={item.key} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="font-display text-xl">
                    {t(`programsPage.advocacyItems.${item.key}.title`)}
                  </CardTitle>
                  <CardDescription>{t(`programsPage.advocacyItems.${item.key}.desc`)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {(t(`programsPage.advocacyItems.${item.key}.features`, { returnObjects: true }) as string[]).map(
                      (feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                          {feature}
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className="py-20 bg-gradient-warm">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-6">
            {t("programsPage.ctaTitle")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">{t("programsPage.ctaDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/membership/porter">
              <Button size="lg">
                {t("programsPage.registerAsPorter")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                {t("programsPage.contactForDetails")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Fair Porter Pledge */}
      <section id="pledge" className="py-20 bg-secondary text-secondary-foreground scroll-mt-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                {t("programsPage.pledge.label")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">
                {t("programsPage.pledge.title")}
              </h2>
              <p className="text-secondary-foreground/80 text-lg mb-8">{t("programsPage.pledge.desc")}</p>

              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                {t("programsPage.pledge.commitmentsTitle")}
              </h3>
              <ul className="space-y-3">
                {pledgeCommitments.map((commitment) => (
                  <li key={commitment} className="flex items-start gap-3 text-secondary-foreground/80">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                    {commitment}
                  </li>
                ))}
              </ul>
            </div>

            <Card className="bg-secondary-foreground/5 border-secondary-foreground/10">
              <CardHeader>
                <CardTitle className="text-secondary-foreground font-display">
                  {t("programsPage.pledge.formTitle")}
                </CardTitle>
                <CardDescription className="text-secondary-foreground/70">
                  {t("programsPage.pledge.formDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePledgeSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pledge-company" className="text-secondary-foreground">
                      {t("programsPage.pledge.companyName")} *
                    </Label>
                    <Input
                      id="pledge-company"
                      required
                      value={pledgeForm.company}
                      onChange={(e) => setPledgeForm((p) => ({ ...p, company: e.target.value }))}
                      className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pledge-contact" className="text-secondary-foreground">
                      {t("programsPage.pledge.contactName")} *
                    </Label>
                    <Input
                      id="pledge-contact"
                      required
                      value={pledgeForm.contact}
                      onChange={(e) => setPledgeForm((p) => ({ ...p, contact: e.target.value }))}
                      className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pledge-email" className="text-secondary-foreground">
                      {t("programsPage.pledge.contactEmail")} *
                    </Label>
                    <Input
                      id="pledge-email"
                      type="email"
                      required
                      value={pledgeForm.email}
                      onChange={(e) => setPledgeForm((p) => ({ ...p, email: e.target.value }))}
                      className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pledge-website" className="text-secondary-foreground">
                      {t("programsPage.pledge.website")}
                    </Label>
                    <Input
                      id="pledge-website"
                      value={pledgeForm.website}
                      onChange={(e) => setPledgeForm((p) => ({ ...p, website: e.target.value }))}
                      className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("programsPage.pledge.submitting")}
                      </>
                    ) : (
                      t("programsPage.pledge.submit")
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
