import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieContainerComponent } from './movie-container.component';

describe('MovieContainerComponent', () => {
  let component: MovieContainerComponent;
  let fixture: ComponentFixture<MovieContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieContainerComponent]
    });
    fixture = TestBed.createComponent(MovieContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
