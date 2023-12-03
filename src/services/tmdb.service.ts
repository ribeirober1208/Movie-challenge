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
  //alterar somente daqui para baixo, o trecho acima mantém a lista
  private readonly _SORT = `&sort_by=` //***criar função*******************/
  private readonly _DISCOVER = `${this._BASE_URL}discover/movie${this._APPEND}` //***ajustar URL função*******************
  private readonly _ID = `${this._BASE_URL}movie`//***criar função*******************
  private readonly _GENRES = `${this._BASE_URL}genre/movie/list`/***ajustar URL função*****************/
  private readonly _SELECTGENRE = `&with_genres=` //***criar função*******************
  private readonly _SEARCH = `&with_keywords=`//***criar função*******************
  

  constructor(private readonly _HTTP: HttpClient) {}
  
  getMovies(page: number, genre?: string, order?: string): Observable<any> {
    const base_url = `${this._BASE_URL}/discover/movie`;
    const params: any = { api_key: this._KEY, page: page.toString() };
  
    if (genre) {
      params.with_genres = genre;
    }
  
    if (order) {
      params.sort_by = order;
    }
  
    console.log(`${base_url}?${this.buildQueryString(params)}`);
    return this._HTTP.get(base_url, { params });
  }
  
  private buildQueryString(params: any): string {
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
  

  getMoviesByGender(id: string): Observable<any> {
    const url = `${this._BASE_URL}/discover/movie`; 
    const params = { api_key: this._KEY, with_genres: id };

    return this._HTTP.get(url, { params }); //*** inclui url _DISCOVER****************************
  }

  getGenderList(): Observable<any> {
    const url = `${this._BASE_URL}/genre/movie/list`;
    const params = { api_key: this._KEY };

    return this._HTTP.get(url, { params }); //*** inclui url _GENRES******************************
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

  getGenres(): Observable<any> {
    const url = `${this._BASE_URL}/genre/movie/list`;
    const params = { api_key: this._KEY };

    return this._HTTP.get(url, { params }); //*** inclui url _GENRES*********************************
  }
  
  getMovieDetails(movieId: string = ''): Observable<any> {
    const url = `${this._BASE_URL}${this._DETAILS}/${movieId}?api_key=${this._KEY}&language=pt-BR`;

    return this._HTTP.get(url).pipe(
      tap((data) => console.log(data)),
    );
  }
}