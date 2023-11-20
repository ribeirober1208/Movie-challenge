import { TestBed } from '@angular/core/testing';
import { TmdbService } from './tmdb.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TmdbService', () => {
  let service: TmdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        HttpClientTestingModule
      ]

    });
    
    service = TestBed.inject(TmdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
