//home.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { TmdbService } from 'src/services/tmdb.service';
import { TopContentComponent } from '../commons/top-content/top-content.component'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TmdbService],
})

export class HomeComponent implements OnInit {
  @ViewChild(TopContentComponent) topContent!: TopContentComponent;
  currentPage: number = 1;
  totalPages: number = 0;
  movies: any[] = [];
  //movies: any = {};
  genres: any[] = []; 
  selectedGenre: string = ''; 
  orderOptions: any[] = [];   
  selectedOrder: string = 'popularity.desc'; 
  moviesByGender: string | undefined;
  selectedGenreId?: string;moviesByGenre: any;
  search: string = '';
  searchMovie: any;
  allMovies:any[] = [];
  filterEvent: any;
  searchEvent: any;


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
    this.listMoviesOrder('popularity.desc');
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
    console.log("home-evento", filterValue)
    this.selectedGenre = filterValue;
    this.applyFilters();
    //this.listMoviesOrder('popularity.desc');
  }
  
  handleOrderEvent(orderValue: string) {
    console.log("home-order", orderValue)
    this.selectedOrder = orderValue;
    this.applyFilters();
    this.listMoviesOrder(orderValue);
  }
  
  handleSearchEvent(searchValue: string) {
    // Lógica para lidar com a pesquisa
    console.log('Evento de Pesquisa:', searchValue);
  }
  
  loadMovies() {
    const filters = {
      genre: this.selectedGenre,
      order: this.selectedOrder,
      
    }
    const genreParam = this.selectedGenre? this.selectedGenre : undefined;
    const orderParam = this.selectedOrder? this.selectedOrder : undefined;
    console.log ("ordenação",orderParam);

    this._SERVICE.getMovies(this.currentPage, genreParam, orderParam).subscribe({
      next: (data: any) => {
        this.totalPages = data.total_pages;
        this.movies = data.results;
      }
    });
  
  }
  listMoviesOrder(sortBy: any) {
    console.log('Chamando listMoviesOrder com sortBy:', sortBy);
  
    sortBy = sortBy || 'popularity.desc';
  
    // Converte o objeto sortBy em parâmetros de URL
    const queryParams = new URLSearchParams();
    Object.entries(sortBy).forEach(([key, value]) => {
      
    });
  
    const queryString = queryParams.toString();
  
    this._SERVICE.getMoviesByOrder(queryString).subscribe({
      next: (data: any) => {
        console.log('Order: ', data);
        this.orderOptions = data.results;
        this.loadMovies();
      },
      error: (error: any) => {
        console.error('Erro na listagem de filmes ordenados:', error);
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
       this.selectedGenre = event;
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
   
      const filters = {
        genre: this.selectedGenre,
        order: this.selectedOrder,
      };
    
      
      const currentPageString = this.currentPage.toString();
    
      this._SERVICE.getMoviesByOrder(currentPageString).subscribe({
        next: (data: any) => {
          this.totalPages = data.total_pages;
          this.movies = data.results;
        },
        error: (error: any) => {
          console.error('Erro ao carregar filmes com a ordem selecionada:', error);
        }
      });
    }
    
  moviesWithGenre(genreId: string){
    this._SERVICE.getSelectedGenre(genreId).subscribe({
      next: (data:any)=>{
        this.moviesByGenre = data.results;
        console.log("Filmes filtrados por genero:", data);
        this.totalPages = data.total_pages;
        this.movies = data.results; 
      }
    })

    this.filterEvent.subscribe((filterValue: string) => {
      // Lógica para lidar com a mudança no filtro
      console.log('Filtro alterado:', filterValue);
    });

    this.searchEvent.subscribe((searchValue: string) => {
      // Lógica para lidar com a mudança na pesquisa
      console.log('Pesquisa alterada:', searchValue);
    });
  
  }}

