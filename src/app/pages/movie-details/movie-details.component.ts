import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from '../../service/movie-api-service.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  constructor(private service: MovieApiServiceService, private router: ActivatedRoute) { }
  detailResult: any;

  ngOnInit(): void {
    let movieId = this.router.snapshot.paramMap.get('id');
    this.getMovieDetails(movieId);
  }

  getMovieDetails(data: any) {
    this.service.searchMovie(data).subscribe(async(result) => {
      console.log(result.results, 'detailresult#');
      this.detailResult = await result;
    })
  }

}
