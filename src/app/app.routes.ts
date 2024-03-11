import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieResolver, MovieVideoResolver } from './service/MovieResolver';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'search',component:SearchComponent},
    {path:'movie/:id',component:MovieDetailsComponent,resolve:{movieDetails:MovieVideoResolver}}
];

export const HOME_ROUTE= '';
export const SEARCH_ROUTE='search';
export const MOVIE_ROUTE='movie';
