import { Link } from "wouter";
import type { Movie } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

export function MovieCard({ movie, size = "md" }: { movie: Movie, size?: "sm" | "md" | "lg" }) {
  const aspectClass = size === "lg" ? "aspect-[2/3]" : "aspect-[2/3]";
  const titleClass = size === "lg" ? "text-lg" : "text-sm";

  return (
    <Link href={`/movie/${movie.id}`} className="group relative block overflow-hidden rounded-lg bg-card transition-all hover:scale-105">
      <div className={aspectClass}>
        <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {/* VIP Badge */}
        {movie.isVip && (
           <Badge variant="secondary" className="absolute top-2 right-2 bg-primary/90 text-white border-none text-[10px] px-1.5 py-0.5 shadow-[0_0_10px_rgba(37,99,235,0.4)]">
             VIP
           </Badge>
        )}
        
        {/* Play Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                <Play className="w-6 h-6 text-white fill-white" />
            </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className={`${titleClass} font-display font-bold text-white truncate drop-shadow-md`}>{movie.title}</h3>
        <p className="text-[10px] text-gray-300 flex items-center gap-2">
            <span className="text-yellow-400">★ {movie.rating}</span>
            <span>•</span>
            <span>{movie.genre[0]}</span>
        </p>
      </div>
    </Link>
  );
}
