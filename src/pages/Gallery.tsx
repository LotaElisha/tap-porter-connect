import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: string;
  category: string | null;
}

export default function Gallery() {
  const { t } = useTranslation();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const placeholderGallery: GalleryItem[] = [
    { id: "1", title: t("galleryPage.items.summitDay"), description: t("galleryPage.items.summitDayDesc"), media_url: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800", media_type: "image", category: t("galleryPage.categories.onTheMountain") },
    { id: "2", title: t("galleryPage.items.trainingSession"), description: t("galleryPage.items.trainingSessionDesc"), media_url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800", media_type: "image", category: t("galleryPage.categories.training") },
    { id: "3", title: t("galleryPage.items.baseCampLife"), description: t("galleryPage.items.baseCampLifeDesc"), media_url: "https://images.unsplash.com/photo-1621414050946-1b936a78491d?w=800", media_type: "image", category: t("galleryPage.categories.onTheMountain") },
    { id: "4", title: t("galleryPage.items.communityGathering"), description: t("galleryPage.items.communityGatheringDesc"), media_url: "https://images.unsplash.com/photo-1650668302197-7f556c34cb91?w=800", media_type: "image", category: t("galleryPage.categories.community") },
    { id: "5", title: t("galleryPage.items.sunriseKibo"), description: t("galleryPage.items.sunriseKiboDesc"), media_url: "https://images.unsplash.com/photo-1580834341580-8c17a3a0135b?w=800", media_type: "image", category: t("galleryPage.categories.onTheMountain") },
    { id: "6", title: t("galleryPage.items.porterPride"), description: t("galleryPage.items.porterPrideDesc"), media_url: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800", media_type: "image", category: t("galleryPage.categories.community") },
    { id: "7", title: t("galleryPage.items.loadingEquipment"), description: t("galleryPage.items.loadingEquipmentDesc"), media_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800", media_type: "image", category: t("galleryPage.categories.onTheMountain") },
    { id: "8", title: t("galleryPage.items.healthScreening"), description: t("galleryPage.items.healthScreeningDesc"), media_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800", media_type: "image", category: t("galleryPage.categories.health") },
  ];

  useEffect(() => {
    async function fetchGallery() {
      const { data } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setGallery(data);
      } else {
        setGallery(placeholderGallery);
      }
      setLoading(false);
    }

    fetchGallery();
  }, []);

  const categories = ["all", ...new Set(gallery.map((item) => item.category).filter(Boolean))];
  const filteredGallery = filter === "all" ? gallery : gallery.filter((item) => item.category === filter);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{t("galleryPage.title")}</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            {t("galleryPage.subtitle")}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category as string)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category === "all" ? t("galleryPage.allCategories") : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item, index) => (
              <div
                key={item.id}
                className={`relative group cursor-pointer overflow-hidden rounded-lg ${
                  index % 5 === 0 ? "col-span-2 row-span-2" : ""
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <img
                  src={item.media_url}
                  alt={item.title}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                    index % 5 === 0 ? "h-80 md:h-[400px]" : "h-48 md:h-56"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-display font-semibold">{item.title}</p>
                    {item.category && <p className="text-xs text-white/70">{item.category}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedItem && (
            <div className="relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-secondary/80 rounded-full text-white hover:bg-secondary transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={selectedItem.media_url}
                alt={selectedItem.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary/90 to-transparent p-6 rounded-b-lg">
                <h3 className="font-display text-xl font-bold text-white">{selectedItem.title}</h3>
                {selectedItem.description && <p className="text-white/80 mt-1">{selectedItem.description}</p>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}