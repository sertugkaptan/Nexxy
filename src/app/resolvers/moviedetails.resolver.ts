import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { Movie } from '../Entities/movie/Movie';
import { MovieDetails } from '../Entities/moviedetails/MovieDetails';
import { VideoInformation } from '../Entities/videoinformation/VideoInformation';
import { MovieApiServiceService } from '../service/movie-api-service.service';



export const MovieVideoResolver: ResolveFn<MovieDetails> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<MovieDetails> | Promise<MovieDetails> => {
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
