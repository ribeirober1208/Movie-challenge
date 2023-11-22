import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  //movies: Movie[]; // Supondo que você tenha uma interface Movie para representar os filmes
  currentPage: number = 1;
  totalPages: number = 10; // Substitua pelo número total de páginas

  onPageChanged(page: number): void {
    // Lógica para carregar os filmes da página 'page'
    this.currentPage = page;
    this.loadMovies();
  }

  loadMovies(): void {
    // Lógica para carregar os filmes com base na página atual
  }
}
