import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, GraduationCap, Heart, Languages, Users, Award, ArrowRight } from "lucide-react";

export default function Programs() {
  const { t } = useTranslation();

  const programs = [
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

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{t("programsPage.title")}</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            {t("programsPage.subtitle")}
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Card key={program.title} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                    <h4 className="font-semibold text-secondary mb-2">{t("programsPage.whatYouLearn")}</h4>
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

      {/* Enrollment CTA */}
      <section className="py-20 bg-gradient-warm">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-6">
            {t("programsPage.ctaTitle")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("programsPage.ctaDesc")}
          </p>
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

      {/* Training Schedule */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
              {t("programsPage.upcomingSessions")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("programsPage.upcomingDesc")}
            </p>
          </div>
          <div className="bg-muted rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-4">
              {t("programsPage.checkBack")}
            </p>
            <Link to="/contact">
              <Button>{t("programsPage.inquireTraining")}</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}