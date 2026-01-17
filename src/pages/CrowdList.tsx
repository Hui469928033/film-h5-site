import { getProjects } from "@/lib/data";
import { TabBar, Navbar } from "@/components/Layout";
import { ProjectCard } from "@/components/ProjectCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CrowdList() {
  const { language, t } = useLanguage();
  const projects = getProjects(language);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="mb-6">
            <h1 className="text-3xl font-display font-bold text-white mb-1">{t.crowd.title}</h1>
            <p className="text-sm text-gray-400">{t.crowd.subtitle}</p>
        </div>

        <div className="space-y-4">
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </div>
      <TabBar />
    </div>
  );
}
