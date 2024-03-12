import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, forkJoin, map, mergeMap } from 'rxjs';
import {
  Movie,
  MovieDetailsResolved,
  MovieResolved,
  VideoInformation,
} from '../util/Movie';
import { MovieApiServiceService } from './movie-api-service.service';

// export const MoviesResolver: ResolveFn<{
//   trending: MovieDetailsResolved[];
//   banner: MovieDetailsResolved;
// }> = (
//   _route: ActivatedRouteSnapshot,
//   _state: RouterStateSnapshot
// ): Observable<{
//   trending: MovieDetailsResolved[];
//   banner: MovieDetailsResolved;
// }> => {
//   const movieService = inject(MovieApiServiceService);

//   const bannerMovieDetails$ = movieService.bannerApiData().pipe(
//     // Combine movie, cast, and video using separate service calls within pipe
//     map((movie) => ({
//       movie,
//       cast: movieService
//         .getMovieCast(movie.id)
//         .pipe(map((data) => data.cast.slice(0, 10) || [])),
//       movieVideo: movieService
//         .getMovieVideo(movie.id)
//         .pipe(
//           map((result) =>
//             result.results.find(
//               (element: VideoInformation) => element.type === 'Trailer'
//             )
//           )
//         ),
//     }))
//   );
//   const trendingMovies$ = movieService.trendingMovieApiData().pipe(
//     map((data) => data.results.map((movie:Movie) => movieService.getMovieDetails(movie.id))),
//     mergeMap((observables) => forkJoin(observables))
//   );

//   return forkJoin({
//     banner: bannerMovieDetails$,
//     trending: trendingMovies$,
//   }).pipe(
//     map((data) => ({
//       trending: data.trending.map((details) => ({
//         ...details,
//         cast: details.cast, // Assuming cast is already populated within details object
//         movieVideo: details.movieVideo, // Assuming movieVideo is already populated within details object
//       })),
//       banner: data.banner,
//     }))
//   );
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
  cast: Observable<any[]>;
  movieVideo: Observable<VideoInformation>;
  movie: Observable<Movie>;
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
            (element: VideoInformation) => element.type === 'Trailer'
          )
        )
      ) as Observable<VideoInformation>,
    movie: movieService
      .getMovie(id)
      .pipe(map((data) => data)) as Observable<Movie>,
  };
}
