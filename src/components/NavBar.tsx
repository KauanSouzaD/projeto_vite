import type React from "react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  Zap,
  Shield,
  Layers,
  Code2,
  BookOpen,
  Rocket,
  Github,
  Menu,
} from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="/">
              <img src="/LOGO-INICIAIS-BRANCA.png" alt="Logo" className="h-12" />
            </a>
          </div>

          {/* Desktop */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm bg-no-underline hover:no-underline">
                  Produto
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[600px] gap-3 p-6 md:grid-cols-2">
                    <ListItem
                      href="/products/analytics"
                      title="Analytics"
                      icon={<Zap className="h-5 w-5" />}
                    >
                      Real-time insights and data visualization for your
                      business.
                    </ListItem>
                    <ListItem
                      href="/products/security"
                      title="Security"
                      icon={<Shield className="h-5 w-5" />}
                    >
                      Enterprise-grade security with end-to-end encryption.
                    </ListItem>
                    <ListItem
                      href="/products/infrastructure"
                      title="Infrastructure"
                      icon={<Layers className="h-5 w-5" />}
                    >
                      Scalable cloud infrastructure for modern applications.
                    </ListItem>
                    <ListItem
                      href="/products/developer"
                      title="Developer Tools"
                      icon={<Code2 className="h-5 w-5" />}
                    >
                      Powerful APIs and SDKs for seamless integration.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm bg-no-underline hover:no-underline">
                  Recursos
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-primary/20 to-primary/10 p-6 no-underline outline-none focus:shadow-md hover:from-primary/30 hover:to-primary/20 transition-colors border border-primary/20"
                          href="/LayoutDocs"
                        >
                          <BookOpen className="h-6 w-6 text-primary" />
                          <div className="mb-2 mt-4 text-lg font-semibold">
                            Documentation
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            Complete guides and API references to get you
                            started quickly.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/blog" title="Blog">
                      Latest updates and articles from our team.
                    </ListItem>
                    <ListItem href="/tutorials" title="Tutorials">
                      Step-by-step guides to master the platform.
                    </ListItem>
                    <ListItem href="/community" title="Community">
                      Join thousands of developers worldwide.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/Docs"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Documentação
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/NotasAtualizacao"
                  className="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground bg-no-underline hover:no-underline focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Notas
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] sm:w-[380px] overflow-y-auto"
              >
                <SheetHeader className="pb-6">
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <img
                        src="/LOGO-INICIAIS.png"
                        alt="Logo"
                        className="h-10"
                      />
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="space-y-2">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value="products"
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
                        Products
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="space-y-2">
                          <MobileNavLink
                            href="/products/analytics"
                            icon={<Zap className="h-4 w-4" />}
                            onClick={() => setOpen(false)}
                          >
                            <div className="font-medium text-sm">Analytics</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Real-time insights and data visualization
                            </div>
                          </MobileNavLink>
                          <MobileNavLink
                            href="/products/security"
                            icon={<Shield className="h-4 w-4" />}
                            onClick={() => setOpen(false)}
                          >
                            <div className="font-medium text-sm">Security</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Enterprise-grade security
                            </div>
                          </MobileNavLink>
                          <MobileNavLink
                            href="/products/infrastructure"
                            icon={<Layers className="h-4 w-4" />}
                            onClick={() => setOpen(false)}
                          >
                            <div className="font-medium text-sm">
                              Infrastructure
                            </div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Scalable cloud infrastructure
                            </div>
                          </MobileNavLink>
                          <MobileNavLink
                            href="/products/developer"
                            icon={<Code2 className="h-4 w-4" />}
                            onClick={() => setOpen(false)}
                          >
                            <div className="font-medium text-sm">
                              Developer Tools
                            </div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Powerful APIs and SDKs
                            </div>
                          </MobileNavLink>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="resources"
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
                        Resources
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="space-y-2">
                          <MobileNavLink
                            href="/docs"
                            icon={<BookOpen className="h-4 w-4" />}
                            onClick={() => setOpen(false)}
                            featured
                          >
                            <div className="font-medium text-sm">
                              Documentation
                            </div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Complete guides and API references
                            </div>
                          </MobileNavLink>
                          <MobileNavLink
                            href="/blog"
                            onClick={() => setOpen(false)}
                          >
                            <div className="font-medium text-sm">Blog</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Latest updates from our team
                            </div>
                          </MobileNavLink>
                          <MobileNavLink
                            href="/tutorials"
                            onClick={() => setOpen(false)}
                          >
                            <div className="font-medium text-sm">Tutorials</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Step-by-step guides
                            </div>
                          </MobileNavLink>
                          <MobileNavLink
                            href="/community"
                            onClick={() => setOpen(false)}
                          >
                            <div className="font-medium text-sm">Community</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Join thousands of developers
                            </div>
                          </MobileNavLink>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="company"
                      className="border-b border-border"
                    >
                      <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
                        Company
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <div className="space-y-2">
                          <MobileNavLink
                            href="/about"
                            onClick={() => setOpen(false)}
                          >
                            <div className="font-medium text-sm">About Us</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Our mission and values
                            </div>
                          </MobileNavLink>
                          <MobileNavLink
                            href="/careers"
                            onClick={() => setOpen(false)}
                          >
                            <div className="font-medium text-sm">Careers</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Join our team
                            </div>
                          </MobileNavLink>
                          <MobileNavLink
                            href="/contact"
                            onClick={() => setOpen(false)}
                          >
                            <div className="font-medium text-sm">Contact</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Get in touch
                            </div>
                          </MobileNavLink>
                          <MobileNavLink
                            href="/press"
                            onClick={() => setOpen(false)}
                          >
                            <div className="font-medium text-sm">Press Kit</div>
                            <div className="text-xs text-muted-foreground leading-relaxed">
                              Media resources
                            </div>
                          </MobileNavLink>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="pt-6 mt-6 border-border">
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href="https://github.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = ({
  className,
  title,
  children,
  icon,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground focus:text-accent-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2">
            {icon && <div className="text-primary">{icon}</div>}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

function MobileNavLink({
  href,
  icon,
  children,
  onClick,
  featured = false,
}: {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  featured?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`block p-3 rounded-lg transition-colors ${
        featured ? "bg-primary/10 border border-primary/20" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="text-primary mt-0.5 flex-shrink-0">{icon}</div>
        )}
        <div className="flex-1 space-y-0.5">{children}</div>
      </div>
    </a>
  );
}
