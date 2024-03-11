import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import {
  Movie,
  MovieResolved,
  MovieVideo,
  MovieDetailsResolved,
} from '../util/Movie';
import { MovieApiServiceService } from './movie-api-service.service';

// Replace with your actual movie data service

export const MovieResolver: ResolveFn<MovieResolved> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<MovieResolved> | Promise<MovieResolved> => {
  const movieService = inject(MovieApiServiceService);
  const id = _route.paramMap.get('id');
  return movieService.getMovie(id).pipe(
    map((data) => ({ movie: data })),
    catchError((error) => {
      const message = `retrieval error ${error}`;
      console.error(message);
      return of({ movie: null, error: message });
    })
  );
};
export const MovieVideoResolver: ResolveFn<MovieDetailsResolved> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<MovieDetailsResolved> | Promise<MovieDetailsResolved> => {
  const movieService = inject(MovieApiServiceService);
  const id = _route.paramMap.get('id');

  // Concatenate observables using forkJoin for guaranteed order
  return forkJoin({
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
  });
  // Handle errors from any observable in the forkJoin
};
