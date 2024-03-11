import { NgStyle } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HOME_ROUTE, SEARCH_ROUTE } from './app.routes';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    NgStyle,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly HOME_ROUTE = HOME_ROUTE;
  readonly SEARCH_ROUTE = SEARCH_ROUTE;
  // title = 'Nexxy';
  navbg: any;

  // @HostListener('document:scroll')
  // scrollOver() {
  //   if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
  //     this.navbg = {
  //       'background-color': '#000000',
  //     };
  //   } else {
  //     this.navbg = {};
  //   }
  // }
}
