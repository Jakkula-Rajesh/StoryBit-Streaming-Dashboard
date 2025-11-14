// app/movie/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchMovieById, imageUrl } from "../../../lib/tmdb";
import type { Movie } from "../../../types/movie";

type Props = {
  params: { id: string };
};

export default async function MoviePage({ params }: Props) {
  const { id } = params;

  let movie: Movie | null = null;
  try {
    movie = await fetchMovieById(id);
  } catch (err) {
    // If fetch fails (404 or other), render the not-found page
    console.error("Failed fetching movie:", err);
    return notFound();
  }

  if (!movie || !movie.id) {
    return notFound();
  }

  const title = movie.title || movie.name || "Untitled";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="rounded overflow-hidden bg-gray-800">
            <Image
              src={imageUrl(movie.poster_path, "w500")}
              alt={title}
              width={400}
              height={600}
              className="object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>

          <div className="mt-4 text-sm md:text-base space-y-3">
            <p className="opacity-90">{movie.overview || "No description available."}</p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 mt-2">
              <p>
                <strong>Release:</strong>{" "}
                <span className="opacity-90">{movie.release_date ?? "N/A"}</span>
              </p>
              <p>
                <strong>Rating:</strong>{" "}
                <span className="opacity-90">{movie.vote_average ?? "N/A"}</span>
              </p>
            </div>

            <p>
              <strong>Genres:</strong>{" "}
              <span className="opacity-90">
                {movie.genres && movie.genres.length > 0
                  ? movie.genres.map((g) => g.name).join(", ")
                  : "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop / full-width hero-like image (optional, shows when available) */}
      {movie.backdrop_path ? (
        <div className="mt-8 relative h-56 md:h-80 rounded overflow-hidden">
          <Image
            src={imageUrl(movie.backdrop_path, "original")}
            alt={`${title} backdrop`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      ) : null}
    </div>
  );
}
