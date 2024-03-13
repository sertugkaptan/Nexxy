import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { AUTO_PLAY, YOUTUBE_LINK } from '../../util/Constants';
import { SafePipe } from '../../util/SafePipe';
import { VideoInformation } from '../../Entities/videoinformation/VideoInformation';
import { Movie } from '../../Entities/movie/Movie';
import { MovieDetails } from '../../Entities/moviedetails/MovieDetails';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  detailResult: Movie | undefined;
  videoResult: VideoInformation | undefined;
  castResult: any[] = [];
  youtubeLink: string = '';

  constructor(
    private service: MovieApiServiceService,
    private router: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    const movieDetails: MovieDetails =
      this.router.snapshot.data['movieDetails'];
    if (movieDetails) {
      this.castResult = movieDetails.cast!;
      this.detailResult = movieDetails.movie;
      this.videoResult = movieDetails.movieVideo;
      this.getVideo(movieDetails.movieVideo!);
    }
  }

  getVideo(movieVideo: VideoInformation) {
    this.youtubeLink = YOUTUBE_LINK + movieVideo.key + AUTO_PLAY;
  }
}
