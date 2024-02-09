import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MovieApiServiceService } from '../../service/movie-api-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  constructor(private service: MovieApiServiceService) { }

  ngOnInit(): void {
  }

  searchResult: any;
  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });
  
  submitForm() {
    console.log(this.searchForm.value, 'searchform#');
    this.service.searchMovieWithName(this.searchForm.value).subscribe((result) => {
      this.searchResult=result.results;
    })
  }
}
