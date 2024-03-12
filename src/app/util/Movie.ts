export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  showVideo?:boolean;
  displayOverlay?:boolean;
}

export interface MovieVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface MovieDetailsResolved{
    cast?:any[];
    movieVideo:MovieVideo|undefined;
    movie:Movie|undefined;
    error?:string;
}

export interface MovieResolved {
  trendingMovies: MovieDetailsResolved[]|null;
  bannerMovies:MovieDetailsResolved[];
  error?: string;
}
