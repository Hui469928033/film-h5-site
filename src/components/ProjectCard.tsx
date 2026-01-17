import { Link } from "wouter";
import type { Project } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const progress = Math.min((project.currentAmount / project.targetAmount) * 100, 100);

  return (
    <Link href={`/crowd/${project.id}`} className="group block bg-card rounded-lg overflow-hidden border border-white/5 hover:border-primary/50 transition-all">
      <div className="relative aspect-video">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80" />
        <div className="absolute bottom-2 left-3 right-3">
             <div className="flex justify-between text-xs text-white mb-1">
                <span>{progress.toFixed(0)}% {t.common.raised}</span>
                <span className="text-primary font-bold">{project.daysLeft} {t.common.daysLeft}</span>
             </div>
             <Progress value={progress} className="h-1 bg-white/20" />
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-white text-sm line-clamp-1 mb-1">{project.title}</h3>
        <p className="text-xs text-gray-400 line-clamp-2">{project.description}</p>
      </div>
    </Link>
  );
}
