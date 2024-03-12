import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Movie, MovieDetailsResolved, VideoInformation } from '../util/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieApiServiceService {
  constructor(private http: HttpClient) {}

  baseurl = 'https://api.themoviedb.org/3';
  apikey = '08cc33bd5ae3a747598ce2ad84376e66';

  //bannerapidata

  bannerApiData(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/trending/all/week?api_key=${this.apikey}`
    );
  }

  // trendingmovieapidata
  trendingMovieApiData(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/trending/movie/day?api_key=${this.apikey}`
    );
  }

  searchMovieWithName(data: any): Observable<any> {
    return this.http.get(
      `${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`
    );
  }

  getMovie(data: any): Observable<any> {
    return this.http.get(
      `${this.baseurl}/movie/${data}?api_key=${this.apikey}`
    );
  }

  getMovieVideo(data: any): Observable<any> {
    return this.http.get(
      `${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`
    );
  }

  getMovieCast(data: any): Observable<any> {
    return this.http.get(
      `${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`
    );
  }

  initializeMovie(): Movie {
    return {
      adult: false,
      backdrop_path: '',
      genre_ids: [],
      id: 0,
      media_type: '',
      original_language: '',
      original_title: '',
      overview: '',
      popularity: 0,
      poster_path: '',
      release_date: new Date(),
      title: '',
      video: false,
      vote_average: 0,
      vote_count: 0,
      showVideo:false
    };
  }
  getMovieDetails(movieId: number): Observable<MovieDetailsResolved> {
    return forkJoin({
      movie: this.getMovie(movieId), // Assuming getMovie returns movie details
      cast: this.getMovieCast(movieId).pipe(map((data) => data.cast.slice(0, 10)  || [])),
      movieVideo: this.getMovieVideo(movieId).pipe(
        map((result) => result.results.find((element: VideoInformation) => element.type === 'Trailer'))
      ),
    }).pipe(
      map((data) => ({
        ...data,
      }))
    );
  }
}
