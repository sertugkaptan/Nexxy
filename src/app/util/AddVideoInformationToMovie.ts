import { Movie } from '../Entities/movie/Movie';
import {
  MovieDetails,
  MovieDetailsImpl,
} from '../Entities/moviedetails/MovieDetails';
import { VideoInformation } from '../Entities/videoinformation/VideoInformation';
import { MovieApiServiceService } from '../service/movie-api-service.service';

export class AddVideoInformationToMovies {
  static addVideoInfoToMovie(
    service: MovieApiServiceService,
    movie: Movie
  ): MovieDetails {
    let film = new MovieDetailsImpl();
    if (movie) {
      film.movie = movie;
      service.getMovieVideo(movie.id).subscribe((result) => {
        result.results.forEach((element: VideoInformation) => {
          if (element.type == 'Trailer') {
            film.movieVideo = element;
          }
        });
      });
    }
    return film;
  }
}
