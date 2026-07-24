import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Menu,
  Facebook,
  Instagram,
  Youtube,
  Music2,
  Twitter,
  Linkedin,
  MessageSquare,
  Heart,
  Star,
  Share2,
  Phone,
  Mail,
  UserPlus,
  LogIn,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import tapLogo from "@/assets/tap-logo.png";
import { socialLinks, phoneNumbers, officialEmail } from "@/config/organization";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.home", "Home"), href: "/" },
    {
      label: t("nav.about", "About TAP"),
      children: [
        { label: t("nav.aboutTap", "Overview & Mission"), href: "/about" },
        { label: t("nav.history", "Our History"), href: "/history" },
      ],
    },
    { label: t("nav.programs", "Programs"), href: "/programs" },
    {
      label: t("nav.membership", "Membership"),
      children: [
        { label: t("nav.membershipBenefits", "Member Benefits"), href: "/membership" },
        { label: t("nav.porterRegistration", "Porter Registration"), href: "/membership/porter" },
        { label: t("nav.corporateRegistration", "Corporate Registration"), href: "/membership/corporate" },
        { label: t("nav.honoraryRegistration", "Honorary Registration"), href: "/membership/honorary" },
      ],
    },
    { label: t("nav.partners", "Partners"), href: "/partners" },
    { label: t("nav.findPorter", "Find a Porter"), href: "/porters" },
    {
      label: t("nav.storiesMedia", "News & Media"),
      children: [
        { label: t("nav.news", "News & Updates"), href: "/news" },
        { label: t("nav.porterVoices", "Porter Voices"), href: "/stories" },
        { label: t("nav.gallery", "Media Gallery"), href: "/gallery" },
        { label: t("nav.podcast", "TAP Podcast"), href: "/podcast" },
        { label: t("nav.porterChat", "Porter Community Chat"), href: "/porter-chat" },
      ],
    },
    { label: t("nav.contact", "Contact"), href: "/contact" },
  ];

  const headerSocialLinks = [
    { label: "Facebook", href: socialLinks.facebook, icon: Facebook },
    { label: "Instagram", href: socialLinks.instagram, icon: Instagram },
    { label: "YouTube", href: socialLinks.youtube, icon: Youtube },
    { label: "TikTok", href: socialLinks.tiktok, icon: Music2 },
    { label: "Google Reviews", href: socialLinks.googleReviews, icon: Star },
    { label: "Google Business", href: socialLinks.googleShare, icon: Share2 },
    { label: "X / Twitter", href: socialLinks.twitter, icon: Twitter },
    { label: "LinkedIn", href: socialLinks.linkedin, icon: Linkedin },
    { label: "WhatsApp", href: socialLinks.whatsapp, icon: MessageSquare },
  ].filter((social) => Boolean(social.href));

  const isPathActive = (href?: string, children?: { href: string }[]) => {
    if (href && location.pathname === href) return true;
    if (children && children.some((child) => location.pathname === child.href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm transition-all">
      <div className="container flex h-20 items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center shrink-0 hover:opacity-90 transition-opacity">
          <img src={tapLogo} alt="Tanzania Association of Porters - TAP Logo" className="h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className={`group inline-flex h-10 items-center justify-center rounded-md px-3.5 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-primary focus:bg-accent focus:text-primary outline-none ${
                      isPathActive(undefined, item.children) ? "text-primary font-semibold bg-accent/40" : "text-foreground/80"
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180 text-muted-foreground group-hover:text-primary" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 p-1.5 shadow-xl border border-border/80 rounded-lg bg-popover z-50">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.href} asChild>
                      <Link
                        to={child.href}
                        className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors cursor-pointer ${
                          location.pathname === child.href
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-popover-foreground hover:bg-accent hover:text-primary"
                        }`}
                      >
                        {child.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.label}
                to={item.href!}
                className={`group inline-flex h-10 items-center justify-center rounded-md px-3.5 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-primary focus:bg-accent focus:text-primary outline-none ${
                  location.pathname === item.href ? "text-primary font-semibold bg-accent/40" : "text-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Social Quick Links (XL screens) */}
          <div className="hidden xl:flex items-center gap-1 mr-1">
            {headerSocialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <LanguageSwitcher />

          {/* Action Buttons */}
          <Link to="/donate" className="hidden lg:block">
            <Button size="sm" className="gap-1.5 font-medium shadow-sm">
              <Heart className="h-3.5 w-3.5 fill-current" />
              {t("nav.donate", "Donate")}
            </Button>
          </Link>

          <Link to="/member-auth" className="hidden xl:block">
            <Button variant="outline" size="sm" className="gap-1 font-medium">
              <LogIn className="h-3.5 w-3.5" />
              {t("nav.signIn", "Sign In")}
            </Button>
          </Link>

          <Link to="/membership/porter" className="hidden lg:block">
            <Button size="sm" variant="outline" className="gap-1 font-medium border-primary/40 hover:border-primary text-primary">
              <UserPlus className="h-3.5 w-3.5" />
              {t("nav.joinTap", "Join TAP")}
            </Button>
          </Link>

          {/* Mobile Navigation Drawer */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 flex flex-col justify-between overflow-y-auto">
              <div>
                <SheetHeader className="text-left pb-4 border-b">
                  <SheetTitle className="flex items-center gap-2">
                    <img src={tapLogo} alt="TAP Logo" className="h-10 w-auto" />
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-3 mt-6">
                  {navItems.map((item) =>
                    item.children ? (
                      <div key={item.label} className="space-y-1">
                        <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground px-2 pt-2">
                          {item.label}
                        </p>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block pl-4 pr-3 py-2 text-sm rounded-md transition-colors ${
                              location.pathname === child.href
                                ? "bg-primary/10 text-primary font-semibold"
                                : "text-foreground/80 hover:bg-accent hover:text-primary"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        to={item.href!}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                          location.pathname === item.href
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground/80 hover:bg-accent hover:text-primary"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </nav>

                {/* Mobile CTAs */}
                <div className="flex flex-col gap-2.5 mt-6 pt-6 border-t">
                  <Link to="/donate" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full gap-1.5 font-medium">
                      <Heart className="h-4 w-4 fill-current" />
                      {t("nav.donate", "Donate to TAP")}
                    </Button>
                  </Link>
                  <Link to="/membership/porter" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full gap-1.5 font-medium border-primary/40 text-primary">
                      <UserPlus className="h-4 w-4" />
                      {t("nav.joinTap", "Join TAP")}
                    </Button>
                  </Link>
                  <Link to="/member-auth" onClick={() => setMobileOpen(false)}>
                    <Button variant="ghost" className="w-full gap-1.5 font-medium">
                      <LogIn className="h-4 w-4" />
                      {t("nav.signIn", "Sign In")}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Mobile Drawer Footer with Contact & Social Icons */}
              <div className="pt-6 mt-6 border-t space-y-4">
                <div className="space-y-2 text-xs text-muted-foreground">
                  <a href={phoneNumbers[0].href} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Phone className="h-3.5 w-3.5 text-primary" />
                    <span>{phoneNumbers[0].display}</span>
                  </a>
                  <a href={`mailto:${officialEmail}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                    <Mail className="h-3.5 w-3.5 text-primary" />
                    <span>{officialEmail}</span>
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {headerSocialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <social.icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
