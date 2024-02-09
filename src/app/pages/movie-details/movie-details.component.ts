import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from '../../util/SafePipe';
@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  constructor(private service: MovieApiServiceService, private router: ActivatedRoute, private sanitizer: DomSanitizer) { }
  detailResult: any;
  videoResult: any;
  castResult: any;
  youtubeLink: string = "https://www.youtube.com/embed/";
  autoPlay: string = "?autoplay=1&mute=1";
  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    this.constructMovieInformation(getParamId);
  }

  constructMovieInformation(id: any) {
    this.getMovieDetails(id);
    this.getVideo(id);
    this.getCast(id);
  }

  getMovieDetails(id: any) {
    this.service.getMovie(id).subscribe(async (result) => {
      this.detailResult = await result;
    })
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      result.results.forEach((element: any) => {
        if (element.type == "Trailer") {
          this.videoResult = new SafePipe(this.sanitizer).transform(this.youtubeLink + element.key + this.autoPlay );
        }
      });
    })
  }

  getCast(id: any) {
    this.service.getMovieCast(id).subscribe(async (result) => {
      this.castResult = result.cast.slice(0,10);
    })
  }
}
