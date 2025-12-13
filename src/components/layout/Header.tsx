import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
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
import tapLogo from "@/assets/tap-logo.jpeg";

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
    { label: t("nav.findPorter"), href: "/porters" },
    { label: t("nav.contact"), href: "/contact" },
  ];

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
          <LanguageSwitcher />
          <Link to="/member-auth" className="hidden lg:block">
            <Button variant="outline" size="sm">
              {t("nav.signIn")}
            </Button>
          </Link>
          <Link to="/membership/porter" className="hidden lg:block">
            <Button size="sm">{t("nav.joinTap")}</Button>
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
                  <Link to="/member-auth" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full">{t("nav.signIn")}</Button>
                  </Link>
                  <Link to="/membership/porter" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full">{t("nav.joinTap")}</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
