import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Repeat, Package, Handshake, Shield, GraduationCap, Scale, Mail, Phone } from "lucide-react";
import { BankDetailsCard } from "@/components/donate/BankDetailsCard";
import { officialEmail, phoneNumbers } from "@/config/organization";

export default function Donate() {
  const { t } = useTranslation();

  const waysToGive = [
    {
      icon: Heart,
      title: t("donatePage.oneTime.title"),
      desc: t("donatePage.oneTime.desc"),
      cta: t("donatePage.oneTime.cta"),
    },
    {
      icon: Repeat,
      title: t("donatePage.monthly.title"),
      desc: t("donatePage.monthly.desc"),
      cta: t("donatePage.monthly.cta"),
    },
    {
      icon: Package,
      title: t("donatePage.gear.title"),
      desc: t("donatePage.gear.desc"),
      cta: t("donatePage.gear.cta"),
    },
    {
      icon: Handshake,
      title: t("donatePage.corporate.title"),
      desc: t("donatePage.corporate.desc"),
      cta: t("donatePage.corporate.cta"),
    },
  ];

  const impact = [
    { icon: Shield, title: t("donatePage.impact.welfare"), desc: t("donatePage.impact.welfareDesc") },
    { icon: GraduationCap, title: t("donatePage.impact.training"), desc: t("donatePage.impact.trainingDesc") },
    { icon: Scale, title: t("donatePage.impact.advocacy"), desc: t("donatePage.impact.advocacyDesc") },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{t("donatePage.title")}</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">{t("donatePage.subtitle")}</p>
        </div>
      </section>

      {/* Ways to Give */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              {t("donatePage.sectionLabel")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mt-3 mb-4">
              {t("donatePage.sectionTitle")}
            </h2>
            <p className="text-muted-foreground text-lg">{t("donatePage.sectionDesc")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {waysToGive.map((way) => (
              <Card key={way.title} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none bg-card">
                <CardContent className="p-8 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5">
                    <way.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-secondary mb-2">{way.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{way.desc}</p>
                  <a
                    href={`mailto:${officialEmail}?subject=${encodeURIComponent(`Donation Inquiry: ${way.title}`)}`}
                    className="mt-auto w-full"
                  >
                    <Button variant="outline" className="w-full">
                      {way.cta}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">
                Support Our Work
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-secondary mt-3 mb-2">
                Bank Transfer
              </h2>
              <p className="text-muted-foreground">{t("donatePage.bankTransfer")}</p>
            </div>
            <BankDetailsCard />
          </div>
        </div>
      </section>

      {/* How funds are used */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
              {t("donatePage.howFundsAreUsed")}
            </h2>
            <p className="text-muted-foreground text-lg">{t("donatePage.howFundsAreUsedDesc")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {impact.map((item) => (
              <Card key={item.title} className="border-none bg-card">
                <CardContent className="p-8 text-center">
                  <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-secondary mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Direct contact CTA */}
      <section className="py-20 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="container relative z-10 text-center">
          <Mail className="h-10 w-10 text-primary mx-auto mb-6" />
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            {t("donatePage.otherWaysTitle")}
          </h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-4">
            {t("donatePage.otherWaysDesc")}
          </p>
          <p className="text-secondary-foreground/60 text-sm max-w-2xl mx-auto mb-8">
            {t("donatePage.taxNote")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`mailto:${officialEmail}?subject=Donation%20Inquiry`}>
              <Button size="lg" className="text-lg h-14 px-8">
                {t("donatePage.contactPrompt")}
              </Button>
            </a>
            <Link to="/programs">
              <Button
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8 bg-transparent border-2 border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10"
              >
                {t("index.seeOurPrograms")}
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8">
            {phoneNumbers.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="inline-flex items-center gap-2 text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {phone.display}
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
