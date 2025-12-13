import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Building2, Heart, Check, ArrowRight } from "lucide-react";

export default function Membership() {
  const { t } = useTranslation();

  const membershipTypes = [
    {
      icon: User,
      title: t("membershipPage.porterTitle"),
      description: t("membershipPage.porterDesc"),
      benefits: [
        t("membershipPage.porterBenefits.card"),
        t("membershipPage.porterBenefits.training"),
        t("membershipPage.porterBenefits.health"),
        t("membershipPage.porterBenefits.emergency"),
        t("membershipPage.porterBenefits.insurance"),
        t("membershipPage.porterBenefits.job"),
        t("membershipPage.porterBenefits.certification"),
        t("membershipPage.porterBenefits.networking"),
      ],
      fee: t("membershipPage.porterFee"),
      link: "/membership/porter",
      cta: t("membershipPage.registerAsPorter"),
    },
    {
      icon: Building2,
      title: t("membershipPage.corporateTitle"),
      description: t("membershipPage.corporateDesc"),
      benefits: [
        t("membershipPage.corporateBenefits.certification"),
        t("membershipPage.corporateBenefits.database"),
        t("membershipPage.corporateBenefits.training"),
        t("membershipPage.corporateBenefits.marketing"),
        t("membershipPage.corporateBenefits.booking"),
        t("membershipPage.corporateBenefits.events"),
        t("membershipPage.corporateBenefits.review"),
        t("membershipPage.corporateBenefits.visibility"),
      ],
      fee: t("membershipPage.corporateFee"),
      link: "/membership/corporate",
      cta: t("membershipPage.applyForCorporate"),
    },
    {
      icon: Heart,
      title: t("membershipPage.honoraryTitle"),
      description: t("membershipPage.honoraryDesc"),
      benefits: [
        t("membershipPage.honoraryBenefits.recognition"),
        t("membershipPage.honoraryBenefits.reports"),
        t("membershipPage.honoraryBenefits.events"),
        t("membershipPage.honoraryBenefits.volunteer"),
        t("membershipPage.honoraryBenefits.research"),
        t("membershipPage.honoraryBenefits.tax"),
        t("membershipPage.honoraryBenefits.newsletter"),
        t("membershipPage.honoraryBenefits.speaking"),
      ],
      fee: t("membershipPage.honoraryFee"),
      link: "/membership/honorary",
      cta: t("membershipPage.becomeSupporter"),
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{t("membershipPage.title")}</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            {t("membershipPage.subtitle")}
          </p>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
              {t("membershipPage.chooseYourMembership")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("membershipPage.membershipDesc")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {membershipTypes.map((type) => (
              <Card key={type.title} className="flex flex-col">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <type.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-display text-xl">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <p className="text-center text-2xl font-bold text-primary mb-4">{type.fee}</p>
                    <ul className="space-y-2">
                      {type.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <Link to={type.link} className="block">
                      <Button className="w-full">
                        {type.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-6">
                {t("membershipPage.whyJoin")}
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">{t("membershipPage.whyJoinReasons.recognition")}</h3>
                    <p className="text-muted-foreground text-sm">{t("membershipPage.whyJoinReasons.recognitionDesc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">{t("membershipPage.whyJoinReasons.learning")}</h3>
                    <p className="text-muted-foreground text-sm">{t("membershipPage.whyJoinReasons.learningDesc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">{t("membershipPage.whyJoinReasons.support")}</h3>
                    <p className="text-muted-foreground text-sm">{t("membershipPage.whyJoinReasons.supportDesc")}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">{t("membershipPage.whyJoinReasons.voice")}</h3>
                    <p className="text-muted-foreground text-sm">{t("membershipPage.whyJoinReasons.voiceDesc")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070"
                alt="Porter community"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
            {t("membershipPage.faq")}
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-secondary mb-2">{t("membershipPage.faqQuestions.howToJoin")}</h3>
                <p className="text-muted-foreground">{t("membershipPage.faqQuestions.howToJoinAnswer")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-secondary mb-2">{t("membershipPage.faqQuestions.documents")}</h3>
                <p className="text-muted-foreground">{t("membershipPage.faqQuestions.documentsAnswer")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-secondary mb-2">{t("membershipPage.faqQuestions.installments")}</h3>
                <p className="text-muted-foreground">{t("membershipPage.faqQuestions.installmentsAnswer")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-secondary mb-2">{t("membershipPage.faqQuestions.duration")}</h3>
                <p className="text-muted-foreground">{t("membershipPage.faqQuestions.durationAnswer")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}