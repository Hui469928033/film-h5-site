import { getMovies } from "@/lib/data";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Share2, Heart, Download } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Detail() {
  const [match, params] = useRoute("/movie/:id");
  const { language, t } = useLanguage();
  const movies = getMovies(language);
  const movie = movies.find(m => m.id === params?.id);

  if (!movie) return <div className="text-center p-10">Movie not found</div>;

  const handleShare = () => {
      toast.success(t.detail.shareCopied);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Image */}
      <div className="relative aspect-video w-full">
        <img src={movie.backdrop} className="w-full h-full object-cover" alt={movie.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <Link href="/">
            <div className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
            </div>
        </Link>
      </div>

      <div className="px-4 -mt-10 relative z-10">
        <div className="flex justify-between items-start">
            <h1 className="text-4xl font-display font-bold text-white drop-shadow-lg flex-1 mr-4">{movie.title}</h1>
            <div className="flex gap-2">
                 <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 rounded-full" onClick={handleShare}>
                    <Share2 className="w-5 h-5" />
                 </Button>
            </div>
        </div>

        <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
            <span className="text-green-400 font-bold">{movie.rating} {t.detail.match}</span>
            <span>{movie.year}</span>
            <Badge variant="outline" className="border-white/20 text-xs px-1 py-0 h-5">{t.detail.hd}</Badge>
            <span>{movie.duration}</span>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
            {movie.genre.map(g => (
                <Badge key={g} variant="secondary" className="bg-white/10 text-gray-200 hover:bg-white/20 border-none">
                    {g}
                </Badge>
            ))}
        </div>

        <div className="mt-6 flex flex-col gap-3">
             <Link href={`/play/${movie.id}`}>
                <Button className="w-full rounded-lg bg-primary hover:bg-primary/90 text-white font-bold h-12 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    {movie.isVip ? t.detail.playPreview : t.detail.playFull}
                </Button>
            </Link>
            
            <div className="grid grid-cols-2 gap-3">
                 <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-none h-10">
                    <Heart className="w-4 h-4 mr-2" /> {t.detail.myList}
                 </Button>

            </div>
        </div>

        <p className="mt-6 text-gray-300 leading-relaxed text-sm">
            {movie.description}
        </p>
        
        <div className="mt-6">
            <h3 className="text-white font-bold mb-2">{t.detail.cast}</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {[1,2,3,4].map(i => (
                    <div key={i} className="flex flex-col items-center min-w-[80px]">
                        <div className="w-16 h-16 rounded-full bg-white/10 mb-2 overflow-hidden">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Actor" />
                        </div>
                        <span className="text-xs text-gray-400">Actor Name</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
