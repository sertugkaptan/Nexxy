import { CommonModule, NgClass } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { SharedModule } from '../../util/SharedModule.module';
import { MOVIE_ROUTE } from '../../app.routes';
import { Movie, MovieVideo } from '../../util/Movie';
import { Subscription, map } from 'rxjs';
import { slideInAnimation } from '../../app.animation';
import { RouterOutlet } from '@angular/router';
import { ChunkArrayPipe } from '../../util/ChunkArrayPipe';
import { YOUTUBE_LINK, AUTO_PLAY } from '../../util/Constants';
import { SafePipe } from '../../util/SafePipe';
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
  carouselItems: Movie[] = [];
  nextItems: Movie[] = [];
  bannerResult: Movie[] = [];
  trendingResult: Movie[] = [];
  bannerSub: Subscription | undefined;
  trendingSub: Subscription | undefined;
  state: string = 'void';
  youtubeUrl: string = '';
  showVideo: boolean = false;

  constructor(private service: MovieApiServiceService) {}

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

  async trendingData(): Promise<void> {
    this.trendingSub = this.service.trendingMovieApiData().subscribe((data) => {
      this.carouselItems = data.results!;
    });
  }

  playVideo(id: number): void {
    this.showVideo = true;
    this.service.getMovieVideo(id).subscribe( (result)=>{
      result.results.forEach((element: MovieVideo) => {
        if (element.type == "Trailer") {
          this.youtubeUrl = YOUTUBE_LINK + element.key + AUTO_PLAY
        }
      });
    })
  }
}
