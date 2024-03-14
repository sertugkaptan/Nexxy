import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieVideoResolver } from './resolvers/moviedetails.resolver';
import { MovieResolver } from './resolvers/movie.resolver';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
    {path:'',component:HomeComponent,resolve:{data:MovieResolver}},
    {path:'search',component:SearchComponent},
    {path:'movie/:id',component:MovieDetailsComponent,resolve:{movieDetails:MovieVideoResolver}},
    {path:'login',component:LoginComponent}
];

export const HOME_ROUTE= '';
export const SEARCH_ROUTE='search';
export const MOVIE_ROUTE='movie';
export const LOGIN_ROUTE='login';
