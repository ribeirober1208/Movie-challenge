import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { TmdbService } from 'src/services/tmdb.service';
import { of } from 'rxjs';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let tmdbServiceMock: jasmine.SpyObj<TmdbService>;

  beforeEach(() => {
    // Configuração do espião para o serviço TmdbService
    const spy = jasmine.createSpyObj('TmdbService', ['getMovieDetails']);
    
    TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      providers: [{ provide: TmdbService, useValue: spy }],
    });

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    tmdbServiceMock = TestBed.inject(TmdbService) as jasmine.SpyObj<TmdbService>;
  });

  it('should load movie details successfully', () => {
    // Arrange
    const movieId = 123; // Substitua pelo ID do filme desejado
    const mockMovieDetails = { title: 'Movie Title', overview: 'Movie Overview' };
    tmdbServiceMock.getMovieDetails.and.returnValue(of(mockMovieDetails));

    // Act
   // component.getMovieDetails(movieId);

    // Assert
    expect(component.movieDetails).toEqual(mockMovieDetails);
  });

  it('should handle error when loading movie details', () => {
    // Arrange
    const movieId = 456; // Substitua pelo ID do filme desejado
    const errorMessage = 'Erro ao obter detalhes do filme.';
    tmdbServiceMock.getMovieDetails.and.returnValue(of(null)); // Simulando um erro

    // Act
    //component.getMovieDetails(movieId);

    // Assert
    expect(component.movieDetails).toBeNull(); // Verifica se os detalhes do filme são nulos em caso de erro
    expect(console.error).toHaveBeenCalledWith('Erro ao obter detalhes do filme:', errorMessage);
  });
});
