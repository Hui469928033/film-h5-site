import { getMovies } from "@/lib/data";
import { MovieCard } from "@/components/MovieCard";
import { TabBar, Navbar } from "@/components/Layout";
import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Info } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { language, t } = useLanguage();
  const movies = getMovies(language);
  const heroMovie = movies[0];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
             <img src={heroBg} className="w-full h-full object-cover" alt="Hero" />
             <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
             <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 p-6 w-full max-w-lg animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <Badge variant="outline" className="mb-2 border-primary/50 text-primary bg-primary/10 backdrop-blur-md">
                {t.home.featured}
            </Badge>
            <h1 className="text-6xl font-display font-bold text-white mb-2 leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                {heroMovie.title}
            </h1>
            <p className="text-sm text-gray-300 line-clamp-2 mb-4 drop-shadow-md max-w-[80%]">
                {heroMovie.description}
            </p>
            <div className="flex gap-3">
                <Link href={`/movie/${heroMovie.id}`}>
                    <Button className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform active:scale-95">
                        <Play className="w-4 h-4 mr-2 fill-current" /> {t.common.playNow}
                    </Button>
                </Link>
                <Link href={`/movie/${heroMovie.id}`}>
                    <Button variant="secondary" className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white">
                        <Info className="w-4 h-4 mr-2" /> {t.common.details}
                    </Button>
                </Link>
            </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-white">{t.home.trending}</h2>
            <Link href="/list/trending" className="text-xs text-primary hover:text-primary/80">{t.common.viewAll}</Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>

      <div className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-white">{t.home.newReleases}</h2>
            <Link href="/list/new" className="text-xs text-primary hover:text-primary/80">{t.common.viewAll}</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
             {movies.slice().reverse().map(movie => (
                <div key={movie.id} className="min-w-[140px] snap-start">
                    <MovieCard movie={movie} size="sm" />
                </div>
            ))}
        </div>
      </div>

      <TabBar />
    </div>
  );
}
