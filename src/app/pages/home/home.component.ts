import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { SharedModule } from '../../util/SharedModule.module';
import { MOVIE_ROUTE } from '../../app.routes';
import { Movie } from '../../util/Movie';
import { Subscription } from 'rxjs';
import { slideInAnimation } from '../../app.animation';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  animations: [slideInAnimation],
  imports: [SharedModule, NgClass, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly MOVIE_ROUTE = MOVIE_ROUTE;
  carouselItems: Movie[] = [];
  nextItems: Movie[] = [];
  bannerResult: Movie[] = [];
  trendingResult: Movie[] = [];
  bannerSub: Subscription | undefined;
  trendingSub: Subscription | undefined;
  state: string = 'void';
  
  constructor(
    private service: MovieApiServiceService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bannerData();
    this.trendingData();
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

  trendingData(): void {
    this.trendingSub = this.service.trendingMovieApiData().subscribe((data) => {
      this.carouselItems = data.results.slice(0, 3);
      this.trendingResult = data.results!;
    });
  }
}
