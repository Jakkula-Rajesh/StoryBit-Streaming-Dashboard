// app/page.tsx
import HeroBanner from "./components/HeroBanner";
import MovieRow from "./components/MovieRow";
import { fetchPopular, fetchTopRated, fetchNowPlaying } from "../lib/tmdb";

export default async function Home() {
  // Server-side fetching (App Router runs this on server by default)
  const [popular, topRated, nowPlaying] = await Promise.all([
    fetchPopular(),
    fetchTopRated(),
    fetchNowPlaying(),
  ]);

  const heroMovie = popular.results?.[0] ?? null;

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10">
      {/* Hero Section */}
      <HeroBanner movie={heroMovie} />

      {/* Movie Rows */}
      <MovieRow movies={popular.results} categoryTitle="Popular" />
      <MovieRow movies={topRated.results} categoryTitle="Top Rated" />
      <MovieRow movies={nowPlaying.results} categoryTitle="Now Playing" />
    </div>
  );
}
