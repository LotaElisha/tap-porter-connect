import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Music2, Users, Heart, Twitter, Linkedin, MessageSquare } from "lucide-react";
import { z } from "zod";
import {
  address,
  phoneNumbers,
  officialEmail,
  socialLinks,
  moshiOfficeRepresentatives,
  organizationStaff,
} from "@/config/organization";

const socialIcons = [
  { key: "facebook" as const, label: "Facebook", Icon: Facebook },
  { key: "instagram" as const, label: "Instagram", Icon: Instagram },
  { key: "youtube" as const, label: "YouTube", Icon: Youtube },
  { key: "tiktok" as const, label: "TikTok", Icon: Music2 },
  { key: "twitter" as const, label: "X / Twitter", Icon: Twitter },
  { key: "linkedin" as const, label: "LinkedIn", Icon: Linkedin },
  { key: "whatsapp" as const, label: "WhatsApp", Icon: MessageSquare },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().max(200, "Subject must be less than 200 characters").optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters"),
});

export default function Contact() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      toast({
        title: t("contactPage.requiredFields"),
        description: parsed.error.errors[0]?.message || t("contactPage.requiredFieldsDesc"),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
      });

      if (error) throw error;

      toast({
        title: t("contactPage.messageSentTitle"),
        description: t("contactPage.messageSentDesc"),
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      toast({
        title: t("contactPage.failedToSend"),
        description: error.message || t("contactPage.tryAgain"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">{t("contactPage.title")}</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            {t("contactPage.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-secondary mb-6">
                  {t("contactPage.getInTouch")}
                </h2>
                <p className="text-muted-foreground">
                  {t("contactPage.getInTouchDesc")}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary">{t("contactPage.address")}</h3>
                    <p className="text-muted-foreground text-sm">
                      {address.poBox}<br />
                      {address.city}, {address.country}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary">{t("contactPage.phone")}</h3>
                    <p className="text-muted-foreground text-sm space-y-1">
                      {phoneNumbers.map((phone) => (
                        <a
                          key={phone.href}
                          href={phone.href}
                          className="block hover:text-primary transition-colors"
                        >
                          {phone.display}
                        </a>
                      ))}
                    </p>
                  </div>
                </div>

                {officialEmail && (
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg h-fit">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary">{t("contactPage.email")}</h3>
                      <p className="text-muted-foreground text-sm">
                        <a href={`mailto:${officialEmail}`} className="hover:text-primary transition-colors">
                          {officialEmail}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary">{t("contactPage.officeHours")}</h3>
                    <p className="text-muted-foreground text-sm">
                      {t("contactPage.weekdays")}<br />
                      {t("contactPage.saturday")}<br />
                      {t("contactPage.sunday")}
                    </p>
                  </div>
                </div>
              </div>

              {socialIcons.some(({ key }) => Boolean(socialLinks[key])) && (
                <div>
                  <h3 className="font-semibold text-secondary mb-3">Follow TAP</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialIcons
                      .filter(({ key }) => Boolean(socialLinks[key]))
                      .map(({ key, label, Icon }) => (
                        <a
                          key={key}
                          href={socialLinks[key]}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      ))}
                  </div>
                </div>
              )}

              {/* Moshi Secretary Office Representatives */}
              <div>
                <h3 className="font-semibold text-secondary mb-3">Moshi Secretary Office</h3>
                <div className="space-y-3">
                  {moshiOfficeRepresentatives.map((rep) => (
                    <div key={rep.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/60 hover:bg-muted transition-colors">
                      <div className="h-14 w-14 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 text-primary font-bold text-xs p-0.5 border border-primary/20 overflow-hidden">
                        {rep.image ? (
                          <img src={rep.image} alt={rep.name} className="h-full w-full object-contain rounded" />
                        ) : (
                          rep.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-secondary text-sm">{rep.name}</p>
                        <p className="text-xs text-muted-foreground">{rep.office} &middot; {rep.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donation Support CTA */}
              <div className="p-5 rounded-lg bg-primary/5 border border-primary/10">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">{t("nav.donate")}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      For official donation and bank details, please contact the organisation using the phone numbers or email above.
                    </p>
                    <Link to="/donate" className="text-sm font-medium text-primary hover:underline">
                      {t("donatePage.title")} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>{t("contactPage.sendUsMessage")}</CardTitle>
                  <CardDescription>{t("contactPage.formDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contactPage.yourName")} *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("contactPage.emailAddress")} *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t("contactPage.subject")}</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                        placeholder={t("contactPage.subjectPlaceholder")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t("contactPage.yourMessage")} *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        rows={6}
                        placeholder={t("contactPage.messagePlaceholder")}
                        required
                      />
                    </div>
                    <Button type="submit" size="lg" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("contactPage.sending")}
                        </>
                      ) : (
                        t("contact.sendMessage")
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-muted">
        <div className="container">
          <div className="rounded-lg overflow-hidden h-80 shadow-md">
            <iframe
              title="TAP office location in Arusha, Tanzania"
              src="https://www.google.com/maps?q=-3.3869,36.6830&z=13&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}