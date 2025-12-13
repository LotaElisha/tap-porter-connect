import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Quote, Mountain } from "lucide-react";

interface PorterStory {
  id: string;
  porter_name: string;
  title: string;
  story: string;
  porter_photo_url: string | null;
  years_as_porter: number | null;
  mountain: string | null;
}

export default function Stories() {
  const { t } = useTranslation();
  const [stories, setStories] = useState<PorterStory[]>([]);
  const [loading, setLoading] = useState(true);

  const placeholderStories: PorterStory[] = [
    {
      id: "1",
      porter_name: "Emmanuel Kimaro",
      title: "From Porter to Mentor",
      story: "I started as a porter 20 years ago when I was just 18. The mountain was my classroom, and every climb taught me something new. Now, through TAP, I help train the next generation of porters. The skills I've gained have not only improved my work but have also helped me support my family and send my children to school.",
      porter_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      years_as_porter: 20,
      mountain: "Kilimanjaro",
    },
    {
      id: "2",
      porter_name: "Grace Mwanga",
      title: "Breaking Barriers",
      story: "As one of the few female porters on Kilimanjaro, I faced many challenges. But TAP gave me the training and confidence to prove that women can do this work just as well as men. Today, I encourage other women to join this profession and show that the mountains belong to all of us.",
      porter_photo_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
      years_as_porter: 8,
      mountain: "Kilimanjaro",
    },
    {
      id: "3",
      porter_name: "Joseph Massawe",
      title: "A Life Saved by Training",
      story: "During a climb last year, a trekker collapsed from altitude sickness. Thanks to the first aid training I received from TAP, I knew exactly what to do. We got him to safety and he made a full recovery. That moment showed me why our training matters - we're not just carrying loads, we're guardians of the mountain.",
      porter_photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      years_as_porter: 15,
      mountain: "Kilimanjaro",
    },
    {
      id: "4",
      porter_name: "Said Mshana",
      title: "Preserving Our Heritage",
      story: "My father was a porter, and his father before him. The songs we sing on the mountain and the stories we tell have been passed down for generations. TAP helps us preserve this heritage while also teaching us new skills. It's the best of both worlds - honoring our past while preparing for the future.",
      porter_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      years_as_porter: 25,
      mountain: "Meru",
    },
  ];

  useEffect(() => {
    async function fetchStories() {
      const { data } = await supabase
        .from("porter_stories")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setStories(data);
      } else {
        setStories(placeholderStories);
      }
      setLoading(false);
    }

    fetchStories();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{t("storiesPage.title")}</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            {t("storiesPage.subtitle")}
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {stories.map((story, index) => (
              <Card key={story.id} className={`overflow-hidden ${index === 0 ? "lg:col-span-2" : ""}`}>
                <div className={`grid ${index === 0 ? "lg:grid-cols-2" : ""}`}>
                  {story.porter_photo_url && (
                    <div className="relative">
                      <img
                        src={story.porter_photo_url}
                        alt={story.porter_name}
                        className={`w-full object-cover ${index === 0 ? "h-64 lg:h-full" : "h-48"}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="font-display text-xl font-bold">{story.porter_name}</p>
                        <div className="flex items-center gap-3 text-sm text-white/80">
                          {story.years_as_porter && (
                            <span>{story.years_as_porter} {t("common.yearsAsPorter")}</span>
                          )}
                          {story.mountain && (
                            <span className="flex items-center gap-1">
                              <Mountain className="h-3 w-3" />
                              {story.mountain}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6 lg:p-8">
                    <Quote className="h-8 w-8 text-primary/30 mb-4" />
                    <h2 className="font-display text-xl font-bold text-secondary mb-4">{story.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{story.story}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-20 bg-gradient-warm">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-6">
            {t("storiesPage.shareYourStory")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t("storiesPage.shareYourStoryDesc")}
          </p>
          <a href="mailto:stories@tap.or.tz" className="inline-block">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              {t("storiesPage.submitYourStory")}
            </button>
          </a>
        </div>
      </section>
    </Layout>
  );
}