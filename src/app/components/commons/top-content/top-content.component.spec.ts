import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopContentComponent } from './top-content.component';
import { HomeComponent } from '../../home/home.component';


describe('TopContentComponent', () => {
  let component: TopContentComponent;
  let fixture: ComponentFixture<TopContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, TopContentComponent],
    });
    fixture = TestBed.createComponent(TopContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
