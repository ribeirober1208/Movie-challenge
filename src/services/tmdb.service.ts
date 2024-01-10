import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private readonly _KEY = '5d900fd5a214dd86a0e9204cc6d49fa9';
  private readonly _BASE_URL = `https://api.themoviedb.org/3`;
  private readonly _APPEND = `?include_adult=false&api_key=${this._KEY}&page=`
  private readonly _ORDER = `/movie/popular`;
  private readonly _DETAILS = `/movie`;
  private readonly _DISCOVER = this._BASE_URL + 'discover/movie' + this._APPEND;
  private readonly _ID = this._BASE_URL + 'movie';
  private readonly _GENRES = this._BASE_URL + 'genre/movie/list' + this._APPEND;
  private readonly _SELECTGENRE = '&with_genres=' + this._APPEND;
  private readonly _SEARCH = '&with_keywords=' + this._APPEND;
  private readonly _SORT = '&sort_by=';

  constructor(private readonly _HTTP: HttpClient) {}
  //protocolo de como se faz essa organização. URL orgnizador universal de recursos. 
  //é uma forma de organizar a comunicação entre sistemas de internet
  getMovies(page: number, genre?: string, order?: string): Observable<any> {
    const params: any = {
      api_key: this._KEY,
      page: page.toString(),
      with_genres: genre,
      sort_by: order
    };
  
    const queryString = this.buildQueryString(params);
    const url = `${this._BASE_URL}/discover/movie${this._APPEND}${queryString}`;
    
    console.log(url);
    return this._HTTP.get(url);
  }
  
  private buildQueryString(params: any): string {
    return Object.keys(params)
      .map(key => params[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}` : '')
      .filter(Boolean)
      .join('&');
  }

  getMoviesByGender(id: string): Observable<any> {
    const params: any = {
      api_key: this._KEY,
      with_genres: id
    };
  
    const url = `${this._BASE_URL}/discover/movie${this._DISCOVER}`;
    
    console.log(url);
    return this._HTTP.get(url, { params });
  }
  
  getGenderList(): Observable<any> {
    const url = `${this._BASE_URL}/genre/movie/list${this._GENRES}`;
    const params: any = {
      api_key: this._KEY
    };
  
    console.log(url);
    return this._HTTP.get(url, { params });
  }
  
  getMoviesByPages(page: number, filters?: any, sortBy: string = 'popularity.desc'): Observable<any> {
    let params = new HttpParams()
      .set('api_key', this._KEY)
      .set('language', 'pt-BR')
      .set('page', page.toString());

    // Aplicar filtros, se fornecidos
    if (filters) {
      if (filters.genre) {
        params = params.set('with_genres', filters.genre);
      }
    }

    // Aplicar ordenação
    params = params.set('sort_by', sortBy);

    return this._HTTP.get(`${this._BASE_URL}${this._ORDER}`, { params });
  }
  //função lista de filmes no input********
  getGenres(): Observable<any> {
    const params: any = {
      api_key: this._KEY,
      language: 'pt-BR'
    };
  
    const url = `${this._BASE_URL}/genre/movie/list`;
    
    console.log(url);
    return this._HTTP.get(url, { params });
  }
  
  getMoviesByOrder(sortBy: string): Observable<any> {
    return this._HTTP.get(`${this._SORT}?api_key=${this._KEY}&sort_by=${sortBy}`)
  }

  getSelectedGenre(genreId: string): Observable<any> {
    return this._HTTP.get(`${this._SELECTGENRE}&api_key=${this._KEY}&with_genres=${genreId}`)
  }

  getMoviesById(id: number): Observable<any> {
    console.log(`${this._ID}/${id}?${this._KEY}`);
    return this._HTTP.get(`${this._ID}/${id}?api_key=${this._KEY}`);
  }

  getMoviesBySearch(value: string): Observable<any> {
    return this._HTTP.get(`${this._SEARCH}?api_key=${this._KEY}&search=${value}`)
  }
  getMovieDetails(movieId: string = ''): Observable<any> {
    const url = `${this._BASE_URL}${this._DETAILS}/${movieId}?api_key=${this._KEY}&language=pt-BR`;

    return this._HTTP.get(url).pipe(
      tap((data) => console.log(data)),
    );
  }
}