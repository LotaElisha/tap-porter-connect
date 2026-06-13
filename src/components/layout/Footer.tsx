import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Facebook, Instagram, Youtube, Music2, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import tapLogo from "@/assets/tap-logo.png";

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("email_subscribers")
        .insert({ email: email.trim() });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already subscribed",
            description: "This email is already on our mailing list.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={tapLogo} alt="TAP Logo" className="h-16 w-auto bg-white rounded-lg p-1" />
            </Link>
            <p className="text-sm text-secondary-foreground/80">
              Empowering porters, preserving culture, and building a sustainable future for Tanzania's mountain communities.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/tanzaniaporters" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/tanzaniaporters" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@tanzaniaporters" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://www.tiktok.com/@tanzaniaporters" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="TikTok">
                <Music2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-primary transition-colors">{t("nav.aboutTap")}</Link></li>
              <li><Link to="/programs" className="hover:text-primary transition-colors">{t("nav.programs")}</Link></li>
              <li><Link to="/membership" className="hover:text-primary transition-colors">{t("nav.membership")}</Link></li>
              <li><Link to="/partners" className="hover:text-primary transition-colors">{t("nav.partners")}</Link></li>
              <li><Link to="/porters" className="hover:text-primary transition-colors">{t("nav.findPorter")}</Link></li>
              <li><Link to="/news" className="hover:text-primary transition-colors">{t("nav.news")}</Link></li>
              <li><Link to="/podcast" className="hover:text-primary transition-colors">{t("nav.podcast")}</Link></li>
              <li><Link to="/porter-chat" className="hover:text-primary transition-colors">{t("nav.porterChat")}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t("nav.contact")}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>P.O. Box 4087, Arusha, Tanzania</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+255763488857" className="hover:text-primary transition-colors">+255 763 488 857</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@tap.or.tz" className="hover:text-primary transition-colors">info@tap.or.tz</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Subscribe to our newsletter for the latest news and updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
              />
              <Button type="submit" disabled={loading} className="shrink-0">
                {loading ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center text-sm text-secondary-foreground/60">
          <p>© {new Date().getFullYear()} Tanzania Association of Porters (TAP). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}