//home.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from 'src/services/tmdb.service';
import { TopContentComponent } from '../commons/top-content/top-content.component'; 
import { ActivatedRoute } from '@angular/router';

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
  genres: any[] = []; 
  selectedGenre: string = ''; 
  orderOptions: any[] = [];   
  selectedOrder: string = 'popularity.desc'; 
  moviesByGender: string | undefined;
  selectedGenreId?: string;;
  search: string = '';
  searchMovie: any;
  allMovies:any[] = [];


   
  constructor(private readonly  _SERVICE: TmdbService, private readonly route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    if (
      queryParams.get('genres') !== undefined &&
      queryParams.get('order') !== undefined &&
      queryParams.get('pageNumber') !== undefined
    ) {
      this.selectedGenreId = queryParams.get('genres')?.toString();
      this.selectedOrder = queryParams.get('order')?.toString() || 'popularity.desc';

      const pageNumberParam = queryParams.get('pageNumber');
      this.currentPage = pageNumberParam !== null ? parseInt(pageNumberParam, 10) : 1;
      
    this.loadGenres(); // Carregar gêneros no início
    this.applyFilters(); // Aplicar filtros iniciais
  }
  }

  loadGenres() {
    this._SERVICE.getGenres().subscribe((data: any) => {
      console.log(data.genres);
      this.genres = data.genres;
      this.orderOptions = ['popularity.desc', 'release_date.desc'];
    });
  }

  onPageChanged(page: number) {
    console.log(page);
    this.currentPage = page;
    this.loadMovies();
  }

  applyFilters() {
    this.loadMovies();
  }

  handleFilterEvent(filterValue: string) {
    console.log(filterValue)
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
      
    }
    const genreParam = this.selectedGenreId ? this.selectedGenreId : undefined;
    const orderParam = this.selectedOrder ? this.selectedOrder : undefined;
  
    this._SERVICE.getMovies(this.currentPage, genreParam, orderParam).subscribe({
      next: (data: any) => {
        this.totalPages = data.total_pages;
        this.movies = data.results;
      }
    });
  

    this._SERVICE.getMoviesByPages(this.currentPage, filters, this.selectedOrder).subscribe({
      next: (data: any) => {
        console.log(data);
        this.totalPages = data.total_pages;
        this.movies = data.results;
      }
    });
  }
  genderList() {
    this._SERVICE.getGenderList().subscribe({
      next: (data: any) => {
        console.log(data); 
        this.genres = data.genres;  
      }
    });
  }
  
  // Atualiza selectedGenreId com o valor do evento e chama getMoviesWhithGender.
  getSelectedGener(event:any){
    console.log(event);
       this.selectedGenreId = event;
       this.getMoviesWhithGender(event);
       this.loadMovies();
  }
  
  //Obtém filmes por gênero chamando o serviço.
  getMoviesWhithGender(id: string) {
    this._SERVICE.getMoviesByGender(id).subscribe({
      next: (data: any) => {
        this.moviesByGender = data;
        this.totalPages = data.total_pages;
        this.movies = data.results;
      }
    });
  }
  
   //Atualiza a selectedOrder com o valor do evento e chama loadMoviesWhitSelectedOrder.
    getSelectedOrder(event: string) {
      this.selectedOrder = event;
      this.loadMoviesWithOrder();
      this.loadMovies();
    }
  loadMoviesWithOrder() {
    throw new Error('Method not implemented.');
  }
  
  //Atualiza a searchMovie com o valor do evento .
  getSearch(event:any){
    this.searchMovie = event; 
  }
  
  //Verifica se o o value buscado está presente na lista de filmes
  searchMoviesList() {
    this._SERVICE.getMovies(this.currentPage).subscribe((data) => {
      this.allMovies = data.results;
      const value = this.searchMovie.toLowerCase();
      this.movies = this.allMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(value);
      });
    }); 
  }}

