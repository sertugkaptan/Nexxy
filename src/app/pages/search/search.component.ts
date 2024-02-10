import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchResult: any;
  trendingMovies: any = [];

  constructor(private service: MovieApiServiceService) { }
  
  ngOnInit(): void {
    this.getTrendingMovies();
  }

  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  submitForm() {
    this.service.searchMovieWithName(this.searchForm.value).subscribe((result) => {
      this.searchResult = result.results;
    })
  }
  getTrendingMovies() {
    this.service.trendingMovieApiData().subscribe((result) => {
      this.trendingMovies = result.results
    })
  }
}
