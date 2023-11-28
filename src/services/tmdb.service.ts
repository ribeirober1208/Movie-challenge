import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  
  getMovies(page: number): Observable<any> {
    const url = `${this._BASE_URL}/discover/movie`;
    const params = { api_key: this._KEY, page: page.toString() };

    return this._HTTP.get(url, { params });
  }

  getMoviesByGender(id: string): Observable<any> {
    const url = `${this._BASE_URL}/discover/movie`;
    const params = { api_key: this._KEY, with_genres: id };

    return this._HTTP.get(url, { params });
  }

  getGenderList(): Observable<any> {
    const url = `${this._BASE_URL}/genre/movie/list`;
    const params = { api_key: this._KEY };

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

    return this._HTTP.get(`${this._BASE_URL}${this._ENDPOINT}`, { params });
  }

  getGenres(): Observable<any> {
    const url = `${this._BASE_URL}/genre/movie/list`;
    const params = { api_key: this._KEY };

    return this._HTTP.get(url, { params });
  }
  
  getMovieDetails(movieId: string = ''): Observable<any> {
    const url = `${this._BASE_URL}${this._DETAILS_ENDPOINT}/${movieId}?api_key=${this._KEY}&language=pt-BR`;

    return this._HTTP.get(url).pipe(
      tap((data) => console.log(data)),
    );
  }
}
