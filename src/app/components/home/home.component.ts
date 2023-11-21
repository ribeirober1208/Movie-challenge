import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];

  constructor(private tmdbService: TmdbService) { }

  ngOnInit() {
    this.tmdbService.getMovies().subscribe((data: any) => {
      this.movies = data.results;
    });
  }

}
