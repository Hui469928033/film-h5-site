import { getCourses } from "@/lib/data";
import { TabBar, Navbar } from "@/components/Layout";
import { CourseCard } from "@/components/CourseCard";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CourseList() {
  const { language, t } = useLanguage();
  const courses = getCourses(language);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="mb-6">
            <h1 className="text-3xl font-display font-bold text-white mb-1">{t.course.title}</h1>
            <p className="text-sm text-gray-400">{t.course.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
      </div>
      <TabBar />
    </div>
  );
}
