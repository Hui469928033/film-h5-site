import { MOCK_USER } from "@/lib/data";
import { TabBar } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, CreditCard, HelpCircle, FileText, ChevronRight, Globe, Rocket, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function UserPage() {
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
      { icon: CreditCard, label: t.user.wallet, value: `￥￥{MOCK_USER.balance}` },
      { icon: FileText, label: t.user.orders, value: "" },
      { icon: Rocket, label: t.user.projects, value: "1" },
      { icon: GraduationCap, label: t.user.courses, value: "1" },
      { icon: HelpCircle, label: t.user.help, value: "" },
      { icon: Settings, label: t.user.settings, value: "" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "zh" ? "en" : "zh");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
        <div className="p-6 pt-12 bg-gradient-to-b from-primary/20 to-background">
            <div className="flex items-center gap-4 mb-8">
                <Avatar className="w-20 h-20 border-2 border-primary">
                    <AvatarImage src={MOCK_USER.avatar} />
                    <AvatarFallback>NW</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-bold text-white">{MOCK_USER.name}</h1>
                    <p className="text-sm text-gray-400">UID: {MOCK_USER.id}</p>
                    <div className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs bg-white/10 text-gray-300 border border-white/10">
                        {t.user.standard}
                    </div>
                </div>
            </div>
            
            <Card className="bg-primary border-none text-white shadow-[0_10px_40px_-10px_rgba(37,99,235,0.5)]">
                <CardContent className="p-6 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-blue-100 opacity-80">{t.user.vipStatus}</p>
                        <h3 className="text-xl font-bold">{t.user.getPremium}</h3>
                    </div>
                    <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100 font-bold">
                        {t.user.upgrade}
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="px-4 mt-4 space-y-3">
            {menuItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-card rounded-lg border border-white/5 active:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-full text-gray-300">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <span className="text-white font-medium">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{item.value}</span>
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                    </div>
                </div>
            ))}

            {/* Language Switcher */}
            <div 
                className="flex items-center justify-between p-4 bg-card rounded-lg border border-white/5 active:bg-white/5 transition-colors cursor-pointer"
                onClick={toggleLanguage}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-full text-gray-300">
                        <Globe className="w-5 h-5" />
                    </div>
                    <span className="text-white font-medium">{t.user.language}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-primary font-bold">{language === "zh" ? "中文" : "English"}</span>
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
            </div>
        </div>

        <div className="px-4 mt-8">
             <Button variant="outline" className="w-full border-red-900/50 text-red-500 hover:bg-red-950/20">
                {t.user.logout}
             </Button>
        </div>

        <TabBar />
    </div>
  );
}
