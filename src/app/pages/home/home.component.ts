import { NgClass } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { slideInAnimation } from '../../app.animation';
import { MOVIE_ROUTE } from '../../app.routes';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { ChunkArrayPipe } from '../../util/ChunkArrayPipe';
import { AUTO_PLAY, YOUTUBE_LINK } from '../../util/Constants';
import { Movie, VideoInformation } from '../../util/Movie';
import { SafePipe } from '../../util/SafePipe';
import { SharedModule } from '../../util/SharedModule.module';
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

  constructor(private router: Router, private service: MovieApiServiceService) {}

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

  playVideo(film:Movie): void {
    film.showVideo=true;
    this.service.getMovieVideo(film.id).subscribe( (result)=>{
      result.results.forEach((element: VideoInformation) => {
        if (element.type == "Trailer") {
          this.youtubeUrl = YOUTUBE_LINK + element.key + AUTO_PLAY
        }
      });
    })
  }
  navigate(film:Movie):void{
    console.log('navi');
    
    this.router.navigate([MOVIE_ROUTE,film.id]);
  }
}
