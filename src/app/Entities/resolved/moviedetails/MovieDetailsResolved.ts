import { Observable } from 'rxjs';
import { MovieDetails } from '../../moviedetails/MovieDetails';

export interface MovieDetailsResolved {
  trendingMovies: Observable<MovieDetails[]>;
  bannerMovies:Observable<MovieDetails[]>;
  error?: string;
}


export class MovieDetailsResolvedImpl implements MovieDetailsResolved{
  trendingMovies!: Observable<MovieDetails[]>;
  bannerMovies!: Observable<MovieDetails[]>;
  error?: string | undefined;
  constructor(){
  }

}