import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Facebook, Instagram, Youtube, Music2, Twitter, Linkedin, MessageSquare, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import tapLogo from "@/assets/tap-logo.png";
import { socialLinks } from "@/config/organization";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.about"),
      children: [
        { label: t("nav.aboutTap"), href: "/about" },
        { label: t("nav.history"), href: "/history" },
      ],
    },
    { label: t("nav.programs"), href: "/programs" },
    {
      label: t("nav.membership"),
      children: [
        { label: t("nav.membershipBenefits"), href: "/membership" },
        { label: t("nav.porterRegistration"), href: "/membership/porter" },
        { label: t("nav.corporateRegistration"), href: "/membership/corporate" },
        { label: t("nav.honoraryRegistration"), href: "/membership/honorary" },
      ],
    },
    { label: t("nav.partners"), href: "/partners" },
    { label: t("nav.findPorter"), href: "/porters" },
    {
      label: t("nav.storiesMedia"),
      children: [
        { label: t("nav.news"), href: "/news" },
        { label: t("nav.porterVoices"), href: "/stories" },
        { label: t("nav.gallery"), href: "/gallery" },
        { label: t("nav.podcast"), href: "/podcast" },
        { label: t("nav.porterChat"), href: "/porter-chat" },
      ],
    },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const headerSocialLinks = [
    { label: "Facebook", href: socialLinks.facebook, icon: Facebook },
    { label: "Instagram", href: socialLinks.instagram, icon: Instagram },
    { label: "YouTube", href: socialLinks.youtube, icon: Youtube },
    { label: "TikTok", href: socialLinks.tiktok, icon: Music2 },
    { label: "X / Twitter", href: socialLinks.twitter, icon: Twitter },
    { label: "LinkedIn", href: socialLinks.linkedin, icon: Linkedin },
    { label: "WhatsApp", href: socialLinks.whatsapp, icon: MessageSquare },
  ].filter((social) => Boolean(social.href));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={tapLogo} alt="Tanzania Association of Porters - TAP Logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navItems.map((item) =>
              item.children ? (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger className="bg-transparent">
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-48 gap-1 p-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={child.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              {child.label}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.label}>
                  <Link
                    to={item.href}
                    className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${
                      location.pathname === item.href ? "text-primary" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <div className="hidden xl:flex items-center gap-1 mr-1">
            {headerSocialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <LanguageSwitcher />
          <Link to="/member-auth" className="hidden lg:block">
            <Button variant="outline" size="sm">
              {t("nav.signIn")}
            </Button>
          </Link>
          <Link to="/donate" className="hidden lg:block">
            <Button size="sm" className="gap-1.5">
              <Heart className="h-3.5 w-3.5" />
              {t("nav.donate")}
            </Button>
          </Link>
          <Link to="/membership/porter" className="hidden lg:block">
            <Button size="sm" variant="outline">{t("nav.joinTap")}</Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.label} className="space-y-2">
                      <p className="font-medium text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block pl-4 py-2 text-sm hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-2 font-medium hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <div className="flex flex-col gap-2 mt-4">
                  <Link to="/donate" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full gap-1.5">
                      <Heart className="h-3.5 w-3.5" />
                      {t("nav.donate")}
                    </Button>
                  </Link>
                  <Link to="/member-auth" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">{t("nav.signIn")}</Button>
                  </Link>
                  <Link to="/membership/porter" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">{t("nav.joinTap")}</Button>
                  </Link>
                </div>
                <div className="flex gap-4 mt-6 pt-6 border-t">
                  {headerSocialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground hover:text-primary transition-colors"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
