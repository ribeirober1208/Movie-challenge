import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private readonly _KEY = '5d900fd5a214dd86a0e9204cc6d49fa9';
  private readonly _BASE_URL = 'https://api.themoviedb.org/3';
  private readonly _ENDPOINT = '/movie/popular';

  constructor(private readonly _HTTP: HttpClient) {}

  getMovies(): Observable<any> {
    const url = `${this._BASE_URL}${this._ENDPOINT}?api_key=${this._KEY}&language=pt-BR&page=1`;

    return this._HTTP.get(url).pipe(
      tap((data) => console.log(data)),
    );
  }
}

