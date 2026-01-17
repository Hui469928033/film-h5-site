import { getCourses } from "@/lib/data";
import { useRoute, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlayCircle, Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CourseDetail() {
  const [match, params] = useRoute("/learn/:id");
  const [, setLocation] = useLocation();
  const { language, t } = useLanguage();
  const courses = getCourses(language);
  const course = courses.find(c => c.id === params?.id);

  if (!course) return null;

  const handleEnroll = () => {
      setLocation(`/order/course/￥{course.id}/full`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="relative aspect-video w-full">
        <img src={course.image} className="w-full h-full object-cover" alt={course.title} />
        <Link href="/learn">
            <div className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
            </div>
        </Link>
      </div>

      <div className="px-4 py-6">
        <div className="flex justify-between items-start mb-2">
            <h1 className="text-xl font-bold text-white flex-1 mr-2">{course.title}</h1>
            <Badge className="bg-primary">{course.level}</Badge>
        </div>
        
        <p className="text-sm text-gray-400 leading-relaxed mb-6">{course.description}</p>

        <section className="mb-20">
            <h2 className="text-lg font-bold text-white mb-4">{t.course.curriculum}</h2>
            <div className="space-y-2">
                {course.chapters.map((chapter, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-400">
                                {i + 1}
                            </div>
                            <span className="text-sm text-gray-200">{chapter.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">{chapter.duration}</span>
                            {i === 0 ? <PlayCircle className="w-4 h-4 text-green-400" /> : <Lock className="w-4 h-4 text-gray-600" />}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-lg border-t border-white/10 safe-area-bottom">
            <Button 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-lg"
                onClick={handleEnroll}
            >
                {t.course.enroll} - ￥{course.price}
            </Button>
        </div>
      </div>
    </div>
  );
}
