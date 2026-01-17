import { getMovies, MOCK_USER } from "@/lib/data";
import { useRoute, Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Player() {
  const [match, params] = useRoute("/play/:id");
  const [, setLocation] = useLocation();
  const { language, t } = useLanguage();
  const movies = getMovies(language);
  const movie = movies.find(m => m.id === params?.id);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showTrialEnd, setShowTrialEnd] = useState(false);

  if (!movie) return null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
        if (movie.isVip && video.currentTime > 10 && !MOCK_USER.isVip) { 
            video.pause();
            setShowTrialEnd(true);
            video.currentTime = 10;
        }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [movie]);

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 z-20 bg-gradient-to-b from-black/80 to-transparent flex items-center gap-4">
            <Link href={`/movie/￥{movie.id}`}>
                <ArrowLeft className="text-white cursor-pointer" />
            </Link>
            <h1 className="text-white font-medium truncate">{movie.title}</h1>
        </div>

        {/* Video Player */}
        <div className="w-full aspect-video relative">
            <video 
                ref={videoRef}
                src={movie.trailerUrl} 
                controls 
                autoPlay 
                className="w-full h-full bg-black"
                poster={movie.backdrop}
            />
            
            <div className="absolute top-4 right-4 opacity-30 pointer-events-none animate-pulse">
                <span className="text-[10px] text-white font-mono">{MOCK_USER.id} • {new Date().toLocaleTimeString()}</span>
            </div>
            
            <div className="absolute top-10 left-0 right-0 h-32 pointer-events-none overflow-hidden">
                 <div className="absolute top-2 left-[100%] animate-[slide-left_8s_linear_infinite] text-white text-sm shadow-black drop-shadow-md whitespace-nowrap">
                    This movie is awesome! 🔥
                 </div>
                 <div className="absolute top-8 left-[120%] animate-[slide-left_10s_linear_infinite_1s] text-white text-sm shadow-black drop-shadow-md whitespace-nowrap text-primary">
                    Wait for the ending...
                 </div>
            </div>
        </div>

        {/* Trial End Modal */}
        {showTrialEnd && (
            <div className="absolute inset-0 bg-black/90 z-30 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                <Lock className="w-12 h-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">{t.player.previewEnded}</h2>
                <p className="text-gray-400 mb-8">{t.player.purchasePrompt}</p>
                
                <div className="w-full max-w-xs space-y-3">
                    <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12"
                        onClick={() => {
                            toast.success(t.order.redirect);
                            setTimeout(() => setLocation(`/order/￥{movie.id}`), 1000);
                        }}
                    >
                        {t.player.buyNow} - ￥{movie.price}
                    </Button>
                    <Button 
                        variant="outline" 
                        className="w-full border-white/20 text-white hover:bg-white/10"
                        onClick={() => setLocation(`/movie/￥{movie.id}`)}
                    >
                        {t.player.backToDetail}
                    </Button>
                </div>
            </div>
        )}
    </div>
  );
}
