import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { SharedModule } from '../../util/SharedModule.module';
import { MOVIE_ROUTE } from '../../app.routes';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, SharedModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  readonly MOVIE_ROUTE = MOVIE_ROUTE;
  searchResult: any;
  trendingMovies: any = [];
  constructor(private service: MovieApiServiceService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
  }

  searchForm = new FormGroup({
    movieName: new FormControl(null),
  });

  submitForm() {
    this.service
      .searchMovieWithName(this.searchForm.value)
      .subscribe((result) => {
        this.searchResult = result.results;
      });
  }
  getTrendingMovies() {
    this.service.trendingMovieApiData().subscribe((result) => {
      this.trendingMovies = result.results;
    });
  }
}
