import { Component, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from 'src/services/tmdb.service';
import { TopContentComponent } from '../commons/top-content/top-content.component';  



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild(TopContentComponent) topContent!: TopContentComponent;
  currentPage: number = 1;
  totalPages: number = 0;
  movies: any[] = [];
  navigationService: any;
  genres: any[] = []; // Adicione um array para armazenar os gêneros
  selectedGenre: string = ''; // Adicione uma variável para o gênero selecionado
  orderOptions: any[] = ['popularity.desc', 'release_date.desc']; // Opções de ordenação
  selectedOrder: string = 'popularity.desc'; 
  
  handleFilterEvent(filterValue: string) {
    // Lógica para lidar com o evento de filtragem
    console.log('Evento de Filtragem:', filterValue);
  }
 
  //injeção
  constructor(private readonly  _SERVICE: TmdbService) { }

  ngOnInit() {
    this._SERVICE.getMovies().subscribe((data: any) => {
      this.movies = data.results;  
      this.genres = data.genres;
      this.loadMovies();


    });
  }
  navigateToMovieDetail(movieId: number): void {
    this.navigationService.navigateToMovieDetail(movieId);
  }

  onPageChanged(page: number) {
    console.log(page);
    this.currentPage = page;
    this.loadMovies();
  }
  applyFiltersAndFetch() {
    // Ao aplicar filtros, volte para a primeira página
    this.currentPage = 1;
    this.loadMovies();
  }

  loadMovies() {
    this._SERVICE.getMoviesByPages(this.currentPage).subscribe({
      next: (data: any) => {
        console.log(data);
        this.totalPages = data.total_pages;
        this.movies = data.results;
      }
    })
  }
}
