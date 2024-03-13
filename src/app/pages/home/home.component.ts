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
  carouselItems: MovieDetails[] = [];
  nextItems: Movie[] = [];
  bannerResult: MovieDetails[] = [];
  trendingResult: Movie[] = [];
  bannerSub: Subscription | undefined;
  trendingSub: Subscription | undefined;
  state: string = 'void';
  youtubeUrl: string = '';
  showVideo: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MovieApiServiceService
  ) {}

  ngOnInit(): void {
    const movieDetails: MovieDetailsResolved = this.route.snapshot.data['data'];
    movieDetails.bannerMovies.subscribe((data) => {
      this.bannerResult = data;
    });
    movieDetails.trendingMovies.subscribe((data) => {
      this.carouselItems = data
    });
  }

  ngOnDestroy(): void {
    this.bannerSub?.unsubscribe();
    this.trendingSub?.unsubscribe();
  }
  bannerData() {
    this.bannerSub = this.service.bannerApiData().subscribe((data) => {
      this.bannerResult = data.results!;
    });
  }

  trendingData(){
    this.trendingSub = this.service.trendingMovieApiData().subscribe((data) => {
      this.carouselItems = data.results!;
    });
  }

  playVideo(film:MovieDetails): void {
      film.movie!.showVideo = true;
    this.youtubeUrl = YOUTUBE_LINK+film.movieVideo?.key+AUTO_PLAY
  }
  navigate(film: Movie): void {
    console.log('navi');

    this.router.navigate([MOVIE_ROUTE, film.id]);
  }
}
