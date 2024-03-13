import { Movie,MovieImpl } from "../movie/Movie";
import { VideoInformation, VideoInformationImpl } from "../videoinformation/VideoInformation";

export interface MovieDetails{
    cast?:any[];
    movieVideo:VideoInformation|undefined;
    movie:Movie;
    error?:string;
}

export class MovieDetailsImpl implements MovieDetails{
    cast?: any[] | undefined;
    movieVideo: VideoInformation | undefined;
    movie: Movie ;
    error?: string | undefined;
    constructor(){
        this.movie = new MovieImpl();
        this.movieVideo = new VideoInformationImpl();
        this.cast = [];
    }
}
