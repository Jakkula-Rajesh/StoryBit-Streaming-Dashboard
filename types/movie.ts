export interface Movie {
  id: number;
  title?: string;
  name?: string; // Some TMDB items use "name" instead of "title"
  overview?: string | null;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string | null;
  vote_average?: number;
  genres?: { id: number; name: string }[];
}

export interface TMDBListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
