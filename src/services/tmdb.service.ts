import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private readonly _KEY = '5d900fd5a214dd86a0e9204cc6d49fa9';
  private readonly _BASE_URL = 'https://api.themoviedb.org/3';
  private readonly _ENDPOINT = '/movie/popular';
  private readonly _DETAILS_ENDPOINT = '/movie';
  private readonly _GENRES_ENDPOINT = '/genre/movie/list';

  constructor(private readonly _HTTP: HttpClient) {}

  getMovies(page: number, gener?: any, order?: any): Observable<any> {
    let params = new HttpParams().set('page', page.toString());

    if (gener !== undefined && gener !== null) {
      params = params.set('with_genres', gener);
    }

    if (order !== undefined && order !== "") {
      params = params.set('sort_by', order);
    }

    return this._HTTP.get(`${this._BASE_URL}${this._ENDPOINT}`, { params: params });
  }



  getGenres(): Observable<any> {
    return this._HTTP.get(`${this._BASE_URL}${this._GENRES_ENDPOINT}`, {
      params: new HttpParams().set('api_key', this._KEY).set('language', 'pt'),
    });
  }


  
  getMovie(id: number): Observable<any> {
    return this._HTTP.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this._KEY}&language=pt`);
  }

  getGenderList(): Observable<any> {
    return this._HTTP.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._KEY}&language=pt`);
  }

  getMoviesByGender(genreId: string): Observable<any> {
    return this._HTTP.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&with_genres=${genreId}&api_key=${this._KEY}`);
  }
  
  getMovieDetails(movieId: string = ''): Observable<any> {
    const url = `${this._BASE_URL}${this._DETAILS_ENDPOINT}/${movieId}?api_key=${this._KEY}&language=pt-BR`;

    return this._HTTP.get(url).pipe(
     // tap((data) => console.log(data)),
    );
  }
}
