import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { Movie } from '../Entities/movie/Movie';
import { MovieDetails } from '../Entities/moviedetails/MovieDetails';
import {
  MovieDetailsResolved,
  MovieDetailsResolvedImpl,
} from '../Entities/resolved/moviedetails/MovieDetailsResolved';
import { MovieApiServiceService } from '../service/movie-api-service.service';
import { AddVideoInformationToMovies } from '../util/AddVideoInformationToMovie';

export const MovieResolver: ResolveFn<MovieDetailsResolved> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): Observable<MovieDetailsResolved> => {
  const movieService = inject(MovieApiServiceService);
  let bannerMovies: MovieDetails[] = [];
  movieService.bannerApiData().subscribe((data) => data.results);
  const bannerMovieDetails$ = movieService.bannerApiData().pipe(
    // Combine movie, cast, and video using separate service calls within pipe
    map((movie) => {
      const movies: Movie[] = movie.results;
      let detail:MovieDetails[]= [];
      movies.forEach((movie:Movie) => {
        detail.push(AddVideoInformationToMovies.addVideoInfoToMovie(movieService, movie));
      });
      return detail;
    })
  );
  const trendingMovies$ = movieService.trendingMovieApiData().pipe(
    map((movie) => {
      const movies: Movie[] = movie.results;
      let detail:MovieDetails[]= [];
      movies.forEach((movie:Movie) => {
        detail.push(AddVideoInformationToMovies.addVideoInfoToMovie(movieService, movie));
      });
      return detail;
    })
  );

  let movieDetailsResolved: MovieDetailsResolved =
    new MovieDetailsResolvedImpl();
  movieDetailsResolved.bannerMovies = bannerMovieDetails$;
  movieDetailsResolved.trendingMovies = trendingMovies$;

  return of(movieDetailsResolved);
};
