import { NgStyle } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,FormsModule, NgStyle, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nexxy';
  navbg: any;

  @HostListener('document:scroll')
  scrollOver() {
    console.log(document.body.scrollTop, "scrolllength#");

    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#000000'
      }
    } else {
      this.navbg = {}
    }
  }
}
