import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/services/tmdb.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit{
  movieId: string = '';
  movieDetails: any;
  @Input() movies: any[] = [];

  constructor (private route: ActivatedRoute, private tmdbService: TmdbService) {}

  ngOnInit (): void {
    //if (this.route.snapshot.paramMap.get('id')) {
    this.movieId = this.route.snapshot.params['id'];
    console.log (this.route.snapshot.params['id']);

    this.tmdbService.getMovieDetails(this.movieId).subscribe(
    
      (data) => {
        this.movieDetails = data;
        console.log(this.movieDetails);
      },
      (error) => {
        console.error('Erro ao obter detalhes do filme:', error)
      }
    )
  }

}
