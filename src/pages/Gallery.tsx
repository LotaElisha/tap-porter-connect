import { useEffect, useState } from "react";
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

const placeholderGallery: GalleryItem[] = [
  { id: "1", title: "Summit Day on Kilimanjaro", description: "Porters reaching Uhuru Peak with expedition gear.", media_url: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=800", media_type: "image", category: "Mountain Routes" },
  { id: "2", title: "First Aid Training Session", description: "Certified instructors leading a TAP safety cohort.", media_url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800", media_type: "image", category: "Training" },
  { id: "3", title: "Base Camp Life", description: "Porters preparing gear before the morning ascent.", media_url: "https://images.unsplash.com/photo-1621414050946-1b936a78491d?w=800", media_type: "image", category: "Porters" },
  { id: "4", title: "Community Gathering", description: "Members meeting at TAP's Arusha office.", media_url: "https://images.unsplash.com/photo-1650668302197-7f556c34cb91?w=800", media_type: "image", category: "Porters" },
  { id: "5", title: "Sunrise Over Kibo", description: "The Machame route at dawn.", media_url: "https://images.unsplash.com/photo-1580834341580-8c17a3a0135b?w=800", media_type: "image", category: "Mountain Routes" },
  { id: "6", title: "Porter Pride", description: "A certified TAP porter on the Marangu route.", media_url: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800", media_type: "image", category: "Porters" },
  { id: "7", title: "Loading Expedition Gear", description: "Weigh-in station enforcing the 20kg load limit.", media_url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800", media_type: "image", category: "Mountain Routes" },
  { id: "8", title: "Health Screening Day", description: "Annual welfare health checks for registered porters.", media_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800", media_type: "image", category: "Training" },
];

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>(placeholderGallery);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    async function fetchGallery() {
      const { data } = await supabase
        .from("gallery_items")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setGallery(data);
      }
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
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Gallery</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Porters at work, training sessions in progress, and the Kilimanjaro and Mount Meru routes they know best.
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
                {category === "all" ? "All" : category}
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
                  alt={`${item.title}${item.category ? ` - ${item.category}` : ""} | TAP Gallery`}
                  loading="lazy"
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
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={selectedItem.media_url}
                alt={`${selectedItem.title}${selectedItem.category ? ` - ${selectedItem.category}` : ""} | TAP Gallery`}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary/90 to-transparent p-6 rounded-b-lg">
                <h2 className="font-display text-xl font-bold text-white">{selectedItem.title}</h2>
                {selectedItem.description && <p className="text-white/80 mt-1">{selectedItem.description}</p>}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
