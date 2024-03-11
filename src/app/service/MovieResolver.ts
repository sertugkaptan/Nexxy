import { inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { Movie, MovieResolved } from '../util/Movie';
import { MovieApiServiceService } from './movie-api-service.service';

// Replace with your actual movie data service

export const MovieResolver: ResolveFn<MovieResolved> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<MovieResolved> | Promise<MovieResolved>=> {
  const movieService = inject(MovieApiServiceService);
  const id = _route.paramMap.get('id');
  return movieService.getMovie(id).pipe(
    map(data => ({ movie: data })),
    catchError(error => {
        const message = `retrieval error ${error}`;
        console.error(message);
        return of({ movie:null, error: message })
    })
);
};
