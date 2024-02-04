import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchComponent } from './pages/search/search.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'search',component:SearchComponent},
    {path:'movie/:id',component:MovieDetailsComponent}
];

