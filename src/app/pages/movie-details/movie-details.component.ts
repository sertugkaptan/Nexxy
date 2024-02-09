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
    console.log(this.router.snapshot);
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId)
    this.getMovieDetails(getParamId);
  }

  getMovieDetails(id: any) {
    this.service.movieDetails(id).subscribe(async(result) => {
      console.log(result, 'detailresult#');
      this.detailResult = await result;
    })
  }

}
