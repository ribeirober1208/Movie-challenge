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

   
  constructor(private readonly  _SERVICE: TmdbService) { }
  
  ngOnInit() {
    this.loadGenres(); // Carregar gêneros no início
    this.applyFilters(); // Aplicar filtros iniciais
  }

  loadGenres() {
    this._SERVICE.getGenres().subscribe((data: any) => {
      console.log(data.genres);
      this.genres = data.genres;
    });
  }

  // navigateToMovieDetail(movieId: number): void {
  //   // Implemente a navegação para os detalhes do filme conforme necessário
  // }

  onPageChanged(page: number) {
    console.log(page);
    this.currentPage = page;
    this.loadMovies();
  }

  applyFilters() {
    this.loadMovies();
  }

  handleFilterEvent(filterValue: string) {
    this.selectedGenre = filterValue;
    this.applyFilters();
  }
  
  handleOrderEvent(orderValue: string) {
    this.selectedOrder = orderValue;
    this.applyFilters();
  }
  
  handleSearchEvent(searchValue: string) {
    // Lógica para lidar com a pesquisa
    console.log('Evento de Pesquisa:', searchValue);
  }
  loadMovies() {
    const filters = {
      genre: this.selectedGenre,
     
    };

    this._SERVICE.getMoviesByPages(this.currentPage, filters, this.selectedOrder).subscribe({
      next: (data: any) => {
        console.log(data);
        this.totalPages = data.total_pages;
        this.movies = data.results;
      }
    });
  }
}