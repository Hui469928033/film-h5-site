import { getProjects } from "@/lib/data";
import { useRoute, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, Clock, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export default function CrowdDetail() {
  const [match, params] = useRoute("/crowd/:id");
  const [, setLocation] = useLocation();
  const { language, t } = useLanguage();
  const projects = getProjects(language);
  const project = projects.find(p => p.id === params?.id);

  if (!project) return null;

  const progress = Math.min((project.currentAmount / project.targetAmount) * 100, 100);

  const handleSupport = (tierId: string) => {
      // Navigate to order page with type=crowd
      setLocation(`/order/crowd/￥{project.id}/￥{tierId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative aspect-video w-full">
        <img src={project.image} className="w-full h-full object-cover" alt={project.title} />
        <Link href="/crowd">
            <div className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
            </div>
        </Link>
      </div>

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-2">{project.title}</h1>
        
        <div className="bg-card p-4 rounded-lg border border-white/10 mb-6">
            <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-bold text-primary">￥{project.currentAmount.toLocaleString()}</span>
                <span className="text-sm text-gray-400">of ￥{project.targetAmount.toLocaleString()}</span>
            </div>
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex justify-between text-sm text-gray-300">
                <div className="flex items-center gap-1"><Users className="w-4 h-4" /> {project.backers}</div>
                <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {project.daysLeft}d</div>
            </div>
        </div>

        <div className="space-y-6">
            <section>
                <h2 className="text-lg font-bold text-white mb-2">{t.crowd.projectInfo}</h2>
                <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>
                <div className="mt-2 p-3 bg-red-900/20 border border-red-900/50 rounded text-xs text-red-300">
                    {t.crowd.risk}
                </div>
            </section>

            <section>
                <h2 className="text-lg font-bold text-white mb-3">{t.crowd.tiers}</h2>
                <div className="space-y-3">
                    {project.tiers.map(tier => (
                        <div key={tier.id} className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-all">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-white">{tier.name}</h3>
                                <span className="text-primary font-bold">￥{tier.price}</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-3">{tier.description}</p>
                            <ul className="text-xs text-gray-500 list-disc list-inside mb-4">
                                {tier.items.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                            <Button 
                                className="w-full bg-white/10 hover:bg-primary text-white"
                                onClick={() => handleSupport(tier.id)}
                            >
                                {t.crowd.support}
                            </Button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}
