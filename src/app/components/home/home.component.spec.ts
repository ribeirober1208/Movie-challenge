import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TmdbService } from 'src/services/tmdb.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';


describe('HomeComponent', () => {
  const tmdbServiceSpy = jasmine.createSpyObj('TmdbService', ['getGenres', 'getMovies', 'getMoviesByOrder']);

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let tmdbServiceMock: jasmine.SpyObj<TmdbService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let _SERVICE: TmdbService;
  let route: ActivatedRoute;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    _SERVICE = new TmdbService(httpClientSpy);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports:[HttpClientModule],
      providers: [
        { provide: TmdbService, useValue: tmdbServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: { get: () => null } } } },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    _SERVICE = TestBed.inject(TmdbService);
    fixture.detectChanges();
    tmdbServiceMock = TestBed.inject(TmdbService) as jasmine.SpyObj<TmdbService>;
    //fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadMovies on initialization', () => {
    spyOn(component, 'loadMovies');
  });
  
  it('should update currentPage when onPageChanged is called', () => {
    const page = 2;
    component.onPageChanged(page);
    expect(component.currentPage).toEqual(page);
  });

  it('should call getMovies with correct parameters when loadMovies is called', () => {
    spyOn(_SERVICE, 'getMovies').and.returnValue(of({ total_pages: 2, results: [] }));
    const page = 2;
    const genre = 'genre1';
    const order = 'order1';
    component.currentPage = page;
    component.selectedGenreId = genre;
    component.selectedOrder = order;
  
    component.loadMovies();
  
    expect(_SERVICE.getMovies).toHaveBeenCalledWith(page, genre, order);
  });

  it('should update totalPages and movies when loadMovies is called', () => {
    const responseData = { total_pages: 2, results: [{ title: 'Movie 1' }, { title: 'Movie 2' }] };
    spyOn(_SERVICE, 'getMovies').and.returnValue(of(responseData));
  
    component.loadMovies();
  
    expect(component.totalPages).toEqual(responseData.total_pages);
    expect(component.movies).toEqual(responseData.results);
  });

  it('should load genres on init', () => {
    const genres = [{ id: 1, name: 'Action' }];
    tmdbServiceMock.getGenres.and.returnValue(of({ genres }));
    
    component.ngOnInit();
    
    expect(component.genres).toEqual(genres);
  });
  
  
  it('should load movies successfully', () => {
    // Arrange
    component.currentPage = 1;
    component.selectedGenre = 'Action';
    component.selectedOrder = 'popularity.desc';
    const mockMoviesData = { total_pages: 1, results: [{ title: 'Movie 1' }, { title: 'Movie 2' }] };
    tmdbServiceMock.getMovies.and.returnValue(of(mockMoviesData));

    // Act
    component.loadMovies();

    // Assert
    expect(component.totalPages).toBe(mockMoviesData.total_pages);
    expect(component.movies).toEqual(mockMoviesData.results);
  });

  it('should call loadGenres and applyFilters during ngOnInit', () => {
    // Arrange
    const loadGenresSpy = spyOn(component, 'loadGenres');
    const applyFiltersSpy = spyOn(component, 'applyFilters');

    // Act
    component.ngOnInit();

    // Assert
    expect(loadGenresSpy).toHaveBeenCalled();
    expect(applyFiltersSpy).toHaveBeenCalled();
    
  });
  it('should update selectedGenre and call applyFilters when handleFilterEvent is called', () => {
    // Arrange
    const filterValue = 'Action';
    const applyFiltersSpy = spyOn(component, 'applyFilters');
  
    // Act
    component.handleFilterEvent(filterValue);
  
    // Assert
    expect(component.selectedGenre).toBe(filterValue);
    expect(applyFiltersSpy).toHaveBeenCalledOnceWith();
  });
  
});
