import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Lightbulb, Heart, Users, Award, Globe, GraduationCap, Handshake, Shield, Banknote, ArrowRight } from "lucide-react";

import { moshiOfficeRepresentatives, organizationStaff } from "@/config/organization";

export default function About() {
  const { t } = useTranslation();

  const objectives = [
    { icon: Users, title: t("about.unity"), description: t("about.unityDesc") },
    { icon: GraduationCap, title: t("about.training"), description: t("about.trainingDesc") },
    { icon: Shield, title: t("about.rights"), description: t("about.rightsDesc") },
    { icon: Award, title: t("about.economic"), description: t("about.economicDesc") },
    { icon: Handshake, title: t("about.collaboration"), description: t("about.collaborationDesc") },
    { icon: Globe, title: t("about.environmental"), description: t("about.environmentalDesc") },
    { icon: Heart, title: t("about.equipment"), description: t("about.equipmentDesc") },
    { icon: Banknote, title: t("about.payment"), description: t("about.paymentDesc") },
  ];

  const values = [
    { icon: Heart, title: t("about.dignity"), description: t("about.dignityDesc") },
    { icon: Users, title: t("about.community"), description: t("about.communityDesc") },
    { icon: Award, title: t("about.excellence"), description: t("about.excellenceDesc") },
    { icon: Globe, title: t("about.sustainability"), description: t("about.sustainabilityDesc") },
  ];

  const staff = organizationStaff;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{t("about.title")}</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Purpose, Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-warm border-none">
              <CardContent className="p-8">
                <Lightbulb className="h-12 w-12 text-primary mb-4" />
                <h2 className="font-display text-2xl font-bold text-secondary mb-2">{t("about.purpose")}</h2>
                <p className="text-muted-foreground">{t("about.purposeDesc")}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-warm border-none">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h2 className="font-display text-2xl font-bold text-secondary mb-2">{t("about.mission")}</h2>
                <p className="text-muted-foreground">{t("about.missionDesc")}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-warm border-none">
              <CardContent className="p-8">
                <Eye className="h-12 w-12 text-primary mb-4" />
                <h2 className="font-display text-2xl font-bold text-secondary mb-2">{t("about.vision")}</h2>
                <p className="text-muted-foreground">{t("about.visionDesc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">{t("about.objectives")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("about.objectivesDesc")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((objective) => (
              <Card key={objective.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <objective.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold text-secondary mb-2">{objective.title}</h3>
                  <p className="text-sm text-muted-foreground">{objective.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">{t("about.values")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("about.valuesDesc")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-6">
                  <value.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-secondary mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">{t("about.leadership")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("about.leadershipDesc")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {staff.map((member) => (
              <Card key={member.name} className="overflow-hidden bg-card hover:shadow-lg transition-all border-none">
                {member.image ? (
                  <div className="w-full h-80 bg-secondary/10 flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.roleTitle || member.office} | TAP Office Team`}
                      loading="lazy"
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                ) : (
                  <div className="w-full h-80 bg-muted/80 flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-2">
                      {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                  </div>
                )}
                <CardContent className="p-5 text-center">
                  <h3 className="font-display text-lg font-semibold text-secondary">{member.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{member.roleTitle || member.office}</p>
                  <p className="text-xs text-muted-foreground/80 mt-1">{member.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Moshi Secretary Office */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">Moshi Secretary Office</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Official representatives serving TAP members from our Moshi Secretary Office.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {moshiOfficeRepresentatives.map((rep) => (
              <Card key={rep.name} className="overflow-hidden bg-card hover:shadow-lg transition-all border-none">
                {rep.image ? (
                  <div className="w-full h-80 bg-secondary/10 flex items-center justify-center p-2 overflow-hidden">
                    <img
                      src={rep.image}
                      alt={`${rep.name} - ${rep.office} | TAP Moshi Secretary Office`}
                      loading="lazy"
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                ) : (
                  <div className="w-full h-80 bg-muted/80 flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl mb-2">
                      {rep.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                  </div>
                )}
                <CardContent className="p-5 text-center">
                  <h3 className="font-display text-lg font-semibold text-secondary">{rep.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{rep.office}</p>
                  <p className="text-xs text-muted-foreground/80 mt-1">Location: {rep.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                {t("about.historyLabel")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mt-3 mb-6">
                {t("about.historyTitle")}
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">{t("about.historyDesc1")}</p>
              <p className="text-muted-foreground mb-8 leading-relaxed">{t("about.historyDesc2")}</p>
              <Link to="/history">
                <Button variant="outline" size="lg">
                  {t("about.readFullHistory")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1650668302197-7f556c34cb91?q=80&w=2070"
              alt="Historic mountain porter expedition in Tanzania - TAP history"
              loading="lazy"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">{t("about.whatWeDo")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{t("about.advocacy")}</h3>
              <p className="text-secondary-foreground/80">{t("about.advocacyDesc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{t("about.trainingTitle")}</h3>
              <p className="text-secondary-foreground/80">{t("about.trainingTitleDesc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{t("about.welfare")}</h3>
              <p className="text-secondary-foreground/80">{t("about.welfareDesc")}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}