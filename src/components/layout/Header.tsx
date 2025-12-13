import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
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
import tapLogo from "@/assets/tap-logo.jpeg";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "About TAP", href: "/about" },
      { label: "History & Legacy", href: "/history" },
    ],
  },
  { label: "Programs", href: "/programs" },
  {
    label: "Membership",
    children: [
      { label: "Membership Benefits", href: "/membership" },
      { label: "Porter Registration", href: "/membership/porter" },
      { label: "Corporate Registration", href: "/membership/corporate" },
      { label: "Honorary Registration", href: "/membership/honorary" },
    ],
  },
  { label: "Partners", href: "/partners" },
  {
    label: "Stories & Media",
    children: [
      { label: "News & Updates", href: "/news" },
      { label: "Porter Voices", href: "/stories" },
      { label: "Gallery", href: "/gallery" },
      { label: "Porters Podcast", href: "/podcast" },
      { label: "Porter Chat", href: "/porter-chat" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={tapLogo} alt="TAP Logo" className="h-12 w-auto" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-secondary">Tanzania Association</p>
            <p className="text-xs text-muted-foreground">of Porters</p>
          </div>
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

        <div className="flex items-center gap-4">
          <Link to="/admin" className="hidden lg:block">
            <Button variant="outline" size="sm">
              Admin
            </Button>
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
                <Link to="/admin" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full mt-4">
                    Admin Dashboard
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}