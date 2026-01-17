import { Link } from "wouter";
import type { Course } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function CourseCard({ course }: { course: Course }) {
  const { t } = useLanguage();

  return (
    <Link href={`/learn/￥{course.id}`} className="group block bg-card rounded-lg overflow-hidden border border-white/5 hover:border-primary/50 transition-all">
      <div className="relative aspect-video">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
        <div className="absolute top-2 right-2">
            <Badge className="bg-black/60 backdrop-blur text-white border-white/10">{course.level}</Badge>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-white text-sm line-clamp-1 mb-1">{course.title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {course.lessons} {t.course.lesson}</span>
        </div>
        <div className="flex justify-between items-center">
             <span className="text-primary font-bold">￥{course.price}</span>
             <span className="text-xs text-gray-500 line-through">￥{(course.price * 1.5).toFixed(0)}</span>
        </div>
      </div>
    </Link>
  );
}
