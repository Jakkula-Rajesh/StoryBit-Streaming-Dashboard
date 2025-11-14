'use client';

import Link from "next/link";
import Image from "next/image";
import { Movie } from "../../types/movie";          // ← FIXED
import { imageUrl } from "../../lib/tmdb";          // ← FIXED

export default function MovieCard({ movie }: { movie: Movie }) {
  const title = movie.title || movie.name || "Movie";

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="block min-w-[140px] md:min-w-[160px] hover:scale-105 transition-transform duration-200"
    >
      {/* Poster */}
      <div className="rounded overflow-hidden bg-gray-800 shadow-md">
        <Image
          src={imageUrl(movie.poster_path, "w342")}
          alt={title}
          width={200}
          height={300}
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h4 className="mt-2 text-sm truncate">{title}</h4>
    </Link>
  );
}
