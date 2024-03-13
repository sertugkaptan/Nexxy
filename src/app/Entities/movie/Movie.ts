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
  showVideo: boolean;
}

export class MovieImpl implements Movie {
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
  showVideo: boolean;

  constructor() {
    (this.adult = false),
      (this.backdrop_path = ''),
      (this.genre_ids = []),
      (this.id = 0),
      (this.media_type = ''),
      (this.original_language = ''),
      (this.original_title = ''),
      (this.overview = ''),
      (this.popularity = 0),
      (this.poster_path = ''),
      (this.release_date = new Date()),
      (this.title = ''),
      (this.video = false),
      (this.vote_average = 0),
      (this.vote_count = 0),
      (this.showVideo = false);
  }
}
