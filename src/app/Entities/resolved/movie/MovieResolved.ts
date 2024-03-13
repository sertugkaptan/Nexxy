import { Movie } from "../../movie/Movie";

export interface MovieResolved {
  movie: Movie | null;
  error?: string;
}
