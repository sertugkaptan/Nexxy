import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { slideInAnimation } from '../../app.animation';
import { MOVIE_ROUTE } from '../../app.routes';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { ChunkArrayPipe } from '../../util/ChunkArrayPipe';
import { AUTO_PLAY, YOUTUBE_LINK } from '../../util/Constants';
import { SafePipe } from '../../util/SafePipe';
import { SharedModule } from '../../util/SharedModule.module';
import { VideoInformation } from '../../Entities/videoinformation/VideoInformation';
import { Movie } from '../../Entities/movie/Movie';
import { MovieDetailsResolved } from '../../Entities/resolved/moviedetails/MovieDetailsResolved';
import { MovieDetails } from '../../Entities/moviedetails/MovieDetails';
@Component({
  selector: 'app-home',
  standalone: true,
  animations: [slideInAnimation],
  imports: [SharedModule, NgClass, RouterOutlet, ChunkArrayPipe, SafePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly MOVIE_ROUTE = MOVIE_ROUTE;
  carouselItems: MovieDetails[][] = [];
  bannerResult: MovieDetails[] = [];
  bannerSub: Subscription | undefined;
  trendingSub: Subscription | undefined;
  state: string = 'void';
  youtubeUrl: string = '';
  showVideo: boolean = false;
  pipe: ChunkArrayPipe;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MovieApiServiceService
  ) {
    this.pipe = new ChunkArrayPipe();
  }

  ngOnInit(): void {
    const movieDetails: MovieDetailsResolved = this.route.snapshot.data['data'];
    this.bannerSub = movieDetails.bannerMovies.subscribe((data) => {
      this.bannerResult = data;
    });
    this.trendingSub = movieDetails.trendingMovies.subscribe((data) => {
      this.carouselItems = this.pipe.transform(data, 6);
      console.log('carousel', this.carouselItems);
    });
  }

  ngOnDestroy(): void {
    this.bannerSub?.unsubscribe();
    this.trendingSub?.unsubscribe();
  }

  playVideo(film: MovieDetails): void {
    film.movie!.showVideo = true;
    this.youtubeUrl = YOUTUBE_LINK + film.movieVideo?.key + AUTO_PLAY;
  }
  navigate(film: Movie): void {
    this.router.navigate([MOVIE_ROUTE, film.id]);
  }
}
