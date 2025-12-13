import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Search, MapPin, Mountain } from "lucide-react";

export default function PorterDirectory() {
  const { t } = useTranslation();
  const [porters, setPorters] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPorters = async () => {
      const { data } = await supabase
        .from("members_porters")
        .select("*")
        .eq("status", "active")
        .order("average_rating", { ascending: false });
      setPorters(data || []);
      setLoading(false);
    };
    fetchPorters();
  }, []);

  const filteredPorters = porters.filter((p) =>
    p.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <section className="py-16 bg-gradient-hero text-secondary-foreground">
        <div className="container text-center">
          <h1 className="text-4xl font-display font-bold mb-4">{t("porter.directory")}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">{t("nav.findPorter")}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("porter.searchPorters")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {loading ? (
            <div className="text-center py-12">{t("common.loading")}</div>
          ) : filteredPorters.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No porters found. Check back soon!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPorters.map((porter) => (
                <Link key={porter.id} to={`/porters/${porter.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                          {porter.profile_photo_url ? (
                            <img src={porter.profile_photo_url} alt={porter.full_name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-2xl font-bold text-muted-foreground">
                              {porter.full_name?.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{porter.full_name}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {porter.region || "Tanzania"}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="font-medium">{porter.average_rating || "0"}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              ({porter.total_ratings || 0} {t("porter.ratings")})
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {porter.years_experience && (
                          <Badge variant="secondary">{porter.years_experience} {t("porter.experience")}</Badge>
                        )}
                        {porter.certifications?.slice(0, 2).map((cert: string) => (
                          <Badge key={cert} variant="outline">{cert}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
