import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private service: MovieApiServiceService) {
  }

  bannerResult: any = [];
  trendingResult: any = [];

  ngOnInit(): void {
    this.bannerData();
    this.trendingData();
  }

  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      console.log(result, 'bannerresult#');
      this.bannerResult = result.results;
    })
  }

  trendingData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'trendingresult#')
      this.trendingResult = result.result
    });
  }

}
