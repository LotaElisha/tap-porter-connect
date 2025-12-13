import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Lightbulb, Heart, Users, Award, Globe, GraduationCap, Handshake, Shield, Banknote } from "lucide-react";

import loishiyePhoto from "@/assets/loishiye-lenoy-mollel.png";
import chairmanPhoto from "@/assets/mohamed-ally-mkoma.png";

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

  const leadership = [
    { name: "Mohamed Ally Mkoma", role: t("about.chairman"), image: chairmanPhoto },
    { name: "Loishiye Lenoy Mollel", role: t("about.viceChairman"), image: loishiyePhoto },
    { name: "Katibu Mkuu", role: t("about.generalSecretary"), image: null },
    { name: "Mtunza Hazina", role: t("about.treasurer"), image: null },
  ];

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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader) => (
              <Card key={leader.name} className="overflow-hidden">
                {leader.image ? (
                  <img
                    src={leader.image}
                    alt={`${leader.name} - ${leader.role} | TAP Leadership Team`}
                    loading="lazy"
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-muted flex items-center justify-center">
                    <Users className="h-20 w-20 text-muted-foreground/40" />
                  </div>
                )}
                <CardContent className="p-4 text-center">
                  <h3 className="font-display text-lg font-semibold text-secondary">{leader.name}</h3>
                  <p className="text-sm text-muted-foreground">{leader.role}</p>
                </CardContent>
              </Card>
            ))}
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