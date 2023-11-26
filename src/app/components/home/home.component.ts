import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/services/tmdb.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  currentPage: number = 1;
  totalPages: number = 0;
  movies: any[] = [];
  navigationService: any;
  //navigationService: any;
 
  //injeção
  constructor(private readonly  _SERVICE: TmdbService) { }

  ngOnInit() {
    this._SERVICE.getMovies().subscribe((data: any) => {
      this.movies = data.results;  
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
