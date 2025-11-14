'use client';

import { Movie } from '../../types/movie';
import MovieCard from './MovieCard';

export default function MovieRow({
  movies,
  categoryTitle,
}: {
  movies: Movie[];
  categoryTitle: string;
}) {
  if (!movies || movies.length === 0) return null;

  return (
    <section aria-label={categoryTitle} className="mb-8">
      <h3 className="text-lg font-semibold mb-3">{categoryTitle}</h3>

      <div
        className="flex gap-3 overflow-x-auto scroll-hide py-2 px-1"
        role="list"
        aria-roledescription="carousel"
      >
        {movies.map((m) => (
          <div key={m.id} role="listitem">
            <MovieCard movie={m} />
          </div>
        ))}
      </div>
    </section>
  );
}
