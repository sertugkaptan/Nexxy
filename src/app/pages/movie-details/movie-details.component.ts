import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '../../util/SafePipe';
import { YOUTUBE_LINK, AUTO_PLAY } from '../../util/Constants';
import { Movie, MovieDetailsResolved, MovieVideo } from '../../util/Movie';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  detailResult: Movie | undefined;
  videoResult: MovieVideo | undefined;
  castResult: any[] = [];
  youtubeLink: string = '';

  constructor(
    private service: MovieApiServiceService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    const movieDetails: MovieDetailsResolved =
      this.router.snapshot.data['movieDetails'];
    if (movieDetails) {
      this.castResult = movieDetails.cast;
      this.detailResult = movieDetails.movie;
      this.videoResult = movieDetails.movieVideo;
      this.getVideo(movieDetails.movieVideo!);
    }
  }

  constructMovieInformation(id: any) {
    this.getMovieDetails(id);
    this.getVideo(id);
    this.getCast(id);
  }

  getMovieDetails(id: any) {
    this.service.getMovie(id).subscribe(async (result) => {
      this.detailResult = await result;
    });
  }

  getVideo(movieVideo: MovieVideo) {
    console.log(movieVideo.key);

    this.youtubeLink = YOUTUBE_LINK + movieVideo.key + AUTO_PLAY;
  }

  getCast(id: any) {
    this.service.getMovieCast(id).subscribe(async (result) => {
      this.castResult = result.cast.slice(0, 10);
    });
  }
}
