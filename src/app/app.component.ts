import { CommonModule, NgStyle } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HOME_ROUTE, LOGIN_ROUTE, SEARCH_ROUTE } from './app.routes';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    NgStyle,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  readonly HOME_ROUTE = HOME_ROUTE;
  readonly SEARCH_ROUTE = SEARCH_ROUTE;
  readonly LOGIN_ROUTE = LOGIN_ROUTE;
  navbg: any;
  displayNavbar: boolean = true;
  ngOnInit(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }
  onScroll() {
    const scrollY = window.scrollY;
    this.displayNavbar = scrollY < 20;
  }
  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll); // Clean up listener
  }
}
