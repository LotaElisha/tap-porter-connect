import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

export default function History() {
  const { t } = useTranslation();

  const timeline = [
    { year: "2008", title: t("historyPage.timeline.2008.title"), description: t("historyPage.timeline.2008.desc") },
    { year: "2010", title: t("historyPage.timeline.2010.title"), description: t("historyPage.timeline.2010.desc") },
    { year: "2012", title: t("historyPage.timeline.2012.title"), description: t("historyPage.timeline.2012.desc") },
    { year: "2014", title: t("historyPage.timeline.2014.title"), description: t("historyPage.timeline.2014.desc") },
    { year: "2016", title: t("historyPage.timeline.2016.title"), description: t("historyPage.timeline.2016.desc") },
    { year: "2018", title: t("historyPage.timeline.2018.title"), description: t("historyPage.timeline.2018.desc") },
    { year: "2020", title: t("historyPage.timeline.2020.title"), description: t("historyPage.timeline.2020.desc") },
    { year: "2022", title: t("historyPage.timeline.2022.title"), description: t("historyPage.timeline.2022.desc") },
    { year: "2024", title: t("historyPage.timeline.2024.title"), description: t("historyPage.timeline.2024.desc") },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{t("historyPage.title")}</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            {t("historyPage.subtitle")}
          </p>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-6">
                {t("historyPage.legacyTitle")}
              </h2>
              <p className="text-muted-foreground mb-4">{t("historyPage.legacyDesc1")}</p>
              <p className="text-muted-foreground mb-4">{t("historyPage.legacyDesc2")}</p>
              <p className="text-muted-foreground">{t("historyPage.legacyDesc3")}</p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1650668302197-7f556c34cb91?q=80&w=2070"
                alt="Historic porter expedition"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
            {t("historyPage.ourJourney")}
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-display text-xl font-bold text-secondary mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-lg shadow-lg z-10 relative">
                      {item.year}
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Impact */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
              {t("historyPage.culturalSignificance")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("historyPage.culturalSignificanceDesc")}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-secondary mb-2">{t("historyPage.traditionalKnowledge")}</h3>
                <p className="text-muted-foreground">{t("historyPage.traditionalKnowledgeDesc")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-secondary mb-2">{t("historyPage.communityBonds")}</h3>
                <p className="text-muted-foreground">{t("historyPage.communityBondsDesc")}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-secondary mb-2">{t("historyPage.songsStories")}</h3>
                <p className="text-muted-foreground">{t("historyPage.songsStoriesDesc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}