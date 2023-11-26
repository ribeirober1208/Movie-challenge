import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopExplorerComponent } from './top-explorer.component';

describe('TopExplorerComponent', () => {
  let component: TopExplorerComponent;
  let fixture: ComponentFixture<TopExplorerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopExplorerComponent]
    });
    fixture = TestBed.createComponent(TopExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
