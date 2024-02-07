import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  submitForm() {
    console.log(this.searchForm.value,'searchform#');
  }
}
