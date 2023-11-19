import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private readonly _KEY = '5d900fd5a214dd86a0e9204cc6d49fa9'
  private readonly _URL = 'https://api.themoviedb.org/3/discover/movie?api_key=${this._KEY}&include_adult=false&include_video=false&language=en-US&page=1&language=pt&page='

  constructor(private readonly _HTTP: HttpClient) { }
  
  getGenderList(): Observable<any> {
    return this._HTTP.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._KEY}&language=pt`);
  }
  
  getMoviesByGender(genreId: number): Observable<any> {
    return this._HTTP.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&with_genres=${genreId}&api_key=${this._KEY}`);
  }
}
