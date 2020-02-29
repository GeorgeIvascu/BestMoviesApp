import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Movie } from './main/main.component';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

   getDataIMDB(){
    return this.http.get<Movie>('http://localhost:8080/imdb');
  }

    getDataRotten(){
      return this.http.get<Movie>('http://localhost:8080/rotten');
    }

    getMovieDescription(id){
      return this.http.get(`http://localhost:8080/rotten/${id}/desc`, {responseType: 'text'});
    }
}
