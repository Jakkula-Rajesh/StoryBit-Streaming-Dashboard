// app/components/HeroBanner.tsx
import Image from "next/image";
import type { Movie } from "../../types/movie";      // <- relative
import { imageUrl } from "../../lib/tmdb";         // <- relative

export default function HeroBanner({ movie }: { movie: Movie | null }) {
  if (!movie) return null;

  const title = movie.title || movie.name || "Movie";

  return (
    <section className="relative w-full h-[420px] md:h-[560px] mb-8">
      {/* Background Image */}
      <Image
        src={imageUrl(movie.backdrop_path, "original")}
        alt={title}
        fill
        priority
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-10 left-6 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">{title}</h1>
        <p className="mt-3 text-sm md:text-base opacity-90 line-clamp-3">
          {movie.overview}
        </p>
      </div>
    </section>
  );
}
