
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateToMovieList(): void {
    this.router.navigate(['/movies']);
  }

  navigateToMovieDetail(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }
}
