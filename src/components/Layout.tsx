import { Home, Rocket, GraduationCap, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export function TabBar() {
  const [location] = useLocation();
  const { t } = useLanguage();

  const tabs = [
    { icon: Home, label: t.nav.home, path: "/" },
    { icon: Rocket, label: t.nav.crowd, path: "/crowd" },
    { icon: GraduationCap, label: t.nav.learn, path: "/learn" },
    { icon: User, label: t.nav.profile, path: "/user" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-t border-white/10 safe-area-bottom">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = location === tab.path || (tab.path !== "/" && location.startsWith(tab.path));
          return (
            <Link key={tab.path} href={tab.path} className={cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200",
              isActive ? "text-primary" : "text-muted-foreground hover:text-white"
            )}>
                <tab.icon className={cn("w-6 h-6", isActive && "drop-shadow-[0_0_8px_rgba(37,99,235,0.5)]")} />
                <span className="text-[10px] font-medium tracking-wide">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function Navbar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/90 to-transparent p-4 flex justify-between items-center pointer-events-none">
            <div className="pointer-events-auto">
                <img src={logoImg} className="w-8 h-8 rounded-full border border-white/20" alt="Logo" />
            </div>
        </div>
    )
}
