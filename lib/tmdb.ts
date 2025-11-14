// lib/tmdb.ts
import { Movie, TMDBListResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Returns a full image URL for TMDB paths or a fallback placeholder.
 */
export function imageUrl(path: string | null | undefined, size = "w500") {
  if (!path) return "/no-image.png"; // add a placeholder to public/ if desired
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

/**
 * Internal helper to call TMDB.
 * Throws a clear error if TMDB_API_KEY is missing.
 */
async function fetchFromTMDB(endpoint: string): Promise<any> {
  const API_KEY = process.env.TMDB_API_KEY;
  if (!API_KEY) {
    throw new Error(
      "TMDB_API_KEY is not set. Add it to your .env.local as TMDB_API_KEY=your_key_here"
    );
  }

  // Build URL (handles endpoints with or without query string)
  const sep = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}${sep}api_key=${API_KEY}&language=en-US`;

  const res = await fetch(url); // server-side fetch (App Router server components)
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`TMDB fetch error ${res.status}: ${res.statusText} ${text}`);
  }
  return res.json();
}

/** Fetch popular movies (page 1) */
export async function fetchPopular(): Promise<TMDBListResponse> {
  return fetchFromTMDB("/movie/popular");
}

/** Fetch top rated movies (page 1) */
export async function fetchTopRated(): Promise<TMDBListResponse> {
  return fetchFromTMDB("/movie/top_rated");
}

/** Fetch now playing movies (page 1) */
export async function fetchNowPlaying(): Promise<TMDBListResponse> {
  return fetchFromTMDB("/movie/now_playing");
}

/** Fetch single movie by id */
export async function fetchMovieById(id: string): Promise<Movie> {
  if (!id) throw new Error("fetchMovieById: id is required");
  return fetchFromTMDB(`/movie/${id}`);
}
