import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Star, MapPin, Award, Calendar, ArrowLeft, Share2 } from "lucide-react";

export default function PorterProfile() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [porter, setPorter] = useState<any>(null);
  const [ratings, setRatings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [raterName, setRaterName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Use secure RPC function that only returns non-sensitive fields
      const [porterRes, ratingsRes] = await Promise.all([
        supabase.rpc("get_public_porter_profile", { porter_id: id }),
        supabase.from("porter_ratings").select("rater_name, rating, review, created_at, mountain, expedition_date").eq("porter_id", id).eq("is_published", true).order("created_at", { ascending: false }),
      ]);
      // RPC returns array, get first result
      setPorter(porterRes.data?.[0] || null);
      setRatings(ratingsRes.data || []);
      setLoading(false);
    };
    if (id) fetchData();
  }, [id]);

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!raterName.trim()) return;
    setSubmitting(true);
    const { error } = await supabase.from("porter_ratings").insert({
      porter_id: id,
      rater_name: raterName,
      rating,
      review,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: t("common.error"), description: error.message, variant: "destructive" });
    } else {
      toast({ title: t("common.success"), description: "Rating submitted for review" });
      setRating(5);
      setReview("");
      setRaterName("");
    }
  };

  if (loading) return <Layout><div className="container py-12 text-center">{t("common.loading")}</div></Layout>;
  if (!porter) return <Layout><div className="container py-12 text-center">Porter not found</div></Layout>;

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/porters" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> {t("porter.backToDirectory")}
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
                    {porter.profile_photo_url ? (
                      <img src={porter.profile_photo_url} alt={porter.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-bold text-muted-foreground">{porter.full_name?.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-display font-bold">{porter.full_name}</h1>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{porter.region || "Tanzania"}</span>
                      {porter.years_experience && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{porter.years_experience} years</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-5 w-5 ${s <= (porter.average_rating || 0) ? "fill-primary text-primary" : "text-muted"}`} />
                        ))}
                      </div>
                      <span className="font-semibold">{porter.average_rating || "0"}</span>
                      <span className="text-muted-foreground">({porter.total_ratings || 0} {t("porter.ratings")})</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={() => navigator.share?.({ title: porter.full_name, url: window.location.href })} variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" /> {t("porter.shareProfile")}
                      </Button>
                    </div>
                  </div>
                </div>
                {porter.certifications?.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2 flex items-center gap-2"><Award className="h-4 w-4" /> {t("porter.certifications")}</h3>
                    <div className="flex flex-wrap gap-2">
                      {porter.certifications.map((cert: string) => <Badge key={cert} variant="secondary">{cert}</Badge>)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>{t("porter.reviews")}</CardTitle></CardHeader>
              <CardContent>
                {ratings.length === 0 ? (
                  <p className="text-muted-foreground">{t("porter.noRatings")}</p>
                ) : (
                  <div className="space-y-4">
                    {ratings.map((r) => (
                      <div key={r.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center gap-2">
                          <div className="flex">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className={`h-4 w-4 ${s <= r.rating ? "fill-primary text-primary" : "text-muted"}`} />)}</div>
                          <span className="font-medium">{r.rater_name}</span>
                        </div>
                        {r.review && <p className="mt-2 text-muted-foreground">{r.review}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader><CardTitle>{t("porter.ratePorter")}</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitRating} className="space-y-4">
                  <div>
                    <Label>{t("porter.rating")}</Label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} type="button" onClick={() => setRating(s)}>
                          <Star className={`h-8 w-8 ${s <= rating ? "fill-primary text-primary" : "text-muted"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="raterName">{t("common.name")} *</Label>
                    <Input id="raterName" value={raterName} onChange={(e) => setRaterName(e.target.value)} required />
                  </div>
                  <div>
                    <Label htmlFor="review">{t("porter.writeReview")}</Label>
                    <Textarea id="review" value={review} onChange={(e) => setReview(e.target.value)} rows={4} />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? t("common.loading") : t("porter.submitRating")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
