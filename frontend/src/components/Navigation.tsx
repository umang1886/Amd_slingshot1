"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bot, Utensils, BarChart2, Search, Settings, User } from "lucide-react";

const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", mobileLabel: "Home", icon: Home },
  { href: "/advisor", label: "AI Advisor", mobileLabel: "AI", icon: Bot },
  { href: "/log", label: "Log Meal", mobileLabel: "Log", icon: Utensils },
  { href: "/progress", label: "Progress", mobileLabel: "Progress", icon: BarChart2 }
];

const bottomNavItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/log", label: "Log", icon: Utensils },
  { href: "/advisor", label: "AI", icon: Bot },
  { href: "/progress", label: "Progress", icon: BarChart2 },
  { href: "/profile", label: "Profile", icon: User },
];

const secondaryNavItems = [
  { href: "/search", label: "Food Search", icon: Search },
  { href: "/profile", label: "Profile", icon: User },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 h-screen bg-surface border-r border-border sticky top-0">
        <div className="p-6">
          <Link href="/dashboard" className="font-display font-bold text-2xl text-primary flex items-center gap-2">
            🥗 NutriSense
          </Link>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-t border-border pb-safe">
        <div className="flex items-center justify-around p-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-16 h-14 rounded-lg transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className={`p-1.5 rounded-full transition-colors ${isActive ? "bg-primary/10" : "bg-transparent"}`}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
