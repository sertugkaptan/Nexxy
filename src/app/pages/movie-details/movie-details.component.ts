import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from '../../service/movie-api-service.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  constructor(private service: MovieApiServiceService) { }

  ngOnInit(): void {
    this.getMovieDetails(this.movieId);
  }

  movieId: any;
  detailResult:any = [];

  getMovieDetails(data:any) {
    this.service.searchMovie(data).subscribe((result)=>{
      console.log(result.results, 'detailresult#')
      this.detailResult= result.results
    })
  }

}
