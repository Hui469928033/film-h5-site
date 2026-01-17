import { getMovies, getProjects, getCourses, type Project, type Course } from "@/lib/data";
import { useRoute, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Receipt, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Order() {
  const [match, params] = useRoute("/order/:type/:id/:subId?"); // type: 'movie' | 'crowd' | 'course'
  const [, setLocation] = useLocation();
  const { language, t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const type = params?.type;
  const id = params?.id;
  const subId = params?.subId; // For Tier ID

  let itemTitle = "";
  let itemPrice = 0;
  let itemDesc = "";
  let itemImage = "";

  if (type === "movie") {
      const item = getMovies(language).find(m => m.id === id);
      if (item) {
          itemTitle = item.title;
          itemPrice = item.price;
          itemDesc = t.order.tvodDesc;
          itemImage = item.poster;
      }
  } else if (type === "crowd") {
      const project = getProjects(language).find(p => p.id === id);
      if (project) {
          const tier = project.tiers.find(tier => tier.id === subId);
          itemTitle = `￥{project.title} - ￥{tier?.name}`;
          itemPrice = tier?.price || 0;
          itemDesc = t.order.crowdDesc;
          itemImage = project.image;
      }
  } else if (type === "course") {
      const course = getCourses(language).find(c => c.id === id);
      if (course) {
          itemTitle = course.title;
          itemPrice = course.price;
          itemDesc = t.order.courseDesc;
          itemImage = course.image;
      }
  }

  if (!itemTitle) return <div className="p-10 text-center text-white">Item not found</div>;

  const handlePay = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          toast.success(t.order.paySuccess);
          // Redirect logic
          if (type === "movie") setLocation(`/play/￥{id}`);
          else if (type === "crowd") setLocation(`/crowd/￥{id}`); // TODO: Receipt page
          else if (type === "course") setLocation(`/learn/￥{id}`); // TODO: Classroom
      }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col">
        <div className="flex items-center gap-4 mb-8">
            <div onClick={() => history.back()}>
                <ArrowLeft className="text-white cursor-pointer" />
            </div>
            <h1 className="text-lg font-bold text-white">{t.order.checkout}</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <Card className="bg-card border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">{t.order.summary}</CardTitle>
                    <CardDescription>Order #ORD-{Date.now().toString().slice(-6)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-4">
                        <img src={itemImage} className="w-16 h-24 object-cover rounded" alt="Poster" />
                        <div>
                            <h3 className="text-white font-bold line-clamp-2">{itemTitle}</h3>
                            <p className="text-sm text-gray-400">{itemDesc}</p>
                        </div>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{t.order.subtotal}</span>
                        <span className="text-white">￥{itemPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{t.order.tax}</span>
                        <span className="text-white">￥0.00</span>
                    </div>
                    
                    <Separator className="bg-white/10" />
                    
                    <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">{t.order.total}</span>
                        <span className="text-primary">￥{itemPrice.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                    <Button 
                        className="w-full bg-[#07C160] hover:bg-[#06ad56] text-white font-bold h-12"
                        onClick={handlePay}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t.order.payWechat}
                    </Button>
                    <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                        <Receipt className="w-3 h-3" />
                        {t.order.invoiceHint}
                    </div>
                </CardFooter>
            </Card>
        </div>
    </div>
  );
}
