import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, flatMap, forkJoin, map, of } from 'rxjs';
import {
  Movie,
  MovieDetailsResolved,
  MovieResolved,
  MovieVideo,
} from '../util/Movie';
import { MovieApiServiceService } from './movie-api-service.service';

// Replace with your actual movie data service

// export const MovieResolver: ResolveFn<MovieResolved[]> = (
//   _route: ActivatedRouteSnapshot,
//   _state: RouterStateSnapshot
// ): Observable<MovieResolved[]> | Promise<MovieResolved[]> => {
//   const movieService = inject(MovieApiServiceService);
//   const bannerMovies: MovieDetailsResolved[] = movieService
//     .bannerApiData()
//     .pipe(map((result) => getMovieDetails(movieService, result.results.id)));
//   let trendingMovies:MovieDetailsResolved[] = [];
//   movieService.trendingMovieApiData().subscribe((result) => {
//     const movies = getMovieDetails(movieService, result.results.id);
//     let movie = {
//       cast:movies.cast,
//       movieVideo:movies.movieVideo,
//       movie:movies.movie
//     }

//     trendingMovies.push(movie);
//   });
//   return forkJoin({
//     bannerMovies: bannerMovies,
//     trendingMovies: trendingMovies,
//   });
// };
export const MovieVideoResolver: ResolveFn<MovieDetailsResolved> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<MovieDetailsResolved> | Promise<MovieDetailsResolved> => {
  const movieService = inject(MovieApiServiceService);
  const id = _route.paramMap.get('id');

  // Concatenate observables using forkJoin for guaranteed order
  return forkJoin(getMovieDetails(movieService, id));
  // Handle errors from any observable in the forkJoin
};

function getMovieDetails(
  movieService: MovieApiServiceService,
  id: string | null
): {
  cast: Observable<any>;
  movieVideo: Observable<any>;
  movie: Observable<any>;
} {
  return {
    cast: movieService
      .getMovieCast(id)
      .pipe(map((result) => result.cast.slice(0, 10))),
    movieVideo: movieService
      .getMovieVideo(id)
      .pipe(
        map((result) =>
          result.results.find(
            (element: MovieVideo) => element.type === 'Trailer'
          )
        )
      ),
    movie: movieService.getMovie(id).pipe(map((data) => data)),
  };
}
